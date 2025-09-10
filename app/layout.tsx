import type { Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import { ApiKeyProvider } from '@/contexts/ApiKeyContext'
import './globals.css'

const theme = {
  token: {
    colorPrimary: '#0ea5e9',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    borderRadius: 8,
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    colorBgBase: '#ffffff',
    colorTextBase: '#1f2937',
  },
}

export const metadata: Metadata = {
  title: {
    default: 'VEO Web UI - AI Video Generation Platform',
    template: '%s | VEO Web UI'
  },
  description: 'Generate stunning videos using Google\'s Veo 3 API with an intuitive Material Design interface. Transform your ideas into cinematic videos with cutting-edge AI technology.',
  keywords: [
    'AI video generation',
    'Veo 3',
    'Google AI',
    'video creation',
    'text to video',
    'image to video',
    'artificial intelligence',
    'video editing',
    'AI video maker',
    'Google Gemini',
    'video generation API'
  ],
  authors: [{ name: 'VEO Web UI Team' }],
  creator: 'VEO Web UI',
  publisher: 'VEO Web UI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'VEO Web UI - AI Video Generation Platform',
    description: 'Generate stunning videos using Google\'s Veo 3 API with an intuitive Material Design interface. Transform your ideas into cinematic videos with cutting-edge AI technology.',
    siteName: 'VEO Web UI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VEO Web UI - AI Video Generation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VEO Web UI - AI Video Generation Platform',
    description: 'Generate stunning videos using Google\'s Veo 3 API with an intuitive Material Design interface.',
    images: ['/twitter-image.png'],
    creator: '@veoweb',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <ApiKeyProvider>
              {children}
            </ApiKeyProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}