// server.js - Express server with Gemini API integration
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const app = express();
const port = 5000;

// Configure Gemini API
const API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your Gemini API key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Extract text from PDF
async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

// Generate mind map data using Gemini AI
async function generateMindMapWithAI(text) {
  const prompt = `
    Analyze the following text and convert it into a mind map structure.
    Format the output as a JSON object with 'nodes' and 'edges' arrays.
    Each node should have 'id', 'label', and 'type' properties.
    Each edge should have 'id', 'source' (node id), and 'target' (node id) properties.
    Create meaningful connections between related concepts.
    Make the first node (id: '1') the main topic or theme.
    Limit to maximum 12 nodes for clarity.
    
    Text to analyze:
    ${text}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.candidates[0]?.content?.parts[0]?.text || '';
    
    // Extract JSON from response
    const jsonMatch = textResponse.match(/json\n([\s\S]*?)\n/) || 
                       textResponse.match(/\n([\s\S]*?)\n/) ||
                       textResponse.match(/{[\s\S]*}/);
    
    let mindMapData;
    if (jsonMatch) {
      const jsonString = jsonMatch[1] || jsonMatch[0];
      mindMapData = JSON.parse(jsonString.trim());
    } else {
      // If no JSON found in response, create a basic structure
      throw new Error('Invalid response format from AI');
    }
    
    // Ensure the response has the expected structure
    if (!mindMapData.nodes || !mindMapData.edges) {
      throw new Error('AI response missing nodes or edges');
    }
    
    return mindMapData;
  } catch (error) {
    console.error('Error generating mind map with AI:', error);
    
    // Return a fallback basic structure on error
    return createFallbackMindMap(text);
  }
}

// Create a basic mind map as fallback
function createFallbackMindMap(text) {
  const lines = text.split('\n').filter(line => line.trim());
  const mainTopic = lines[0] || 'Main Topic';
  
  const nodes = [{
    id: '1',
    label: mainTopic,
    type: 'main'
  }];
  
  const edges = [];
  
  // Create nodes and edges from the remaining lines
  const subtopics = lines.slice(1, 7); // Limit to 6 subtopics for the fallback
  
  subtopics.forEach((line, index) => {
    const nodeId = `${index + 2}`;
    
    nodes.push({
      id: nodeId,
      label: line.trim(),
      type: 'subtopic'
    });
    
    edges.push({
        id: `e1-${nodeId}`,
        source: '1',
      target: nodeId
    });
  });
  
  return { nodes, edges };
}

// API Endpoints
// Process text and generate mind map
app.post('/generate-mindmap', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }
    
    const mindMapData = await generateMindMapWithAI(text);
    res.json(mindMapData);
  } catch (error) {
    console.error('Error in generate-mindmap endpoint:', error);
    res.status(500).json({ error: 'Failed to generate mind map' });
  }
});

// Upload and process PDF
app.post('/upload-pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const filePath = req.file.path;
    const extractedText = await extractTextFromPDF(filePath);
    
    // Clean up the file after extraction
    fs.unlinkSync(filePath);
    
    res.json({ extractedText });
  } catch (error) {
    console.error('Error in upload-pdf endpoint:', error);
    res.status(500).json({ error: 'Failed to process PDF' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Mind map backend server running on port ${port}`);
});