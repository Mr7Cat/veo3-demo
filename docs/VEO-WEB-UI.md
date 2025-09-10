# VEO WEB UI - Product Requirements Prompt

## Overview
Create a complete Next.js web application for generating videos using Google's Veo 3 API through Gemini. The application will feature a Material Design 3 interface using Ant Design and lobe-ui, supporting both text-to-video and image-to-video generation with built-in demo examples, API key configuration, and Vercel deployment compatibility.

## Complexity Assessment
**Estimated Complexity**: Complex
**Implementation Time**: 2hrs+
**Files Affected**: 10+

## Context & Research Findings

### Critical Context (Priority 1)
1. **Veo 3 API Integration**: Uses Google's unified GenAI SDK (@google/genai), requires paid tier subscription ($0.75/second for Veo 3, $0.40/second for Veo 3 Fast)
2. **Asynchronous Operations**: Video generation is async with polling required - operations take 11 seconds to 6 minutes
3. **Next.js 15 App Router**: Must use server components by default, client components only when needed
4. **Material Design 3**: Primary design system with Ant Design components and lobe-ui for AIGC-specific features
5. **Vercel Deployment**: Target platform with environment variable configuration for API keys

### Codebase Analysis
- Empty repository with only git initialization and documentation
- No existing patterns to follow - clean slate implementation
- Need to establish all conventions from scratch following system prompt guidelines

### Existing Patterns to Follow
**Reference Implementation**: Google's official Veo 3 Next.js quickstart
- Repository: https://github.com/google-gemini/veo-3-gemini-api-quickstart
- Key patterns:
  - API routes structure: `/api/veo/generate/`, `/api/veo/operation/`, `/api/veo/download/`
  - Async operation polling with status checking
  - Video player with trimming capabilities
  - File upload with dropzone component

### Project Conventions
**Based on System Prompt**:
- Next.js 15 App Router with TypeScript
- Server components by default, client components with "use client" directive
- Ant Design for base components, lobe-ui for AIGC-specific components
- CSS-in-JS with antd-style
- Proper metadata API for SEO
- No database integration (use component state/localStorage for temporary persistence)

## Requirements

### Functional Requirements
- [ ] Text-to-video generation using Veo 3 API
- [ ] Image-to-video generation with file upload capability
- [ ] API key configuration interface
- [ ] Video preview and download functionality
- [ ] Demo examples with sample images and prompts
- [ ] Responsive Material Design 3 interface
- [ ] Loading states and progress indicators
- [ ] Error handling with user-friendly messages

### Technical Requirements
- [ ] Next.js 15 with App Router and TypeScript
- [ ] Ant Design integration with SSR support
- [ ] lobe-ui components for AIGC features
- [ ] Google GenAI SDK integration
- [ ] Vercel deployment configuration
- [ ] Environment variable management for API keys
- [ ] Proper SEO metadata
- [ ] Mobile-responsive design

### Performance Requirements
- Async video generation with polling (11s-6min response time)
- Optimized bundle size with tree-shaking
- Server-side rendering for initial page load
- Client-side state management for video operations

### Security Requirements
- API key secure storage (environment variables)
- Input validation for prompts and file uploads
- Safe file handling for image uploads
- XSS prevention for user inputs

## Implementation Strategy

### Context-Aware Approach
**Implementation Method**: Expert-Mode
- Complex integration requiring custom architecture
- Multiple API integrations (Veo 3, Imagen for demos)
- Custom video handling and async operation management

### Phase Structure

#### Phase 1: Core Foundation
**Goal**: Basic Next.js app with Ant Design and API structure
**Key Tasks**:
1. Initialize Next.js 15 project with TypeScript
2. Configure Ant Design with SSR support and antd-style
3. Set up lobe-ui integration
4. Create basic layout with Material Design 3 principles
5. Configure Tailwind CSS with custom theme

**Validation Gate**: 
```bash
npx tsc --noEmit && npx next lint && npm run build
```

#### Phase 2: API Integration and Core Features
**Goal**: Veo 3 video generation working end-to-end
**Key Tasks**:
1. Install and configure Google GenAI SDK
2. Create API routes for video generation, status polling, and download
3. Implement async operation management with polling
4. Build video generation form with prompt input
5. Add file upload for image-to-video generation
6. Create video player component with basic controls

**Validation Gate**:
```bash
npx tsc --noEmit && npx next lint && npm run build
```

#### Phase 3: UI/UX Enhancement and Demo Features
**Goal**: Complete user experience with demos and polish
**Key Tasks**:
1. Implement demo examples with sample images and prompts
2. Add API key configuration interface
3. Create loading states and progress indicators
4. Add error handling and user feedback
5. Implement video download functionality
6. Polish responsive design and animations

**Validation Gate**:
```bash
npx tsc --noEmit && npx next lint && npm run build && npm run type-check
```

#### Phase 4: Production Readiness
**Goal**: Vercel deployment ready
**Key Tasks**:
1. Configure environment variables for Vercel
2. Optimize bundle size and performance
3. Add proper SEO metadata
4. Test all user flows
5. Final UI/UX polish

**Validation Gate**:
```bash
npx tsc --noEmit && npx next lint && npm run build
```

## Success Criteria

### Must Have
- [ ] Generate videos from text prompts using Veo 3
- [ ] Generate videos from uploaded images with text prompts
- [ ] Video preview and download functionality
- [ ] API key configuration
- [ ] Responsive Material Design 3 interface
- [ ] Demo examples for quick testing
- [ ] Proper error handling and loading states

### Should Have
- [ ] Video trimming/editing capabilities
- [ ] Multiple resolution support (720p/1080p)
- [ ] Aspect ratio selection (16:9/9:16)
- [ ] Negative prompts support
- [ ] Generation history/queue

### Could Have
- [ ] Batch video generation
- [ ] Advanced prompt templates
- [ ] Video effects preview
- [ ] Social sharing features

## Validation Commands

### Code Quality
```bash
# Type checking
npx tsc --noEmit

# Linting
npx next lint

# Formatting (if prettier configured)
npx prettier --check .
```

### Testing
```bash
# Build verification
npm run build

# Type checking specifically for Next.js
npx next build --debug
```

### Build & Deploy
```bash
# Production build
npm run build

# Vercel deployment (after setup)
vercel deploy --prod
```

## Documentation References

### API Documentation
- **Veo 3 in Gemini API**: https://ai.google.dev/gemini-api/docs/video - Comprehensive video generation documentation
- **Google GenAI JavaScript SDK**: https://www.npmjs.com/package/@google/genai - Unified SDK for all Google GenAI models
- **Material Design 3**: https://m3.material.io/foundations - Design system principles and guidelines

### Implementation Examples
- **Official Veo 3 Next.js Quickstart**: https://github.com/google-gemini/veo-3-gemini-api-quickstart - Complete reference implementation
- **Ant Design Next.js Integration**: https://ant.design/docs/react/use-with-next/ - Official SSR setup guide
- **lobe-ui Documentation**: https://github.com/lobehub/lobe-ui - AIGC-specific components

### Best Practices
- **Next.js 15 App Router**: https://nextjs.org/docs/app - Latest routing and component patterns
- **Vercel Deployment**: https://vercel.com/docs/frameworks/nextjs - Deployment configuration
- **TypeScript with Next.js**: https://nextjs.org/docs/app/building-your-application/configuring/typescript

## Examples to Follow

### Code Structure
**Reference**: Google Veo 3 Quickstart structure
```
app/
  api/
    veo/
      generate/route.ts
      operation/route.ts
      download/route.ts
  page.tsx (main UI)
  layout.tsx (with AntdRegistry)
  globals.css
components/
  ui/
    Composer.tsx
    VideoPlayer.tsx
    ModelSelector.tsx
lib/
  utils.ts
  schemas.ts (Zod validation)
```

### Testing Patterns
- Integration testing for API routes
- Component testing with React Testing Library
- E2E testing for video generation flow

### Integration Patterns
- Server actions for form handling
- Client components for interactive video features
- Environment variable management for API keys

## Error Handling & Recovery

### Auto-Recovery Patterns
**Primary Strategy**: Graceful degradation with retry mechanisms
**Validation Failures**: Automatic retry with exponential backoff for API calls
**Context Issues**: User-friendly error messages with actionable guidance

### Common Failure Modes (Top 3)
1. **API Rate Limiting**: Implement exponential backoff, show queue position to user
2. **Video Generation Timeout**: Provide realistic time estimates, allow background processing
3. **File Upload Errors**: Validate file types/sizes, provide clear error messages

### Smart Error Recovery
- **First Attempt**: Retry with same parameters after short delay
- **Second Attempt**: Modify parameters (resolution, model) and retry
- **Third Attempt**: Fallback to Veo 3 Fast model or show manual retry option

## Dependencies & Prerequisites

### Required Libraries
- **@google/genai**: Latest - Unified Google AI SDK for Veo 3 access
- **antd**: ^5.x - Ant Design React components
- **@lobehub/ui**: Latest - AIGC-specific components
- **@ant-design/nextjs-registry**: Latest - SSR support for Ant Design
- **antd-style**: Latest - CSS-in-JS styling solution
- **next**: ^15.x - React framework with App Router
- **typescript**: Latest - Type safety
- **tailwindcss**: ^3.x - Utility-first CSS framework
- **zod**: Latest - Schema validation

### System Requirements
- Node.js 18+ for Next.js 15 compatibility
- Vercel account for deployment
- Google Cloud account with Gemini API access (paid tier)

### Setup Instructions
1. Create Gemini API key with billing enabled
2. Configure environment variables (GEMINI_API_KEY)
3. Set up Vercel project with environment variables

## Testing Strategy

### Unit Tests
- API route handlers for video generation
- Form validation with Zod schemas
- Component state management

### Integration Tests
- End-to-end video generation flow
- API key validation and error handling
- File upload and processing

### Manual Testing
- Video generation with various prompts
- Image-to-video conversion with different file types
- Responsive design across devices
- Error scenarios (invalid API keys, network failures)

### Performance Testing
- Bundle size analysis
- Page load times
- Video processing performance

## Deployment Considerations

### Environment Configuration
```bash
# Required environment variables
GEMINI_API_KEY=your_api_key_here
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Migration Requirements
- No database migrations required
- Static asset optimization for images
- API key migration from development to production

### Rollback Plan
- Vercel deployment rollback functionality
- Environment variable reversion
- Feature flagging for new capabilities

## Context Quality Assessment

### Confidence Score: 8/10

**High Confidence (8-10)**:
- Clear official documentation and reference implementation available
- Established patterns for Next.js + Ant Design integration  
- Well-defined API specifications for Veo 3
- Comprehensive system prompt guidelines for implementation approach

**Medium Confidence Areas**:
- lobe-ui integration specifics (newer library, less documentation)
- Material Design 3 implementation with Ant Design (custom theming required)

**Low Confidence Areas**:
- Specific video processing performance on Vercel serverless functions
- Optimal UX patterns for long video generation wait times

### Context Optimization
**Token Efficiency**: High - Research concentrated on essential implementation details
**Context Relevance**: High - All research directly applicable to implementation requirements  
**Pattern Matching**: High - Strong reference implementation available from Google

### Success Predictors
- [x] Similar implementation exists in codebase (Google's official quickstart)
- [x] Clear validation path defined (build commands, type checking)
- [x] All dependencies identified (Google GenAI SDK, Ant Design, lobe-ui)
- [x] Error patterns documented (API failures, timeout handling)
- [x] Context fits within optimal token limits

## Implementation Notes

**Key Success Factors**:
- Follow Google's official Veo 3 quickstart structure closely
- Implement proper async operation polling with user feedback
- Maintain Material Design 3 principles throughout the interface
- Ensure proper SSR configuration for Ant Design components

**Potential Blockers**:
- API key setup and billing configuration for Gemini API
- Long video generation times requiring proper UX handling
- File upload size limits and processing on serverless functions
- Ant Design SSR configuration complexity with Next.js 15

**Architecture Decisions**:
- Use server components for static content, client components for interactive features
- Implement polling with React Query or SWR for async operations
- Store API keys in environment variables, not client-side storage
- Use Zod for all form validation and API input sanitization

---

**PRP Generated**: 2025-09-10
**Based on**: docs/init.md - VEO WEB UI feature specification
**Research Completed**: Comprehensive analysis of Veo 3 API, Next.js integration patterns, Ant Design SSR setup, lobe-ui capabilities, and Material Design 3 principles. Reference implementation identified and analyzed for architecture guidance.