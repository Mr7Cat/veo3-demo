import { GoogleGenAI } from '@google/genai'

// Initialize the Google GenAI client
function createGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is required')
  }

  return new GoogleGenAI({
    apiKey,
  })
}

// Singleton instance
let genAIClient: GoogleGenAI | null = null

export function getGenAIClient(): GoogleGenAI {
  if (!genAIClient) {
    genAIClient = createGenAIClient()
  }
  return genAIClient
}

// Veo 3 model configurations
export const VEO_MODELS = {
  VEO_3: 'veo-3.0-generate-001',
  VEO_3_FAST: 'veo-3.0-fast-generate-001',
} as const

export type VeoModel = typeof VEO_MODELS[keyof typeof VEO_MODELS]

// Video generation parameters
export interface VideoGenerationParams {
  prompt: string
  negativePrompt?: string
  image?: {
    imageBytes: string
    mimeType: string
  }
  aspectRatio?: '16:9' | '9:16'
  resolution?: '720p' | '1080p'
  model?: VeoModel
}

// Operation status types
export interface VideoOperation {
  name: string
  done: boolean
  response?: {
    generatedVideos: Array<{
      video: {
        uri: string
      }
    }>
  }
  error?: {
    message: string
    code: number
  }
}