'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  Card, 
  Input, 
  Button, 
  Typography, 
  Space, 
  Alert,
  Collapse,
  Avatar,
  Tooltip
} from 'antd'
import { 
  MessageOutlined, 
  SendOutlined, 
  UserOutlined, 
  RobotOutlined, 
  ClearOutlined,
  BulbOutlined,
  MinusOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { useChat, ChatMessage } from '@/hooks/useChat'
import { useApiKey } from '@/contexts/ApiKeyContext'

const { TextArea } = Input
const { Text, Paragraph } = Typography
const { Panel } = Collapse

interface ChatWidgetProps {
  className?: string
}

export default function ChatWidget({ className }: ChatWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, isLoading, error, sendMessage, clearMessages, setError } = useChat()
  const { isConfigured } = useApiKey()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !isConfigured) return
    
    const message = inputValue.trim()
    setInputValue('')
    await sendMessage(message)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedQuestions = [
    "How do I write better video prompts?",
    "What's the difference between Veo 3 Standard and Fast?",
    "How to fix API quota exceeded errors?",
    "Best practices for image-to-video generation?"
  ]

  if (!isExpanded) {
    return (
      <div className={className}>
        <Button
          type="primary"
          icon={<MessageOutlined />}
          onClick={() => setIsExpanded(true)}
          className="w-full !rounded-lg"
          size="large"
        >
          AI Assistant
        </Button>
      </div>
    )
  }

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <Space>
            <RobotOutlined className="text-blue-500" />
            <span>VEO AI Assistant</span>
          </Space>
          <Space>
            <Tooltip title="Clear conversation">
              <Button 
                size="small" 
                icon={<ClearOutlined />} 
                onClick={clearMessages}
                disabled={messages.length === 0}
              />
            </Tooltip>
            <Button 
              size="small" 
              icon={<MinusOutlined />} 
              onClick={() => setIsExpanded(false)}
            />
          </Space>
        </div>
      }
      className={`shadow-lg border-0 !rounded-2xl ${className}`}
      styles={{ body: { padding: '16px' } }}
    >
      <div className="space-y-4">
        {/* API Key Warning */}
        {!isConfigured && (
          <Alert
            message="API Key Required"
            description="Please configure your Gemini API key to use the AI assistant."
            type="warning"
            showIcon
            className="mb-4"
          />
        )}

        {/* Messages Container */}
        <div 
          className="h-96 overflow-y-auto p-3 bg-gray-50 rounded-lg space-y-3"
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: '#cbd5e0 #f7fafc' 
          }}
        >
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <RobotOutlined className="text-2xl mb-2" />
              <p className="text-sm">
                Hi! I&apos;m your VEO assistant. Ask me anything about video generation!
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border shadow-sm'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <Avatar
                      size="small"
                      icon={
                        message.role === 'user' ? (
                          <UserOutlined />
                        ) : (
                          <RobotOutlined />
                        )
                      }
                      className={
                        message.role === 'user'
                          ? 'bg-blue-600'
                          : 'bg-green-500'
                      }
                    />
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm leading-relaxed ${
                          message.role === 'user'
                            ? 'text-white'
                            : 'text-gray-800'
                        }`}
                        style={{ 
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          hyphens: 'auto',
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {message.content}
                      </div>
                      <Text
                        className={`text-xs ${
                          message.role === 'user'
                            ? 'text-blue-100'
                            : 'text-gray-400'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>

              {/* Show thinking process if available */}
              {message.thinking && message.role === 'assistant' && (
                <Collapse ghost size="small">
                  <Panel
                    header={
                      <Text className="text-xs text-gray-500">
                        <BulbOutlined /> View thinking process
                      </Text>
                    }
                    key="thinking"
                  >
                    <div className="bg-yellow-50 p-2 rounded text-xs text-gray-600 italic">
                      {message.thinking}
                    </div>
                  </Panel>
                </Collapse>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border shadow-sm rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <Avatar size="small" icon={<RobotOutlined />} className="bg-green-500" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error Display */}
        {error && (
          <Alert
            message={
              error.includes('quota') || error.includes('exceeded') || error.includes('limit')
                ? "API Quota Exceeded"
                : "Chat Error"
            }
            description={
              error.includes('quota') || error.includes('exceeded') || error.includes('limit') ? (
                <div className="space-y-2">
                  <p>Your Gemini API quota has been exceeded.</p>
                  <ul className="text-xs space-y-1 list-disc list-inside">
                    <li>Free tier has daily/minute limits</li>
                    <li>Upgrade to paid plan for higher limits</li>
                    <li>Try again later (quotas reset daily)</li>
                  </ul>
                  <a 
                    href="https://ai.google.dev/gemini-api/docs/rate-limits" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 underline text-xs"
                  >
                    Learn more about quotas →
                  </a>
                </div>
              ) : (
                error
              )
            }
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
          />
        )}

        {/* Suggested Questions */}
        {messages.length === 0 && isConfigured && (
          <div className="space-y-2">
            <Text className="text-xs text-gray-500">Suggested questions:</Text>
            <div className="space-y-1">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  size="small"
                  type="text"
                  className="w-full text-left !h-auto !p-2 text-xs"
                  onClick={() => {
                    setInputValue(question)
                  }}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="space-y-2">
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              isConfigured 
                ? "Ask me about VEO video generation..."
                : "Configure API key to start chatting..."
            }
            disabled={!isConfigured || isLoading}
            rows={2}
            maxLength={500}
            showCount
          />
          <div className="flex justify-between items-center">
            <Text className="text-xs text-gray-500">
              Press Enter to send, Shift+Enter for new line
            </Text>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading || !isConfigured}
              size="small"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}