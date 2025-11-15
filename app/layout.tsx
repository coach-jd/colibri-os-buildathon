import type { Metadata } from 'next'
import './globals.css'
import { Web3Providers } from '@/components/web3/Web3Providers'

export const metadata: Metadata = {
  title: 'Colibrí OS Buildathon',
  description:
    'Prototipo Colibrí OS: NFT Colibrí N0, microacciones y evidencias N0→N1 sobre Story Protocol.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-slate-50">
        <Web3Providers>{children}</Web3Providers>
      </body>
    </html>
  )
}
