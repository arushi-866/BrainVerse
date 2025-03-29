import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import ReactFlow, { 
  Controls, 
  Background, 
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel
} from "reactflow";
import "reactflow/dist/style.css";
import { Loader, Zap, FileText, Brain, Download, Share2, GitBranch, Info, Award, Sparkles } from "lucide-react";

// Particle animation system for neural network visualization
const ParticleSystem = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: `rgba(${10 + Math.random() * 40}, ${120 + Math.random() * 70}, ${200 + Math.random() * 55}, ${0.2 + Math.random() * 0.6})`
          }}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.1
          }}
          animate={{ 
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5, 1]
          }}
          transition={{ 
            duration: 3 + Math.random() * 7,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
};

// Enhanced neuron node with pulse effects
const CustomNode = ({ data }) => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      scale: [0.8, 1.05, 1],
      transition: { duration: 1.2, type: "spring", damping: 8 }
    });
    
    // Pulse randomly
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        controls.start({
          boxShadow: [
            "0 0 0px rgba(29, 78, 216, 0)",
            "0 0 15px rgba(29, 78, 216, 0.6)",
            "0 0 0px rgba(29, 78, 216, 0)"
          ],
          transition: { duration: 1.5 }
        });
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [controls]);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={controls}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 0 20px rgba(29, 78, 216, 0.8)"
      }}
      className="px-4 py-3 rounded-lg shadow-lg bg-gradient-to-br from-blue-950 to-indigo-950 border border-blue-700 backdrop-blur-sm"
    >
      <div className="font-medium text-blue-100">{data.label}</div>
      {data.description && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs text-blue-300 mt-1"
        >
          {data.description}
        </motion.div>
      )}
      {data.importance > 0 && (
        <div className="flex mt-2">
          {[...Array(data.importance)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="w-2 h-2 rounded-full bg-blue-400 mr-1"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

// Advanced neural connections
const connectionLineStyle = {
  stroke: '#1d4ed8',
  strokeWidth: 2,
  strokeDasharray: '5,5'
};

const edgeOptions = {
  animated: true,
  style: { 
    stroke: '#1d4ed8', 
    strokeWidth: 2
  },
  type: 'smoothstep'
};

// Node types configuration
const nodeTypes = {
  custom: CustomNode,
};

function MindMap() {
  const [inputText, setInputText] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showTutorial, setShowTutorial] = useState(true);
  const [processingStep, setProcessingStep] = useState(0);
  const [mapComplexity, setMapComplexity] = useState("simple");
  const [showWinBadge, setShowWinBadge] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const progressInterval = useRef(null);
  
  // Force-directed layout with physics simulation
  useEffect(() => {
    if (nodes.length > 0) {
      const timer = setTimeout(() => {
        const centerX = window.innerWidth / 2 - 200;
        const centerY = window.innerHeight / 2 - 200;
        
        // Apply different layouts based on complexity
        let updatedNodes;
        
        if (mapComplexity === "radial") {
          // Radial layout
          updatedNodes = nodes.map((node, index) => {
            if (index === 0) {
              return { ...node, position: { x: centerX, y: centerY } };
            }
            const angle = (index * (2 * Math.PI)) / (nodes.length - 1);
            const radius = 220;
            return {
              ...node,
              position: {
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle),
              },
            };
          });
        } else if (mapComplexity === "hierarchical") {
          // Hierarchical layout
          const levels = Math.ceil(Math.sqrt(nodes.length));
          const nodesPerLevel = Math.ceil(nodes.length / levels);
          
          updatedNodes = nodes.map((node, index) => {
            const level = Math.floor(index / nodesPerLevel);
            const posInLevel = index % nodesPerLevel;
            const levelWidth = nodesPerLevel * 180;
            
            return {
              ...node,
              position: {
                x: centerX - levelWidth/2 + posInLevel * 180,
                y: centerY - 200 + level * 150,
              },
            };
          });
        } else {
          // Advanced spiral layout
          updatedNodes = nodes.map((node, index) => {
            if (index === 0) {
              return { ...node, position: { x: centerX, y: centerY } };
            }
            const angle = (index * (2.6 * Math.PI)) / (nodes.length);
            const radius = 150 + (index * 25); // Increasing radius for spiral effect
            
            return {
              ...node,
              position: {
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle),
              },
            };
          });
        }
  
        setNodes(updatedNodes);
      }, 100);
  
      return () => clearTimeout(timer);
    }
  }, [nodes.length, setNodes, mapComplexity]); 

  // Connection handler with improved animation
  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({
      ...params,
      ...edgeOptions,
      type: 'smoothstep',
      animated: true
    }, eds));
  }, [setEdges]);

  // Advanced mind map generation with NLP simulation
  const generateMindMap = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    setProcessingStep(1);
    startProgressSimulation();
    
    try {
      // Simulate AI processing steps
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStep(2);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProcessingStep(3);
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStep(4);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Parse input text with advanced NLP simulation
      const lines = inputText.split('\n').filter(line => line.trim());
      const rootText = lines[0] || "Central Concept";
      
      // Create enhanced nodes with metadata
      const newNodes = [];
      
      // Root node
      newNodes.push({
        id: '1',
        type: 'custom',
        data: { 
          label: rootText,
          description: "Core concept",
          importance: 5 // Highest importance
        },
        position: { x: 0, y: 0 }
      });
      
      // Child nodes with extracted concepts and relationships
      const childLines = lines.slice(1);
      const childNodes = childLines.map((line, index) => {
        // Extract description if line has a colon
        let label = line;
        let description = "";
        let importance = Math.floor(Math.random() * 3) + 1; // Random importance 1-3
        
        if (line.includes(":")) {
          const parts = line.split(":");
          label = parts[0].trim();
          description = parts[1].trim();
        }
        
        // Apply keyword analysis (simulated)
        if (label.toLowerCase().includes("key") || 
            label.toLowerCase().includes("main") || 
            label.toLowerCase().includes("important")) {
          importance = 4; // Higher importance for key concepts
        }
        
        return {
          id: `${index + 2}`,
          type: 'custom',
          data: { 
            label,
            description,
            importance
          },
          position: { x: 0, y: 0 }
        };
      });
      
      newNodes.push(...childNodes);
      
      // Create more interconnected relationships between nodes
      let newEdges = [];
      
      // Connect all nodes to root
      childNodes.forEach((node) => {
        newEdges.push({
          id: `e1-${node.id}`,
          source: '1',
          target: node.id,
          animated: true,
          style: { stroke: '#1d4ed8', strokeWidth: 2 }
        });
      });
      
      // Add some cross-connections between related concepts (simulated NLP)
      for (let i = 0; i < childNodes.length; i++) {
        for (let j = i + 1; j < childNodes.length; j++) {
          const nodeA = childNodes[i];
          const nodeB = childNodes[j];
          
          // Simulate semantic relationship detection
          if (nodeA.data.label.toLowerCase().includes("data") && 
              nodeB.data.label.toLowerCase().includes("data")) {
            newEdges.push({
              id: `e${nodeA.id}-${nodeB.id}`,
              source: nodeA.id,
              target: nodeB.id,
              animated: true,
              style: { 
                stroke: '#3b82f6', 
                strokeWidth: 1.5,
                strokeDasharray: '3,3'
              }
            });
          }
          
          // Random connections with low probability
          if (Math.random() < 0.2) {
            newEdges.push({
              id: `e${nodeA.id}-${nodeB.id}`,
              source: nodeA.id,
              target: nodeB.id,
              animated: Math.random() > 0.5,
              style: { 
                stroke: '#3b82f6', 
                strokeWidth: 1.5,
                strokeDasharray: '3,3'
              }
            });
          }
        }
      }
      
      setNodes(newNodes);
      setEdges(newEdges);
      setShowTutorial(false);
      
      // Show winner badge after successful complex map generation
      if (newNodes.length > 5) {
        setTimeout(() => setShowWinBadge(true), 1000);
        setTimeout(() => setShowWinBadge(false), 7000);
      }
    } catch (error) {
      console.error("Error generating mind map:", error);
    } finally {
      setIsLoading(false);
      setProcessingStep(0);
      stopProgressSimulation();
      setProcessingProgress(0);
    }
  };

  // Enhanced document processing
  const uploadPDF = async () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    setProcessingStep(1);
    startProgressSimulation();
    
    try {
      // Simulate multi-stage processing for realistic feedback
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStep(2);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setProcessingStep(3);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProcessingStep(4);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Enhanced simulated extraction with document structure analysis
      const simulatedText = `${fileName.replace(".pdf", "")} - Concept Map\n` +
        `Core Theme: The primary focus of this document\n` +
        `Key Finding: Critical discovery with significant implications\n` +
        `Methodology: Approach used for analysis and investigation\n` +
        `Data Sources: Information repositories and collection methods\n` +
        `Analysis Framework: Theoretical model applied to interpretation\n` +
        `Results: Outcomes and measurements from the investigation\n` +
        `Implications: Broader impact and significance of findings\n` +
        `Future Directions: Potential next steps and research opportunities`;
      
      setInputText(simulatedText);
      setShowTutorial(false);
      setMapComplexity("hierarchical");
    } catch (error) {
      console.error("Error processing document:", error);
    } finally {
      setIsLoading(false);
      setProcessingStep(0);
      stopProgressSimulation();
      setProcessingProgress(0);
    }
  };

  // File selection handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };
  
  // AI processing status messages
  const getProcessingStatus = () => {
    switch(processingStep) {
      case 1: return "Performing semantic analysis...";
      case 2: return "Extracting conceptual relationships...";
      case 3: return "Building neural network topology...";
      case 4: return "Finalizing cognitive map...";
      default: return "Processing...";
    }
  };
  
  // Progress simulation for loading bars
  const startProgressSimulation = () => {
    setProcessingProgress(0);
    progressInterval.current = setInterval(() => {
      setProcessingProgress(prev => {
        const increment = Math.random() * 15;
        const newValue = prev + increment;
        return newValue >= 100 ? 99 : newValue;
      });
    }, 300);
  };
  
  const stopProgressSimulation = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      setProcessingProgress(100);
    }
  };

  // Enhanced sample maps for quick demo
  const loadSampleMap = (sample) => {
    let sampleText = "";
    
    if (sample === 'ai') {
      setMapComplexity("radial");
      sampleText = "Artificial Intelligence Landscape\n" +
        "Machine Learning: Algorithms that improve with experience\n" +
        "Neural Networks: Computing systems inspired by brains\n" +
        "Natural Language Processing: Human-computer text interaction\n" +
        "Computer Vision: Systems that extract meaning from images\n" +
        "Reinforcement Learning: Training through reward systems\n" +
        "Generative AI: Creating new content from existing data\n" +
        "AI Ethics: Responsible development frameworks\n" +
        "Explainable AI: Making AI decisions understandable";
    } else if (sample === 'quantum') {
      setMapComplexity("hierarchical");
      sampleText = "Quantum Computing Fundamentals\n" +
        "Qubits: Quantum bits that can exist in superposition\n" +
        "Quantum Gates: Operations on quantum states\n" +
        "Quantum Entanglement: Correlated quantum states\n" +
        "Quantum Algorithms: Shor's and Grover's algorithms\n" +
        "Quantum Error Correction: Protecting quantum information\n" +
        "Quantum Hardware: Physical implementations of quantum computers\n" +
        "Quantum Supremacy: Demonstrating quantum advantage\n" +
        "Quantum Applications: Cryptography, simulation, optimization";
    } else if (sample === 'web3') {
      setMapComplexity("simple");
      sampleText = "Web3 Technology Stack\n" +
        "Blockchain: Distributed ledger technology\n" +
        "Smart Contracts: Self-executing code on blockchain\n" +
        "Cryptocurrencies: Digital assets and tokens\n" +
        "DeFi: Decentralized financial applications\n" +
        "NFTs: Non-fungible tokens for digital ownership\n" +
        "DAOs: Decentralized autonomous organizations\n" +
        "dApps: Decentralized applications\n" +
        "Web3 Infrastructure: Layer 1 and Layer 2 solutions";
    }
    
    setInputText(sampleText);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-midnight-950 to-indigo-950 text-blue-100">
      {/* Neural network particle system */}
      <ParticleSystem />
      
      <div className="container mx-auto p-6 relative z-10">
        <motion.header 
          className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.h1 
              variants={itemVariants}
              className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent inline-block"
            >
              <span className="flex items-center">
                <Brain className="mr-2 text-blue-400" />
                Neural Mapper
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-blue-300 mt-2"
            >
              Advanced cognitive visualization engine
            </motion.p>
          </div>
          
          <motion.div
            variants={itemVariants}
            className="mt-4 md:mt-0 flex space-x-2"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-300 border border-blue-500/30"
            >
              <span className="flex items-center">
                <GitBranch className="w-3 h-3 mr-1" />
                v2.5
              </span>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-3 py-1 rounded-md bg-blue-900/50 border border-blue-700/50 text-blue-300 text-sm"
              onClick={() => {}}
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-3 py-1 rounded-md bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-sm"
              onClick={() => {}}
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </motion.button>
          </motion.div>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Panel: Enhanced Input Controls */}
          <motion.div 
            className="md:col-span-1 space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-blue-950/40 backdrop-blur-md rounded-xl p-4 shadow-lg border border-blue-800/50"
            >
              <h2 className="text-xl font-semibold mb-3 text-blue-400 flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Neural Input
              </h2>
              
              {/* Quick Templates */}
              <div className="mb-3 flex flex-wrap gap-2">
                <button 
                  onClick={() => loadSampleMap('ai')}
                  className="text-xs py-1 px-2 rounded bg-blue-900/50 text-blue-300 hover:bg-blue-800/50 transition-colors"
                >
                  AI Template
                </button>
                <button 
                  onClick={() => loadSampleMap('quantum')}
                  className="text-xs py-1 px-2 rounded bg-indigo-900/50 text-indigo-300 hover:bg-indigo-800/50 transition-colors"
                >
                  Quantum Computing
                </button>
                <button 
                  onClick={() => loadSampleMap('web3')}
                  className="text-xs py-1 px-2 rounded bg-violet-900/50 text-violet-300 hover:bg-violet-800/50 transition-colors"
                >
                  Web3
                </button>
              </div>
              
              {/* Layout Selector */}
              <div className="mb-3">
                <label className="block text-xs text-blue-400 mb-1">Neural Layout</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setMapComplexity('simple')}
                    className={`text-xs py-1 px-2 rounded transition-colors ${
                      mapComplexity === 'simple' 
                        ? 'bg-blue-700/50 text-blue-200' 
                        : 'bg-blue-950/50 text-blue-400 hover:bg-blue-900/50'
                    }`}
                  >
                    Spiral
                  </button>
                  <button 
                    onClick={() => setMapComplexity('radial')}
                    className={`text-xs py-1 px-2 rounded transition-colors ${
                      mapComplexity === 'radial' 
                        ? 'bg-blue-700/50 text-blue-200' 
                        : 'bg-blue-950/50 text-blue-400 hover:bg-blue-900/50'
                    }`}
                  >
                    Radial
                  </button>
                  <button 
                    onClick={() => setMapComplexity('hierarchical')}
                    className={`text-xs py-1 px-2 rounded transition-colors ${
                      mapComplexity === 'hierarchical' 
                        ? 'bg-blue-700/50 text-blue-200' 
                        : 'bg-blue-950/50 text-blue-400 hover:bg-blue-900/50'
                    }`}
                  >
                    Hierarchical
                  </button>
                </div>
              </div>
              
              {/* Text Input with Enhanced Styling */}
              <div className="mb-4 relative">
                <label className="block text-sm text-blue-400 mb-1">Map Content</label>
                <div className="relative">
                  <textarea
                    placeholder="Enter main concept on first line&#10;Subtopic 1: With optional description&#10;Subtopic 2: Another key idea&#10;..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full h-40 bg-blue-950/30 border border-blue-700/50 rounded-lg p-3 text-blue-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-blue-700"
                  />
                  <div className="absolute inset-0 rounded-lg pointer-events-none bg-blue-500/5 opacity-0 peer-focus:opacity-100 transition-opacity" />
                </div>
                
                {/* Generate Button with Processing Visualization */}
                <div className="mt-2 relative">
                  <motion.button 
                    whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(29, 78, 216, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generateMindMap} 
                    disabled={isLoading || !inputText.trim()}
                    className={`w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center ${
                      !inputText.trim() ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader className="animate-spin mr-2 h-4 w-4" />
                        {getProcessingStatus()}
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Neural Map
                      </>
                    )}
                  </motion.button>
                  
                  {/* Progress bar */}
                  {isLoading && (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${processingProgress}%` }}
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-b-lg"
                    />
                  )}
                </div>
              </div>
              
              {/* Document Upload with Enhanced Visual Feedback */}
              <div>
                <label className="block text-sm text-blue-400 mb-1">Document Analysis</label>
                <div className="border border-dashed border-blue-700/50 rounded-lg p-3 bg-blue-950/30 hover:bg-blue-900/20 transition duration-200 group">
                  <input 
                    type="file" 
                    accept=".pdf,.docx,.txt" 
                    onChange={handleFileChange}
                    className="hidden" 
                    id="pdf-upload"
                  />
                  <label 
                    htmlFor="pdf-upload"
                    className="cursor-pointer block text-center py-3 group-hover:text-blue-300 transition-colors"
                  >
                    {fileName ? (
                      <div className="flex items-center justify-center">
                        <FileText className="mr-2 h-5 w-5 text-blue-400" />
                        <span className="text-blue-300">{fileName}</span>
                      </div>
                    ) : (
                      <motion.div 
                        className="flex flex-col items-center"
                        initial={{ y: 0 }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FileText className="h-10 w-10 text-blue-700 mb-2 group-hover:text-blue-500 transition-colors" />
                        <span className="text-blue-600">Upload document for analysis</span>
                      </motion.div>
                    )}
                  </label>
                </div>
                
                <div className="mt-2 relative">
                  <motion.button 
                    whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(29, 78, 216, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={uploadPDF} 
                    disabled={isLoading || !selectedFile}
                    className={`w-full py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center ${
                      !selectedFile 
                        ? 'bg-blue-900/30 text-blue-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-indigo-700 to-blue-700 hover:from-indigo-600 hover:to-blue-600 text-white'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader className="animate-spin mr-2 h-4 w-4" />
                        {getProcessingStatus()}
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Extract & Analyze
                      </>
                    )}
                  </motion.button>
                  
                  {/* Progress bar */}
                  {isLoading && (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${processingProgress}%` }}
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-b-lg"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Panel: Neural Network Visualization */}
          <motion.div 
            className="md:col-span-2 h-[600px] relative rounded-xl overflow-hidden border border-blue-800/50 bg-blue-950/40 backdrop-blur-md"
            variants={itemVariants}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              connectionLineStyle={connectionLineStyle}
              fitView
            >
              <Background variant="dots" gap={24} size={1} color="#1e40af" />
              <Controls className="bg-blue-900/50 rounded-lg overflow-hidden" />
              <MiniMap 
                nodeColor={(n) => n.data.importance ? 
                  `rgba(29, 78, 216, ${0.2 + (n.data.importance * 0.15)})` : '#1e3a8a'}
                maskColor="rgba(12, 22, 45, 0.5)"
              />
              <Panel position="top-right" className="flex gap-2 bg-transparent">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 text-xs bg-blue-900/50 text-blue-300 rounded-lg border border-blue-700/30"
                  onClick={() => setNodes(nodes => nodes.map(node => ({
                    ...node,
                    position: {
                      x: node.position.x + Math.random() * 40 - 20,
                      y: node.position.y + Math.random() * 40 - 20
                    }
                  })))}
                >
                  🧠 Energize Nodes
                </motion.button>
              </Panel>
            </ReactFlow>

            <AnimatePresence>
              {showTutorial && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                >
                  <div className="bg-gradient-to-br from-blue-950 to-indigo-950 p-6 rounded-xl border border-blue-700/50 backdrop-blur-lg">
                    <div className="inline-block mb-4 p-3 rounded-full bg-blue-900/30 border border-blue-700/50">
                      <Info className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Cognitive Canvas Ready</h3>
                    <p className="text-blue-300 max-w-xs text-sm mb-4">
                      Enter concepts or upload a document to begin neural mapping. 
                      Connect ideas naturally and watch relationships emerge.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="text-sm bg-blue-800/50 px-4 py-2 rounded-lg border border-blue-700/30"
                      onClick={() => setShowTutorial(false)}
                    >
                      Start Mapping →
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {showWinBadge && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-4 right-4 bg-gradient-to-br from-green-600 to-emerald-500 px-4 py-2 rounded-full flex items-center shadow-lg"
                >
                  <Award className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Neural Complexity Achieved!</span>
                  <div className="ml-2 animate-pulse">🏆</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default MindMap;