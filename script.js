// Global variables
let chatHistory = [];
let isTyping = false;

// DOM elements
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const chatContainer = document.getElementById('chat-container');
const sidebar = document.getElementById('sidebar');

// Model parameters
const temperatureSlider = document.getElementById('temperature');
const maxTokensSlider = document.getElementById('max-tokens');
const topPSlider = document.getElementById('top-p');
const modelSelect = document.getElementById('model-select');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeSliders();
    setupEventListeners();
    adjustTextareaHeight();
});

// Initialize slider value displays
function initializeSliders() {
    updateSliderValue('temperature', 'temp-value');
    updateSliderValue('max-tokens', 'tokens-value');
    updateSliderValue('top-p', 'top-p-value');
    
    // Add event listeners for sliders
    temperatureSlider.addEventListener('input', () => updateSliderValue('temperature', 'temp-value'));
    maxTokensSlider.addEventListener('input', () => updateSliderValue('max-tokens', 'tokens-value'));
    topPSlider.addEventListener('input', () => updateSliderValue('top-p', 'top-p-value'));
}

// Update slider value display
function updateSliderValue(sliderId, valueId) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);
    valueDisplay.textContent = slider.value;
}

// Setup event listeners
function setupEventListeners() {
    messageInput.addEventListener('input', function() {
        adjustTextareaHeight();
        toggleSendButton();
    });
    
    messageInput.addEventListener('paste', function() {
        setTimeout(adjustTextareaHeight, 0);
    });
}

// Adjust textarea height based on content
function adjustTextareaHeight() {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
}

// Toggle send button state
function toggleSendButton() {
    const hasText = messageInput.value.trim().length > 0;
    sendBtn.disabled = !hasText || isTyping;
}

// Handle keyboard events
function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        if (!sendBtn.disabled) {
            sendMessage();
        }
    }
}

// Send message function
async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message || isTyping) return;
    
    // Clear welcome message if it exists
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input and reset height
    messageInput.value = '';
    adjustTextareaHeight();
    toggleSendButton();
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate API call delay
    setTimeout(() => {
        hideTypingIndicator();
        
        // Generate mock response based on current settings
        const response = generateMockResponse(message);
        addMessage(response, 'assistant');
        
        // Scroll to bottom
        scrollToBottom();
    }, 1000 + Math.random() * 2000);
}

// Add message to chat
function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'user' ? 'U' : 'AI';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    if (sender === 'user') {
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(avatar);
    } else {
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
    }
    
    chatContainer.appendChild(messageDiv);
    
    // Add to chat history
    chatHistory.push({ content, sender, timestamp: new Date() });
    
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    isTyping = true;
    toggleSendButton();
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = 'AI';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'message-content';
    typingContent.innerHTML = `
        <span>AI is typing</span>
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(typingContent);
    chatContainer.appendChild(typingDiv);
    
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    isTyping = false;
    toggleSendButton();
    
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Generate mock response
function generateMockResponse(userMessage) {
    const temperature = parseFloat(temperatureSlider.value);
    const maxTokens = parseInt(maxTokensSlider.value);
    const topP = parseFloat(topPSlider.value);
    const model = modelSelect.value;
    
    // Mock responses based on common queries
    const responses = [
        `I understand you're asking about "${userMessage}". Based on the current model settings (${model}, temperature: ${temperature}, max tokens: ${maxTokens}), I can help you with that.`,
        
        `That's an interesting question about "${userMessage}". With the current temperature setting of ${temperature}, I'll provide a ${temperature > 1 ? 'more creative' : temperature < 0.5 ? 'more focused' : 'balanced'} response.`,
        
        `I'd be happy to help with "${userMessage}". The model ${model} is well-suited for this type of query, and with ${maxTokens} max tokens, I can provide a comprehensive response.`,
        
        `Great question! Regarding "${userMessage}", I can offer some insights. The current top-p value of ${topP} helps ensure ${topP > 0.8 ? 'diverse' : 'focused'} response generation.`,
        
        `Thanks for asking about "${userMessage}". This is exactly the kind of query that works well with the current model configuration. Let me break this down for you...`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Scroll to bottom of chat
function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Toggle sidebar (for mobile)
function toggleSidebar() {
    sidebar.classList.toggle('open');
}

// New chat function
function newChat() {
    chatHistory = [];
    chatContainer.innerHTML = `
        <div class="welcome-message">
            <h2>What are you working on?</h2>
            <p>Start a conversation with the AI assistant</p>
        </div>
    `;
    
    // Close sidebar on mobile after creating new chat
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
    }
}

// Get current model parameters
function getModelParameters() {
    return {
        model: modelSelect.value,
        temperature: parseFloat(temperatureSlider.value),
        maxTokens: parseInt(maxTokensSlider.value),
        topP: parseFloat(topPSlider.value)
    };
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
    }
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768 && 
        sidebar.classList.contains('open') && 
        !sidebar.contains(event.target) && 
        !event.target.closest('.sidebar-toggle')) {
        sidebar.classList.remove('open');
    }
});