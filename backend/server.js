const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdf = require('pdf-parse');
const fs = require('fs').promises;
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const ytdl = require('ytdl-core');
// const { TranscribeClient } = require('@aws-sdk/client-transcribe'); // Or use Whisper API


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

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use(express.json());
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


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

// Add this helper function with your other Gemini functions
async function generateSummaryWithGemini(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `Provide the summary in clean plain text format:
    - DO NOT use markdown (** or any formatting)
    - Use ONLY these formatting rules:
      • Main sections in ALL CAPS (no symbols)
      - Sub-points with regular bullet points
      -- Nested points with double dashes
    - Example:
      OPERATING SYSTEM BASICS
      - System software managing resources
      -- Manages both hardware and software
    
    Text to summarize:
    ${text.substring(0, 30000)}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    // Remove any remaining markdown
    return response.text()
      .replace(/\*\*/g, '')
      .replace(/\*/g, '•');
  } catch (error) {
    console.error('Summary generation error:', error);
    throw new Error('Failed to generate summary');
  }
}


async function getYouTubeCaptions(videoId) {
  try {
    const info = await ytdl.getInfo(videoId);
    
    // Method 1: Check for automatic captions
    let captions = info.player_response?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    
    // Method 2: Alternative caption location (some videos)
    if (!captions || captions.length === 0) {
      captions = info.player_response?.captions?.playerCaptionsTracklistRenderer?.translationLanguages;
    }

    // Method 3: Fallback to manual extraction if no captions
    if (!captions || captions.length === 0) {
      console.log('No captions found, falling back to transcript extraction');
      const transcript = await extractTranscriptFromVideo(videoId);
      return {
        transcript,
        videoDetails: {
          title: info.videoDetails.title,
          duration: info.videoDetails.lengthSeconds
        }
      };
    }

    // Find English captions or fallback to first available
    const englishTrack = captions.find(track => track.languageCode === 'en') || captions[0];
    
    if (!englishTrack?.baseUrl) {
      throw new Error('No caption track URL available');
    }

    const transcriptResponse = await fetch(englishTrack.baseUrl);
    if (!transcriptResponse.ok) {
      throw new Error(`Failed to fetch captions: ${transcriptResponse.statusText}`);
    }
    
    const transcript = await transcriptResponse.text();
    
    return {
      transcript,
      videoDetails: {
        title: info.videoDetails.title,
        duration: info.videoDetails.lengthSeconds
      }
    };
  } catch (error) {
    console.error('Caption extraction failed:', error);
    throw new Error(`Could not get captions: ${error.message}`);
  }
}


async function extractTranscriptFromVideo(videoId) {
  try {
    // Try to get video description as fallback
    const info = await ytdl.getInfo(videoId);
    return info.videoDetails.description || 
           "No captions available for this video. Please try a different video with captions.";
  } catch (error) {
    console.error('Fallback extraction failed:', error);
    return "Could not extract any content from this video.";
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


// Add this endpoint with your other routes
app.post('/api/summarize-pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    // Use your existing text extraction function
    const text = await extractTextFromPdf(req.file.path);
    
    // Generate summary using Gemini
    const summary = await generateSummaryWithGemini(text);

    res.json({
      success: true,
      summary: summary,
      originalLength: text.length,
      summaryLength: summary.length
    });

  } catch (error) {
    console.error('PDF summarization error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to summarize PDF',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  } finally {
    // Clean up uploaded file using your existing pattern
    try {
      await fs.unlink(req.file.path);
    } catch (cleanupError) {
      console.error('File cleanup error:', cleanupError);
    }
  }
});

// Update the /api/youtube-transcript endpoint
app.post('/api/youtube-transcript', async (req, res) => {
  try {
    const { videoId } = req.body;
    
    if (!videoId) {
      return res.status(400).json({ 
        success: false,
        error: 'YouTube video ID is required' 
      });
    }

    const { transcript, videoDetails } = await getYouTubeCaptions(videoId);
    
    res.json({
      success: true,
      transcript,
      videoTitle: videoDetails.title,
      duration: videoDetails.duration,
      hasCaptions: transcript.includes("No captions") ? false : true
    });
  } catch (error) {
    console.error('Transcript error:', error);
    res.status(400).json({
      success: false,
      error: error.message,
      suggestion: 'Try a different video with official captions',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});


// YouTube Summary Endpoint
app.post('/api/summarize-youtube', async (req, res) => {
  try {
    const { videoId } = req.body;
    const { transcript, videoDetails } = await getYouTubeCaptions(videoId);
    
    // Use your existing summary function
    const summary = await generateSummaryWithGemini(transcript);
    
    res.json({
      success: true,
      summary,
      videoDetails
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      suggestion: error.message.includes('No captions') 
        ? 'Try a different video with official captions' 
        : 'Check the video ID and try again'
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const connectDB = require('./config/db');

connectDB();