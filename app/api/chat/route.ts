import { NextRequest, NextResponse } from 'next/server'
import { getGenAIClient } from '@/lib/genai'

export async function POST(request: NextRequest) {
  try {
    const { message, messages = [] } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({
        error: 'Message is required'
      }, { status: 400 })
    }

    // Get GenAI client (uses environment variable internally)
    const genAI = getGenAIClient()

    // Use standard Gemini Pro model
    const model = 'gemini-1.5-pro'

    // Build conversation history
    const contents = [
      // System message to provide context about the VEO app
      {
        role: 'user',
        parts: [{
          text: `You are an AI assistant helping users with VEO Web UI, an application for generating videos using Google's Veo 3 API. You can help users with:

- Understanding video generation parameters (prompts, models, resolutions)
- Troubleshooting API issues and quota problems
- Best practices for creating effective video prompts
- Technical questions about the application
- Cost optimization and model selection

Be helpful, concise, and focused on video generation topics. If users ask about unrelated topics, gently redirect them back to VEO-related questions.`
        }]
      },
      // Previous conversation history
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      })),
      // Current user message
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ]

    // Create a streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await genAI.models.generateContentStream({
            model,
            contents,
          })

          for await (const chunk of response) {
            // Only send content if it exists and is non-empty
            if (chunk.text && chunk.text.trim()) {
              const data = JSON.stringify({
                type: 'content',
                text: chunk.text
              })
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            }
            
            // Handle thinking content if available (check if property exists)
            if ('thinking' in chunk && chunk.thinking && typeof chunk.thinking === 'string' && chunk.thinking.trim()) {
              const thinkingData = JSON.stringify({
                type: 'thinking',
                text: chunk.thinking
              })
              controller.enqueue(encoder.encode(`data: ${thinkingData}\n\n`))
            }
          }

          // Send completion signal
          const doneData = JSON.stringify({ type: 'done' })
          controller.enqueue(encoder.encode(`data: ${doneData}\n\n`))
          
        } catch (error) {
          console.error('Chat streaming error:', error)
          
          // Handle quota/rate limit errors specifically
          let errorMessage = 'An unexpected error occurred'
          if (error instanceof Error) {
            const message = error.message.toLowerCase()
            if (message.includes('quota') || message.includes('429') || message.includes('resource_exhausted')) {
              errorMessage = 'API quota exceeded. Please check your billing plan or try again later.'
            } else if (message.includes('api key') || message.includes('authentication')) {
              errorMessage = 'Invalid API key. Please check your configuration.'
            } else if (message.includes('timeout')) {
              errorMessage = 'Request timeout. Please try again.'
            } else {
              // Clean up the error message for user display
              errorMessage = error.message.replace(/[\r\n]+/g, ' ').trim()
            }
          }
          
          // Ensure the error message is valid JSON
          const errorData = JSON.stringify({
            type: 'error',
            message: errorMessage
          })
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`))
        } finally {
          // Send completion signal before closing
          try {
            const doneData = JSON.stringify({ type: 'done' })
            controller.enqueue(encoder.encode(`data: ${doneData}\n\n`))
          } catch (e) {
            // Ignore errors when sending done signal
          }
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}