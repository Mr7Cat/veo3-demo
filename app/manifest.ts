import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VEO Web UI - AI Video Generation Platform',
    short_name: 'VEO Web UI',
    description: 'Generate stunning videos using Google\'s Veo 3 API with an intuitive Material Design interface',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['productivity', 'video', 'artificial-intelligence'],
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
  }
}