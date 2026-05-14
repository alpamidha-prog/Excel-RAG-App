const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const apiKeyInput = document.getElementById('api-key');
const setupSection = document.getElementById('setup-section');
const chatSection = document.getElementById('chat-section');
const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const fileStatus = document.getElementById('file-status');

const API_BASE = 'http://localhost:8000';

// File Upload Handling
dropZone.onclick = () => fileInput.click();

dropZone.ondragover = (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#b066ff';
};

dropZone.ondragleave = () => {
    dropZone.style.borderColor = 'rgba(255, 255, 255, 0.1)';
};

dropZone.ondrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) handleFileUpload(files[0]);
};

fileInput.onchange = (e) => {
    if (e.target.files.length) handleFileUpload(e.target.files[0]);
};

async function handleFileUpload(file) {
    const formData = new FormData();
    formData.append('file', file);

    fileStatus.innerText = 'Processing your Excel file...';
    fileStatus.className = 'status-msg';

    try {
        const response = await fetch(`${API_BASE}/upload`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            fileStatus.innerText = data.message;
            fileStatus.className = 'status-msg success';
            
            // Transition to chat after 1.5s
            setTimeout(() => {
                setupSection.classList.add('hidden');
                chatSection.classList.remove('hidden');
            }, 1500);
        } else {
            throw new Error(data.detail || 'Upload failed');
        }
    } catch (err) {
        fileStatus.innerText = `Error: ${err.message}`;
        fileStatus.className = 'status-msg error';
    }
}

// Chat Handling
async function sendMessage() {
    const question = userInput.value.trim();
    const apiKey = apiKeyInput.value.trim();

    if (!question) return;

    // Add user message to UI
    appendMessage('user', question);
    userInput.value = '';

    const loadingMsg = appendMessage('system', 'Thinking...');

    try {
        const formData = new FormData();
        formData.append('question', question);
        if (apiKey) formData.append('api_key', apiKey);

        const response = await fetch(`${API_BASE}/query`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        loadingMsg.remove();

        if (response.ok) {
            appendMessage('ai', data.answer);
        } else {
            appendMessage('ai', `Error: ${data.detail || 'Something went wrong'}`);
        }
    } catch (err) {
        loadingMsg.remove();
        appendMessage('ai', `Error: ${err.message}`);
    }
}

function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${role}`;
    msgDiv.innerText = text;
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    return msgDiv;
}

sendBtn.onclick = sendMessage;
userInput.onkeypress = (e) => {
    if (e.key === 'Enter') sendMessage();
};
