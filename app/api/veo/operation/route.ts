import { NextRequest, NextResponse } from 'next/server'
import { getGenAIClient } from '@/lib/genai'
import { operationPollingSchema } from '@/lib/schemas'
import { getErrorMessage } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedData = operationPollingSchema.parse(body)

    // Get GenAI client
    const genAI = getGenAIClient()

    console.log('Polling operation status:', validatedData.operationName)

    // Get operation status
    const operation = await genAI.operations.getVideosOperation({
      operation: { 
        name: validatedData.operationName,
        _fromAPIResponse: true
      } as any
    })

    console.log('Operation status:', {
      name: operation.name,
      done: operation.done,
      hasResponse: !!operation.response,
      hasError: !!operation.error
    })

    // Check if operation is complete
    if (operation.done) {
      if (operation.error) {
        console.error('Operation failed:', operation.error)
        return NextResponse.json({
          success: false,
          error: 'Video generation failed',
          details: operation.error
        }, { status: 400 })
      }

      if (operation.response && operation.response.generatedVideos && operation.response.generatedVideos.length > 0) {
        const video = operation.response.generatedVideos[0]
        console.log('Video generation completed successfully')
        
        if (video.video && video.video.uri) {
          return NextResponse.json({
            success: true,
            data: {
              operationName: operation.name,
              status: 'completed',
              video: {
                uri: video.video.uri
              },
              message: 'Video generation completed successfully'
            }
          })
        } else {
          console.error('Video object missing URI')
          return NextResponse.json({
            success: false,
            error: 'Video generation completed but video URI is missing'
          }, { status: 500 })
        }
      } else {
        console.error('Operation completed but no video found')
        return NextResponse.json({
          success: false,
          error: 'Video generation completed but no video was generated'
        }, { status: 500 })
      }
    } else {
      // Operation still in progress
      return NextResponse.json({
        success: true,
        data: {
          operationName: operation.name,
          status: 'in_progress',
          message: 'Video generation is still in progress'
        }
      })
    }

  } catch (error) {
    console.error('Error polling operation:', error)

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
      
      if (message.includes('not found') || message.includes('invalid operation')) {
        return NextResponse.json({
          success: false,
          error: 'Operation not found'
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
      error: 'Failed to get operation status',
      details: getErrorMessage(error)
    }, { status: 500 })
  }
}

// GET method for polling with query parameters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const operationName = searchParams.get('operation')

    if (!operationName) {
      return NextResponse.json({
        success: false,
        error: 'Operation name is required'
      }, { status: 400 })
    }

    // Reuse POST logic with GET parameters
    const mockRequest = {
      json: async () => ({ operationName })
    } as NextRequest

    return POST(mockRequest)

  } catch (error) {
    console.error('Error in GET operation:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to get operation status',
      details: getErrorMessage(error)
    }, { status: 500 })
  }
}