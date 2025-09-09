# Veo3 Video Generation Demo - Product Requirements Prompt

## Overview
Build a modern web application that leverages Google's Veo3 API to generate videos from reference images and text prompts. The application will provide an intuitive interface for video generation, preview capabilities, and downloadable outputs, with pre-built demo examples to showcase the AI capabilities. The application must support Vercel deployment with optimized performance for serverless environments.

## Complexity Assessment
**Estimated Complexity**: Medium
**Implementation Time**: 2-4 hours
**Files Affected**: 15-25 files

## Context & Research Findings

### Critical Context (Priority 1)
1. **API Architecture**: Veo3 uses asynchronous long-running operations requiring polling (up to 6 minutes generation time)
2. **Tech Stack Alignment**: Project uses Next.js + Ant Design + lobe-ui (AIGC-focused component library)
3. **No Existing Codebase**: This is a greenfield project - all components need to be built from scratch
4. **UI Design Available**: Comprehensive UI design document already exists (`docs/UI_DESIGN_DOCUMENT.md`)
5. **Modern React Patterns**: Must use Next.js 15 App Router with server components and proper TypeScript

### API Integration Research
- **Authentication**: Requires Gemini API key
- **Models Available**: 
  - `veo-3.0-generate-001` (8-second 720p/1080p videos)
  - `veo-3.0-fast-generate-001` (optimized for speed)
- **Input Parameters**: prompt, negativePrompt, image, aspectRatio, resolution, personGeneration
- **Limitations**: 2-day video storage, 1,024 token text input limit, SynthID watermarking
- **Operation Flow**: Generate → Poll Status → Download Video

### Component Library Analysis
- **Ant Design**: Upload component with drag-and-drop, file validation, preview capabilities
- **lobe-ui**: AIGC-focused components, requires `transpilePackages: ['@lobehub/ui']` in Next.js config
- **Next.js Video**: Use native `<video>` element or next-video library for optimized playback

### Project Conventions
- **New Project Setup**: No existing patterns to follow - establish new conventions
- **Recommended Structure**: App Router with API routes for Veo3 integration
- **Styling**: antd-style (CSS-in-JS) as recommended by lobe-ui docs
- **State Management**: React Query/TanStack Query for API state management

## Requirements

### Functional Requirements
- [ ] **文生视频 (Text-to-Video)**: Text prompt input with character count (1,024 limit)
- [ ] **图生视频 (Image-to-Video)**: Image upload interface with drag-and-drop support
- [ ] Video generation trigger with loading states for both modes
- [ ] Async operation polling with progress indication
- [ ] Video preview player with standard controls
- [ ] Video download functionality
- [ ] Pre-built demo examples (6 examples with sample images and prompts)
- [ ] One-click generation from demo examples
- [ ] Error handling for API failures and timeouts
- [ ] Responsive design for mobile and desktop
- [ ] **Vercel deployment optimization** with serverless function compatibility

### Technical Requirements
- [ ] Next.js 15 App Router architecture optimized for Vercel
- [ ] TypeScript strict mode configuration
- [ ] Ant Design + lobe-ui component integration
- [ ] API Routes for Veo3 API calls (server-side, Vercel Functions compatible)
- [ ] File upload handling with validation (Vercel blob storage integration)
- [ ] Video file storage and serving (temporary storage with cleanup)
- [ ] Environment variable configuration for API keys
- [ ] Rate limiting protection for serverless environment
- [ ] Error boundaries for robust error handling
- [ ] Serverless function timeout management (10-second Vercel limit consideration)

### Performance Requirements
- Image upload: Max 10MB file size, JPEG/PNG formats
- Video generation: Handle 6-minute maximum generation time
- UI responsiveness: Loading states for all async operations
- Video playback: Optimized delivery with proper buffering

### Security Requirements
- API key secured server-side only
- File upload validation and sanitization
- Input sanitization for text prompts
- No sensitive data in client-side code

## Implementation Strategy

### Context-Aware Approach
**Implementation Method**: Standard-Flow
This is a medium complexity project requiring proper architecture setup, API integration, and comprehensive UI implementation.

### Phase Structure

#### Phase 1: Project Setup & Core Infrastructure
**Goal**: Basic Next.js application with required dependencies
**Key Tasks**:
1. Initialize Next.js 15 project with TypeScript and Tailwind CSS
2. Install and configure Ant Design + lobe-ui + antd-style
3. Set up environment variables and API configuration
4. Create basic project structure with app router

**Validation Gate**:
```bash
npm run build
npm run type-check
```

#### Phase 2: Video Generation Core Features
**Goal**: Working video generation from image + prompt to downloadable video
**Key Tasks**:
1. Build image upload component with Ant Design Upload
2. Create text prompt input with validation
3. Implement Veo3 API integration (server-side API routes)
4. Build async operation polling system
5. Create video preview and download functionality

**Validation Gate**:
```bash
npm run lint
npm run build
# Manual test: Upload image + prompt → Generate video → Download
```

#### Phase 3: Demo Examples & Polish
**Goal**: Complete user experience with examples and responsive design
**Key Tasks**:
1. Implement demo examples section with sample data
2. Add responsive design optimizations
3. Implement error handling and user feedback
4. Add loading states and micro-interactions
5. Performance optimizations and final testing

**Validation Gate**:
```bash
npm run build
npm run lint
npm run type-check
# Manual test: All demo examples work
# Manual test: Mobile responsive design
```

## Success Criteria

### Must Have
- [ ] Users can upload images (JPEG/PNG, max 10MB)
- [ ] Users can input text prompts (max 1,024 characters)
- [ ] Video generation works end-to-end with Veo3 API
- [ ] Generated videos can be previewed in browser
- [ ] Generated videos can be downloaded
- [ ] 6 pre-built demo examples work reliably
- [ ] Responsive design works on mobile and desktop
- [ ] Proper error handling for all failure scenarios

### Should Have
- [ ] Loading animations during video generation
- [ ] Progress indication during long operations
- [ ] Video generation history/queue
- [ ] Basic analytics of generation usage
- [ ] Optimized video delivery and buffering

### Could Have
- [ ] Video editing capabilities (trim, crop)
- [ ] Social media sharing functionality
- [ ] Advanced prompt suggestions
- [ ] Video generation templates
- [ ] User accounts and saved generations

## Validation Commands

### Code Quality
```bash
# Type checking
npx tsc --noEmit

# Linting
npx next lint

# Build verification
npm run build
```

### Testing
```bash
# Development server
npm run dev

# Manual testing checklist:
# - Image upload works
# - Video generation completes
# - Video preview plays
# - Download functionality works
# - Demo examples generate videos
# - Mobile responsive design
```

### Build & Deploy
```bash
# Production build
npm run build

# Deployment validation
# - Environment variables configured
# - API endpoints responding
# - Static assets serving correctly
```

## Documentation References

### API Documentation
- **Veo3 API**: https://ai.google.dev/gemini-api/docs/video?hl=zh-cn&example=dialogue
- **Google Gemini SDK**: https://ai.google.dev/gemini-api/docs/get-started/tutorial?lang=node

### Implementation Examples
- **Next.js Video Integration**: https://nextjs.org/docs/app/guides/videos
- **Ant Design Upload**: https://ant.design/components/upload/
- **React Query for API State**: https://tanstack.com/query/latest/docs/framework/react/overview

### Best Practices
- **Next.js 15 App Router**: https://nextjs.org/docs/app
- **TypeScript Configuration**: https://nextjs.org/docs/app/building-your-application/configuring/typescript
- **Ant Design Next.js Integration**: https://ant.design/docs/react/use-with-next

## Examples to Follow

### Code Structure
Since this is a new project, establish these patterns:
- `/app` - App Router pages and layouts
- `/app/api` - API routes for Veo3 integration
- `/components` - Reusable UI components
- `/lib` - Utility functions and API clients
- `/types` - TypeScript type definitions
- `/public` - Static assets including demo images

### Component Patterns
```typescript
// Example component structure
interface VideoGeneratorProps {
  onGenerationComplete: (videoUrl: string) => void;
}

export function VideoGenerator({ onGenerationComplete }: VideoGeneratorProps) {
  // Component implementation
}
```

### API Integration Pattern
```typescript
// Server-side API route example
export async function POST(request: Request) {
  try {
    const { image, prompt } = await request.json();
    // Veo3 API call
    return Response.json({ operationId });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

## Error Handling & Recovery

### Auto-Recovery Patterns
**Primary Strategy**: Graceful degradation with user feedback
**Validation Failures**: Clear error messages with correction suggestions
**Context Issues**: Fallback UI states and retry mechanisms

### Common Failure Modes (Top 3)
1. **API Rate Limiting**: Implement exponential backoff, queue management
2. **Video Generation Timeout**: Show progress, allow cancellation, retry options
3. **File Upload Failures**: Validate before upload, show upload progress, retry logic

### Smart Error Recovery
- **First Attempt**: Show specific error message, suggest corrections
- **Second Attempt**: Provide alternative options (different resolution, shorter prompts)
- **Third Attempt**: Escalate to support or provide manual fallback

## Dependencies & Prerequisites

### Required Libraries
- **Next.js**: ^15.0.0 (App Router, TypeScript support)
- **React**: ^18.0.0 (Server components, hooks)
- **Ant Design**: ^5.0.0 (UI components, Upload component)
- **@lobehub/ui**: Latest (AIGC-focused components)
- **antd-style**: Latest (CSS-in-JS styling)
- **@google/generative-ai**: Latest (Veo3 API client)
- **@tanstack/react-query**: ^5.0.0 (Server state management)

### System Requirements
- Node.js 18+ (for Next.js 15 compatibility)
- Google Gemini API key with Veo3 access
- Adequate storage for temporary video files (consider cloud storage)

### Setup Instructions
1. Create Google Cloud project and enable Gemini API
2. Obtain API key with Veo3 access permissions  
3. Configure environment variables (GOOGLE_API_KEY)
4. Set up file storage solution (local or cloud)
5. Configure Next.js for lobe-ui transpilation

## Testing Strategy

### Component Testing
- Upload component with various file types and sizes
- Video player component with different video formats
- Demo examples trigger correct API calls
- Responsive design across device sizes

### Integration Testing
- End-to-end video generation workflow
- API error handling scenarios  
- File upload and processing pipeline
- Video download functionality

### Manual Testing
- Cross-browser compatibility (Chrome, Safari, Firefox)
- Mobile responsiveness (iOS Safari, Android Chrome)
- Network conditions (slow connections, timeouts)
- Accessibility (keyboard navigation, screen readers)

### Performance Testing
- Large file upload performance
- Video generation under load
- UI responsiveness during async operations
- Memory usage during video playback

## Deployment Considerations

### Environment Configuration
```env
# Required for Veo3 API integration
GOOGLE_API_KEY=your_gemini_api_key

# Vercel deployment variables
NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
VERCEL_URL=auto-populated-by-vercel

# Optional: Enhanced features
BLOB_READ_WRITE_TOKEN=vercel_blob_token_for_file_storage
```

### Next.js Configuration
```javascript
// next.config.js
module.exports = {
  transpilePackages: ['@lobehub/ui'],
  images: {
    remotePatterns: [
      // Configure for any external image domains
    ],
  },
  // Vercel deployment optimizations
  experimental: {
    serverActions: true,
  },
  // Ensure compatibility with Vercel Functions
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Handle large file uploads
    },
  },
}
```

### Migration Requirements
- No database migration required (new project)
- Environment variable setup on deployment platform
- Static asset deployment (demo images)
- API key configuration and security setup

### Rollback Plan
- Maintain version tags for quick rollback
- Database agnostic design (no schema dependencies)
- Environment variable versioning
- Static asset backup and recovery

## Context Quality Assessment

### Confidence Score: 8/10

**High Confidence (8-10)**:
- ✅ Clear existing UI design patterns to follow
- ✅ Comprehensive API documentation available
- ✅ Straightforward implementation path with known tech stack
- ✅ No complex existing codebase to integrate with
- ✅ Well-established patterns for similar applications

**Factors Supporting High Confidence**:
- New project allows establishing optimal patterns
- UI design document provides clear implementation guide
- Veo3 API documentation is comprehensive
- Next.js + Ant Design is well-documented stack
- Video generation apps have established UX patterns

**Potential Challenges**:
- Long polling implementation complexity
- File handling and storage decisions
- API rate limiting and error handling

### Context Optimization
**Token Efficiency**: High - Focused research with actionable insights
**Context Relevance**: High - All information directly applicable to implementation  
**Pattern Matching**: Medium - New project, but similar patterns exist in ecosystem

### Success Predictors
- [x] Clear implementation path defined
- [x] All dependencies identified and documented
- [x] UI design provides detailed component specifications
- [x] API integration patterns well-researched
- [x] Error handling strategies documented
- [x] Validation approach clearly defined

## Implementation Notes

**Key Success Factors**:
- Follow UI design document specifications closely
- Implement robust async operation handling with proper user feedback
- Ensure proper TypeScript typing throughout the application
- Prioritize responsive design from the start

**Potential Blockers**:
- Google API key access and quota limitations
- Vercel serverless function 10-second timeout vs 6-minute video generation time
- Video file size and temporary storage considerations on Vercel
- Complex async state management for long-running operations
- Cross-browser video playback compatibility

**Critical Path Items**:
1. Veo3 API integration with proper async handling for Vercel environment
2. File upload and processing pipeline optimized for serverless
3. Long-running operation management (polling strategy for 6-minute generations)
4. Video preview and download functionality with temporary storage cleanup

**Vercel-Specific Considerations**:
- Implement client-side polling for operations exceeding 10-second function timeout
- Use Vercel Blob storage for temporary file handling
- Optimize bundle size for faster cold starts
- Implement proper cleanup mechanisms for temporary video files

---

**PRP Generated**: September 9, 2025  
**Based on**: `/Users/will/Code/Mr7Cat/veo3-demo/docs/init.md`  
**Research Completed**: Veo3 API documentation analysis, Next.js + Ant Design patterns research, lobe-ui component library analysis, modern video handling patterns investigation