import { useState, useEffect, useRef, type KeyboardEvent, type RefObject } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { QRCodeSVG } from 'qrcode.react'
import { supabase } from '../lib/supabase'
import { useBetaModal } from './BetaModalContext'
import { IS_APP_STORE_DOWNLOAD, ACTIVE_DOWNLOAD_URL, IOS_REQUIREMENT_TEXT } from '../lib/downloadLinks'

// ── Constants ──

let downloadButtonText = 'Open in TestFlight →'
if (IS_APP_STORE_DOWNLOAD) {
  downloadButtonText = 'Download on the App Store →'
}

let downloadDetailText = 'Current installs run through TestFlight.'
if (IS_APP_STORE_DOWNLOAD) {
  downloadDetailText = 'Download from the App Store and start earning your screen time.'
}

const GOAL_OPTIONS = [
  { label: 'Study focus', value: 'study_focus' },
  { label: 'Screen time', value: 'screen_time' },
  { label: 'Productivity', value: 'productivity' },
  { label: 'ADHD tools', value: 'adhd_tools' },
  { label: 'App blocking', value: 'app_blocking' },
  { label: 'Motivation', value: 'motivation' },
  { label: 'Other...', value: 'other' },
] as const

type FormState = 'form' | 'thankyou' | 'download'

// ── Helpers ──

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// ── Component ──

export default function BetaSignupModal() {
  const { isOpen, closeBetaModal } = useBetaModal()

  // Form state
  const [formState, setFormState] = useState<FormState>('form')
  const [selectedGoals, setSelectedGoals] = useState<Set<string>>(new Set())
  const [otherText, setOtherText] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Refs for focus management
  const modalRef = useRef<HTMLDivElement>(null)
  const firstChipRef = useRef<HTMLButtonElement>(null)

  // ── Scroll lock + focus trap ──

  useEffect(() => {
    if (!isOpen) return

    // Lock body scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus first chip when modal opens
    const timer = setTimeout(() => {
      firstChipRef.current?.focus()
    }, 100)

    // Escape key handler
    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') {
        closeBetaModal()
        return
      }

      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [isOpen, closeBetaModal])

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormState('form')
      setSelectedGoals(new Set())
      setOtherText('')
      setEmail('')
      setEmailError('')
      setIsSubmitting(false)
    }
  }, [isOpen])

  // ── Handlers ──

  function toggleGoal(value: string) {
    setSelectedGoals(prev => {
      const next = new Set(prev)
      if (next.has(value)) {
        next.delete(value)
      } else {
        next.add(value)
      }
      return next
    })
  }

  function handleChipKeyDown(e: KeyboardEvent, value: string) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      toggleGoal(value)
    }
  }

  async function handleSubmit() {
    // Validate email if provided
    if (email.trim() && !isValidEmail(email.trim())) {
      setEmailError('Please enter a valid email')
      return
    }
    setEmailError('')
    setIsSubmitting(true)

    // Build payload
    const goals = Array.from(selectedGoals)
    const payload = {
      goals,
      other_text: selectedGoals.has('other') ? otherText.trim() || null : null,
      email: email.trim() || null,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    }

    // Try to save to Supabase — never block the user
    if (supabase) {
      try {
        const { error } = await supabase.from('beta_signups').insert(payload)
        // Unique constraint conflict = user already signed up, treat as success
        if (error && error.code !== '23505') {
          console.error('Beta signup insert failed:', error)
        }
      } catch (err) {
        console.error('Beta signup network error:', err)
      }
    }

    setIsSubmitting(false)
    setFormState('thankyou')
  }

  function handleSkip() {
    setFormState('download')
  }

  const canSubmit = selectedGoals.size > 0 && !isSubmitting

  // ── Render ──

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            onClick={closeBetaModal}
            aria-hidden="true"
          />

          {/* Modal card */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="beta-modal-title"
            className="relative w-full max-w-[420px] bg-white border border-[#e0e0dd] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-y-auto max-h-[90vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeBetaModal}
              className="absolute top-3 right-4 text-[#888] text-xl leading-none hover:text-[#1a1a1a] transition-colors bg-transparent border-none cursor-pointer z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 rounded"
              aria-label="Close modal"
            >
              ×
            </button>

            <div className="p-8">
              {formState === 'form' && (
                <FormContent
                  selectedGoals={selectedGoals}
                  otherText={otherText}
                  email={email}
                  emailError={emailError}
                  isSubmitting={isSubmitting}
                  canSubmit={canSubmit}
                  firstChipRef={firstChipRef}
                  onToggleGoal={toggleGoal}
                  onChipKeyDown={handleChipKeyDown}
                  onOtherTextChange={setOtherText}
                  onEmailChange={(val) => { setEmail(val); setEmailError(''); }}
                  onSubmit={handleSubmit}
                  onSkip={handleSkip}
                />
              )}

              {formState === 'thankyou' && <ThankYouContent />}

              {formState === 'download' && <DownloadContent />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Form State ──

interface FormContentProps {
  selectedGoals: Set<string>
  otherText: string
  email: string
  emailError: string
  isSubmitting: boolean
  canSubmit: boolean
  firstChipRef: RefObject<HTMLButtonElement | null>
  onToggleGoal: (value: string) => void
  onChipKeyDown: (e: KeyboardEvent, value: string) => void
  onOtherTextChange: (value: string) => void
  onEmailChange: (value: string) => void
  onSubmit: () => void
  onSkip: () => void
}

function FormContent({
  selectedGoals, otherText, email, emailError, isSubmitting, canSubmit,
  firstChipRef, onToggleGoal, onChipKeyDown, onOtherTextChange, onEmailChange,
  onSubmit, onSkip,
}: FormContentProps) {
  return (
    <>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 id="beta-modal-title" className="text-[22px] font-bold text-[#1a1a1a]">
          Get MinuteBank
        </h2>
        <p className="text-[12px] text-[#888] mt-1.5">
          One quick question, then straight to download
        </p>
      </div>

      {/* Goal chips */}
      <div className="mb-5">
        <p className="text-[10px] text-[#1a9e94] uppercase tracking-[1.5px] font-semibold mb-1">
          What are you trying to improve?
        </p>
        <p className="text-[10px] text-[#aaa] mb-3">
          Select all that apply
        </p>
        <div className="flex flex-wrap gap-2">
          {GOAL_OPTIONS.map((option, index) => {
            const isSelected = selectedGoals.has(option.value)
            return (
              <button
                key={option.value}
                ref={index === 0 ? firstChipRef : undefined}
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                onClick={() => onToggleGoal(option.value)}
                onKeyDown={(e) => onChipKeyDown(e, option.value)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-1 ${
                  isSelected
                    ? 'bg-[#e87a55] text-white border-[#e87a55] font-semibold'
                    : 'bg-[#f7f7f5] text-[#71717a] border-[#e0e0dd] hover:border-[#ccc]'
                }`}
              >
                {isSelected ? `✓ ${option.label.replace('...', '')}` : option.label}
              </button>
            )
          })}
        </div>

        {/* "Other" text field — slides in when Other is selected */}
        <AnimatePresence>
          {selectedGoals.has('other') && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <input
                type="text"
                value={otherText}
                onChange={(e) => onOtherTextChange(e.target.value)}
                placeholder="Tell us what you're working on..."
                maxLength={200}
                className="w-full mt-3 px-3.5 py-2.5 bg-[#f7f7f5] border border-[#e0e0dd] rounded-lg text-[12px] text-[#1a1a1a] placeholder-[#aaa] focus:outline-none focus:ring-2 focus:ring-[#e87a55] focus:ring-offset-1"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Email field */}
      <div className="mb-5">
        <p className="text-[10px] uppercase tracking-[1.5px] font-semibold mb-0.5">
          <span className="text-[#1a9e94]">Email</span>{' '}
          <span className="text-[#aaa] normal-case tracking-normal font-normal">(optional)</span>
        </p>
        <p className="text-[10px] text-[#888] mb-2">
          We'll let you know when the full version launches
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="you@email.com"
          className={`w-full px-3.5 py-2.5 bg-[#f7f7f5] border rounded-lg text-[13px] text-[#1a1a1a] placeholder-[#aaa] focus:outline-none focus:ring-2 focus:ring-[#e87a55] focus:ring-offset-1 ${
            emailError ? 'border-[#dc3545]' : 'border-[#e0e0dd]'
          }`}
        />
        {emailError && (
          <p className="text-[10px] text-[#dc3545] mt-1">{emailError}</p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={!canSubmit}
        className={`w-full py-3.5 rounded-[10px] font-bold text-[14px] text-white transition-opacity cursor-pointer border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2 ${
          canSubmit
            ? 'bg-[#e87a55] opacity-100'
            : 'bg-[#e87a55] opacity-50 cursor-not-allowed'
        }`}
      >
        {isSubmitting ? 'Continuing...' : 'Continue →'}
      </button>

      {/* Skip link */}
      <p className="text-center text-[11px] text-[#888] mt-3">
        or{' '}
        <button
          type="button"
          onClick={onSkip}
          className="text-[#1a9e94] underline bg-transparent border-none cursor-pointer hover:text-[#168a80] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a9e94] rounded"
        >
          skip and download directly
        </button>
      </p>
    </>
  )
}

// ── Thank You State (after submit) ──

function ThankYouContent() {
  return (
    <div className="text-center">
      {/* Teal checkmark */}
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[rgba(26,158,148,0.1)] flex items-center justify-center">
        <span className="text-[#1a9e94] text-[28px] font-bold">✓</span>
      </div>

      <h2 id="beta-modal-title" className="text-[20px] font-bold text-[#1a1a1a] mb-1.5">
        Thanks
      </h2>
      <p className="text-[12px] text-[#888] mb-6 leading-relaxed">
        Thanks for helping shape MinuteBank.<br />
        Here's your download link.
      </p>

      <DownloadBlock />
    </div>
  )
}

// ── Download State (after skip) ──

function DownloadContent() {
  return (
    <div className="text-center">
      {/* Rocket icon */}
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[rgba(232,122,85,0.1)] flex items-center justify-center">
        <span className="text-[24px]">🚀</span>
      </div>

      <h2 id="beta-modal-title" className="text-[20px] font-bold text-[#1a1a1a] mb-1.5">
        Get the App
      </h2>
      <p className="text-[12px] text-[#888] mb-6 leading-relaxed">
        {downloadDetailText}
      </p>

      <DownloadBlock />
    </div>
  )
}

// ── Shared download button + QR code ──

function DownloadBlock() {
  return (
    <>
      <a
        href={ACTIVE_DOWNLOAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-3.5 rounded-[10px] bg-[#e87a55] text-white font-bold text-[14px] text-center no-underline hover:bg-[#d06a48] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a55] focus-visible:ring-offset-2"
      >
        {downloadButtonText}
      </a>

      {/* QR code */}
      <div className="mt-4 inline-flex flex-col items-center">
        <div className="p-2.5 bg-[#f7f7f5] border border-[#e0e0dd] rounded-lg">
          <QRCodeSVG
            value={ACTIVE_DOWNLOAD_URL}
            size={100}
            bgColor="#f7f7f5"
            fgColor="#1a1a1a"
            level="M"
          />
        </div>
        <span className="text-[9px] text-[#aaa] uppercase tracking-[1px] mt-2">
          or scan with your phone
        </span>
      </div>

      {/* iOS requirement */}
      <p className="text-[10px] text-[#888] mt-4 pt-4 border-t border-[#e0e0dd]">
        {IOS_REQUIREMENT_TEXT}
      </p>
    </>
  )
}
