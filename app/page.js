'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, MapPin, Calendar as CalIcon, Star, Heart, BadgeCheck, ChevronRight,
  Sparkles, Menu, X, Instagram, Facebook, Twitter, ArrowRight, Clock, Shield,
  Award, Users, Check, ChevronLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const LOCATIONS = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata']

function Nav({ onCity, city }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = ['Home','Explore','Artists','Salons','Categories','Become Partner','About','Contact']
  return (
    <header className={cn('fixed top-0 inset-x-0 z-50 transition-all', scrolled ? 'py-2' : 'py-4')}>
      <div className={cn('container flex items-center justify-between rounded-full px-6 py-3 transition-all',
        scrolled ? 'glass luxury-shadow' : 'bg-transparent')}>
        <a href="#" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full gradient-burgundy flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-gold-light" />
          </div>
          <span className="font-serif text-2xl font-semibold text-burgundy tracking-tight">Rivya</span>
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-sm text-ink/80">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(' ','-')}`} className="hover:text-burgundy transition">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 px-3 py-2 rounded-full glass text-sm text-ink/80">
            <MapPin className="w-4 h-4 text-burgundy" />
            <select value={city} onChange={e=>onCity(e.target.value)} className="bg-transparent outline-none pr-1">
              {LOCATIONS.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <Button variant="ghost" className="hidden md:inline-flex text-burgundy hover:bg-burgundy/5 rounded-full">Log in</Button>
          <Button className="rounded-full bg-burgundy hover:bg-burgundy-600 text-white px-5">Sign up</Button>
          <button className="lg:hidden ml-1 p-2 rounded-full glass" onClick={()=>setOpen(v=>!v)} aria-label="menu">
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
            className="lg:hidden container mt-2">
            <div className="glass rounded-3xl p-4 flex flex-col gap-3">
              {links.map(l => <a key={l} href={`#${l.toLowerCase().replace(' ','-')}`} className="px-2 py-1 text-ink/80">{l}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero({ city, onCity, onSearch }) {
  const [service, setService] = useState('Bridal Makeup')
  const [date, setDate] = useState('')
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* decorative blobs */}
      <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-rose/25 blur-3xl" />
      <div className="absolute top-40 -left-32 w-[420px] h-[420px] rounded-full bg-gold/20 blur-3xl" />
      <div className="container relative grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs tracking-widest uppercase text-burgundy border border-burgundy/10">
            <Sparkles className="w-3 h-3 text-gold" />
            India's most trusted beauty marketplace
          </motion.div>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7, delay:0.1}}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] mt-6 text-burgundy">
            Find Your Perfect <br />
            <span className="italic">Beauty</span> <span className="text-gradient-gold">Artist</span>
          </motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3, duration:0.8}}
            className="mt-6 text-lg text-ink/70 max-w-xl leading-relaxed">
            Book trusted beauty professionals for every special occasion. Discover artists
            through curated portfolios, compare prices, and reserve your glow — all in one place.
          </motion.p>

          {/* Search */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.45, duration:0.7}}
            className="mt-8 bg-white rounded-3xl luxury-shadow border border-burgundy/5 p-2 flex flex-col md:flex-row items-stretch gap-2">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-blush transition">
              <Sparkles className="w-4 h-4 text-burgundy" />
              <div className="flex-1">
                <div className="text-[11px] uppercase tracking-widest text-ink/50">Service</div>
                <input value={service} onChange={e=>setService(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm font-medium" placeholder="Bridal Makeup" />
              </div>
            </div>
            <div className="hidden md:block w-px bg-burgundy/10 my-2" />
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-blush transition">
              <MapPin className="w-4 h-4 text-burgundy" />
              <div className="flex-1">
                <div className="text-[11px] uppercase tracking-widest text-ink/50">Location</div>
                <select value={city} onChange={e=>onCity(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm font-medium">
                  {LOCATIONS.map(l=><option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="hidden md:block w-px bg-burgundy/10 my-2" />
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-blush transition">
              <CalIcon className="w-4 h-4 text-burgundy" />
              <div className="flex-1">
                <div className="text-[11px] uppercase tracking-widest text-ink/50">Date</div>
                <input type="date" value={date} onChange={e=>setDate(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm font-medium" />
              </div>
            </div>
            <Button onClick={()=>onSearch({service,city,date})}
              className="rounded-2xl bg-burgundy hover:bg-burgundy-600 text-white px-6 h-14 gap-2">
              <Search className="w-4 h-4" /> Search
            </Button>
          </motion.div>

          {/* stats */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.7}}
            className="mt-10 flex flex-wrap items-center gap-8 text-sm">
            <div>
              <div className="font-serif text-3xl text-burgundy">3,200+</div>
              <div className="text-ink/60">Verified Artists</div>
            </div>
            <div>
              <div className="font-serif text-3xl text-burgundy">180k+</div>
              <div className="text-ink/60">Happy Customers</div>
            </div>
            <div>
              <div className="font-serif text-3xl text-burgundy">4.9<span className="text-gold">★</span></div>
              <div className="text-ink/60">Average Rating</div>
            </div>
          </motion.div>
        </div>

        {/* Hero visual */}
        <div className="lg:col-span-6 relative">
          <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{duration:1}}
            className="relative aspect-[4/5] w-full max-w-lg mx-auto">
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden luxury-shadow">
              <img alt="Bride" src="https://images.unsplash.com/photo-1610189019555-b1e26c2e424d?crop=entropy&cs=srgb&fm=jpg&w=1200&q=85"
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy/50 via-transparent to-transparent" />
            </div>
            {/* Floating verified card */}
            <motion.div animate={{y:[0,-8,0]}} transition={{duration:5, repeat:Infinity}}
              className="absolute -left-6 top-10 glass rounded-2xl p-3 flex items-center gap-3 luxury-shadow">
              <div className="w-10 h-10 rounded-full gradient-burgundy flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-gold-light" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-ink/60">Verified</div>
                <div className="font-serif text-lg text-burgundy leading-none">Every Artist</div>
              </div>
            </motion.div>
            {/* Rating card */}
            <motion.div animate={{y:[0,8,0]}} transition={{duration:5, repeat:Infinity, delay:1}}
              className="absolute -right-4 bottom-24 glass rounded-2xl p-3 luxury-shadow">
              <div className="flex items-center gap-1 text-gold">
                {[1,2,3,4,5].map(i=><Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <div className="text-xs text-ink/60 mt-1">4.98 · 342 reviews</div>
              <div className="font-serif text-burgundy text-sm mt-0.5">Aanya Kapoor</div>
            </motion.div>
            {/* Price card */}
            <motion.div animate={{y:[0,-6,0]}} transition={{duration:6, repeat:Infinity, delay:0.5}}
              className="absolute -bottom-4 left-8 bg-white rounded-2xl p-4 luxury-shadow border border-gold/30">
              <div className="text-[10px] uppercase tracking-widest text-ink/50">Starting from</div>
              <div className="font-serif text-2xl text-burgundy">₹18,500</div>
              <div className="text-[10px] text-ink/60">Signature bridal package</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Categories({ items, onPick }) {
  return (
    <section id="categories" className="py-16">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-burgundy/70">Browse</div>
            <h2 className="font-serif text-4xl md:text-5xl text-burgundy mt-2">Popular categories</h2>
          </div>
          <a href="#artists" className="hidden md:inline-flex items-center gap-1 text-sm text-burgundy hover:underline">
            View all <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map((c, idx) => (
            <motion.button key={c.id} onClick={()=>onPick(c)}
              initial={{opacity:0, y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{delay: idx*0.04}}
              whileHover={{y:-4}}
              className="group relative overflow-hidden rounded-3xl bg-white soft-shadow border border-burgundy/5 p-5 text-left">
              <div className="text-3xl">{c.icon}</div>
              <div className="font-serif text-lg text-burgundy mt-3">{c.name}</div>
              <div className="text-xs text-ink/60 mt-1">{c.count}+ artists</div>
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-rose/10 group-hover:bg-rose/25 transition" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArtistCard({ a, onOpen, onBook }) {
  const [saved, setSaved] = useState(false)
  return (
    <motion.div whileHover={{y:-6}}
      initial={{opacity:0, y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
      className="group bg-white rounded-3xl overflow-hidden soft-shadow border border-burgundy/5 cursor-pointer">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={a.cover} alt={a.name} onClick={()=>onOpen(a)}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
        <button onClick={(e)=>{e.stopPropagation(); setSaved(v=>!v); toast.success(saved ? 'Removed from wishlist' : 'Saved to wishlist')}}
          className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center hover:scale-110 transition">
          <Heart className={cn('w-4 h-4', saved ? 'fill-rose text-rose' : 'text-white')} />
        </button>
        {a.verified && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full glass-dark text-[10px] tracking-widest uppercase text-gold-light">
            <BadgeCheck className="w-3 h-3" /> Verified
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
          <img src={a.avatar} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="" />
          <div className="text-white">
            <div className="font-serif text-lg leading-tight">{a.name}</div>
            <div className="text-[11px] opacity-90">{a.title}</div>
          </div>
        </div>
      </div>
      <div className="p-4" onClick={()=>onOpen(a)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <span className="font-semibold">{a.rating}</span>
            <span className="text-ink/50">({a.reviews})</span>
          </div>
          <div className="text-xs text-ink/60 flex items-center gap-1"><MapPin className="w-3 h-3" /> {a.location.split('•')[0]}</div>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {a.tags.slice(0,3).map(t => (
            <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-blush text-burgundy border border-burgundy/10">{t}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-ink/50">Starting</div>
            <div className="font-serif text-xl text-burgundy">₹{a.startingPrice.toLocaleString('en-IN')}</div>
          </div>
          <Button onClick={(e)=>{e.stopPropagation(); onBook(a)}}
            className="rounded-full bg-burgundy hover:bg-burgundy-600 text-white text-xs h-9 px-4">Book</Button>
        </div>
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

  const steps = ['Service','Date','Time','Address','Payment','Confirm']
  const times = ['09:00','10:30','12:00','14:00','16:00','18:00','19:30']

  const canNext = useMemo(()=>{
    if (step===0) return !!service
    if (step===1) return !!date
    if (step===2) return !!time
    if (step===3) return addr.trim().length > 5
    if (step===4) return !!payment
    return true
  }, [step, service, date, time, addr, payment])

  async function submit() {
    setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          artistId: artist.id, artistName: artist.name,
          service: service?.name, price: service?.price,
          date, time, address: addr, payment,
        }),
      })
      const data = await res.json()
      setBookingId(data.booking?.id)
      setStep(5)
      toast.success('Booking confirmed ✨')
    } catch (e) {
      toast.error('Something went wrong')
    } finally { setLoading(false) }
  }

  if (!artist) return null

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

          {/* Progress */}
          <div className="flex items-center gap-1 mb-8">
            {steps.map((s,i)=>(
              <div key={s} className="flex-1">
                <div className={cn('h-1 rounded-full transition', i<=step ? 'bg-burgundy' : 'bg-burgundy/10')} />
                <div className={cn('text-[10px] uppercase tracking-widest mt-1', i<=step ? 'text-burgundy' : 'text-ink/40')}>{s}</div>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="min-h-[280px]">
            {step===0 && (
              <div>
                <h3 className="font-serif text-2xl text-burgundy">Choose your service</h3>
                <div className="mt-4 space-y-2">
                  {artist.services.map(s => (
                    <button key={s.id} onClick={()=>setService(s)}
                      className={cn('w-full flex items-center justify-between p-4 rounded-2xl border transition text-left',
                        service?.id===s.id ? 'border-burgundy bg-burgundy/5' : 'border-burgundy/10 hover:border-burgundy/30')}>
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-ink/60">{s.duration}</div>
                      </div>
                      <div className="font-serif text-lg text-burgundy">₹{s.price.toLocaleString('en-IN')}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step===1 && (
              <div>
                <h3 className="font-serif text-2xl text-burgundy">Pick a date</h3>
                <input type="date" value={date} onChange={e=>setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-4 w-full h-14 rounded-2xl border border-burgundy/10 px-4 text-lg outline-none focus:border-burgundy" />
                <p className="text-sm text-ink/60 mt-3">Free cancellation up to 24 hours before your appointment.</p>
              </div>
            )}
            {step===2 && (
              <div>
                <h3 className="font-serif text-2xl text-burgundy">Choose a time slot</h3>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-4">
                  {times.map(t=>(
                    <button key={t} onClick={()=>setTime(t)}
                      className={cn('h-12 rounded-xl border text-sm transition',
                        time===t ? 'border-burgundy bg-burgundy text-white' : 'border-burgundy/10 hover:border-burgundy/30')}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step===3 && (
              <div>
                <h3 className="font-serif text-2xl text-burgundy">Where should we come?</h3>
                <textarea value={addr} onChange={e=>setAddr(e.target.value)}
                  rows={4} placeholder="Enter your full address, apartment/flat number, and any landmarks"
                  className="mt-4 w-full rounded-2xl border border-burgundy/10 p-4 text-sm outline-none focus:border-burgundy resize-none" />
              </div>
            )}
            {step===4 && (
              <div>
                <h3 className="font-serif text-2xl text-burgundy">Payment method</h3>
                <div className="mt-4 space-y-2">
                  {[
                    {id:'card', label:'Credit / Debit Card'},
                    {id:'upi',  label:'UPI (GPay, PhonePe, Paytm)'},
                    {id:'cod',  label:'Pay after service'},
                  ].map(p=>(
                    <button key={p.id} onClick={()=>setPayment(p.id)}
                      className={cn('w-full flex items-center justify-between p-4 rounded-2xl border transition',
                        payment===p.id ? 'border-burgundy bg-burgundy/5' : 'border-burgundy/10 hover:border-burgundy/30')}>
                      <span className="font-medium">{p.label}</span>
                      {payment===p.id && <Check className="w-4 h-4 text-burgundy" />}
                    </button>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-2xl bg-blush">
                  <div className="flex justify-between text-sm"><span>{service?.name}</span><span>₹{service?.price?.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between text-xs text-ink/60 mt-1"><span>Platform fee</span><span>Included</span></div>
                  <div className="flex justify-between font-serif text-lg text-burgundy mt-3 pt-3 border-t border-burgundy/10"><span>Total</span><span>₹{service?.price?.toLocaleString('en-IN')}</span></div>
                </div>
              </div>
            )}
            {step===5 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto rounded-full gradient-burgundy flex items-center justify-center">
                  <Check className="w-8 h-8 text-gold-light" />
                </div>
                <h3 className="font-serif text-3xl text-burgundy mt-4">You're booked! ✨</h3>
                <p className="text-ink/70 mt-2">
                  {service?.name} with <b>{artist.name}</b> on <b>{date}</b> at <b>{time}</b>.
                </p>
                {bookingId && <div className="text-xs text-ink/50 mt-2">Booking ID: {bookingId}</div>}
                <div className="mt-6 p-4 rounded-2xl bg-blush text-sm text-ink/70">
                  We've sent a confirmation and Rivya care team will reach out shortly.
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          {step<5 && (
            <div className="mt-6 flex items-center justify-between">
              <Button variant="ghost" onClick={()=> step===0 ? onClose() : setStep(step-1)}
                className="text-burgundy hover:bg-burgundy/5 rounded-full">
                <ChevronLeft className="w-4 h-4 mr-1" /> {step===0 ? 'Cancel' : 'Back'}
              </Button>
              {step<4 && (
                <Button disabled={!canNext} onClick={()=>setStep(step+1)}
                  className="rounded-full bg-burgundy hover:bg-burgundy-600 text-white px-6 h-12">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              {step===4 && (
                <Button disabled={loading} onClick={submit}
                  className="rounded-full bg-burgundy hover:bg-burgundy-600 text-white px-6 h-12">
                  {loading ? 'Confirming…' : 'Confirm booking'}
                </Button>
              )}
            </div>
          )}
          {step===5 && (
            <div className="mt-6 flex justify-center">
              <Button onClick={onClose} className="rounded-full bg-burgundy hover:bg-burgundy-600 text-white px-8 h-12">Done</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ---------- Main App ----------
function App() {
  const [city, setCity] = useState('Mumbai')
  const [categories, setCategories] = useState([])
  const [artists, setArtists] = useState([])
  const [salons, setSalons] = useState([])
  const [portfolio, setPortfolio] = useState([])

  const [profileArtist, setProfileArtist] = useState(null)
  const [bookArtist, setBookArtist] = useState(null)

  useEffect(() => {
    (async ()=>{
      const [c,a,s,p] = await Promise.all([
        fetch('/api/categories').then(r=>r.json()),
        fetch('/api/artists').then(r=>r.json()),
        fetch('/api/salons').then(r=>r.json()),
        fetch('/api/portfolio').then(r=>r.json()),
      ])
      setCategories(c.categories || [])
      setArtists(a.artists || [])
      setSalons(s.salons || [])
      setPortfolio(p.items || [])
    })().catch(()=>toast.error('Failed to load. Please refresh.'))
  }, [])

  return (
    <main id="home" className="relative">
      <Nav city={city} onCity={setCity} />
      <Hero city={city} onCity={setCity} onSearch={(q)=>toast(`Searching ${q.service} in ${q.city}${q.date ? ' • '+q.date : ''}`)} />
      <Categories items={categories} onPick={(c)=>toast(`Exploring ${c.name}`)} />
      <TrendingArtists artists={artists} onOpen={setProfileArtist} onBook={setBookArtist} />
      <Portfolio items={portfolio} artists={artists} onOpen={setProfileArtist} />
      <Salons salons={salons} />
      <WhyRivya />
      <Testimonials />
      <PartnerCTA />
      <Footer />

      <ArtistProfile
        artist={profileArtist}
        open={!!profileArtist}
        onClose={()=>setProfileArtist(null)}
        onBook={(a)=>{setProfileArtist(null); setTimeout(()=>setBookArtist(a), 250)}}
      />
      <BookingFlow
        artist={bookArtist}
        open={!!bookArtist}
        onClose={()=>setBookArtist(null)}
      />
    </main>
  )
}

export default App
