import { z } from 'zod'

// Video generation request schema
export const videoGenerationSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required').max(1000, 'Prompt must be less than 1000 characters'),
  negativePrompt: z.string().max(500, 'Negative prompt must be less than 500 characters').optional(),
  aspectRatio: z.enum(['16:9', '9:16']).default('16:9'),
  resolution: z.enum(['720p', '1080p']).default('720p'),
  model: z.enum(['veo-3.0-generate-001', 'veo-3.0-fast-generate-001']).default('veo-3.0-generate-001'),
  image: z.object({
    imageBytes: z.string(),
    mimeType: z.string(),
  }).optional(),
})

export type VideoGenerationRequest = z.infer<typeof videoGenerationSchema>

// Operation polling schema
export const operationPollingSchema = z.object({
  operationName: z.string().min(1, 'Operation name is required'),
})

export type OperationPollingRequest = z.infer<typeof operationPollingSchema>

// File upload schema
export const fileUploadSchema = z.object({
  file: z.instanceof(File, { message: 'Valid file is required' }),
  maxSize: z.number().default(10 * 1024 * 1024), // 10MB default
  allowedTypes: z.array(z.string()).default(['image/jpeg', 'image/png', 'image/webp']),
})

export type FileUploadRequest = z.infer<typeof fileUploadSchema>

// API key configuration schema
export const apiKeyConfigSchema = z.object({
  apiKey: z.string().min(1, 'API key is required'),
})

export type ApiKeyConfigRequest = z.infer<typeof apiKeyConfigSchema>

// Video operation response schema
export const videoOperationSchema = z.object({
  name: z.string(),
  done: z.boolean(),
  response: z.object({
    generatedVideos: z.array(z.object({
      video: z.object({
        uri: z.string(),
      }),
    })),
  }).optional(),
  error: z.object({
    message: z.string(),
    code: z.number(),
  }).optional(),
})

export type VideoOperationResponse = z.infer<typeof videoOperationSchema>

// Common API response schemas
export const successResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  message: z.string().optional(),
})

export const errorResponseSchema = z.object({
  success: z.boolean().default(false),
  error: z.string(),
  details: z.any().optional(),
})

export type SuccessResponse = z.infer<typeof successResponseSchema>
export type ErrorResponse = z.infer<typeof errorResponseSchema>