// types/colibri.ts

export type ColibriLevel = 'N0' | 'N1'

export type NFTOrigin = 'purchased' | 'donated'

export interface Entrepreneur {
  walletAddress: string
  displayName: string
  country: string
  email?: string
}

export interface Patron {
  walletAddress: string
  displayName: string
}

export interface ColibriNFT {
  tokenId: string
  level: ColibriLevel
  origin: NFTOrigin
  entrepreneurWallet: string
  patronWallet?: string | null
  projectName: string
  projectDescription: string
  country: string
  createdAt: string // ISO date
}
