'use client'

import React from 'react'
import { Card, Button, Typography, Space, Tag, message } from 'antd'
import { PlayCircleOutlined, PictureOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { VideoGenerationRequest } from '@/lib/schemas'

const { Title, Paragraph, Text } = Typography

interface DemoExample {
  id: string
  title: string
  description: string
  prompt: string
  negativePrompt?: string
  category: 'cinematic' | 'nature' | 'portrait' | 'abstract' | 'action'
  aspectRatio: '16:9' | '9:16'
  resolution: '720p' | '1080p'
  model: 'veo-3.0-generate-001' | 'veo-3.0-fast-generate-001'
  estimatedTime: string
  tags: string[]
}

const demoExamples: DemoExample[] = [
  {
    id: 'cinematic-dialogue',
    title: 'Cinematic Dialogue Scene',
    description: 'Two people discovering a mysterious code with dramatic lighting',
    prompt: `A close up of two people staring at a cryptic drawing on a wall, torchlight flickering. A man murmurs, 'This must be it. That's the secret code.' The woman looks at him and whispering excitedly, 'What did you find?'`,
    negativePrompt: 'blurry, low quality, cartoon, animated',
    category: 'cinematic',
    aspectRatio: '16:9',
    resolution: '1080p',
    model: 'veo-3.0-generate-001',
    estimatedTime: '3-6 min',
    tags: ['Dialogue', 'Drama', 'Mystery', 'Cinematic']
  },
  {
    id: 'nature-kitten',
    title: 'Peaceful Nature Scene',
    description: 'A calico kitten sleeping peacefully in warm sunshine',
    prompt: 'Panning wide shot of a calico kitten sleeping in the sunshine on a wooden deck, soft natural lighting, peaceful ambiance with gentle breeze moving through nearby plants',
    negativePrompt: 'dark, gloomy, artificial lighting, noise',
    category: 'nature',
    aspectRatio: '16:9',
    resolution: '720p',
    model: 'veo-3.0-fast-generate-001',
    estimatedTime: '1-3 min',
    tags: ['Animals', 'Nature', 'Peaceful', 'Outdoors']
  },
  {
    id: 'portrait-coffee',
    title: 'Morning Portrait',
    description: 'Person enjoying morning coffee with warm, natural lighting',
    prompt: 'Medium close-up of a person sitting by a large window, holding a steaming coffee mug, golden morning light streaming in, peaceful expression, soft focus background',
    negativePrompt: 'harsh lighting, artificial, plastic',
    category: 'portrait',
    aspectRatio: '9:16',
    resolution: '720p',
    model: 'veo-3.0-generate-001',
    estimatedTime: '2-4 min',
    tags: ['Portrait', 'Morning', 'Lifestyle', 'Cozy']
  },
  {
    id: 'action-skateboard',
    title: 'Urban Action Scene',
    description: 'Dynamic skateboarding sequence in urban environment',
    prompt: 'Dynamic tracking shot of a skateboarder performing tricks in an urban skate park, slow motion capture of the board flipping, concrete textures, afternoon golden hour lighting',
    negativePrompt: 'static, boring, low energy, dark',
    category: 'action',
    aspectRatio: '16:9',
    resolution: '1080p',
    model: 'veo-3.0-generate-001',
    estimatedTime: '3-5 min',
    tags: ['Sports', 'Urban', 'Dynamic', 'Youth']
  },
  {
    id: 'abstract-particles',
    title: 'Abstract Motion',
    description: 'Flowing abstract particles with ethereal movement',
    prompt: 'Abstract flowing particles of light in deep blue and purple colors, smooth organic movement, ethereal and dreamlike atmosphere, soft bokeh effects',
    negativePrompt: 'realistic, photographic, harsh edges, static',
    category: 'abstract',
    aspectRatio: '16:9',
    resolution: '720p',
    model: 'veo-3.0-fast-generate-001',
    estimatedTime: '1-2 min',
    tags: ['Abstract', 'Motion', 'Artistic', 'Ethereal']
  },
  {
    id: 'cinematic-forest',
    title: 'Mystical Forest',
    description: 'Ethereal forest scene with magical atmosphere',
    prompt: 'Slow dolly shot through a mystical forest with rays of sunlight filtering through ancient trees, floating particles of pollen, magical and serene atmosphere, soft focus depth of field',
    negativePrompt: 'dark, scary, horror, dead trees',
    category: 'nature',
    aspectRatio: '16:9',
    resolution: '1080p',
    model: 'veo-3.0-generate-001',
    estimatedTime: '4-6 min',
    tags: ['Forest', 'Mystical', 'Nature', 'Cinematic']
  }
]

interface DemoExamplesProps {
  onSelectExample?: (example: VideoGenerationRequest) => void
  className?: string
}

const categoryColors = {
  cinematic: 'purple',
  nature: 'green',
  portrait: 'blue',
  abstract: 'orange',
  action: 'red'
} as const

const categoryIcons = {
  cinematic: <PlayCircleOutlined />,
  nature: <PictureOutlined />,
  portrait: <PlayCircleOutlined />,
  abstract: <ThunderboltOutlined />,
  action: <ThunderboltOutlined />
} as const

export default function DemoExamples({ onSelectExample, className }: DemoExamplesProps) {
  const handleSelectExample = (example: DemoExample) => {
    if (onSelectExample) {
      const videoRequest: VideoGenerationRequest = {
        prompt: example.prompt,
        negativePrompt: example.negativePrompt,
        aspectRatio: example.aspectRatio,
        resolution: example.resolution,
        model: example.model
      }
      
      onSelectExample(videoRequest)
      message.success(`Selected: ${example.title}`)
    }
  }

  return (
    <div className={className}>
      {/* Vertical layout with smaller cards */}
      <Space direction="vertical" size="small" className="w-full">
        {demoExamples.map((example) => (
          <Card
            key={example.id}
            className="hover:shadow-md transition-shadow cursor-pointer !rounded-lg"
            size="small"
            onClick={() => handleSelectExample(example)}
            styles={{ body: { padding: '12px' } }}
          >
            <div className="space-y-2">
              {/* Header */}
              <div className="flex items-center justify-between">
                <Tag 
                  color={categoryColors[example.category]} 
                  icon={categoryIcons[example.category]}
                  className="!m-0 !text-xs !py-0 !px-1"
                >
                  {example.category.charAt(0).toUpperCase() + example.category.slice(1)}
                </Tag>
                <Text className="text-xs text-gray-400">
                  {example.estimatedTime}
                </Text>
              </div>

              {/* Title */}
              <div>
                <Title level={5} className="!mb-1 !text-sm !text-gray-900">
                  {example.title}
                </Title>
                <Paragraph className="!text-xs !text-gray-600 !mb-0 line-clamp-2">
                  {example.description}
                </Paragraph>
              </div>

              {/* Action Button */}
              <Button 
                type="primary" 
                size="small" 
                icon={<PlayCircleOutlined />}
                className="w-full !h-7 !text-xs"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelectExample(example)
                }}
              >
                Use Example
              </Button>
            </div>
          </Card>
        ))}
      </Space>

      {/* Compact Usage Tips */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <Title level={5} className="!mb-1 !text-sm !text-blue-800">
          💡 Tips:
        </Title>
        <ul className="text-xs text-blue-700 space-y-0.5 mb-0">
          <li>• Click to auto-fill form</li>
          <li>• Modify prompts as needed</li>
          <li>• Standard = quality, Fast = speed</li>
        </ul>
      </div>
    </div>
  )
}