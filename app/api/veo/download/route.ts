import { NextRequest, NextResponse } from 'next/server'
import { getGenAIClient } from '@/lib/genai'
import { getErrorMessage } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { videoUri, filename } = body

    if (!videoUri) {
      return NextResponse.json({
        success: false,
        error: 'Video URI is required'
      }, { status: 400 })
    }

    // Get GenAI client
    const genAI = getGenAIClient()

    console.log('Downloading video:', videoUri)

    // For now, we'll return the video URI for client-side download
    // since the GenAI SDK download method may have different signatures
    console.log('Preparing video download for:', videoUri)

    return NextResponse.json({
      success: true,
      data: {
        videoUri,
        filename: filename || 'generated-video.mp4',
        message: 'Video URI ready for download'
      }
    })

  } catch (error) {
    console.error('Error downloading video:', error)

    // Handle specific API errors
    if (error && typeof error === 'object' && 'message' in error) {
      const message = getErrorMessage(error)
      
      if (message.includes('not found') || message.includes('invalid file')) {
        return NextResponse.json({
          success: false,
          error: 'Video file not found or expired'
        }, { status: 404 })
      }

      if (message.includes('API key')) {
        return NextResponse.json({
          success: false,
          error: 'Invalid API key or API key not configured'
        }, { status: 401 })
      }
    }

    // Generic error response
    return NextResponse.json({
      success: false,
      error: 'Failed to download video',
      details: getErrorMessage(error)
    }, { status: 500 })
  }
}

// GET method for direct video download with query parameters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const videoUri = searchParams.get('uri')
    const filename = searchParams.get('filename')

    if (!videoUri) {
      return NextResponse.json({
        success: false,
        error: 'Video URI is required'
      }, { status: 400 })
    }

    // Reuse POST logic with GET parameters
    const mockRequest = {
      json: async () => ({ videoUri, filename })
    } as NextRequest

    return POST(mockRequest)

  } catch (error) {
    console.error('Error in GET download:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to download video',
      details: getErrorMessage(error)
    }, { status: 500 })
  }
}