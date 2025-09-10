'use client'

import { useState, useCallback } from 'react'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  thinking?: string
}

export interface UseChatResult {
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
  setError: (error: string | null) => void
}

export function useChat(): UseChatResult {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (content: string) => {
    try {
      setIsLoading(true)
      setError(null)

      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now() + '-user',
        role: 'user',
        content,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, userMessage])

      // Send to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: content,
          messages: messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response stream')
      }

      // Add assistant message placeholder
      const assistantMessage: ChatMessage = {
        id: Date.now() + '-assistant',
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

      // Stream the response
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const dataStr = line.slice(6).trim()
              if (!dataStr || dataStr === '[DONE]') continue
              
              // Skip empty or malformed data
              if (dataStr === '{}' || dataStr === 'undefined' || dataStr === 'null') {
                continue
              }
              
              let data
              try {
                data = JSON.parse(dataStr)
              } catch (jsonError) {
                console.warn('Invalid JSON in SSE data:', dataStr.substring(0, 100) + '...')
                continue
              }
              
              // Validate data structure
              if (!data || typeof data !== 'object' || !data.type) {
                console.warn('Invalid SSE data structure:', data)
                continue
              }
              
              if (data.type === 'content' && typeof data.text === 'string') {
                setMessages(prev => prev.map(msg =>
                  msg.id === assistantMessage.id
                    ? { ...msg, content: msg.content + data.text }
                    : msg
                ))
              } else if (data.type === 'thinking' && typeof data.text === 'string') {
                setMessages(prev => prev.map(msg =>
                  msg.id === assistantMessage.id
                    ? { ...msg, thinking: (msg.thinking || '') + data.text }
                    : msg
                ))
              } else if (data.type === 'error' && data.message) {
                throw new Error(data.message)
              } else if (data.type === 'done') {
                // End of stream marker
                break
              }
            } catch (parseError) {
              // Only log parse errors, don't break the stream
              if (parseError instanceof Error && parseError.message.includes('API quota') || 
                  parseError instanceof Error && parseError.message.includes('RESOURCE_EXHAUSTED')) {
                // This is an actual API error, propagate it
                throw parseError
              } else {
                console.warn('SSE processing error (continuing):', parseError)
              }
            }
          }
        }
      }

    } catch (error) {
      console.error('Chat error:', error)
      setError(error instanceof Error ? error.message : 'Unknown error')
      
      // Remove the assistant message placeholder if there was an error
      setMessages(prev => prev.filter(msg => msg.role !== 'assistant' || msg.content !== ''))
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    setError
  }
}