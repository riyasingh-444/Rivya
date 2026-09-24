import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'rivya'

let cachedClient = null
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri)
    await cachedClient.connect()
  }
  return cachedClient.db(dbName)
}

// ---- Seed data (marketplace demo) ----
const CATEGORIES = [
  { id: 'bridal',   name: 'Bridal Makeup',  icon: '💍', count: 248 },
  { id: 'party',    name: 'Party Makeup',   icon: '✨', count: 512 },
  { id: 'hair',     name: 'Hair',           icon: '💇🏻‍♀️', count: 389 },
  { id: 'nails',    name: 'Nails',          icon: '💅🏻', count: 276 },
  { id: 'mehendi',  name: 'Mehendi',        icon: '🌿', count: 154 },
  { id: 'salon',    name: 'Salon',          icon: '🏛️', count: 620 },
  { id: 'spa',      name: 'Spa',            icon: '🌸', count: 187 },
  { id: 'facial',   name: 'Facial',         icon: '🧖🏻‍♀️', count: 342 },
  { id: 'skincare', name: 'Skincare',       icon: '🌷', count: 210 },
  { id: 'hairstyle',name: 'Hair Styling',   icon: '🎀', count: 298 },
]

const IMG = {
  bride1: 'https://images.unsplash.com/photo-1610189019555-b1e26c2e424d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBicmlkYWwlMjBtYWtldXB8ZW58MHx8fHJlZHwxNzg0NjE2NzkwfDA&ixlib=rb-4.1.0&q=85&w=1400',
  bride2: 'https://images.unsplash.com/photo-1610189019389-975bbbc2f8f3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwyfHxJbmRpYW4lMjBicmlkYWwlMjBtYWtldXB8ZW58MHx8fHJlZHwxNzg0NjE2NzkwfDA&ixlib=rb-4.1.0&q=85&w=1400',
  bride3: 'https://images.pexels.com/photos/30825617/pexels-photo-30825617.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  bride4: 'https://images.pexels.com/photos/11742214/pexels-photo-11742214.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  bride5: 'https://images.pexels.com/photos/14089250/pexels-photo-14089250.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  bride6: 'https://images.pexels.com/photos/9157350/pexels-photo-9157350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  salon1: 'https://images.pexels.com/photos/7195809/pexels-photo-7195809.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  salon2: 'https://images.pexels.com/photos/7195801/pexels-photo-7195801.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  mehendi1:'https://images.pexels.com/photos/14825258/pexels-photo-14825258.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  mehendi2:'https://images.pexels.com/photos/19590224/pexels-photo-19590224.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  nails1: 'https://images.pexels.com/photos/35491156/pexels-photo-35491156.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  nails2: 'https://images.pexels.com/photos/34885842/pexels-photo-34885842.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  hair1:  'https://images.pexels.com/photos/17328861/pexels-photo-17328861.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  hair2:  'https://images.pexels.com/photos/11652342/pexels-photo-11652342.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  artist1:'https://images.pexels.com/photos/17056589/pexels-photo-17056589.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600',
  artist2:'https://images.pexels.com/photos/13018457/pexels-photo-13018457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600',
}

const ARTISTS = [
  {
    id: 'a1', name: 'Aanya Kapoor', title: 'Celebrity Bridal Artist',
    location: 'Mumbai • Bandra West', experience: 9,
    rating: 4.96, reviews: 342, verified: true, startingPrice: 18500,
    tags: ['Bridal', 'HD Makeup', 'Airbrush'],
    cover: IMG.bride1, avatar: IMG.artist1,
    portfolio: [IMG.bride1, IMG.bride2, IMG.bride6, IMG.hair1],
    about: 'Aanya is a celebrity bridal artist with 9+ years crafting timeless, luminous bridal looks for over 400 brides across India. Featured in Vogue India.',
    services: [
      { id:'s1', name:'Signature Bridal Makeup', duration:'3h', price:25000 },
      { id:'s2', name:'Engagement Look',          duration:'2h', price:15000 },
      { id:'s3', name:'Reception Glam',           duration:'2.5h', price:18500 },
    ],
  },
  {
    id: 'a2', name: 'Ishita Menon', title: 'Editorial Makeup Artist',
    location: 'Bengaluru • Indiranagar', experience: 7,
    rating: 4.92, reviews: 218, verified: true, startingPrice: 8500,
    tags: ['Party', 'Editorial', 'Soft Glam'],
    cover: IMG.bride2, avatar: IMG.artist2,
    portfolio: [IMG.bride2, IMG.bride3, IMG.hair2, IMG.bride5],
    about: 'Ishita specialises in editorial, dewy soft-glam looks for cocktail parties, sangeets and photoshoots.',
    services: [
      { id:'s1', name:'Party Glam',       duration:'1.5h', price:8500 },
      { id:'s2', name:'Sangeet Look',     duration:'2h',   price:12500 },
      { id:'s3', name:'Photoshoot Makeup',duration:'2h',   price:15000 },
    ],
  },
  {
    id: 'a3', name: 'Meher Sethi', title: 'Bridal Mehendi Artist',
    location: 'Delhi • Chattarpur', experience: 12,
    rating: 4.98, reviews: 511, verified: true, startingPrice: 6500,
    tags: ['Mehendi', 'Bridal', 'Rajasthani'],
    cover: IMG.mehendi1, avatar: IMG.artist1,
    portfolio: [IMG.mehendi1, IMG.mehendi2, IMG.bride4, IMG.bride5],
    about: 'Award-winning mehendi artist known for intricate Rajasthani and Arabic designs. Trusted by top wedding planners.',
    services: [
      { id:'s1', name:'Bridal Mehendi (both hands+feet)', duration:'5h', price:15500 },
      { id:'s2', name:'Guest Mehendi',                    duration:'20m',price:650  },
    ],
  },
  {
    id: 'a4', name: 'Riya Malhotra', title: 'Nail Couturier',
    location: 'Mumbai • Lower Parel', experience: 6,
    rating: 4.9, reviews: 189, verified: true, startingPrice: 2200,
    tags: ['Nails', 'Extensions', '3D Art'],
    cover: IMG.nails1, avatar: IMG.artist2,
    portfolio: [IMG.nails1, IMG.nails2, IMG.bride3, IMG.bride6],
    about: 'Luxury nail couture — bespoke chrome, 3D art, and gel extensions crafted by Riya.',
    services: [
      { id:'s1', name:'Gel Extensions Set', duration:'2h',   price:3500 },
      { id:'s2', name:'Chrome Manicure',    duration:'1h',   price:2200 },
    ],
  },
  {
    id: 'a5', name: 'Devika Rao', title: 'Master Hairstylist',
    location: 'Hyderabad • Jubilee Hills', experience: 10,
    rating: 4.93, reviews: 276, verified: true, startingPrice: 4500,
    tags: ['Hair', 'Bridal Hair', 'Balayage'],
    cover: IMG.hair1, avatar: IMG.artist1,
    portfolio: [IMG.hair1, IMG.hair2, IMG.bride1, IMG.bride2],
    about: 'From bridal chignons to editorial balayage — Devika elevates hair as art.',
    services: [
      { id:'s1', name:'Bridal Hair Styling', duration:'2h', price:8500 },
      { id:'s2', name:'Colour + Blowout',    duration:'3h', price:9500 },
    ],
  },
  {
    id: 'a6', name: 'Nisha Verma', title: 'Skincare & Facial Expert',
    location: 'Pune • Koregaon Park', experience: 8,
    rating: 4.88, reviews: 164, verified: true, startingPrice: 3200,
    tags: ['Facial', 'Skincare', 'HydraFacial'],
    cover: IMG.bride3, avatar: IMG.artist2,
    portfolio: [IMG.bride3, IMG.bride5, IMG.salon1, IMG.salon2],
    about: 'Certified aesthetician offering HydraFacials, chemical peels, and pre-bridal skincare routines.',
    services: [
      { id:'s1', name:'HydraFacial',       duration:'1h',   price:4500 },
      { id:'s2', name:'Pre-Bridal Package',duration:'3 sessions',price:18500 },
    ],
  },
  {
    id: 'a7', name: 'Zoya Ahmed', title: 'Airbrush Bridal Artist',
    location: 'Delhi • Vasant Kunj', experience: 11,
    rating: 4.97, reviews: 402, verified: true, startingPrice: 22000,
    tags: ['Bridal', 'Airbrush', 'HD'],
    cover: IMG.bride4, avatar: IMG.artist1,
    portfolio: [IMG.bride4, IMG.bride6, IMG.hair2, IMG.bride1],
    about: 'Zoya is celebrated for creating flawless airbrush bridal looks that photograph beautifully in every light.',
    services: [
      { id:'s1', name:'Airbrush Bridal', duration:'3h', price:28000 },
      { id:'s2', name:'Reception Look',  duration:'2h', price:22000 },
    ],
  },
  {
    id: 'a8', name: 'Tara Iyer', title: 'Soft Glam Specialist',
    location: 'Chennai • Nungambakkam', experience: 5,
    rating: 4.89, reviews: 132, verified: true, startingPrice: 6500,
    tags: ['Party', 'Natural Glam', 'Soft'],
    cover: IMG.bride5, avatar: IMG.artist2,
    portfolio: [IMG.bride5, IMG.bride6, IMG.hair1, IMG.bride2],
    about: 'Tara creates luminous, second-skin makeup for the modern woman — perfect for engagements and cocktails.',
    services: [
      { id:'s1', name:'Soft Glam Party', duration:'1.5h', price:6500 },
      { id:'s2', name:'Engagement Makeup',duration:'2h',   price:11500 },
    ],
  },
]

const SALONS = [
  { id:'sl1', name:'Aura Luxe Studio',   location:'Mumbai • Juhu',       rating:4.9,  reviews:812, image:IMG.salon1, price:'Starts ₹1,200',  services:['Hair','Facial','Nails','Spa'] },
  { id:'sl2', name:'Maison de Beauté',   location:'Delhi • Khan Market', rating:4.88, reviews:642, image:IMG.salon2, price:'Starts ₹1,500',  services:['Hair','Colour','Skincare'] },
  { id:'sl3', name:'Petal Beauty Lounge',location:'Bengaluru • Koramangala', rating:4.86, reviews:521, image:IMG.bride3, price:'Starts ₹900',   services:['Facial','Threading','Mani-Pedi'] },
  { id:'sl4', name:'Rouge Atelier',      location:'Hyderabad • Banjara Hills', rating:4.92, reviews:388, image:IMG.hair2, price:'Starts ₹1,800', services:['Bridal Hair','Colour','Extensions'] },
]

const PORTFOLIO_FEED = [
  { id:'p1', img:IMG.bride1, artistId:'a1', h:520 },
  { id:'p2', img:IMG.mehendi1, artistId:'a3', h:380 },
  { id:'p3', img:IMG.bride2, artistId:'a2', h:460 },
  { id:'p4', img:IMG.nails1, artistId:'a4', h:340 },
  { id:'p5', img:IMG.hair1, artistId:'a5', h:500 },
  { id:'p6', img:IMG.bride4, artistId:'a7', h:420 },
  { id:'p7', img:IMG.mehendi2, artistId:'a3', h:360 },
  { id:'p8', img:IMG.nails2, artistId:'a4', h:400 },
  { id:'p9', img:IMG.bride6, artistId:'a8', h:480 },
  { id:'p10', img:IMG.hair2, artistId:'a5', h:440 },
  { id:'p11', img:IMG.bride3, artistId:'a6', h:360 },
  { id:'p12', img:IMG.bride5, artistId:'a8', h:520 },
  { id:'p13', img:IMG.salon1, artistId:'a6', h:340 },
  { id:'p14', img:IMG.salon2, artistId:'a1', h:400 },
  { id:'p15', img:IMG.bride1, artistId:'a1', h:460 },
  { id:'p16', img:IMG.bride4, artistId:'a7', h:380 },
]

async function handler(request, ctx) {
  const params = await ctx.params
  const path = params?.path || []
  const route = '/' + path.join('/')
  const method = request.method

  try {
    if (route === '/' || route === '') {
      return NextResponse.json({ ok:true, service:'Rivya API', version:'1.0.0' })
    }
    if (route === '/categories' && method === 'GET') {
      return NextResponse.json({ categories: CATEGORIES })
    }
    if (route === '/artists' && method === 'GET') {
      const url = new URL(request.url)
      const cat = url.searchParams.get('category')
      let list = ARTISTS
      if (cat) list = ARTISTS.filter(a => a.tags.map(t=>t.toLowerCase()).includes(cat.toLowerCase()))
      return NextResponse.json({ artists: list })
    }
    if (route.startsWith('/artists/') && method === 'GET') {
      const id = route.split('/')[2]
      const artist = ARTISTS.find(a => a.id === id)
      if (!artist) return NextResponse.json({ error:'Not found' }, { status:404 })
      return NextResponse.json({ artist })
    }
    if (route === '/salons' && method === 'GET') {
      return NextResponse.json({ salons: SALONS })
    }
    if (route === '/portfolio' && method === 'GET') {
      return NextResponse.json({ items: PORTFOLIO_FEED })
    }
    if (route === '/bookings' && method === 'POST') {
      const body = await request.json()
      const db = await getDb()
      const booking = {
        id: uuidv4(),
        ...body,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      }
      await db.collection('bookings').insertOne(booking)
      return NextResponse.json({ booking })
    }
    if (route === '/auth/google' && method === 'POST') {
      const { credential } = await request.json()
      if (!credential) return NextResponse.json({ error:'Missing credential' }, { status:400 })
      // Google verifies the ID token's signature and expiry for us.
      const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`)
      const info = await res.json()
      if (!res.ok || info.aud !== process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || info.email_verified !== 'true') {
        return NextResponse.json({ error:'Invalid Google sign-in' }, { status:401 })
      }
      return NextResponse.json({
        user: { id: info.sub, name: info.name || '', email: info.email, picture: info.picture || '', provider: 'google' },
      })
    }
    if (route === '/bookings' && method === 'GET') {
      const db = await getDb()
      const bookings = await db.collection('bookings').find({}, { projection:{ _id:0 } }).sort({ createdAt:-1 }).limit(50).toArray()
      return NextResponse.json({ bookings })
    }
    return NextResponse.json({ error:'Route not found', route }, { status:404 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status:500 })
  }
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
export const PATCH = handler
