'use client'

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'

export interface ApiKeyContextType {
  apiKey: string | null
  isConfigured: boolean
  setApiKey: (key: string) => void
  clearApiKey: () => void
  validateApiKey: (key: string) => Promise<boolean>
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined)

const API_KEY_STORAGE_KEY = 'veo-web-ui-api-key'

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string | null>(null)
  const [isConfigured, setIsConfigured] = useState(false)

  // Load API key from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY)
      if (storedKey) {
        setApiKeyState(storedKey)
        setIsConfigured(true)
      }
    }
  }, [])

  const setApiKey = useCallback((key: string) => {
    if (typeof window !== 'undefined') {
      if (key.trim()) {
        localStorage.setItem(API_KEY_STORAGE_KEY, key.trim())
        setApiKeyState(key.trim())
        setIsConfigured(true)
      } else {
        localStorage.removeItem(API_KEY_STORAGE_KEY)
        setApiKeyState(null)
        setIsConfigured(false)
      }
    }
  }, [])

  const clearApiKey = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(API_KEY_STORAGE_KEY)
      setApiKeyState(null)
      setIsConfigured(false)
    }
  }, [])

  const validateApiKey = useCallback(async (key: string): Promise<boolean> => {
    try {
      const trimmedKey = key.trim()
      
      // Basic validation: API keys typically start with certain prefixes
      if (!trimmedKey || trimmedKey.length < 10) {
        return false
      }

      // You could make a test API call here to validate the key
      return true
    } catch (error) {
      console.error('API key validation error:', error)
      return false
    }
  }, [])

  return (
    <ApiKeyContext.Provider value={{
      apiKey,
      isConfigured,
      setApiKey,
      clearApiKey,
      validateApiKey,
    }}>
      {children}
    </ApiKeyContext.Provider>
  )
}

export function useApiKey(): ApiKeyContextType {
  const context = useContext(ApiKeyContext)
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider')
  }
  return context
}