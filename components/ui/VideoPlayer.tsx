'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Button, Space, Slider, Typography, Card, message } from 'antd'
import { 
  PlayCircleOutlined, 
  PauseCircleOutlined, 
  SoundOutlined, 
  DownloadOutlined,
  FullscreenOutlined,
  ReloadOutlined
} from '@ant-design/icons'
import { formatDuration } from '@/lib/utils'

const { Text } = Typography

interface VideoPlayerProps {
  videoUrl?: string
  onDownload?: () => void
  className?: string
}

export default function VideoPlayer({ videoUrl, onDownload, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      setIsLoading(false)
      setHasError(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleError = () => {
      setHasError(true)
      setIsLoading(false)
      console.error('Video loading error')
    }

    const handleLoadStart = () => {
      setIsLoading(true)
      setHasError(false)
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('error', handleError)
    video.addEventListener('loadstart', handleLoadStart)

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('error', handleError)
      video.removeEventListener('loadstart', handleLoadStart)
    }
  }, [videoUrl])

  const togglePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch(error => {
        console.error('Error playing video:', error)
        message.error('Failed to play video')
      })
    }
  }

  const handleSeek = (value: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = (value / 100) * duration
    setCurrentTime(video.currentTime)
  }

  const handleVolumeChange = (value: number) => {
    const video = videoRef.current
    if (!video) return

    const volumeValue = value / 100
    video.volume = volumeValue
    setVolume(volumeValue)
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (video.requestFullscreen) {
      video.requestFullscreen().catch(error => {
        console.error('Error entering fullscreen:', error)
        message.error('Failed to enter fullscreen')
      })
    }
  }

  const handleReload = () => {
    const video = videoRef.current
    if (!video) return

    video.load()
    setCurrentTime(0)
    setIsPlaying(false)
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  if (!videoUrl) {
    return (
      <Card className={className}>
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <div className="text-center">
            <PlayCircleOutlined className="text-4xl text-gray-400 mb-2" />
            <Text type="secondary">No video to display</Text>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <div className="space-y-4">
        {/* Video Element */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-auto max-h-96 object-contain"
            poster=""
            preload="metadata"
          />
          
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-center text-white">
                <ReloadOutlined className="text-2xl mb-2 animate-spin" />
                <Text className="text-white">Loading video...</Text>
              </div>
            </div>
          )}

          {/* Error Overlay */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-center text-white">
                <Text className="text-red-400">Failed to load video</Text>
                <div className="mt-2">
                  <Button size="small" onClick={handleReload}>
                    Retry
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Play/Pause Overlay */}
          {!isLoading && !hasError && (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-0 hover:bg-opacity-20 transition-all"
              onClick={togglePlayPause}
            >
              {!isPlaying && (
                <PlayCircleOutlined className="text-white text-6xl opacity-80 hover:opacity-100 transition-opacity" />
              )}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-3">
          {/* Progress Bar */}
          <div className="flex items-center space-x-3">
            <Text className="text-sm text-gray-500 min-w-[40px]">
              {formatDuration(Math.floor(currentTime))}
            </Text>
            <Slider
              value={progressPercent}
              onChange={handleSeek}
              tooltip={{ formatter: null }}
              className="flex-1"
              disabled={isLoading || hasError}
            />
            <Text className="text-sm text-gray-500 min-w-[40px]">
              {formatDuration(Math.floor(duration))}
            </Text>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <Space>
              <Button
                type="text"
                icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                onClick={togglePlayPause}
                disabled={isLoading || hasError}
                size="large"
              />
              
              {/* Volume Control */}
              <div className="flex items-center space-x-2">
                <SoundOutlined className="text-gray-500" />
                <Slider
                  value={volume * 100}
                  onChange={handleVolumeChange}
                  className="w-20"
                  tooltip={{ formatter: (value) => `${value}%` }}
                />
              </div>
            </Space>

            <Space>
              <Button
                type="text"
                icon={<FullscreenOutlined />}
                onClick={toggleFullscreen}
                disabled={isLoading || hasError}
                title="Fullscreen"
              />
              
              {onDownload && (
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={onDownload}
                  disabled={isLoading || hasError}
                >
                  Download
                </Button>
              )}
            </Space>
          </div>
        </div>

        {/* Video Info */}
        {duration > 0 && (
          <div className="text-center">
            <Text type="secondary" className="text-sm">
              Duration: {formatDuration(Math.floor(duration))} • 
              Generated with Veo 3
            </Text>
          </div>
        )}
      </div>
    </Card>
  )
}