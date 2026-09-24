'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ChevronLeft, BadgeCheck, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent } from '@/components/ui/dialog'
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
    </motion.div>
  )
}

function TrendingArtists({ artists, onOpen, onBook }) {
  return (
    <section id="artists" className="py-16">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-burgundy/70">This week</div>
            <h2 className="font-serif text-4xl md:text-5xl text-burgundy mt-2">Trending artists</h2>
            <p className="text-ink/60 mt-2 max-w-xl">Hand-picked, verified professionals loved by our community.</p>
          </div>
          <a href="#portfolio" className="hidden md:inline-flex items-center gap-1 text-sm text-burgundy hover:underline">
            Discover more <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artists.map(a => <ArtistCard key={a.id} a={a} onOpen={onOpen} onBook={onBook} />)}
        </div>
      </div>
    </section>
  )
}

function Portfolio({ items, artists, onOpen }) {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest text-burgundy/70">Discover through beauty</div>
          <h2 className="font-serif text-4xl md:text-5xl text-burgundy mt-3">The Portfolio</h2>
          <p className="text-ink/60 mt-3">
            A living gallery of India's most talented beauty artists. Tap any look to meet the artist behind it.
          </p>
        </div>
        <div className="masonry">
          {items.map((p, idx) => {
            const artist = artists.find(a => a.id === p.artistId)
            return (
              <motion.button key={p.id}
                initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
                transition={{delay: (idx%10)*0.03}}
                onClick={()=>artist && onOpen(artist)}
                className="group block w-full relative overflow-hidden rounded-2xl soft-shadow">
                <img src={p.img} alt="" className="w-full object-cover group-hover:scale-105 transition duration-700" style={{height: `${p.h}px`}} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition" />
                {artist && (
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition">
                    <img src={artist.avatar} className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="" />
                    <div className="text-white">
                      <div className="text-sm font-serif leading-tight">{artist.name}</div>
                      <div className="text-[10px] opacity-90">{artist.title}</div>
                    </div>
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Salons({ salons }) {
  return (
    <section id="salons" className="py-16">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-burgundy/70">Curated</div>
            <h2 className="font-serif text-4xl md:text-5xl text-burgundy mt-2">Premium salons</h2>
          </div>
          <a className="hidden md:inline-flex items-center gap-1 text-sm text-burgundy hover:underline" href="#">
            View all salons <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {salons.map((s, idx) => (
            <motion.div key={s.id} whileHover={{y:-4}}
              initial={{opacity:0, y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{delay: idx*0.05}}
              className="group grid grid-cols-5 gap-0 rounded-3xl overflow-hidden bg-white soft-shadow border border-burgundy/5">
              <div className="col-span-2 relative aspect-[4/5]">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="col-span-3 p-5 flex flex-col">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-gold" />
                  <span className="text-[10px] uppercase tracking-widest text-ink/60">Rivya Verified Salon</span>
                </div>
                <h3 className="font-serif text-2xl text-burgundy mt-1">{s.name}</h3>
                <div className="text-sm text-ink/60 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" />{s.location}</div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <Star className="w-4 h-4 fill-gold text-gold" />
                  <span className="font-semibold">{s.rating}</span>
                  <span className="text-ink/50">({s.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {s.services.map(sv => <span key={sv} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-blush text-burgundy border border-burgundy/10">{sv}</span>)}
                </div>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <div className="font-serif text-burgundy">{s.price}</div>
                  <Button className="rounded-full bg-burgundy hover:bg-burgundy-600 text-white text-xs h-9 px-4">View salon</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyRivya() {
  const items = [
    { icon: Shield,  title:'Verified Artists',      body:'Every professional is background-checked, portfolio-vetted and reviewed.' },
    { icon: Award,   title:'Editorial Curation',    body:'Discover only the finest beauty artists, curated by industry insiders.' },
    { icon: Users,   title:'Real Community Reviews',body:'Read honest reviews from real customers and see verified portfolios.' },
    { icon: Sparkles,title:'Seamless Booking',      body:'Compare prices, check availability and book in less than a minute.' },
  ]
  return (
    <section id="about" className="py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-burgundy/70">Why Rivya</div>
          <h2 className="font-serif text-4xl md:text-5xl text-burgundy mt-3">A marketplace, elevated</h2>
          <p className="text-ink/60 mt-3">We don't send technicians. We connect you with independent artists who own their craft.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <motion.div key={it.title} initial={{opacity:0, y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{delay:i*0.06}}
              className="p-6 rounded-3xl bg-white soft-shadow border border-burgundy/5">
              <div className="w-12 h-12 rounded-2xl gradient-burgundy flex items-center justify-center mb-4">
                <it.icon className="w-5 h-5 text-gold-light" />
              </div>
              <h3 className="font-serif text-xl text-burgundy">{it.title}</h3>
              <p className="text-sm text-ink/70 mt-2 leading-relaxed">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const q = [
    { name:'Aisha Rehman', role:'Bride, Delhi', text:'Rivya helped me find my dream bridal artist in 15 minutes. Her portfolio spoke for itself — my wedding was picture perfect.', img:'https://images.pexels.com/photos/17056589/pexels-photo-17056589.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200' },
    { name:'Sneha Bhatia', role:'Working professional, Mumbai', text:'Booking a party makeup artist used to be stressful. Rivya made it feel like scrolling Pinterest and then just… booking.', img:'https://images.pexels.com/photos/13018457/pexels-photo-13018457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200' },
    { name:'Priya Nair',   role:'Freelance MUA, Bengaluru', text:'As an artist, Rivya changed everything. My bookings tripled in three months and the clients are premium.', img:'https://images.pexels.com/photos/17056589/pexels-photo-17056589.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200' },
  ]
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-burgundy/70">Loved by</div>
          <h2 className="font-serif text-4xl md:text-5xl text-burgundy mt-3">Stories from our community</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {q.map((t, i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}}
              className="p-6 rounded-3xl bg-blush border border-burgundy/5">
              <div className="flex items-center gap-1 text-gold">{[1,2,3,4,5].map(i=><Star key={i} className="w-4 h-4 fill-current" />)}</div>
              <p className="font-serif text-lg text-burgundy mt-4 leading-relaxed">“{t.text}”</p>
              <div className="mt-5 flex items-center gap-3">
                <img src={t.img} className="w-10 h-10 rounded-full object-cover" alt="" />
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-ink/60">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PartnerCTA() {
  return (
    <section id="become-partner" className="py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] gradient-burgundy p-10 md:p-16 luxury-shadow">
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 w-72 h-72 rounded-full bg-rose/20 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs uppercase tracking-widest text-gold-light">For beauty professionals</div>
              <h3 className="font-serif text-4xl md:text-5xl text-white mt-3 leading-tight">
                Grow your craft.<br/> <span className="text-gradient-gold">Own your story.</span>
              </h3>
              <p className="text-white/80 mt-4 max-w-md">
                Join thousands of independent beauty artists and salons on India's most premium marketplace.
                Build a stunning portfolio, get discovered, and manage bookings — all in one place.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="rounded-full bg-white text-burgundy hover:bg-blush h-12 px-6">
                  Become a partner <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="rounded-full border-white/40 text-white hover:bg-white/10 h-12 px-6 bg-transparent">
                  How it works
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {k:'0%', v:'Setup fee'},
                {k:'3.2x', v:'Avg. booking uplift'},
                {k:'48h', v:'To go live'},
                {k:'₹4.5L', v:'Avg. monthly earnings*'},
              ].map(s => (
                <div key={s.k} className="glass rounded-2xl p-5">
                  <div className="font-serif text-3xl text-white">{s.k}</div>
                  <div className="text-xs text-white/70 mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="contact" className="pt-16 pb-8 bg-burgundy text-white/80">
      <div className="container">
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-gold-light" />
              </div>
              <span className="font-serif text-3xl text-white">Rivya</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              The premium beauty marketplace where every artist is verified, every portfolio is real,
              and every booking feels effortless.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram,Facebook,Twitter].map((I,i)=>(
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                  <I className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {[
            {title:'Explore', links:['Bridal Makeup','Party Makeup','Mehendi','Nails','Hair','Salons']},
            {title:'Company', links:['About','Careers','Press','Partner with us']},
            {title:'Support', links:['Help Center','Trust & Safety','Cancellation','Contact']},
          ].map(col=>(
            <div key={col.title}>
              <div className="font-serif text-white text-lg mb-3">{col.title}</div>
              <ul className="space-y-2 text-sm">
                {col.links.map(l=><li key={l}><a href="#" className="hover:text-gold-light transition">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/60">
          <div>© 2025 Rivya. Crafted with love in India.</div>
          <div className="flex gap-5 mt-3 md:mt-0">
            <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ---------- Artist Profile Modal ----------
function ArtistProfile({ artist, open, onClose, onBook }) {
  if (!artist) return null
  return (
    <Dialog open={open} onOpenChange={(v)=>!v && onClose()}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden rounded-3xl border-none bg-white">
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="relative h-64 md:h-80">
            <img src={artist.cover} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="px-6 md:px-10 -mt-16 relative">
            <div className="flex items-end gap-4">
              <img src={artist.avatar} className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white object-cover soft-shadow" alt="" />
              <div className="pb-2 text-white">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-3xl">{artist.name}</h3>
                  {artist.verified && <BadgeCheck className="w-5 h-5 text-gold" />}
                </div>
                <div className="text-white/80 text-sm">{artist.title}</div>
              </div>
            </div>
          </div>
          <div className="px-6 md:px-10 py-6 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-gold text-gold" /><span className="font-semibold">{artist.rating}</span> <span className="text-ink/50">({artist.reviews} reviews)</span></div>
                <div className="flex items-center gap-1 text-ink/70"><MapPin className="w-4 h-4" />{artist.location}</div>
                <div className="flex items-center gap-1 text-ink/70"><Clock className="w-4 h-4" />{artist.experience} yrs experience</div>
              </div>
              <div>
                <h4 className="font-serif text-xl text-burgundy mb-2">About</h4>
                <p className="text-ink/70 leading-relaxed">{artist.about}</p>
              </div>
              <div>
                <h4 className="font-serif text-xl text-burgundy mb-3">Services & pricing</h4>
                <div className="space-y-2">
                  {artist.services.map(s => (
                    <div key={s.id} className="flex items-center justify-between p-4 rounded-2xl bg-blush border border-burgundy/5">
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-ink/60">{s.duration}</div>
                      </div>
                      <div className="font-serif text-lg text-burgundy">₹{s.price.toLocaleString('en-IN')}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-serif text-xl text-burgundy mb-3">Portfolio</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {artist.portfolio.map((p,i)=>(
                    <div key={i} className="aspect-square overflow-hidden rounded-xl">
                      <img src={p} className="w-full h-full object-cover hover:scale-105 transition" alt="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Sticky booking sidebar */}
            <div className="md:col-span-1">
              <div className="md:sticky md:top-4 p-6 rounded-3xl bg-white border border-burgundy/10 luxury-shadow">
                <div className="text-xs uppercase tracking-widest text-ink/50">Starting from</div>
                <div className="font-serif text-4xl text-burgundy">₹{artist.startingPrice.toLocaleString('en-IN')}</div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-gold" /> Free cancellation up to 24h</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-gold" /> Verified & background checked</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-gold" /> Trial makeup available</div>
                </div>
                <Button onClick={()=>onBook(artist)} className="w-full mt-5 h-12 rounded-full bg-burgundy hover:bg-burgundy-600 text-white">Book appointment</Button>
                <Button variant="outline" className="w-full mt-2 h-11 rounded-full border-burgundy/20 text-burgundy hover:bg-burgundy/5">Message artist</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ---------- Booking Flow Modal ----------
function BookingFlow({ artist, open, onClose }) {
  const [step, setStep] = useState(0)
  const [service, setService] = useState(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [addr, setAddr] = useState('')
  const [payment, setPayment] = useState('card')
  const [loading, setLoading] = useState(false)
  const [bookingId, setBookingId] = useState(null)

  useEffect(() => {
    if (open) {
      setStep(0); setService(artist?.services?.[0] || null);
      setDate(''); setTime(''); setAddr(''); setPayment('card'); setBookingId(null)
    }
  }, [open, artist])

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
    <Dialog open={open} onOpenChange={(v)=>!v && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-3xl border-none bg-white">
        <div className="p-6 md:p-10">
          <div className="flex items-center gap-4 mb-6">
            <img src={artist.avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
            <div>
              <div className="text-xs uppercase tracking-widest text-ink/50">Booking with</div>
              <div className="font-serif text-xl text-burgundy">{artist.name}</div>
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
