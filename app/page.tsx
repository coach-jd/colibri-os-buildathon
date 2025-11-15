'use client'

import { useState, FormEvent } from 'react'
import { useAccount } from 'wagmi'
import { ConnectWalletButton } from '@/components/web3/ConnectWalletButton'
import type { ColibriNFT, NFTOrigin } from '@/types/colibri'

type Step = 'connect' | 'init' | 'summary'

export default function Home() {
  const { address, isConnected } = useAccount()
  const [step, setStep] = useState<Step>('connect')
  const [nft, setNft] = useState<ColibriNFT | null>(null)

  // Campos del formulario
  const [origin, setOrigin] = useState<NFTOrigin>('purchased')
  const [patronWallet, setPatronWallet] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [country, setCountry] = useState('')
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [email, setEmail] = useState('')

  // Cuando se conecte la wallet por primera vez, pasamos al paso "init"
  if (isConnected && step === 'connect') {
    setStep('init')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!address) return

    const tokenId = `N0-${address.slice(-4)}-${Date.now()}`
    const now = new Date().toISOString()

    const newNft: ColibriNFT = {
      tokenId,
      level: 'N0',
      origin,
      entrepreneurWallet: address,
      patronWallet: origin === 'donated' ? patronWallet || null : null,
      projectName,
      projectDescription,
      country,
      createdAt: now,
    }

    setNft(newNft)
    setStep('summary')

    // Por ahora sólo lo guardamos en memoria.
    // Luego aquí podremos persistir en BD o llamar a Story.
    console.log('NFT Colibrí inicializado:', newNft, {
      entrepreneur: {
        walletAddress: address,
        displayName,
        country,
        email,
      },
    })
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-slate-950 text-slate-50">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            Colibrí OS · PMV Buildathon
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
            Prototipo para inicializar tu NFT Colibrí N0 y comenzar el recorrido
            de microacciones y evidencias que te llevarán de N0 a N1.
          </p>
        </header>

        {/* Paso 1: conectar wallet */}
        {!isConnected && (
          <section className="flex flex-col items-center gap-4">
            <ConnectWalletButton />
            <p className="text-xs text-slate-400 max-w-sm text-center">
              Tu wallet será tu identidad como Emprendedor Colibrí. No
              realizaremos ninguna transacción en esta fase, sólo usamos la
              dirección para vincular tu NFT educativo.
            </p>
          </section>
        )}

        {/* Paso 2: formulario de inicialización del NFT */}
        {isConnected && step === 'init' && (
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
            <h2 className="text-xl md:text-2xl font-semibold text-emerald-300">
              Inicializa tu NFT Colibrí N0
            </h2>
            <p className="text-sm text-slate-300">
              Wallet conectada:{' '}
              <span className="font-mono text-xs bg-slate-800 px-2 py-1 rounded-full">
                {address?.slice(0, 6)}…{address?.slice(-4)}
              </span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Origen del NFT */}
              <fieldset className="space-y-2">
                <legend className="text-sm font-semibold">
                  ¿Cómo llegaste a tu NFT Colibrí?
                </legend>
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="origin"
                      value="purchased"
                      checked={origin === 'purchased'}
                      onChange={() => setOrigin('purchased')}
                    />
                    Lo compré directamente
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="origin"
                      value="donated"
                      checked={origin === 'donated'}
                      onChange={() => setOrigin('donated')}
                    />
                    Me fue donado por un Mecenas Colibrí
                  </label>
                </div>

                {origin === 'donated' && (
                  <div className="mt-3">
                    <label className="block text-xs font-medium mb-1">
                      Wallet del Mecenas (puede ser simulada en esta fase)
                    </label>
                    <input
                      type="text"
                      value={patronWallet}
                      onChange={(e) => setPatronWallet(e.target.value)}
                      placeholder="0xMecenas..."
                      className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                )}
              </fieldset>

              {/* Datos personales básicos */}
              <fieldset className="space-y-3">
                <legend className="text-sm font-semibold">
                  Tus datos como Emprendedor Colibrí
                </legend>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Nombre a mostrar
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      País
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Email (opcional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
              </fieldset>

              {/* Datos del proyecto */}
              <fieldset className="space-y-3">
                <legend className="text-sm font-semibold">
                  Datos de tu proyecto Colibrí
                </legend>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Nombre del proyecto
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Breve descripción
                  </label>
                  <textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    rows={3}
                    required
                  />
                </div>
              </fieldset>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-sm font-medium text-white shadow-lg"
                >
                  Inicializar NFT Colibrí N0
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Paso 3: resumen del NFT inicializado */}
        {isConnected && step === 'summary' && nft && (
          <section className="bg-slate-900/60 border border-emerald-500/60 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
            <h2 className="text-xl md:text-2xl font-semibold text-emerald-300">
              NFT Colibrí N0 inicializado 🐦
            </h2>
            <p className="text-sm text-slate-300">
              Este es tu NFT educativo N0. En la siguiente etapa conectaremos
              las microacciones y evidencias para que pueda evolucionar a N1.
            </p>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div>
                  <span className="font-semibold">Token ID:</span>{' '}
                  <span className="font-mono text-xs bg-slate-800 px-2 py-1 rounded-full">
                    {nft.tokenId}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Nivel actual:</span> {nft.level}
                </div>
                <div>
                  <span className="font-semibold">Origen:</span>{' '}
                  {nft.origin === 'purchased'
                    ? 'Comprado por el emprendedor'
                    : 'Donado por un Mecenas Colibrí'}
                </div>
                {nft.patronWallet && (
                  <div>
                    <span className="font-semibold">Mecenas:</span>{' '}
                    <span className="font-mono text-xs bg-slate-800 px-2 py-1 rounded-full">
                      {nft.patronWallet.slice(0, 6)}…
                      {nft.patronWallet.slice(-4)}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div>
                  <span className="font-semibold">Proyecto:</span>{' '}
                  {nft.projectName}
                </div>
                <div>
                  <span className="font-semibold">País:</span> {nft.country}
                </div>
                <div>
                  <span className="font-semibold">Descripción:</span>
                  <p className="text-slate-300 mt-1">
                    {nft.projectDescription}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
              Próximo paso: conectar este NFT con el dashboard de microacciones y
              el Índice Colibrí N0→N1.
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
