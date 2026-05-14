# ExcelMind RAG

A premium Retrieval-Augmented Generation (RAG) application that allows you to upload Excel files and chat with your data using **Groq** and **FAISS**.

## Features
- **Excel Upload**: Processes `.xlsx` and `.xls` files.
- **Fast Search**: Uses **FAISS** for efficient vector similarity search.
- **Powerful LLM**: Powered by **Groq** (Llama 3.3 70B) for high-speed generation.
- **Premium UI**: Modern dark theme with glassmorphism and smooth interactions.

## Setup Instructions

### 1. Prerequisites
- Python 3.9+
- A [Groq API Key](https://console.groq.com/keys)

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the Backend
```bash
python main.py
```
The backend will run on `http://localhost:8000`.

### 4. Open the Frontend
Simply open `index.html` in your browser. (Or use a live server extension).

## How to Use
1. Enter your **Groq API Key** in the input field (or set it in a `.env` file).
2. Upload your **Excel file**.
3. Once processed, the chat interface will appear.
4. Ask questions about your data!
