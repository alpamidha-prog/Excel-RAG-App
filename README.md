# 📊 ExcelMind RAG: Premium Excel Intelligence

![Version](https://img.shields.io/badge/version-1.0.0-blueviolet)
![Python](https://img.shields.io/badge/python-3.9+-blue)
![Groq](https://img.shields.io/badge/LLM-Groq%20Llama%203.3-orange)
![FAISS](https://img.shields.io/badge/Vector%20DB-FAISS-green)

**ExcelMind RAG** is a high-performance Retrieval-Augmented Generation application designed to transform static spreadsheets into interactive knowledge bases. Using **Groq's** lightning-fast Llama 3.3 model and **FAISS** for efficient vector indexing, you can query complex Excel data in natural language with near-zero latency.

---

## ✨ Key Features

- 🚀 **Lightning Fast**: Powered by Groq for high-speed AI responses.
- 📂 **Excel Integration**: Seamlessly parses `.xlsx` and `.xls` files into searchable embeddings.
- 🔍 **Semantic Search**: Uses FAISS and HuggingFace (`all-MiniLM-L6-v2`) for precise data retrieval.
- 🎨 **Premium UI**: Modern, glassmorphic dark-mode interface with smooth animations and responsive design.
- 🔒 **Privacy Focused**: Processes data locally before sending relevant chunks to Groq.

---

## 🛠️ Technology Stack

- **Backend**: FastAPI (Python)
- **AI Framework**: LangChain
- **Embeddings**: Sentence-Transformers (Local)
- **Vector Database**: FAISS
- **LLM**: Groq (Llama-3.3-70b-versatile)
- **Frontend**: Vanilla HTML5, CSS3 (Glassmorphism), JavaScript (ES6+)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/alpamidha-prog/Excel-RAG-App.git
cd Excel-RAG-App
```

### 2. Setup Environment
Create a `.env` file in the root directory:
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Launch the Application
Start the FastAPI backend:
```bash
python main.py
```
*The server will start at `http://localhost:8000`*

### 5. Open the Interface
Simply open `index.html` in any modern web browser or use a Live Server.

---

## 📖 How It Works

1. **Ingestion**: The Excel file is parsed using `pandas`. Each row is converted into a contextual string.
2. **Vectorization**: Data is chunked and embedded into high-dimensional vectors.
3. **Indexing**: Vectors are stored in a FAISS index for sub-millisecond similarity searching.
4. **Augmentation**: When a user asks a question, the system retrieves the most relevant rows from the spreadsheet.
5. **Generation**: The context + question are sent to Groq's Llama 3.3 model to generate an accurate, data-backed answer.

---

## 🏗️ Project Structure

```text
├── main.py              # FastAPI Backend & RAG Logic
├── index.html           # Premium Frontend Structure
├── style.css            # Glassmorphic Styles
├── script.js            # Frontend Logic & API Integration
├── requirements.txt     # Project Dependencies
├── .env                 # API Keys (Local Only)
└── .gitignore           # Git exclusions
```

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.
