import { createContext, useContext, useState, type ReactNode } from 'react'

interface BetaModalContextValue {
  isOpen: boolean
  openBetaModal: () => void
  closeBetaModal: () => void
}

const BetaModalContext = createContext<BetaModalContextValue | null>(null)

export function BetaModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openBetaModal = () => setIsOpen(true)
  const closeBetaModal = () => setIsOpen(false)

  return (
    <BetaModalContext value={{ isOpen, openBetaModal, closeBetaModal }}>
      {children}
    </BetaModalContext>
  )
}

export function useBetaModal(): BetaModalContextValue {
  const context = useContext(BetaModalContext)
  if (!context) {
    throw new Error('useBetaModal must be used within BetaModalProvider')
  }
  return context
}
