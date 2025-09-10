'use client'

import { useState, useCallback } from 'react'
import { fileToBase64, isValidImageFile, formatFileSize } from '@/lib/utils'

export interface UploadedFile {
  file: File
  preview: string
  base64: string
  mimeType: string
}

export interface FileUploadState {
  files: UploadedFile[]
  isUploading: boolean
  error: string | null
}

export interface UseFileUploadResult {
  state: FileUploadState
  uploadFile: (file: File) => Promise<void>
  removeFile: (index: number) => void
  clearFiles: () => void
  getCurrentFile: () => UploadedFile | null
}

export function useFileUpload(): UseFileUploadResult {
  const [state, setState] = useState<FileUploadState>({
    files: [],
    isUploading: false,
    error: null,
  })

  const uploadFile = useCallback(async (file: File) => {
    try {
      setState(prev => ({
        ...prev,
        isUploading: true,
        error: null,
      }))

      // Validate file
      if (!isValidImageFile(file)) {
        throw new Error(
          `Invalid file. Please upload a JPEG, PNG, or WebP image under ${formatFileSize(10 * 1024 * 1024)}.`
        )
      }

      console.log('Processing file:', {
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
      })

      // Create preview URL
      const preview = URL.createObjectURL(file)

      // Convert to base64
      const base64 = await fileToBase64(file)

      const uploadedFile: UploadedFile = {
        file,
        preview,
        base64,
        mimeType: file.type,
      }

      setState(prev => ({
        ...prev,
        files: [uploadedFile], // Only keep one file for now
        isUploading: false,
      }))

      console.log('File uploaded successfully:', file.name)
    } catch (error) {
      console.error('File upload error:', error)
      setState(prev => ({
        ...prev,
        isUploading: false,
        error: error instanceof Error ? error.message : 'Failed to upload file',
      }))
    }
  }, [])

  const removeFile = useCallback((index: number) => {
    setState(prev => {
      const newFiles = [...prev.files]
      const removedFile = newFiles[index]
      
      // Revoke object URL to free memory
      if (removedFile?.preview) {
        URL.revokeObjectURL(removedFile.preview)
      }
      
      newFiles.splice(index, 1)
      
      return {
        ...prev,
        files: newFiles,
        error: null,
      }
    })
  }, [])

  const clearFiles = useCallback(() => {
    setState(prev => {
      // Revoke all object URLs
      prev.files.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
      
      return {
        files: [],
        isUploading: false,
        error: null,
      }
    })
  }, [])

  const getCurrentFile = useCallback((): UploadedFile | null => {
    return state.files.length > 0 ? state.files[0] : null
  }, [state.files])

  return {
    state,
    uploadFile,
    removeFile,
    clearFiles,
    getCurrentFile,
  }
}