// lib/web3/wagmiConfig.ts
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
  chains: [sepolia, mainnet],
  connectors: [
    injected(), // MetaMask / Brave / inyectados en el navegador
  ],
  transports: {
    [sepolia.id]: http(), // RPC público para testnet
    [mainnet.id]: http(), // por si luego lees algo de mainnet
  },
  ssr: true, // bueno para Next con app router
})
