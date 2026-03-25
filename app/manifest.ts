import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Single Bet Calculator',
    short_name: 'BetCalc',
    description: 'Free bet calculator — single, accumulator, each way and more',
    start_url: '/',
    display: 'standalone',
    background_color: '#F0F4FF',
    theme_color: '#2563EB',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
