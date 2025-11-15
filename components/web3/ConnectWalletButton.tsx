// components/web3/ConnectWalletButton.tsx
'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function ConnectWalletButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  // Tomamos el primer conector disponible (normalmente MetaMask / injected)
  const injectedConnector = connectors[0]

  if (isConnected) {
    return (
      <button
        onClick={() => disconnect()}
        className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium shadow-md"
      >
        {address?.slice(0, 6)}…
        {address?.slice(-4)} (Salir)
      </button>
    )
  }

  return (
    <button
      onClick={() =>
        injectedConnector ? connect({ connector: injectedConnector }) : null
      }
      disabled={isPending || !injectedConnector}
      className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium shadow-md disabled:opacity-60"
    >
      {isPending ? 'Conectando…' : 'Conectar wallet'}
    </button>
  )
}
