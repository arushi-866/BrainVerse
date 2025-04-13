import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  MarkerType
} from "reactflow";
import "reactflow/dist/style.css";
import { Loader, Zap, FileText, Brain, Download, Share2, GitBranch, Info, Award, Sparkles, Camera, Check, Save } from "lucide-react";
import axios from "axios";
import { toPng } from 'html-to-image';
import { Handle, Position } from 'reactflow';


// API config
const API_URL = "http://localhost:3001";

// Particle System matching Homepage
const ParticleSystem = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(120)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-400/20"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 40],
            y: [0, (Math.random() - 0.5) * 40],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

// Updated connection line with curved paths that avoid overlapping
const ConnectionLine = ({ fromX, fromY, toX, toY }) => {
  return (
    <g>
      <path
        stroke="#ef4444" // Matching arrow color
        strokeWidth={2}
        d={`M${fromX},${fromY} L${toX},${toY}`} // Straight line
      />
      <path // Arrowhead
        d={`M${toX - 10},${toY - 5} L${toX},${toY} L${toX - 10},${toY + 5}`}
        fill="#ef4444"
      />
    </g>
  );
};



const CustomNode = ({ data }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, type: "spring", damping: 8 }
    }).catch(console.error);

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        controls.start({
          boxShadow: [
            "0 0 0px rgba(29, 78, 216, 0)",
            "0 0 15px rgba(29, 78, 216, 0.6)",
            "0 0 0px rgba(29, 78, 216, 0)"
          ],
          transition: { duration: 1.5 }
        }).catch(console.error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <motion.div
      className="px-4 py-3 rounded-lg shadow-lg bg-gradient-to-br from-blue-950 to-indigo-950 border border-blue-700 backdrop-blur-sm w-60 h-40 flex flex-col justify-center"
      initial={{ scale: 1, opacity: 0.9 }}
      animate={controls}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 20px rgba(29, 78, 216, 0.8)",
        zIndex: 10,
        transition: { type: "spring", damping: 15, stiffness: 200 }
      }}
    >
      {/* 👇 Add this at the top of your return */}
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        style={{ background: '#60a5fa', borderRadius: '50%' }}
      />
      {/* 👇 Add this at the bottom of your return */}
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        style={{ background: '#3b82f6', borderRadius: '50%' }}
      />

      <div className="font-medium text-blue-100 text-center">{data.label}</div>
      {data.description && (
        <motion.div
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-xs text-blue-300 mt-2 text-center overflow-y-auto max-h-24"
        >
          {data.description}
        </motion.div>
      )}
      {data.importance > 0 && (
        <div className="flex mt-2 justify-center">
          {[...Array(data.importance)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.7, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.2 }}
              className="w-2 h-2 rounded-full bg-blue-400 mr-1"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};



// Advanced neural connections with arrows
const connectionLineStyle = {
  stroke: '#1d4ed8',
  strokeWidth: 2,
  strokeDasharray: '5,5'
};

const edgeOptions = {
  animated: true,
  type: 'smoothstep', // Better for arrows than 'default'
  style: {
    stroke: '#3b82f6', // Solid color instead of gradient
    strokeWidth: 2,
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#ef4444', // Higher contrast red
    width: 20,        // Larger arrowhead
    height: 20
  }
}

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
  const [showWinBadge, setShowWinBadge] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadStatus, setDownloadStatus] = useState("");
  const progressInterval = useRef(null);
  const reactFlowWrapper = useRef(null);
  const fullscreenRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.id;

  const [inputTitle, setInputTitle] = useState("");
  const [inputNodes, setInputNodes] = useState(0);

  const saveMindMapToDB = async () => {
    if (!userId || nodes.length === 0) {
      alert("Missing user ID or empty mind map");
      return;
    }

    try {
      const mindMap = {
        id: Date.now(),
        title: inputText.slice(0, 50) || "Untitled Mind Map",
        date: new Date().toISOString().split("T")[0],
        nodes: nodes.length
      };

      await axios.post(`${API_URL}/api/mindmap/add-mindmap`, {
        userId,
        mindMap
      });

      alert("Mind map saved to your dashboard!");
    } catch (error) {
      console.error("Error saving mind map:", error);
      alert("Failed to save mind map to database");
    }
  };



  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      fullscreenRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };



  // IMPROVED: High-quality hierarchical layout algorithm that prevents node overlap
  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      // Create maps for quick lookups
      const nodeMap = new Map(nodes.map(node => [node.id, { ...node }]));
      const childrenMap = new Map();
      const parentMap = new Map();

      // Initialize children map for each node
      nodes.forEach(node => childrenMap.set(node.id, []));

      // Populate children and parent maps based on edges
      edges.forEach(edge => {
        const sourceId = edge.source;
        const targetId = edge.target;

        if (childrenMap.has(sourceId)) {
          childrenMap.get(sourceId).push(targetId);
        }
        parentMap.set(targetId, sourceId);
      });

      // Identify root nodes (nodes with no incoming edges)
      const nodeIds = new Set(nodes.map(node => node.id));
      const targetIds = new Set(edges.map(edge => edge.target));
      const rootIds = [...nodeIds].filter(id => !targetIds.has(id));

      // Use the first root, or first node if no clear root
      const rootId = rootIds.length > 0 ? rootIds[0] : nodes[0].id;

      // Calculate the tree structure with proper levels and node counts
      const nodeLevels = new Map();
      const levelNodes = new Map();
      const treeStructure = new Map();

      // First pass: Calculate levels for each node using BFS
      const assignLevels = (startNodeId) => {
        const queue = [];
        const visited = new Set();

        // Start with the root node at level 0
        queue.push({ id: startNodeId, level: 0 });
        visited.add(startNodeId);
        nodeLevels.set(startNodeId, 0);

        // Process nodes in breadth-first order
        while (queue.length > 0) {
          const { id, level } = queue.shift();

          // Make sure this level exists in our map
          if (!levelNodes.has(level)) {
            levelNodes.set(level, []);
          }

          // Add the node to its level collection
          levelNodes.get(level).push(id);

          // Process all children
          const children = childrenMap.get(id) || [];
          children.forEach(childId => {
            if (!visited.has(childId)) {
              visited.add(childId);
              nodeLevels.set(childId, level + 1);
              queue.push({ id: childId, level: level + 1 });

              // Build tree structure
              if (!treeStructure.has(id)) {
                treeStructure.set(id, []);
              }
              treeStructure.get(id).push(childId);
            }
          });
        }

        // Process any disconnected nodes
        nodes.forEach(node => {
          if (!visited.has(node.id)) {
            const level = 0; // Default level for disconnected nodes

            if (!levelNodes.has(level)) {
              levelNodes.set(level, []);
            }
            levelNodes.get(level).push(node.id);
            nodeLevels.set(node.id, level);
          }
        });
      };

      // Run the level assignment algorithm
      assignLevels(rootId);

      // Get the maximum level depth
      const maxLevel = Math.max(...Array.from(nodeLevels.values()));

      // Calculate positions for each node based on its level
      const updatedNodes = [...nodes];

      // Constants for layout calculations
      const NODE_WIDTH = 240;
      const NODE_HEIGHT = 160;
      const LEVEL_VERTICAL_SPACING = 220;
      const HORIZONTAL_PADDING = 100;
      const NODE_HORIZONTAL_SPACING = 60;
      const SUBTREE_SPACING = 120; // Extra space between different subtrees

      // Calculate the required width for each level
      const levelWidths = new Map();
      const nodePositions = new Map();

      // Second pass: Calculate required width for each level bottom-up
      const calculateLevelWidths = (nodeId) => {
        const children = treeStructure.get(nodeId) || [];
        let width = 0;

        if (children.length === 0) {
          width = NODE_WIDTH;
        } else {
          // Calculate width as sum of children widths plus spacing
          let childrenWidth = 0;
          children.forEach(childId => {
            calculateLevelWidths(childId);
            childrenWidth += levelWidths.get(childId);
          });

          width = Math.max(
            NODE_WIDTH,
            childrenWidth + (children.length - 1) * NODE_HORIZONTAL_SPACING
          );
        }

        levelWidths.set(nodeId, width);
        return width;
      };

      // Calculate widths starting from root
      calculateLevelWidths(rootId);

      // Third pass: Position nodes top-down
      const positionNodes = (nodeId, x, y, availableWidth) => {
        const nodeWidth = levelWidths.get(nodeId);
        const children = treeStructure.get(nodeId) || [];

        // Position the current node
        const nodeIndex = updatedNodes.findIndex(n => n.id === nodeId);
        if (nodeIndex !== -1) {
          updatedNodes[nodeIndex] = {
            ...updatedNodes[nodeIndex],
            position: { x, y }
          };
          nodePositions.set(nodeId, { x, y });
        }

        if (children.length > 0) {
          // Calculate total width needed for children
          let totalChildrenWidth = 0;
          children.forEach(childId => {
            totalChildrenWidth += levelWidths.get(childId);
          });

          // Add spacing between children
          totalChildrenWidth += (children.length - 1) * NODE_HORIZONTAL_SPACING;

          // Calculate starting x position to center children under parent
          let childX = x + (nodeWidth - totalChildrenWidth) / 2;
          const childY = y + LEVEL_VERTICAL_SPACING;

          // Position each child
          children.forEach(childId => {
            const childWidth = levelWidths.get(childId);
            positionNodes(childId, childX, childY, childWidth);
            childX += childWidth + NODE_HORIZONTAL_SPACING;
          });
        }
      };

      // Start positioning from root
      const rootWidth = levelWidths.get(rootId);
      const centerX = (window.innerWidth - rootWidth) / 2;
      positionNodes(
        rootId,
        Math.max(centerX, HORIZONTAL_PADDING),
        80,
        rootWidth
      );

      // Position any disconnected nodes (not part of main tree)
      const positionedIds = new Set(nodePositions.keys());
      nodes.forEach(node => {
        if (!positionedIds.has(node.id)) {
          const nodeIndex = updatedNodes.findIndex(n => n.id === node.id);
          if (nodeIndex !== -1) {
            updatedNodes[nodeIndex] = {
              ...updatedNodes[nodeIndex],
              position: {
                x: Math.random() * (window.innerWidth - 300) + 100,
                y: Math.random() * 400 + 100
              }
            };
          }
        }
      });

      // Apply the final positions to all nodes
      setNodes(updatedNodes);
    }
  }, [nodes.length, edges.length, setNodes]);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({
      ...params,
      ...edgeOptions,
      // Ensure edges are spaced using updated type and curvature
      type: 'smoothstep',
      curvature: 0.4 + (Math.random() * 0.2), // Add slight randomness to curvature
      animated: true
    }, eds));
  }, [setEdges]);

  // Export mind map as image
  const exportToImage = () => {
    if (reactFlowWrapper.current === null) {
      setErrorMessage("Cannot export - flow container not found.");
      return;
    }

    setDownloadStatus("processing");

    // Find the actual ReactFlow element
    const flowElement = reactFlowWrapper.current.querySelector('.react-flow');

    if (!flowElement) {
      setErrorMessage("Cannot export - ReactFlow element not found.");
      setDownloadStatus("");
      return;
    }

    // Add export animation
    setTimeout(() => {
      toPng(flowElement, {
        backgroundColor: "#020b27", // Deep midnight blue
        quality: 1,
        pixelRatio: 2,
        style: {
          width: '100%',
          height: '100%'
        }
      })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'neural-mind-map.png';
          link.href = dataUrl;
          link.click();
          setDownloadStatus("success");

          // Reset success status after 2 seconds
          setTimeout(() => {
            setDownloadStatus("");
          }, 2000);
        })
        .catch((error) => {
          console.error('Error exporting mind map:', error);
          setErrorMessage("Failed to export image. Please try again.");
          setDownloadStatus("");
        });
    }, 500); // Small delay for better UX
  };

  // Advanced mind map generation with Gemini API
  const generateMindMap = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setProcessingStep(1);
    startProgressSimulation();
    setErrorMessage("");

    try {
      // Call our backend API which uses Gemini
      const response = await axios.post(`${API_URL}/api/generate-mind-map`, {
        text: inputText
      });

      // Increment processing steps with delays for user experience
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStep(2);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProcessingStep(3);
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStep(4);

      // Get the response data
      const { nodes: generatedNodes, edges: generatedEdges } = response.data;

      // Enhance edges with arrows
      const enhancedEdges = generatedEdges.map(edge => {
        const sourceNode = generatedNodes.find(n => n.id === edge.source);
        const targetNode = generatedNodes.find(n => n.id === edge.target);

        let sourceHandle = 'source';
        let targetHandle = 'target';

        if (sourceNode && targetNode) {
          const dx = targetNode.position.x - sourceNode.position.x;
          const dy = targetNode.position.y - sourceNode.position.y;

          // Horizontal logic
          if (Math.abs(dx) > Math.abs(dy)) {
            sourceHandle = dx > 0 ? 'right' : 'left';
            targetHandle = dx > 0 ? 'left' : 'right';
          } else {
            sourceHandle = dy > 0 ? 'bottom' : 'top';
            targetHandle = dy > 0 ? 'top' : 'bottom';
          }
        }

        return {
          ...edge,
          ...edgeOptions,
          id: `e${edge.source}-${edge.target}`,
          sourceHandle,
          targetHandle,
        };
      });


      setNodes(generatedNodes);
      setEdges(enhancedEdges);
      setShowTutorial(false);

      // Show winner badge after successful complex map generation
      if (generatedNodes.length > 5) {
        setTimeout(() => setShowWinBadge(true), 1000);
        setTimeout(() => setShowWinBadge(false), 7000);
      }
    } catch (error) {
      console.error("Error generating mind map:", error);
      setErrorMessage("Failed to generate mind map. Please try again.");
    } finally {
      setIsLoading(false);
      setProcessingStep(0);
      stopProgressSimulation();
      setProcessingProgress(0);
    }
  };

  // Document processing with Gemini
  // Updated document processing function
  const uploadPDF = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setProcessingStep(1);
    startProgressSimulation();
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(`${API_URL}/api/process-document`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Increment processing steps with delays for user experience
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStep(2);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setProcessingStep(3);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProcessingStep(4);

      // Get the response data
      const { text: extractedText, mindMap } = response.data;

      // In both generateMindMap and uploadPDF handlers:
      const enhancedEdges = generatedEdges.map(edge => ({
        ...edge,
        ...edgeOptions, // Must spread this FIRST
        id: `e${edge.source}-${edge.target}`,
        type: 'smoothstep' // Override any other type
      }));

      setInputText(extractedText);
      setNodes(mindMap.nodes);
      setEdges(enhancedEdges);
      setShowTutorial(false);
    } catch (error) {
      console.error("Error processing document:", error);

      // Enhanced error handling
      let errorMsg = "Failed to process document";
      if (error.response) {
        errorMsg = error.response.data.error || errorMsg;
        if (error.response.data.details) {
          errorMsg += `: ${error.response.data.details}`;
        }
      } else if (error.message) {
        errorMsg = error.message;
      }

      setErrorMessage(errorMsg);
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

  // AI processing status messages - updated for Gemini
  const getProcessingStatus = () => {
    switch (processingStep) {
      case 1: return "Initializing Gemini AI...";
      case 2: return "Analyzing content relationships...";
      case 3: return "Extracting concept hierarchy...";
      case 4: return "Constructing neural map...";
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
                Gemini Neural Mapper
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-blue-300 mt-2"
            >
              Powered by Google Gemini 1.5 AI
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
                v4.0
              </span>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-3 py-1 rounded-md bg-blue-900/50 border border-blue-700/50 text-blue-300 text-sm"
              onClick={() => { }}
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-3 py-1 rounded-md bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-sm"
              onClick={exportToImage}
              disabled={nodes.length === 0 || downloadStatus === "processing"}
            >
              {downloadStatus === "processing" ? (
                <Loader className="w-4 h-4 mr-1 animate-spin" />
              ) : downloadStatus === "success" ? (
                <Check className="w-4 h-4 mr-1 text-green-300" />
              ) : (
                <Download className="w-4 h-4 mr-1" />
              )}
              {downloadStatus === "processing" ? "Exporting..." :
                downloadStatus === "success" ? "Downloaded" : "Export PNG"}
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
                Gemini Input
              </h2>



              {/* Enhanced Visualization Title */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-blue-400">
                  <span className="flex items-center">
                    <Brain className="h-4 w-4 mr-1" />
                    Advanced Hierarchical Visualization
                  </span>
                </label>
                <div className="mt-1 text-xs text-blue-300">
                  Optimized for complex data structures with automatic node positioning and image export
                </div>
              </div>

              {/* Text Input with Enhanced Styling */}
              <div className="mb-4 relative">
                <label className="block text-sm text-blue-400 mb-1">Map Content</label>
                <div className="relative">
                  <textarea
                    placeholder="Enter any text you want to analyze and visualize as a mind map. Gemini AI will extract the key concepts and relationships."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full h-40 bg-blue-950/30 border border-blue-700/50 rounded-lg p-3 text-blue-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-blue-700"
                  />
                  <div className="absolute inset-0 rounded-lg pointer-events-none bg-blue-500/5 opacity-0 peer-focus:opacity-100 transition-opacity" />
                </div>

                {/* Error message display */}
                {errorMessage && (
                  <div className="mt-2 text-red-400 text-sm">
                    {errorMessage}
                  </div>
                )}

                {/* Generate Button with Processing Visualization */}
                <div className="mt-2 relative">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(29, 78, 216, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generateMindMap}
                    disabled={isLoading || !inputText.trim()}
                    className={`w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center ${!inputText.trim() ? 'opacity-70 cursor-not-allowed' : ''
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
                        Generate with Gemini
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
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveMindMapToDB}
                  disabled={nodes.length === 0}
                  className="w-full mt-2 bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                  <Save className="mr-2 inline-block h-4 w-4" />
                  Save Mind Map
                </motion.button>

              </div>

              {/* Document Processor UI */}
              <motion.div
                variants={itemVariants}
                className="bg-blue-950/40 backdrop-blur-md rounded-xl p-4 shadow-lg border border-blue-800/50 mt-4"
              >
                <h2 className="text-lg font-semibold mb-3 text-blue-400 flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Document Processor
                </h2>

                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-blue-400">Upload document</label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                      disabled={isLoading}
                    />
                    <div className="border-2 border-dashed border-blue-700/40 rounded-lg p-4 text-center hover:border-blue-600 transition-colors">
                      {selectedFile ? (
                        <div className="text-blue-300">
                          <FileText className="h-6 w-6 mx-auto mb-2" />
                          {fileName}
                        </div>
                      ) : (
                        <div className="text-blue-500">
                          <FileText className="h-6 w-6 mx-auto mb-2" />
                          <span className="text-sm">Select PDF or document</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={uploadPDF}
                    disabled={!selectedFile || isLoading}
                    className={`bg-gradient-to-r from-blue-800 to-indigo-900 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mt-2 flex items-center justify-center ${!selectedFile ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader className="animate-spin mr-2 h-4 w-4" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-4 w-4" />
                        Process Document
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Information Panel */}
            <motion.div
              variants={itemVariants}
              className="bg-blue-950/40 backdrop-blur-md rounded-xl p-4 shadow-lg border border-blue-800/50"
            >
              <h2 className="text-lg font-semibold mb-2 text-blue-400 flex items-center">
                <Info className="mr-2 h-5 w-5" />
                How It Works
              </h2>
              <ul className="space-y-2 text-sm text-blue-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">1.</span>
                  <span>Enter text or upload a document to analyze</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">2.</span>
                  <span>Gemini AI extracts key concepts and relationships</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">3.</span>
                  <span>View, interact, and download your neural mind map</span>
                </li>
              </ul>
              <div className="mt-3 text-xs text-blue-400 flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />
                <span>Powered by advanced neural network visualization</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Mind Map Area */}
          <div className="md:col-span-2">
            <div
              ref={reactFlowWrapper}
              className="bg-blue-950/20 backdrop-blur-sm rounded-xl border border-blue-900/50 shadow-xl h-[650px] relative"
            >
              <div ref={fullscreenRef} className="w-full h-full">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleFullScreen}
                  className="absolute bottom-4 right-4 z-50 bg-blue-900/80 text-blue-200 px-3 py-2 rounded-lg shadow-md border border-blue-600 hover:bg-blue-800 transition"
                >
                  Fullscreen
                </motion.button>

                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  nodeTypes={nodeTypes}
                  connectionLineComponent={ConnectionLine}
                  connectionLineStyle={connectionLineStyle}
                  defaultEdgeOptions={edgeOptions}
                  fitView
                >
                  <defs>
                    <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>

                    <marker
                      id="react-flow__arrowclosed"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" />
                    </marker>
                  </defs>
                  <Controls className="bg-blue-950/40 border border-blue-800/50 rounded-lg p-1" />
                  <MiniMap
                    style={{
                      backgroundColor: 'rgba(10, 25, 80, 0.4)',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(29, 78, 216, 0.3)',
                      maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 80%, transparent 100%)'
                    }}
                    nodeColor={(n) => {
                      if (n.data?.importance > 3) return 'rgba(59, 130, 246, 0.8)';
                      if (n.data?.importance > 1) return 'rgba(99, 102, 241, 0.6)';
                      return 'rgba(29, 78, 216, 0.5)';
                    }}
                  />
                  <Background
                    variant="dots"
                    gap={20}
                    size={1}
                    color="rgba(59, 130, 246, 0.2)"
                  />

                  {/* Camera Button */}
                  <Panel position="top-right">
                    <motion.button
                      initial={{ scale: 0.9, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center justify-center bg-blue-900/50 hover:bg-blue-800/70 text-blue-300 p-2 rounded-lg backdrop-blur-sm transition-colors"
                      onClick={exportToImage}
                      disabled={nodes.length === 0 || downloadStatus === "processing"}
                    >
                      {downloadStatus === "processing" ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : downloadStatus === "success" ? (
                        <Check className="w-5 h-5 text-green-300" />
                      ) : (
                        <Camera className="w-5 h-5" />
                      )}
                    </motion.button>
                  </Panel>
                </ReactFlow>
              </div>

              {/* Tutorial Overlay */}
              {showTutorial && nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-950/50 backdrop-blur-sm">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="bg-blue-900/90 rounded-xl p-6 max-w-md text-center shadow-2xl border border-blue-600/50"
                  >
                    <Brain className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                    <h3 className="text-xl font-bold text-blue-200 mb-2">Neural Mind Mapper</h3>
                    <p className="text-blue-300 mb-4">
                      Enter text or upload a document in the left panel to generate a mind map powered by Gemini AI. Visualize concepts as an interactive neural network!
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-blue-800/50 rounded-lg p-3 border border-blue-700/50"
                      >
                        <Zap className="h-5 w-5 mx-auto mb-1 text-blue-400" />
                        <p className="text-sm text-blue-300">AI-powered concept extraction</p>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-blue-800/50 rounded-lg p-3 border border-blue-700/50"
                      >
                        <Download className="h-5 w-5 mx-auto mb-1 text-blue-400" />
                        <p className="text-sm text-blue-300">Export your mind maps</p>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer with enhanced styling */}
        <motion.footer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 text-center text-blue-400/80 text-sm"
        >
          <motion.div variants={itemVariants}>
            Gemini Neural Mapper © 2025 — Built for the AI Innovation Hackathon
          </motion.div>
        </motion.footer>
      </div>
    </div>
  );
}

export default MindMap;
