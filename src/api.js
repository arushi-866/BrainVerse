import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

// 📌 Upload and extract PDF text
export const uploadPDF = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(`${API_BASE_URL}/extract_pdf`, formData);
    return response.data.text;
};

// 📌 Extract YouTube transcript
export const extractYTTranscript = async (videoId) => {
    const response = await axios.get(`${API_BASE_URL}/extract_yt?video_id=${videoId}`);
    return response.data.text;
};

// 📌 Summarize text
export const summarizeText = async (text) => {
    const response = await axios.post(`${API_BASE_URL}/summarize`, { text });
    return response.data.summary;
};
