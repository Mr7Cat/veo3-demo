'use client'

import React, { useState } from 'react'
import { 
  Modal, 
  Form, 
  Input, 
  Button, 
  Typography, 
  Alert, 
  Space, 
  message,
  Divider 
} from 'antd'
import { KeyOutlined, EyeInvisibleOutlined, EyeTwoTone, CheckCircleOutlined } from '@ant-design/icons'
import { useApiKey } from '@/contexts/ApiKeyContext'

const { Title, Paragraph, Text, Link } = Typography

interface ApiKeyModalProps {
  visible: boolean
  onCancel: () => void
  onConfigured?: () => void
}

export default function ApiKeyModal({ visible, onCancel, onConfigured }: ApiKeyModalProps) {
  const [form] = Form.useForm()
  const { apiKey, isConfigured, setApiKey, clearApiKey, validateApiKey } = useApiKey()
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean
    message: string
  } | null>(null)

  const handleSubmit = async (values: { apiKey: string }) => {
    try {
      setIsValidating(true)
      setValidationResult(null)

      const isValid = await validateApiKey(values.apiKey)
      
      if (isValid) {
        setApiKey(values.apiKey)
        setValidationResult({
          isValid: true,
          message: 'API key configured successfully!'
        })
        message.success('API key configured successfully!')
        
        setTimeout(() => {
          onConfigured?.()
          onCancel()
        }, 1500)
      } else {
        setValidationResult({
          isValid: false,
          message: 'Invalid API key format. Please check your key and try again.'
        })
      }
    } catch (error) {
      console.error('API key validation error:', error)
      setValidationResult({
        isValid: false,
        message: 'Failed to validate API key. Please try again.'
      })
    } finally {
      setIsValidating(false)
    }
  }

  const handleClearKey = () => {
    clearApiKey()
    form.resetFields()
    setValidationResult(null)
    message.info('API key cleared')
  }

  const handleCancel = () => {
    setValidationResult(null)
    form.resetFields()
    onCancel()
  }

  return (
    <Modal
      title={
        <Space>
          <KeyOutlined />
          <span>Configure Gemini API Key</span>
        </Space>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className="space-y-6">
        {/* Status Display */}
        {isConfigured && (
          <Alert
            message="API Key Configured"
            description="Your Gemini API key is already configured and ready to use."
            type="success"
            icon={<CheckCircleOutlined />}
            showIcon
            action={
              <Button size="small" danger onClick={handleClearKey}>
                Clear Key
              </Button>
            }
          />
        )}

        {/* Instructions */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <Title level={5} className="!mb-2 !text-blue-800">
            How to get your Gemini API Key:
          </Title>
          <div className="space-y-2 text-sm text-blue-700">
            <div>1. Go to <Link href="https://aistudio.google.com/app/apikey" target="_blank">Google AI Studio</Link></div>
            <div>2. Sign in with your Google account</div>
            <div>3. Click &ldquo;Create API Key&rdquo; and select your project</div>
            <div>4. Copy the generated API key and paste it below</div>
            <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
              <strong>Note:</strong> Veo 3 requires a paid plan. Free tier only includes basic Gemini models.
            </div>
          </div>
        </div>

        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ apiKey: apiKey || '' }}
        >
          <Form.Item
            name="apiKey"
            label="Gemini API Key"
            rules={[
              { required: true, message: 'Please enter your API key' },
              { min: 10, message: 'API key seems too short' }
            ]}
          >
            <Input.Password
              placeholder="Enter your Gemini API key..."
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              size="large"
              disabled={isValidating}
            />
          </Form.Item>

          {/* Validation Result */}
          {validationResult && (
            <Alert
              message={validationResult.message}
              type={validationResult.isValid ? 'success' : 'error'}
              showIcon
              className="mb-4"
            />
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button onClick={handleCancel}>
              Cancel
            </Button>
            
            <Space>
              {isConfigured && (
                <Button danger onClick={handleClearKey}>
                  Clear Key
                </Button>
              )}
              <Button
                type="primary"
                htmlType="submit"
                loading={isValidating}
                size="large"
              >
                {isValidating ? 'Validating...' : 'Save API Key'}
              </Button>
            </Space>
          </div>
        </Form>

        <Divider />

        {/* Security Notice */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <Title level={5} className="!mb-2 !text-yellow-800">
            🔒 Security Notice:
          </Title>
          <ul className="text-sm text-yellow-700 space-y-1 mb-0">
            <li>• Your API key is stored locally in your browser</li>
            <li>• We never send your API key to our servers</li>
            <li>• Clear your browser data to remove the stored key</li>
            <li>• Never share your API key with others</li>
            <li>• You can regenerate your key anytime in Google AI Studio</li>
          </ul>
        </div>
      </div>
    </Modal>
  )
}