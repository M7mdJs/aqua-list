import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aqualist.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'AquaList - The Ultimate Discord Bot Directory',
  description: 'Discover the perfect Discord bots for your server. Browse thousands of verified bots, read reviews, and find the best tools to enhance your Discord community.',
  keywords: ['discord bots', 'bot list', 'discord bot directory', 'bot discovery', 'discord tools'],
  authors: [{ name: 'AquaList Team' }],
  creator: 'AquaList',
  publisher: 'AquaList',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: 'AquaList - The Ultimate Discord Bot Directory',
    description: 'Discover the perfect Discord bots for your server. Browse thousands of verified bots, read reviews, and find the best tools to enhance your Discord community.',
    siteName: 'AquaList',
    images: [{
      url: 'https://aqua-cdn-nine.vercel.app/assets/opengraph-image.png',
      width: 1200,
      height: 630,
      alt: 'AquaList - Discord Bot Directory'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AquaList - The Ultimate Discord Bot Directory',
    description: 'Discover the perfect Discord bots for your server. Browse thousands of verified bots, read reviews, and find the best tools to enhance your Discord community.',
    creator: '@aqualist',
    images: ['https://aqua-cdn-nine.vercel.app/assets/opengraph-image.png']
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
  alternates: {
    canonical: baseUrl,
  },
  category: 'Technology',
}