'use client'

import { useState, useCallback, useRef } from 'react'
import { VideoGenerationRequest } from '@/lib/schemas'
import { getErrorMessage } from '@/lib/utils'

export interface VideoGenerationState {
  status: 'idle' | 'generating' | 'polling' | 'completed' | 'error'
  progress: number
  operationName: string | null
  videoUrl: string | null
  error: string | null
  estimatedTimeRemaining: number | null
}

export interface UseVideoGenerationResult {
  state: VideoGenerationState
  generateVideo: (params: VideoGenerationRequest) => Promise<void>
  downloadVideo: (filename?: string) => Promise<void>
  reset: () => void
}

const POLLING_INTERVAL = 5000 // 5 seconds
const MAX_POLLING_TIME = 6 * 60 * 1000 // 6 minutes
const ESTIMATED_GENERATION_TIME = 3 * 60 * 1000 // 3 minutes average

export function useVideoGeneration(): UseVideoGenerationResult {
  const [state, setState] = useState<VideoGenerationState>({
    status: 'idle',
    progress: 0,
    operationName: null,
    videoUrl: null,
    error: null,
    estimatedTimeRemaining: null,
  })

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const stopPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current)
      pollingIntervalRef.current = null
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
  }, [])

  const updateProgress = useCallback((startTime: number) => {
    const elapsed = Date.now() - startTime
    const progress = Math.min((elapsed / ESTIMATED_GENERATION_TIME) * 90, 90) // Cap at 90% during generation
    const remaining = Math.max(ESTIMATED_GENERATION_TIME - elapsed, 0)
    
    setState(prev => ({
      ...prev,
      progress: Math.round(progress),
      estimatedTimeRemaining: remaining > 0 ? remaining : null,
    }))
  }, [])

  const pollOperation = useCallback(async (operationName: string) => {
    const startTime = startTimeRef.current || Date.now()
    
    try {
      const controller = new AbortController()
      abortControllerRef.current = controller

      const response = await fetch('/api/veo/operation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operationName }),
        signal: controller.signal,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to poll operation')
      }

      if (result.success && result.data) {
        if (result.data.status === 'completed') {
          // Operation completed successfully
          setState(prev => ({
            ...prev,
            status: 'completed',
            progress: 100,
            videoUrl: result.data.video.uri,
            estimatedTimeRemaining: null,
          }))
          stopPolling()
          return true // Polling complete
        } else if (result.data.status === 'in_progress') {
          // Update progress based on elapsed time
          updateProgress(startTime)
          
          // Check if we've exceeded max polling time
          const elapsed = Date.now() - startTime
          if (elapsed > MAX_POLLING_TIME) {
            throw new Error('Video generation timed out. Please try again.')
          }
          
          return false // Continue polling
        }
      } else {
        throw new Error(result.error || 'Invalid response from server')
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Request was aborted, don't update state
        return true
      }
      
      console.error('Polling error:', error)
      setState(prev => ({
        ...prev,
        status: 'error',
        error: getErrorMessage(error),
        estimatedTimeRemaining: null,
      }))
      stopPolling()
      return true // Stop polling on error
    }
  }, [stopPolling, updateProgress])

  const startPolling = useCallback((operationName: string) => {
    startTimeRef.current = Date.now()
    
    setState(prev => ({
      ...prev,
      status: 'polling',
      progress: 5,
      estimatedTimeRemaining: ESTIMATED_GENERATION_TIME,
    }))

    // Initial poll
    pollOperation(operationName)

    // Set up polling interval
    pollingIntervalRef.current = setInterval(async () => {
      const shouldStop = await pollOperation(operationName)
      if (shouldStop) {
        stopPolling()
      }
    }, POLLING_INTERVAL)
  }, [pollOperation, stopPolling])

  const generateVideo = useCallback(async (params: VideoGenerationRequest) => {
    try {
      // Reset previous state
      setState({
        status: 'generating',
        progress: 0,
        operationName: null,
        videoUrl: null,
        error: null,
        estimatedTimeRemaining: ESTIMATED_GENERATION_TIME,
      })

      stopPolling()

      console.log('Starting video generation with params:', params)

      // Start video generation
      const response = await fetch('/api/veo/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to start video generation')
      }

      if (result.success && result.data?.operationName) {
        const operationName = result.data.operationName
        console.log('Video generation started, operation:', operationName)
        
        setState(prev => ({
          ...prev,
          operationName,
        }))

        // Start polling for completion
        startPolling(operationName)
      } else {
        throw new Error(result.error || 'Invalid response from server')
      }
    } catch (error) {
      console.error('Video generation error:', error)
      setState(prev => ({
        ...prev,
        status: 'error',
        error: getErrorMessage(error),
        estimatedTimeRemaining: null,
      }))
      stopPolling()
    }
  }, [startPolling, stopPolling])

  const downloadVideo = useCallback(async (filename = 'generated-video.mp4') => {
    if (!state.videoUrl) {
      throw new Error('No video available for download')
    }

    try {
      console.log('Downloading video from URL:', state.videoUrl)
      
      // Download directly from the video URL
      const response = await fetch(state.videoUrl)
      
      if (!response.ok) {
        throw new Error('Failed to download video from URL')
      }

      // Get the video blob
      const blob = await response.blob()
      
      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      console.log('Video downloaded successfully')
    } catch (error) {
      console.error('Download error:', error)
      throw error
    }
  }, [state.videoUrl])

  const reset = useCallback(() => {
    stopPolling()
    setState({
      status: 'idle',
      progress: 0,
      operationName: null,
      videoUrl: null,
      error: null,
      estimatedTimeRemaining: null,
    })
  }, [stopPolling])

  return {
    state,
    generateVideo,
    downloadVideo,
    reset,
  }
}