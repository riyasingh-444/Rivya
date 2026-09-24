'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ChevronLeft, BadgeCheck, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { WELCOME, REGISTER } from '@/lib/constants/testIds'

function SignupForm({ onDone }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return toast.error('Please enter your name')
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return toast.error('Please enter a valid email')
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters')
    if (form.password !== form.confirm) return toast.error('Passwords do not match')
    onDone({ name: form.name.trim(), email: form.email.trim(), provider: 'email' })
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" data-testid={REGISTER.nameInput} value={form.name} onChange={set('name')}
          placeholder="Aanya Kapoor" className="h-11 rounded-xl" autoComplete="name" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" data-testid={REGISTER.emailInput} value={form.email} onChange={set('email')}
          placeholder="you@example.com" className="h-11 rounded-xl" autoComplete="email" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" data-testid={REGISTER.passwordInput} value={form.password} onChange={set('password')}
          placeholder="At least 6 characters" className="h-11 rounded-xl" autoComplete="new-password" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="confirm">Confirm password</Label>
        <Input id="confirm" type="password" data-testid={REGISTER.passwordConfirmInput} value={form.confirm} onChange={set('confirm')}
          className="h-11 rounded-xl" autoComplete="new-password" />
      </div>
      <Button type="submit" data-testid={REGISTER.submitButton}
        className="w-full h-12 rounded-full bg-burgundy hover:bg-burgundy-600 text-white text-base">
        Create account
      </Button>
    </form>
  )
}

export default function Welcome() {
  const router = useRouter()
  const [mode, setMode] = useState('choose')

  const enter = (user) => {
    try { localStorage.setItem('rivya_user', JSON.stringify(user)) } catch {}
    toast.success(`Welcome to Rivya${user.name ? ', ' + user.name.split(' ')[0] : ''}!`)
    router.push('/home')
  }

  // Callback ref: the container remounts after the Back animation finishes.
  const [googleBtn, setGoogleBtn] = useState(null)
  const [gsiLoaded, setGsiLoaded] = useState(false)
  useEffect(() => { if (window.google?.accounts?.id) setGsiLoaded(true) }, [])

  const onGoogleCredential = async ({ credential }) => {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Google sign-in failed')
      enter(data.user)
    } catch (err) {
      toast.error(err.message)
    }
  }

  // Render Google's sign-in button once the GIS script has loaded and the
  // "choose" view (which holds the button container) is on screen.
  useEffect(() => {
    if (!gsiLoaded || !googleBtn) return
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    if (!clientId) return
    window.google.accounts.id.initialize({ client_id: clientId, callback: onGoogleCredential })
    window.google.accounts.id.renderButton(googleBtn, {
      theme: 'outline', size: 'large', shape: 'pill', text: 'continue_with',
      width: Math.min(googleBtn.offsetWidth, 400),
    })
  }, [gsiLoaded, googleBtn])

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={() => setGsiLoaded(true)} />
      {/* Visual side */}
      <div className="relative hidden lg:block overflow-hidden">
        <img alt="Bride getting ready" className="absolute inset-0 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1610189019555-b1e26c2e424d?crop=entropy&cs=srgb&fm=jpg&w=1200&q=85" />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-700/90 via-burgundy/40 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-12 text-white">
          <h2 className="font-serif text-4xl leading-tight max-w-md">Beauty, booked by the best hands in the city.</h2>
          <div className="mt-6 flex gap-6 text-sm text-white/85">
            <span className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-gold-light" /> Verified artists</span>
            <span className="flex items-center gap-2"><Star className="w-4 h-4 text-gold-light fill-gold-light" /> 4.9 average rating</span>
          </div>
        </div>
      </div>

      {/* Auth side */}
      <div className="flex items-center justify-center px-6 py-12 bg-blush">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-full gradient-burgundy flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gold-light" />
            </div>
            <span className="font-serif text-3xl font-semibold text-burgundy tracking-tight">Rivya</span>
          </div>

          <AnimatePresence mode="wait">
            {mode === 'choose' ? (
              <motion.div key="choose" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <h1 className="font-serif text-4xl text-ink leading-tight">Discover your<br />perfect look</h1>
                <p className="mt-3 text-ink/60">Book verified makeup artists, salons and stylists near you.</p>

                <div className="mt-10 space-y-3">
                  <div ref={setGoogleBtn} data-testid={WELCOME.googleButton} className="w-full min-h-[44px] flex justify-center" />
                  <div className="flex items-center gap-3 text-xs text-ink/40 py-1">
                    <span className="h-px flex-1 bg-ink/10" /> or <span className="h-px flex-1 bg-ink/10" />
                  </div>
                  <Button onClick={() => setMode('signup')} data-testid={WELCOME.signupButton}
                    className="w-full h-12 rounded-full bg-burgundy hover:bg-burgundy-600 text-white text-base">
                    Sign up with email
                  </Button>
                </div>

                <p className="mt-8 text-xs text-ink/50 text-center">
                  By continuing, you agree to Rivya's Terms of Service and Privacy Policy.
                </p>
              </motion.div>
            ) : (
              <motion.div key="signup" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <button onClick={() => setMode('choose')} data-testid={WELCOME.backButton}
                  className="flex items-center gap-1 text-sm text-ink/60 hover:text-burgundy mb-6">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <h1 className="font-serif text-3xl text-ink">Create your account</h1>
                <p className="mt-2 mb-8 text-ink/60">It only takes a minute.</p>
                <SignupForm onDone={enter} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
