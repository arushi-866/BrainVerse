import React, { useState, useEffect, useRef } from "react";
import { uploadPDF, extractYTTranscript, summarizeText } from "../api";
import { ChevronRight, FileText, Youtube, Copy, Download, FileDown, RefreshCw, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";

const Summarizer = () => {
  const [file, setFile] = useState(null);
  const [videoId, setVideoId] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("pdf");
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const fileInputRef = useRef(null);
  const summaryRef = useRef(null);

  // Particle animation effect
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    if (showConfetti) {
      const newParticles = Array.from({ length: 50 }, () => ({
        x: Math.random() * window.innerWidth,
        y: -20,
        size: Math.random() * 8 + 2,
        color: `hsl(${Math.random() * 60 + 210}, 100%, ${Math.random() * 30 + 60}%)`,
        speed: Math.random() * 3 + 1,
      }));
      setParticles(newParticles);
      
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;
    
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          y: p.y + p.speed,
          x: p.x + (Math.random() - 0.5),
        })).filter(p => p.y < window.innerHeight)
      );
    }, 16);
    
    return () => clearInterval(interval);
  }, [particles]);

  // Simulate progress during loading
  useEffect(() => {
    let interval;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + Math.random() * 5;
        });
      }, 300);
    } else if (progress > 0) {
      setProgress(100);
      // If we were loading and now we're not, and we have a summary, show success animation
      if (summary) {
        setShowConfetti(true);
      }
    }
    return () => clearInterval(interval);
  }, [loading, summary]);

  // Handle PDF Upload
  const handlePDFUpload = async () => {
    if (!file) return alert("Please select a PDF file.");
    setLoading(true);
    try {
      const text = await uploadPDF(file);
      const summary = await summarizeText(text);
      setSummary(summary);
    } catch (error) {
      console.error("Error processing PDF:", error);
      alert("Failed to process PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle YouTube Video Summarization
  const handleYTSummarization = async () => {
    if (!videoId) return alert("Please enter a YouTube Video ID.");
    setLoading(true);
    try {
      const text = await extractYTTranscript(videoId);
      const summary = await summarizeText(text);
      setSummary(summary);
    } catch (error) {
      console.error("Error processing YouTube video:", error);
      alert("Failed to process YouTube video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Copy summary to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download summary as text file
  const downloadSummaryAsText = () => {
    const element = document.createElement("a");
    const file = new Blob([summary], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "summary.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Download summary as PDF
  const downloadSummaryAsPDF = () => {
    const doc = new jsPDF();
    const title = activeTab === "pdf" ? "PDF Summary" : "YouTube Video Summary";
    
    // Add title
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 102);
    doc.text(title, 20, 20);
    
    // Add source info
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    let sourceInfo = "";
    if (activeTab === "pdf" && file) {
      sourceInfo = `Source: ${file.name}`;
    } else if (activeTab === "youtube" && videoId) {
      sourceInfo = `Source: YouTube Video ID - ${videoId}`;
    }
    doc.text(sourceInfo, 20, 30);
    
    // Add date
    const date = new Date().toLocaleDateString();
    doc.text(`Generated on: ${date}`, 20, 35);
    
    // Add summary content with word wrapping
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const splitText = doc.splitTextToSize(summary, 170);
    doc.text(splitText, 20, 45);
    
    doc.save("content-summary.pdf");
  };

  // Reset form
  const handleReset = () => {
    setFile(null);
    setVideoId("");
    setSummary("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        alert("Please drop a PDF file.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 text-blue-100 p-6 flex flex-col items-center">
      {/* Floating particles for confetti effect */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="fixed rounded-full pointer-events-none z-50"
          animate={{ y: window.innerHeight + 20 }}
          transition={{ duration: 3 }}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
        />
      ))}
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-blue-950/30 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-blue-800/30 hover:border-blue-700/50 transition-all duration-500"
      >
        <div className="p-8">
          <motion.h2 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-3xl font-bold text-center mb-8 tracking-wide flex justify-center items-center space-x-2"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-400">
              Content Synthesizer
            </span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-cyan-400 ml-2" size={24} />
            </motion.div>
          </motion.h2>

          {/* Tabs */}
          <div className="flex mb-8 bg-blue-900/40 rounded-lg p-1 shadow-inner">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab("pdf")}
              className={`flex items-center justify-center w-1/2 py-3 px-4 rounded-md transition-all duration-300 ${
                activeTab === "pdf"
                  ? "bg-gradient-to-r from-blue-800 to-indigo-800 text-white shadow-lg"
                  : "text-blue-300 hover:bg-blue-800/30"
              }`}
            >
              <FileText size={18} className="mr-2" />
              PDF Summarization
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab("youtube")}
              className={`flex items-center justify-center w-1/2 py-3 px-4 rounded-md transition-all duration-300 ${
                activeTab === "youtube"
                  ? "bg-gradient-to-r from-blue-800 to-indigo-800 text-white shadow-lg"
                  : "text-blue-300 hover:bg-blue-800/30"
              }`}
            >
              <Youtube size={18} className="mr-2" />
              YouTube Summarization
            </motion.button>
          </div>

          {/* PDF Upload Tab */}
          <AnimatePresence mode="wait">
            {activeTab === "pdf" && (
              <motion.div
                key="pdf-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <label className="block text-blue-300 mb-2 text-sm font-medium">Upload PDF Document</label>
                  <div
                    className={`w-full flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${
                      file 
                      ? "border-cyan-600 bg-blue-900/20" 
                      : "border-blue-700 hover:border-blue-500 hover:bg-blue-900/20"
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FileText size={36} className={file ? "text-cyan-400" : "text-blue-400"} />
                      <span className={`mt-3 ${file ? "text-cyan-300" : "text-blue-300"}`}>
                        {file ? file.name : "Click or drag to upload PDF"}
                      </span>
                      {file && (
                        <span className="text-xs text-blue-400 mt-2">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      )}
                    </motion.div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePDFUpload}
                    disabled={loading || !file}
                    className="flex-1 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <RefreshCw size={16} className="mr-2 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Summarize PDF <ChevronRight size={18} className="ml-2" />
                      </span>
                    )}
                  </motion.button>
                  
                  {file && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleReset}
                      disabled={loading}
                      className="p-3 bg-blue-950 border border-blue-800 text-blue-300 rounded-lg hover:bg-blue-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCw size={20} />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}

            {/* YouTube Tab */}
            {activeTab === "youtube" && (
              <motion.div
                key="youtube-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <label className="block text-blue-300 mb-2 text-sm font-medium">YouTube Video ID</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Youtube size={16} className="text-blue-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. dQw4w9WgXcQ"
                      value={videoId}
                      onChange={(e) => setVideoId(e.target.value)}
                      className="w-full pl-10 p-3 bg-blue-950/50 border border-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-blue-100 placeholder-blue-500 shadow-inner"
                    />
                  </div>
                  <p className="text-xs text-blue-400 mt-2">
                    Extract from URL: youtube.com/watch?v=<span className="text-cyan-400">dQw4w9WgXcQ</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleYTSummarization}
                    disabled={loading || !videoId}
                    className="flex-1 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <RefreshCw size={16} className="mr-2 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Summarize Video <ChevronRight size={18} className="ml-2" />
                      </span>
                    )}
                  </motion.button>
                  
                  {videoId && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleReset}
                      disabled={loading}
                      className="p-3 bg-blue-950 border border-blue-800 text-blue-300 rounded-lg hover:bg-blue-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCw size={20} />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar */}
          <AnimatePresence>
            {loading && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <div className="h-2 w-full bg-blue-900/50 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500"
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-blue-400 text-sm flex items-center">
                    <Sparkles size={12} className="mr-1 text-cyan-500" />
                    Analyzing content...
                  </p>
                  <p className="text-blue-400 text-sm">{Math.round(progress)}%</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Summary Section */}
          <AnimatePresence>
            {summary && (
              <motion.div 
                ref={summaryRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 bg-blue-950/50 border border-blue-800 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-4 py-3 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-blue-100">Summary</h3>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={copyToClipboard}
                      className="p-2 bg-blue-800/50 rounded-md hover:bg-blue-700 transition-colors duration-300 group flex items-center"
                      title="Copy to clipboard"
                    >
                      <Copy size={16} className="text-blue-300 group-hover:text-blue-100" />
                      <AnimatePresence>
                        {copied && (
                          <motion.span 
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 5 }}
                            className="ml-2 text-xs text-cyan-300"
                          >
                            Copied!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={downloadSummaryAsText}
                      className="p-2 bg-blue-800/50 rounded-md hover:bg-blue-700 transition-colors duration-300 group flex items-center"
                      title="Download as text"
                    >
                      <Download size={16} className="text-blue-300 group-hover:text-blue-100" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={downloadSummaryAsPDF}
                      className="p-2 bg-blue-800/50 rounded-md hover:bg-blue-700 transition-colors duration-300 group flex items-center"
                      title="Download as PDF"
                    >
                      <FileDown size={16} className="text-blue-300 group-hover:text-blue-100" />
                    </motion.button>
                  </div>
                </div>
                <div className="p-4 whitespace-pre-wrap bg-gradient-to-b from-blue-950/50 to-indigo-950/50 text-blue-200">
                  {summary}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-blue-400 text-center text-sm"
      >
        © {new Date().getFullYear()} Content Synthesizer | Powered by AI
      </motion.p>
    </div>
  );
};

export default Summarizer;