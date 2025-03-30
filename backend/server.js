const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdf = require('pdf-parse');
const fs = require('fs').promises;
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3001;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and text files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

(async () => {
  try {
    await fs.mkdir('uploads', { recursive: true });
  } catch (err) {
    console.error('Could not create uploads directory:', err);
  }
})();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyCiBo09C70Oig-tgnwpJXR1pkS3ecLkznU");

// Function to extract text from PDF
async function extractTextFromPdf(filePath) {
  try {
    console.log(`Extracting text from PDF: ${filePath}`);
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdf(dataBuffer);
    
    if (!data.text || data.text.trim().length === 0) {
      throw new Error('PDF appears to be empty or contains no extractable text');
    }
    
    console.log(`Successfully extracted ${data.text.length} characters from PDF`);
    return data.text;
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
}

// Function to generate mind map data using Gemini
async function generateMindMapWithGemini(text) {
  try {
    console.log("Received text for processing:", text.substring(0, 100) + "...");
    
    // Get the Gemini 1.5 model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    // Create prompt for mind map generation
    const prompt = `
    Generate a mind map structure from the following text. 
    Extract the main concept and related subconcepts with descriptions.
    Format the response as a JSON array with this structure:
    [
      {
        "id": "1",
        "label": "Main Concept",
        "description": "Core concept description",
        "importance": 5
      },
      {
        "id": "2",
        "label": "Subconcept 1",
        "description": "Description of subconcept",
        "importance": 3,
        "parent": "1"
      },
      ...
    ]
    
    Importance should be a number from 1-5 indicating the concept's significance.
    Include a "parent" field for all nodes except the main concept to establish relationships.
    For nodes that should connect to multiple parents, use the most important parent and note other connections in an optional "relatedTo" array of IDs.
    each parent should have atmost 3 childs if not necessary to have more. try to have atleast 3 levels and a maximum of 5 levels.
    
    Input text: ${text}`;

    console.log("Sending prompt to Gemini...");
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = await response.text();
    
    console.log("Received raw response from Gemini:", textResponse.substring(0, 200) + "...");
    
    // Extract JSON from response (handle potential text wrapping)
    const jsonMatch = textResponse.match(/\[.*\]/s); // Extracts JSON content
if (!jsonMatch) {
  console.error("No valid JSON array found in response.");
  throw new Error("Invalid JSON format from Gemini API");
}
const jsonStr = jsonMatch[0];

    
    console.log("Extracted JSON:", jsonStr.substring(0, 200) + "...");
    
    try {
      // Parse the response into JSON
      const mindMapData = JSON.parse(jsonStr);
      
      // Process the data to create nodes and edges
      const nodes = mindMapData.map(item => ({
        id: item.id,
        type: 'custom',
        data: {
          label: item.label,
          description: item.description || "",
          importance: item.importance || 1
        },
        position: { x: 0, y: 0 } // Positions will be calculated on the client
      }));
      
      // Create edges based on parent relationships
      const edges = [];
      
      mindMapData.forEach(item => {
        if (item.parent) {
          edges.push({
            id: `e${item.parent}-${item.id}`,
            source: item.parent,
            target: item.id,
            animated: true,
            style: { stroke: '#1d4ed8', strokeWidth: 2 }
          });
        }
        
        // Add edges for related items
        if (item.relatedTo && Array.isArray(item.relatedTo)) {
          item.relatedTo.forEach(relatedId => {
            edges.push({
              id: `e${relatedId}-${item.id}-related`,
              source: relatedId,
              target: item.id,
              animated: false,
              style: { 
                stroke: '#3b82f6', 
                strokeWidth: 1.5,
                strokeDasharray: '3,3'
              }
            });
          });
        }
      });
      
      console.log(`Generated ${nodes.length} nodes and ${edges.length} edges`);
      return { nodes, edges };
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      console.error("Problem JSON string:", jsonStr);
      throw new Error(`Failed to parse Gemini response: ${jsonError.message}`);
    }
  } catch (error) {
    console.error("Error with Gemini API:", error);
    throw new Error(`Gemini API error: ${error.message}`);
  }
}

async function processDocument(file) {
  let extractedText = '';
  
  try {
    console.log(`Processing file: ${file.originalname}, Type: ${file.mimetype}`);
    
    if (file.mimetype === 'application/pdf') {
      extractedText = await extractTextFromPdf(file.path);
    } else if (file.mimetype === 'text/plain') {
      extractedText = await fs.readFile(file.path, 'utf-8');
    }
    
    if (!extractedText || extractedText.trim().length === 0) {
      throw new Error('Extracted text is empty');
    }
    
    return extractedText;
  } catch (error) {
    console.error('Document processing error:', error);
    throw error;
  } finally {
    // Clean up the uploaded file
    try {
      if (file.path) {
        await fs.unlink(file.path);
        console.log(`Cleaned up file: ${file.path}`);
      }
    } catch (cleanupError) {
      console.error('File cleanup error:', cleanupError);
    }
  }
}

// API Endpoint for generating mind map from text
app.post('/api/generate-mind-map', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Text input is required' });
    }
    
    const mindMapData = await generateMindMapWithGemini(text);
    res.json(mindMapData);
  } catch (error) {
    console.error('Error generating mind map:', error);
    res.status(500).json({ error: 'Failed to generate mind map' });
  }
});

// Updated API Endpoint for processing documents
// Enhanced document processing endpoint
app.post('/api/process-document', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        error: 'No file uploaded',
        details: 'Please select a PDF or text file to upload'
      });
    }

    console.log(`Received file: ${req.file.originalname}`);
    
    const extractedText = await processDocument(req.file);
    const mindMapData = await generateMindMapWithGemini(extractedText);
    
    res.json({
      success: true,
      text: extractedText,
      mindMap: mindMapData
    });
    
  } catch (error) {
    console.error('Document processing endpoint error:', error);
    
    let statusCode = 500;
    let errorMessage = 'Failed to process document';
    
    if (error.message.includes('Only PDF and text files')) {
      statusCode = 400;
      errorMessage = error.message;
    } else if (error.message.includes('empty') || error.message.includes('no extractable text')) {
      statusCode = 400;
      errorMessage = 'The document appears to be empty or contains no extractable text';
    }
    
    res.status(statusCode).json({ 
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


// Add this endpoint to your existing server.js file
app.post('/generate-flashcards', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Text input is required' });
    }
    
    console.log("Received text for flashcard generation:", text.substring(0, 100) + "...");
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `
    Generate a set of flashcards from the following text. 
    Create question-answer pairs that cover the key concepts.
    Format the response as a JSON array with this structure:
    [
      {
        "question": "Clear and concise question",
        "answer": "Detailed and accurate answer"
      },
      ...
    ]
    
    Guidelines:
    - Create 5-10 flashcards depending on the content density if number not specified
    - Questions should test understanding of key concepts
    - Answers should be detailed but concise
    - Cover all major topics in the text
    - Avoid trivial questions that just repeat text verbatim
    
    Input text: ${text}`;

    console.log("Sending prompt to Gemini for flashcard generation...");
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = await response.text();
    
    console.log("Received raw response from Gemini:", textResponse.substring(0, 200) + "...");
    
    const jsonMatch = textResponse.match(/\[.*\]/s);
    if (!jsonMatch) {
      console.error("No valid JSON array found in response.");
      throw new Error("Invalid JSON format from Gemini API");
    }
    
    const flashcards = JSON.parse(jsonMatch[0]);
    
    if (!Array.isArray(flashcards) || flashcards.length === 0) {
      throw new Error("No flashcards were generated");
    }
    
    console.log(`Generated ${flashcards.length} flashcards`);
    res.json({ cards: flashcards });
    
  } catch (error) {
    console.error('Error generating flashcards:', error);
    res.status(500).json({ 
      error: 'Failed to generate flashcards',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


// Add this endpoint to your existing server.js
app.post('/generate-quiz', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Text input is required' });
    }
    
    console.log("Received text for quiz generation:", text.substring(0, 100) + "...");
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `
    Generate a multiple-choice quiz from the following text. 
    Create 10-15 questions that cover the key concepts.
    Format the response as a JSON array with this structure:
    [
      {
        "question": "Clear and concise question",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correctAnswer": "Correct option",
        "explanation": "Brief explanation of why this is correct"
      },
      ...
    ]
    
    Guidelines:
    - Questions should test understanding of key concepts
    - Provide 4 plausible options per question
    - Only one correct answer per question
    - Options should be of similar length and complexity
    - Avoid trivial questions that just repeat text verbatim
    - Include explanations for the correct answers
    
    Input text: ${text}`;

    console.log("Sending prompt to Gemini for quiz generation...");
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = await response.text();
    
    console.log("Received raw response from Gemini:", textResponse.substring(0, 200) + "...");
    
    const jsonMatch = textResponse.match(/\[.*\]/s);
    if (!jsonMatch) {
      console.error("No valid JSON array found in response.");
      throw new Error("Invalid JSON format from Gemini API");
    }
    
    const quizQuestions = JSON.parse(jsonMatch[0]);
    
    if (!Array.isArray(quizQuestions) || quizQuestions.length === 0) {
      throw new Error("No quiz questions were generated");
    }
    
    console.log(`Generated ${quizQuestions.length} quiz questions`);
    res.json({ questions: quizQuestions });
    
  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({ 
      error: 'Failed to generate quiz',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});