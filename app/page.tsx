'use client'

import React, { useState } from 'react'
import { Layout, Typography, Card, Row, Col, Button, Space, Avatar } from 'antd'
import { PlayCircleOutlined, KeyOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { VideoCameraIcon, SparklesIcon, CogIcon } from '@heroicons/react/24/outline'
import VideoGenerationForm from '@/components/ui/VideoGenerationForm'
import DemoExamples from '@/components/ui/DemoExamples'
import VideoPlayer from '@/components/ui/VideoPlayer'
import ApiKeyModal from '@/components/ui/ApiKeyModal'
import ChatWidget from '@/components/ui/ChatWidget'
import { useApiKey } from '@/contexts/ApiKeyContext'
import { VideoGenerationRequest } from '@/lib/schemas'

const { Header, Content, Footer } = Layout
const { Title, Paragraph } = Typography

export default function Home() {
  const [selectedExample, setSelectedExample] = useState<VideoGenerationRequest | null>(null)
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null)
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)
  const { isConfigured } = useApiKey()

  const handleExampleSelect = (example: VideoGenerationRequest) => {
    setSelectedExample(example)
    // Scroll to form section
    document.getElementById('video-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleVideoGenerated = (videoUrl: string) => {
    setGeneratedVideoUrl(videoUrl)
    // Scroll to video player
    document.getElementById('video-result')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleOpenApiKeyModal = () => {
    setShowApiKeyModal(true)
  }

  const handleCloseApiKeyModal = () => {
    setShowApiKeyModal(false)
  }
  return (
    <Layout className="min-h-screen">
      {/* Header */}
      <Header className="bg-white shadow-sm border-b border-gray-200 px-6">
        <div className="flex items-center justify-between h-full max-w-screen-2xl mx-auto">
          <div className="flex items-center space-x-3">
            <Avatar size={40} className="bg-blue-500">
              <VideoCameraIcon className="w-6 h-6" />
            </Avatar>
            <Title level={3} className="!mb-0 !text-gray-900">
              VEO Web UI
            </Title>
          </div>
          <Space>
            <Button 
              icon={isConfigured ? <CheckCircleOutlined /> : <KeyOutlined />}
              type={isConfigured ? "default" : "primary"}
              onClick={handleOpenApiKeyModal}
            >
              {isConfigured ? 'API Configured' : 'Configure API'}
            </Button>
          </Space>
        </div>
      </Header>

      {/* Main Content */}
      <Content className="bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Title level={1} className="!text-4xl !font-bold !text-gray-900 !mb-4">
              AI Video Generation Platform
            </Title>
            <Paragraph className="!text-xl !text-gray-600 max-w-3xl mx-auto">
              Generate stunning videos using Google&apos;s Veo 3 API with an intuitive Material Design interface. 
              Transform your ideas into cinematic videos with cutting-edge AI technology.
            </Paragraph>
          </div>

          {/* Main Generation Section */}
          <Row gutter={[24, 24]} id="video-form">
            {/* Left Sidebar - Demo Examples */}
            <Col xs={24} lg={5}>
              <Card 
                title="Demo Examples"
                className="shadow-lg border-0 !rounded-2xl sticky top-6"
                styles={{ 
                  body: { padding: '16px' },
                  header: { borderBottom: '1px solid #f0f0f0' }
                }}
              >
                <DemoExamples onSelectExample={handleExampleSelect} />
              </Card>
            </Col>

            {/* Center - Video Generation Form */}
            <Col xs={24} lg={12}>
              <Card 
                className="shadow-lg border-0 !rounded-2xl"
                styles={{ body: { padding: '32px' } }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <SparklesIcon className="w-6 h-6 text-white" />
                  </div>
                  <Title level={2} className="!mb-2">
                    Create Your Video
                  </Title>
                  <Paragraph className="!text-gray-600">
                    Enter a prompt or upload an image to generate your AI video
                  </Paragraph>
                </div>

                <VideoGenerationForm 
                  onVideoGenerated={handleVideoGenerated}
                  initialData={selectedExample || undefined}
                />
              </Card>
            </Col>

            {/* Right Sidebar */}
            <Col xs={24} lg={7}>
              <Space direction="vertical" size="large" className="w-full">
                {/* Video Result */}
                <div id="video-result">
                  {generatedVideoUrl ? (
                    <VideoPlayer 
                      videoUrl={generatedVideoUrl}
                      onDownload={async () => {
                        // Download handled by VideoPlayer
                      }}
                      className="shadow-lg border-0 !rounded-2xl"
                    />
                  ) : (
                    <Card 
                      title="Video Preview" 
                      className="shadow-lg border-0 !rounded-2xl"
                      styles={{ body: { padding: '24px' } }}
                    >
                      <div className="text-center py-8">
                        <PlayCircleOutlined className="text-4xl text-gray-300 mb-3" />
                        <Paragraph className="!text-gray-500">
                          Your generated video will appear here
                        </Paragraph>
                      </div>
                    </Card>
                  )}
                </div>

                {/* API Configuration Card */}
                <Card 
                  title="API Configuration" 
                  className="shadow-lg border-0 !rounded-2xl"
                  styles={{ body: { padding: '24px' } }}
                >
                  <Paragraph className="!text-gray-600 !mb-4">
                    {isConfigured 
                      ? 'Your Gemini API is configured and ready to use'
                      : 'Configure your Gemini API key to start generating videos'
                    }
                  </Paragraph>
                  <Button 
                    type={isConfigured ? "default" : "primary"}
                    className="w-full !rounded-lg"
                    icon={isConfigured ? <CheckCircleOutlined /> : <KeyOutlined />}
                    onClick={handleOpenApiKeyModal}
                  >
                    {isConfigured ? 'Manage API Key' : 'Configure API Key'}
                  </Button>
                </Card>

                {/* Tips Card */}
                <Card 
                  title="Quick Tips" 
                  className="shadow-lg border-0 !rounded-2xl"
                  styles={{ body: { padding: '24px' } }}
                >
                  <div className="space-y-2">
                    <Paragraph className="!text-sm !mb-1">
                      • Try the demo examples for quick start
                    </Paragraph>
                    <Paragraph className="!text-sm !mb-1">
                      • Be specific in your prompts for better results
                    </Paragraph>
                    <Paragraph className="!text-sm !mb-0">
                      • Video generation takes 1-6 minutes
                    </Paragraph>
                  </div>
                </Card>

                {/* AI Chat Assistant */}
                <ChatWidget />
              </Space>
            </Col>
          </Row>
        </div>
      </Content>

      {/* Footer */}
      <Footer className="bg-white border-t border-gray-200 text-center">
        <Paragraph className="!text-gray-500 !mb-0">
          VEO Web UI - Powered by Google&apos;s Veo 3 API © 2024
        </Paragraph>
      </Footer>


      {/* API Key Configuration Modal */}
      <ApiKeyModal
        visible={showApiKeyModal}
        onCancel={handleCloseApiKeyModal}
        onConfigured={handleCloseApiKeyModal}
      />
    </Layout>
  )
}