import { NextRequest, NextResponse } from 'next/server'
import { getGenAIClient } from '@/lib/genai'

export async function GET(request: NextRequest) {
  try {
    // Try to make a simple API call to check if quota is available
    // This is a lightweight check without generating actual video
    const genAI = getGenAIClient()
    const models = await genAI.models.list()
    
    // If we get here without an error, quota is likely available
    return NextResponse.json({
      success: true,
      data: {
        status: 'available',
        message: 'API quota appears to be available'
      }
    })

  } catch (error) {
    console.error('Quota check error:', error)
    
    // Check if it's a quota/rate limit error
    const errorMessage = error && typeof error === 'object' && 'message' in error ? String(error.message) : 'Unknown error'
    
    if (errorMessage.includes('quota') || errorMessage.includes('limit') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
      return NextResponse.json({
        success: false,
        data: {
          status: 'exceeded',
          message: 'API quota exceeded',
          error: errorMessage
        }
      }, { status: 429 })
    }

    return NextResponse.json({
      success: false,
      data: {
        status: 'error',
        message: 'Unable to check quota status',
        error: errorMessage
      }
    }, { status: 500 })
  }
}