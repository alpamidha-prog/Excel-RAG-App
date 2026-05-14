import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.schema import Document
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Enable CORS for frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global state (in-memory for this basic version)
# In a production app, you'd use a session-based storage or a persistent DB
vector_db = None
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

@app.post("/upload")
async def upload_excel(file: UploadFile = File(...)):
    global vector_db
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="Only Excel files are supported.")
    
    try:
        content = await file.read()
        df = pd.read_excel(io.BytesIO(content))
        
        # Convert each row to a string representation for the RAG
        documents = []
        for index, row in df.iterrows():
            row_content = " | ".join([f"{col}: {val}" for col, val in row.items()])
            documents.append(Document(page_content=row_content, metadata={"row": index}))
        
        # Split documents if they are too large (though rows usually aren't)
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        chunks = text_splitter.split_documents(documents)
        
        # Create FAISS index
        vector_db = FAISS.from_documents(chunks, embeddings)
        
        return {"message": f"Successfully processed {len(documents)} rows from {file.filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

@app.post("/query")
async def query_rag(question: str = Form(...), api_key: str = Form(None)):
    global vector_db
    
    # Use provided API key or fall back to environment variable
    groq_api_key = api_key or os.getenv("GROQ_API_KEY")
    
    if not groq_api_key:
        raise HTTPException(status_code=400, detail="Groq API Key is missing.")
    
    if vector_db is None:
        raise HTTPException(status_code=400, detail="Please upload an Excel file first.")
    
    try:
        llm = ChatGroq(groq_api_key=groq_api_key, model_name="llama-3.3-70b-versatile")
        
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=vector_db.as_retriever()
        )
        
        response = qa_chain.invoke(question)
        return {"answer": response["result"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying Groq: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
