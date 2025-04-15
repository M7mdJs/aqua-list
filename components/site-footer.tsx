import Link from "next/link"
import { Github, Twitter, Heart, ExternalLink, Mail, MessageSquare, Headphones, HelpCircle, FileText, Shield, Bot, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { connectToDatabase } from "@/lib/mongodb"
import { formatNumber } from "@/lib/utils"

async function getSiteStats() {
  try {
    const { db } = await connectToDatabase()
    
    const botsCount = await db.collection("bots").countDocuments({ status: "approved" })
    
    const usersCount = await db.collection("users").countDocuments()
    
    return {
      botsCount,
      usersCount
    }
  } catch (error) {
    console.error("Error fetching site stats:", error)
    return {
      botsCount: 500, // Fallback values
      usersCount: 10000
    }
  }
}

export async function SiteFooter() {
  const { botsCount, usersCount } = await getSiteStats()
  
  const formattedBotsCount = formatNumber(botsCount) + "+ Bots Listed"
  const formattedUsersCount = formatNumber(usersCount) + "+ Users"
  
  return (
    <footer className="border-t bg-gradient-to-b from-background/50 to-muted/30 backdrop-blur-sm">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                <Image 
                  src="/logo2.png" 
                  alt="AquaList Logo" 
                  fill 
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">AquaList</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              The premier platform for discovering, sharing, and growing your Discord bots. Join our thriving community of developers and server owners.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                {formattedBotsCount}
              </Badge>
              <Badge variant="outline" className="bg-sky-500/10 text-sky-500 border-sky-500/20">
                {formattedUsersCount}
              </Badge>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                24/7 Support
              </Badge>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Stay Updated</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for the latest bot releases, updates, and Discord news.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
              <Button className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:opacity-90">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
            </p>
          </div>
        </div>
        
        <Separator className="mb-12 opacity-30" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="font-medium text-lg flex items-center">
              <Bot className="h-5 w-5 mr-2 text-emerald-500" />
              Bot Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/bots" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
                  Browse Bots
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
                  Submit Your Bot
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
                  Bot Categories
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
                  Trending Bots
                </Link>
              </li>
              <li>
                <Link href="/certification" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
                  Bot Certification
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg flex items-center">
              <Users className="h-5 w-5 mr-2 text-sky-500" />
              Community
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/users" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
                  Developers
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
                  Partners
                </Link>
              </li>
              <li>
                <a href="https://discord.gg/BQrPPR8xWq" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
                  Join Our Discord
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg flex items-center">
              <FileText className="h-5 w-5 mr-2 text-amber-500" />
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="/docs/getting-started" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/docs/examples" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
                  Code Examples
                </Link>
              </li>
              <li>
                <Link href="/docs/changelog" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
                  API Changelog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg flex items-center">
              <Shield className="h-5 w-5 mr-2 text-purple-500" />
              Legal & Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-70" />
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 p-6 rounded-xl bg-gradient-to-r from-emerald-500/5 to-sky-500/5 border border-border/40">
          <div>
            <h3 className="font-medium text-lg mb-2">Connect With Us</h3>
            <p className="text-sm text-muted-foreground">Follow us on social media for updates and announcements</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="icon" className="rounded-full border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/30" asChild>
              <a href="https://github.com/Aqua-List" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5 text-emerald-500" />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/30" asChild>
              <a href="https://discord.gg/BQrPPR8xWq" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <MessageSquare className="h-5 w-5 text-purple-500" />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-amber-500/20 hover:bg-amber-500/10 hover:border-amber-500/30" asChild>
              <a href="mailto:contact@aqualist.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
                <Mail className="h-5 w-5 text-amber-500" />
              </a>
            </Button>
          </div>
        </div>
        
        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground order-2 md:order-1">
            © {new Date().getFullYear()} AquaList. All rights reserved.
          </p>
          <div className="flex items-center gap-6 order-1 md:order-2">
            <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground p-0 h-auto" asChild>
              <Link href="/sitemap">Sitemap</Link>
            </Button>
            <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground p-0 h-auto" asChild>
              <Link href="/accessibility">Accessibility</Link>
            </Button>
            <p className="text-sm text-muted-foreground flex items-center">
              Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> by CodixVerse
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

