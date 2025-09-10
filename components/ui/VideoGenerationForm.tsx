'use client'

import React, { useState } from 'react'
import { 
  Form, 
  Input, 
  Button, 
  Select, 
  Typography, 
  Space, 
  Card,
  Alert,
  Progress,
  Divider,
  Upload,
  message
} from 'antd'
import { UploadOutlined, PlayCircleOutlined, DownloadOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd'
import { useVideoGeneration } from '@/hooks/useVideoGeneration'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useApiKey } from '@/contexts/ApiKeyContext'
import { VideoGenerationRequest } from '@/lib/schemas'
import { formatDuration } from '@/lib/utils'

const { TextArea } = Input
const { Option } = Select
const { Title, Paragraph, Text } = Typography

interface VideoGenerationFormProps {
  onVideoGenerated?: (videoUrl: string) => void
  initialData?: Partial<VideoGenerationRequest>
}

export default function VideoGenerationForm({ onVideoGenerated, initialData }: VideoGenerationFormProps) {
  const [form] = Form.useForm()
  const { state: videoState, generateVideo, downloadVideo, reset } = useVideoGeneration()
  const { state: uploadState, uploadFile, clearFiles, getCurrentFile } = useFileUpload()
  const { isConfigured } = useApiKey()
  
  const [promptText, setPromptText] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')

  // Effect to populate form with initial data
  React.useEffect(() => {
    if (initialData) {
      const formData = {
        prompt: initialData.prompt || '',
        negativePrompt: initialData.negativePrompt || '',
        aspectRatio: initialData.aspectRatio || '16:9',
        resolution: initialData.resolution || '720p',
        model: initialData.model || 'veo-3.0-generate-001'
      }
      
      form.setFieldsValue(formData)
      setPromptText(formData.prompt)
      setNegativePrompt(formData.negativePrompt)
    }
  }, [initialData, form])

  const handleSubmit = async (values: any) => {
    try {
      const uploadedFile = getCurrentFile()
      
      const params: VideoGenerationRequest = {
        prompt: values.prompt,
        negativePrompt: values.negativePrompt || undefined,
        aspectRatio: values.aspectRatio || '16:9',
        resolution: values.resolution || '720p',
        model: values.model || 'veo-3.0-generate-001',
        image: uploadedFile ? {
          imageBytes: uploadedFile.base64,
          mimeType: uploadedFile.mimeType,
        } : undefined,
      }

      await generateVideo(params)
    } catch (error) {
      message.error('Failed to start video generation')
      console.error('Form submission error:', error)
    }
  }

  const handleDownload = async () => {
    try {
      await downloadVideo(`veo-generated-${Date.now()}.mp4`)
      message.success('Video download started')
    } catch (error) {
      message.error('Failed to download video')
      console.error('Download error:', error)
    }
  }

  const handleReset = () => {
    reset()
    clearFiles()
    form.resetFields()
    setPromptText('')
    setNegativePrompt('')
  }

  const isGenerating = videoState.status === 'generating' || videoState.status === 'polling'
  const isCompleted = videoState.status === 'completed'
  const hasError = videoState.status === 'error'

  const customUpload = {
    beforeUpload: (file: File) => {
      uploadFile(file)
      return false // Prevent default upload
    },
    showUploadList: false,
  }

  const uploadedFile = getCurrentFile()

  return (
    <Card className="w-full">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <Title level={3} className="!mb-2">
            Generate Video with Veo 3
          </Title>
          <Paragraph className="!text-gray-600">
            Create stunning videos from text prompts or images using Google&apos;s Veo 3 AI
          </Paragraph>
        </div>

        {/* Progress Display */}
        {isGenerating && (
          <Alert
            type="info"
            showIcon
            message={
              <div>
                <Text strong>
                  {videoState.status === 'generating' ? 'Starting video generation...' : 'Generating video...'}
                </Text>
                <Progress 
                  percent={videoState.progress} 
                  size="small" 
                  className="mt-2"
                  status={videoState.progress >= 90 ? 'active' : 'normal'}
                />
                {videoState.estimatedTimeRemaining && (
                  <Text type="secondary" className="text-sm">
                    Estimated time remaining: {formatDuration(Math.ceil(videoState.estimatedTimeRemaining / 1000))}
                  </Text>
                )}
              </div>
            }
          />
        )}

        {/* Success Display */}
        {isCompleted && (
          <Alert
            type="success"
            showIcon
            message="Video generated successfully!"
            description="Your video is ready for preview and download."
            action={
              <Button 
                type="primary" 
                icon={<DownloadOutlined />}
                onClick={handleDownload}
                size="small"
              >
                Download
              </Button>
            }
          />
        )}

        {/* Error Display */}
        {hasError && (
          <Alert
            type="error"
            showIcon
            message={
              videoState.error?.includes('quota') || videoState.error?.includes('rate limit') || videoState.error?.includes('RESOURCE_EXHAUSTED')
                ? "API Quota Exceeded"
                : "Video Generation Failed"
            }
            description={
              <div>
                {videoState.error?.includes('quota') || videoState.error?.includes('rate limit') || videoState.error?.includes('RESOURCE_EXHAUSTED') ? (
                  <div className="space-y-2">
                    <p>You have exceeded your Google Gemini API quota. Here&apos;s what you can do:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Check your <a href="https://console.cloud.google.com/billing" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Cloud billing account</a></li>
                      <li>Upgrade to a paid plan if using the free tier</li>
                      <li>Wait for quota reset (typically within 24 hours)</li>
                      <li>Try using &ldquo;Veo 3 Fast&rdquo; model for lower costs</li>
                    </ul>
                    <p className="text-sm">
                      <a 
                        href="https://ai.google.dev/gemini-api/docs/rate-limits" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 underline"
                      >
                        Learn more about API quotas →
                      </a>
                    </p>
                  </div>
                ) : (
                  videoState.error
                )}
              </div>
            }
            action={
              <Button size="small" onClick={handleReset}>
                {videoState.error?.includes('quota') || videoState.error?.includes('rate limit') ? 'Try Again Later' : 'Try Again'}
              </Button>
            }
          />
        )}

        {/* API Key Warning */}
        {!isConfigured && (
          <Alert
            message="API Key Required"
            description="Please configure your Gemini API key to start generating videos. Click the 'Configure API' button in the header or sidebar."
            type="warning"
            showIcon
            className="mb-6"
          />
        )}

        {/* Generation Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={isGenerating || !isConfigured}
        >
          {/* Image Upload */}
          <Form.Item label="Reference Image (Optional)">
            <div className="space-y-3">
              <Upload {...customUpload} accept="image/*">
                <Button 
                  icon={<UploadOutlined />}
                  loading={uploadState.isUploading}
                  disabled={!!uploadedFile}
                >
                  {uploadedFile ? 'Image Uploaded' : 'Upload Image'}
                </Button>
              </Upload>
              
              {uploadState.error && (
                <Text type="danger" className="text-sm">
                  {uploadState.error}
                </Text>
              )}
              
              {uploadedFile && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={uploadedFile.preview} 
                    alt="Uploaded" 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <Text strong className="block">{uploadedFile.file.name}</Text>
                    <Text type="secondary" className="text-sm">
                      {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </Text>
                  </div>
                  <Button size="small" onClick={() => clearFiles()}>
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </Form.Item>

          <Divider />

          {/* Prompt Input */}
          <Form.Item
            name="prompt"
            label="Video Prompt"
            rules={[
              { required: true, message: 'Please enter a video prompt' },
              { max: 1000, message: 'Prompt must be less than 1000 characters' }
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Describe the video you want to generate. Be specific about the scene, action, style, camera movement, and any audio elements..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              showCount
              maxLength={1000}
            />
          </Form.Item>

          {/* Negative Prompt */}
          <Form.Item
            name="negativePrompt"
            label="Negative Prompt (Optional)"
          >
            <TextArea
              rows={2}
              placeholder="Describe what you DON'T want in the video (e.g., 'blurry, low quality, cartoon style')"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              showCount
              maxLength={500}
            />
          </Form.Item>

          {/* Generation Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item name="model" label="Model" initialValue="veo-3.0-generate-001">
              <Select>
                <Option value="veo-3.0-generate-001">Veo 3 (Standard)</Option>
                <Option value="veo-3.0-fast-generate-001">Veo 3 Fast</Option>
              </Select>
            </Form.Item>

            <Form.Item name="aspectRatio" label="Aspect Ratio" initialValue="16:9">
              <Select>
                <Option value="16:9">16:9 (Landscape)</Option>
                <Option value="9:16">9:16 (Portrait)</Option>
              </Select>
            </Form.Item>

            <Form.Item name="resolution" label="Resolution" initialValue="720p">
              <Select>
                <Option value="720p">720p HD</Option>
                <Option value="1080p">1080p Full HD</Option>
              </Select>
            </Form.Item>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-4">
            {!isCompleted ? (
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                icon={<PlayCircleOutlined />}
                loading={isGenerating}
                disabled={!isConfigured}
                className="min-w-[160px]"
              >
                {isGenerating 
                  ? 'Generating...' 
                  : !isConfigured 
                    ? 'Configure API First' 
                    : 'Generate Video'
                }
              </Button>
            ) : (
              <Space>
                <Button
                  type="primary"
                  size="large"
                  icon={<DownloadOutlined />}
                  onClick={handleDownload}
                >
                  Download Video
                </Button>
                <Button
                  size="large"
                  onClick={handleReset}
                >
                  Generate Another
                </Button>
              </Space>
            )}
          </div>
        </Form>

        {/* Tips and Cost Information */}
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <Title level={5} className="!mb-2 !text-blue-800">
              💡 Tips for better results:
            </Title>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Be specific about camera movements, lighting, and style</li>
              <li>• Include audio descriptions like dialogue or sound effects</li>
              <li>• Mention specific actions and emotions for characters</li>
              <li>• Use reference images to guide the visual style</li>
              <li>• Video generation typically takes 1-6 minutes</li>
            </ul>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <Title level={5} className="!mb-2 !text-yellow-800">
              💰 Cost & Quota Information:
            </Title>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• <strong>Veo 3 Standard:</strong> $0.75 per second (~$4.50 for 6-second video)</li>
              <li>• <strong>Veo 3 Fast:</strong> $0.40 per second (~$2.40 for 6-second video)</li>
              <li>• Free tier has limited quota - consider upgrading for regular use</li>
              <li>• Quotas reset daily - try again tomorrow if exceeded</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  )
}