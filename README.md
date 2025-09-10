# VEO Web UI

🎬 A modern web application for generating videos using Google's Veo 3 API with an intuitive Material Design interface.

![VEO Web UI](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.27-1890ff?logo=antdesign)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06b6d4?logo=tailwindcss)

## ✨ Features

### 🎥 Video Generation
- **Text-to-Video**: Generate videos from descriptive prompts
- **Image-to-Video**: Animate uploaded images with text guidance
- **Multiple Models**: Choose between Veo 3 Standard and Fast
- **Resolution Options**: Support for 720p and 1080p output
- **Aspect Ratios**: 16:9 (landscape) and 9:16 (portrait) formats

### 🎨 User Experience
- **Material Design 3**: Modern, accessible interface design
- **Demo Examples**: 6 professionally crafted video templates
- **Real-time Progress**: Live generation tracking with time estimates
- **Video Player**: Full-featured playback with controls
- **Responsive Design**: Works seamlessly on all devices

### 🔐 Security & Configuration
- **Secure API Key Management**: Browser-only storage with validation
- **Environment Variables**: Proper configuration for deployment
- **Input Validation**: Comprehensive form and file validation
- **Error Handling**: User-friendly error messages and recovery

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **Google Gemini API Key** with paid tier access (required for Veo 3)
- **Vercel Account** (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd veo3-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Gemini API key to `.env.local`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Getting Your API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key" and select your project
4. Copy the generated API key
5. **Important**: Veo 3 requires a paid plan - free tier only includes basic Gemini models

### Generating Videos

1. **Configure API Key**: Click "Configure API" in the header
2. **Choose Method**:
   - Browse demo examples for quick start
   - Create custom prompts from scratch
   - Upload reference images for image-to-video

3. **Set Parameters**:
   - Select model (Standard for quality, Fast for speed)
   - Choose resolution (720p or 1080p)
   - Pick aspect ratio (16:9 landscape or 9:16 portrait)

4. **Generate & Download**: Click "Generate Video" and wait 1-6 minutes for processing

## 🛠 Development

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Ant Design
- **State Management**: React Hooks
- **Validation**: Zod schemas
- **API**: Google GenAI SDK
- **Deployment**: Vercel

### Project Structure

```
veo3-demo/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   │   └── veo/          # Video generation endpoints
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/            # React components
│   └── ui/               # UI components
│       ├── DemoExamples.tsx     # Demo templates
│       ├── VideoGenerationForm.tsx  # Main form
│       ├── VideoPlayer.tsx      # Video playback
│       └── ApiKeyModal.tsx      # API key management
├── hooks/                # Custom React hooks
│   ├── useVideoGeneration.ts   # Video generation logic
│   ├── useFileUpload.ts        # File handling
│   └── useApiKey.ts            # API key management
├── lib/                  # Utilities and configurations
│   ├── genai.ts          # Google GenAI client
│   ├── schemas.ts        # Zod validation schemas
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### API Endpoints

- `POST /api/veo/generate` - Start video generation
- `POST /api/veo/operation` - Poll generation status
- `POST /api/veo/download` - Download generated video
- `GET /api/health` - Health check

## 🚀 Deployment

### Deploy to Vercel

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel login
   ```

2. **Configure Environment Variables**
   In your Vercel dashboard, add:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | Optional |

## 📝 Demo Examples

The application includes 6 professional video generation templates:

1. **Cinematic Dialogue** - Dramatic scene with conversation
2. **Peaceful Nature** - Calico kitten in sunshine
3. **Morning Portrait** - Person with coffee by window
4. **Urban Action** - Dynamic skateboarding sequence
5. **Abstract Motion** - Flowing particles and light
6. **Mystical Forest** - Ethereal woodland scene

Each example includes optimized prompts, settings, and generation parameters.

## 🔧 Configuration

### Video Generation Parameters

- **Models**:
  - `veo-3.0-generate-001` - Standard quality (slower, better quality)
  - `veo-3.0-fast-generate-001` - Fast generation (quicker, good quality)

- **Resolutions**: 720p, 1080p
- **Aspect Ratios**: 16:9, 9:16
- **Generation Time**: 1-6 minutes depending on complexity

### Pricing (Google Veo 3)

- **Veo 3 Standard**: $0.75 per second of generated video
- **Veo 3 Fast**: $0.40 per second of generated video
- **Note**: Requires paid Google Cloud account with billing enabled

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google** for the Veo 3 API and Gemini platform
- **Ant Design** for the comprehensive UI component library
- **Vercel** for seamless deployment and hosting
- **Next.js** team for the excellent React framework

## 📞 Support

- **Documentation**: [Google Veo 3 API Docs](https://ai.google.dev/gemini-api/docs/video)
- **Issues**: [GitHub Issues](https://github.com/your-repo/veo3-demo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/veo3-demo/discussions)

---

**Made with ❤️ using Next.js, TypeScript, and Google's Veo 3 API**