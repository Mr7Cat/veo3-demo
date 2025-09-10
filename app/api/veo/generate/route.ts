import { NextRequest, NextResponse } from 'next/server'
import { getGenAIClient } from '@/lib/genai'
import { videoGenerationSchema } from '@/lib/schemas'
import { getErrorMessage } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedData = videoGenerationSchema.parse(body)

    // Get GenAI client
    const genAI = getGenAIClient()

    // Prepare video generation parameters
    const params: any = {
      model: validatedData.model,
      prompt: validatedData.prompt,
      config: {
        aspectRatio: validatedData.aspectRatio,
        resolution: validatedData.resolution,
      }
    }

    // Add negative prompt if provided
    if (validatedData.negativePrompt) {
      params.config.negativePrompt = validatedData.negativePrompt
    }

    // Add image if provided
    if (validatedData.image) {
      params.image = {
        imageBytes: validatedData.image.imageBytes,
        mimeType: validatedData.image.mimeType,
      }
    }

    console.log('Starting video generation with params:', {
      model: params.model,
      prompt: params.prompt.substring(0, 100) + '...',
      config: params.config
    })

    // Start video generation operation
    const operation = await genAI.models.generateVideos(params)

    console.log('Video generation operation started:', operation.name)

    // Return operation details
    return NextResponse.json({
      success: true,
      data: {
        operationName: operation.name,
        status: 'started',
        message: 'Video generation started successfully'
      }
    })

  } catch (error) {
    console.error('Error in video generation:', error)

    // Handle validation errors
    if (error && typeof error === 'object' && 'issues' in error) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.issues
      }, { status: 400 })
    }

    // Handle API errors
    if (error && typeof error === 'object' && 'message' in error) {
      const message = getErrorMessage(error)
      
      // Check for specific error types
      if (message.includes('API key')) {
        return NextResponse.json({
          success: false,
          error: 'Invalid API key or API key not configured'
        }, { status: 401 })
      }

      if (message.includes('quota') || message.includes('limit') || message.includes('RESOURCE_EXHAUSTED')) {
        return NextResponse.json({
          success: false,
          error: 'API quota exceeded or rate limit reached',
          userMessage: 'You have exceeded your Google Gemini API quota. Please check your billing plan or wait for the quota to reset.',
          actionItems: [
            'Check your Google Cloud billing account',
            'Upgrade to a paid plan if using free tier',
            'Wait for quota reset (typically 24 hours)',
            'Consider using Veo 3 Fast model for lower costs'
          ],
          helpUrl: 'https://ai.google.dev/gemini-api/docs/rate-limits'
        }, { status: 429 })
      }
    }

    // Generic error response
    return NextResponse.json({
      success: false,
      error: 'Failed to start video generation',
      details: getErrorMessage(error)
    }, { status: 500 })
  }
}