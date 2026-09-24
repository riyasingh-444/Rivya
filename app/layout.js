import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Rivya — Discover Verified Beauty Artists',
  description: 'Rivya is the premium beauty marketplace to discover, compare and book verified makeup artists, salons, mehendi artists, hairstylists and skincare experts.',
  keywords: 'beauty marketplace, bridal makeup, book makeup artist, salon booking, mehendi artist, nail artist, Rivya',
}

// Runs BEFORE React hydrates to strip attributes injected by browser
// extensions (password managers / form fillers add `fdprocessedid` which
// causes false-positive hydration warnings).
const stripExtensionAttrs = `
(function(){
  try {
    var strip = function(){
      var nodes = document.querySelectorAll('[fdprocessedid]');
      for (var i=0;i<nodes.length;i++) nodes[i].removeAttribute('fdprocessedid');
    };
    strip();
    var obs = new MutationObserver(strip);
    obs.observe(document.documentElement, { subtree:true, attributes:true, attributeFilter:['fdprocessedid'] });
    setTimeout(function(){ obs.disconnect(); }, 4000);
  } catch(e) {}
})();
`

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: stripExtensionAttrs }} />
      </head>
      <body className="font-sans antialiased bg-blush text-ink" suppressHydrationWarning>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
