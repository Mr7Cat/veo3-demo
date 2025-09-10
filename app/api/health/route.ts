import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if API key is configured
    const hasApiKey = !!process.env.GEMINI_API_KEY

    return NextResponse.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      configuration: {
        hasApiKey,
        environment: process.env.NODE_ENV || 'development'
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 'unhealthy',
      error: 'Health check failed'
    }, { status: 500 })
  }
}