# My LLM Playground

A streamlined, modern interface for testing and experimenting with Large Language Models (LLMs). Built with vanilla HTML, CSS, and JavaScript for optimal performance and easy deployment.

![LLM Playground Interface](https://via.placeholder.com/800x400/10a37f/ffffff?text=LLM+Playground+Interface)

## ✨ Features

- **Clean, Intuitive Interface** - ChatGPT-inspired design with sidebar navigation
- **Model Parameter Controls** - Adjust temperature, max tokens, and top-p values
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Interaction** - Dynamic message handling with typing indicators
- **Multiple Model Support** - Switch between different AI models
- **Chat History** - Maintain conversation context and start new chats
- **Modern UI/UX** - Smooth animations and professional styling

## 🚀 Quick Start

### Local Development

1. **Clone or download** this repository
2. **Open** `index.html` in your browser, or
3. **Run a local server**:
   ```bash
   # Using Node.js http-server
   npx http-server -p 3000
   
   # Using Python
   python -m http.server 3000
   
   # Using npm script
   npm run dev
   ```

### Deploy to Vercel

#### Option 1: Deploy from GitHub

1. **Push your code** to a GitHub repository
2. **Visit** [vercel.com](https://vercel.com)
3. **Import** your GitHub repository
4. **Deploy** - Vercel will automatically detect the configuration

#### Option 2: Deploy using Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project directory**:
   ```bash
   vercel
   ```

4. **Deploy to production**:
   ```bash
   vercel --prod
   ```

#### Option 3: Drag & Drop Deployment

1. **Visit** [vercel.com/new](https://vercel.com/new)
2. **Drag and drop** your project folder
3. **Deploy** instantly

## 📁 Project Structure

```
llm-playground/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
├── vercel.json         # Vercel deployment configuration
├── package.json        # Project metadata and scripts
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## ⚙️ Configuration

### Vercel Configuration (`vercel.json`)

The project includes optimized Vercel configuration with:
- Static file serving
- Security headers
- Cache optimization for assets
- SPA routing support

### Model Parameters

Adjust AI model behavior using the sidebar controls:

- **Temperature** (0-2): Controls response creativity
  - Lower values (0-0.5): More focused and deterministic
  - Higher values (1-2): More creative and varied

- **Max Tokens** (1-4096): Maximum response length
  - Lower values: Shorter responses
  - Higher values: Longer, more detailed responses

- **Top P** (0-1): Controls response diversity
  - Lower values: More focused vocabulary
  - Higher values: More diverse word choices

## 🛠️ Customization

### Adding Real LLM Integration

To connect with actual LLM APIs, modify the `generateMockResponse()` function in `script.js`:

```javascript
async function callRealLLM(message, parameters) {
    const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            message: message,
            temperature: parameters.temperature,
            max_tokens: parameters.maxTokens,
            top_p: parameters.topP
        })
    });
    
    return await response.json();
}
```

### Styling Customization

Key CSS variables for easy theming (add to `:root` in `styles.css`):

```css
:root {
    --primary-color: #10a37f;
    --sidebar-bg: #171717;
    --main-bg: #ffffff;
    --text-color: #374151;
    --border-color: #e5e5e7;
}
```

## 🌐 Environment Variables

For production deployments with real APIs, add these environment variables in Vercel:

- `OPENAI_API_KEY` - Your OpenAI API key
- `ANTHROPIC_API_KEY` - Your Anthropic API key
- `API_BASE_URL` - Base URL for your LLM API

## 📱 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [your-llm-playground.vercel.app](https://your-llm-playground.vercel.app)
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Report Issues**: [GitHub Issues](https://github.com/yourusername/llm-playground/issues)

## 🙏 Acknowledgments

- Inspired by ChatGPT's clean interface design
- Built with modern web standards
- Optimized for Vercel's edge network

---

**Ready to deploy?** Just run `vercel` in your project directory! 🚀