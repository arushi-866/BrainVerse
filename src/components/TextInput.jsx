import React, { useState } from "react";
import "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker";

const PdfSummarizer = () => {
  const [file, setFile] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const processFile = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    if (!apiKey.trim()) {
      alert("Please enter your OpenAI API key.");
      return;
    }

    setLoading(true);
    setSummary("Processing...");

    try {
      let text = "";
      if (file.name.endsWith(".pdf")) {
        text = await extractTextFromPDF(file);
      } else {
        throw new Error("Unsupported file format. Please upload a PDF.");
      }
      if (!text || text.length < 100) {
        throw new Error("Could not extract sufficient text from the document.");
      }
      const summarizedText = await summarizeText(text, apiKey);
      setSummary(summarizedText);
    } catch (error) {
      setSummary(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const extractTextFromPDF = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const typedArray = new Uint8Array(event.target.result);
          const pdf = await window.pdfjsLib.getDocument({ data: typedArray }).promise;
          let fullText = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            fullText += textContent.items.map((item) => item.str).join(" ") + "\n";
          }
          resolve(fullText);
        } catch (error) {
          reject(new Error("Failed to extract text from PDF: " + error.message));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read the file"));
      reader.readAsArrayBuffer(file);
    });
  };

  const summarizeText = async (text, apiKey) => {
    const maxChars = 15000;
    if (text.length > maxChars) {
      text = text.substring(0, maxChars);
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are an expert at summarizing documents into clear, structured notes.",
            },
            {
              role: "user",
              content: `Summarize the following document:\n\n${text}`,
            },
          ],
          max_tokens: 2000,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || response.statusText);
      }
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      throw new Error("Summarization failed: " + error.message);
    }
  };

  return (
    <div>
      <h1>PDF Summarizer</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter OpenAI API Key"
        value={apiKey}
        onChange={handleApiKeyChange}
      />
      <button onClick={processFile} disabled={loading}>
        {loading ? "Processing..." : "Process"}
      </button>
      <div>
        <h2>Summary</h2>
        <pre>{summary}</pre>
      </div>
    </div>
  );
};

export default PdfSummarizer;