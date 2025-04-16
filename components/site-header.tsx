"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSession, signIn, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, Shield, Bot, Home, Users, PlusCircle, ExternalLink, Search, Bell, LogOut, Settings, User, LogIn, ChevronDown, Sparkles, Compass, Zap } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { UserRole } from "@/lib/models/user"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function SiteHeader() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

 
  const hasAdminAccess = session?.user && 
    Array.isArray((session.user as any).roles) && 
    (session.user as any).roles.some((role: string) =>
      [UserRole.ADMIN, UserRole.BOT_REVIEWER, UserRole.BOT_FOUNDER].includes(role as UserRole)
    )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="h-4 w-4" />,
      active: pathname === "/",
    },
    {
      href: "/bots",
      label: "Explore",
      icon: <Compass className="h-4 w-4" />,
      active: pathname === "/bots",
    },
    {
      href: "/submit",
      label: "Submit",
      icon: <PlusCircle className="h-4 w-4" />,
      active: pathname === "/submit",
    },
    {
      href: "/users",
      label: "Users",
      icon: <Users className="h-4 w-4" />,
      active: pathname === "/users",
    },
  ]

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-all duration-300",
      scrolled 
        ? "bg-background/80 backdrop-blur-md border-b shadow-sm" 
        : "bg-transparent"
    )}>
      <div className="container flex h-16 items-center">
      
        <div className="mr-4 hidden md:flex items-center">
          <Link href="/" className="mr-8 flex items-center space-x-2 group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden transition-transform group-hover:scale-110">
              <Image 
                src="https://aqua-cdn-nine.vercel.app/assets/logo2.png" 
                alt="AquaList Logo" 
                fill 
                className="object-cover"
              />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500 transition-all group-hover:from-emerald-400 group-hover:to-sky-400">
              AquaList
            </span>
          </Link>
          
          <nav className="flex items-center">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "px-3 py-2 mx-1 rounded-md transition-colors flex items-center gap-2 relative group",
                  route.active 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {route.icon}
                {route.label}
                {route.active && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full"></span>
                )}
                <span className="absolute inset-0 rounded-md bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            ))}
          </nav>
        </div>

        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] border-r border-border/50">
            <SheetHeader className="mb-6">
              <SheetTitle className="flex items-center">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden mr-2">
                  <Image 
                    src="https://aqua-cdn-nine.vercel.app/assets/logo2.png" 
                    alt="AquaList Logo" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500">
                  AquaList
                </span>
              </SheetTitle>
              <SheetDescription>Discover and share Discord bots</SheetDescription>
            </SheetHeader>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search bots..." 
                className="pl-10 bg-muted/50 border-border/50"
              />
            </div>
            
            <nav className="flex flex-col gap-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "px-3 py-2.5 rounded-md transition-colors flex items-center gap-3",
                    route.active 
                      ? "bg-gradient-to-r from-emerald-500/10 to-sky-500/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <span className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full",
                    route.active 
                      ? "bg-primary/10 text-primary" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {route.icon}
                  </span>
                  {route.label}
                </Link>
              ))}
              
              {hasAdminAccess && (
                <Link
                  href="/admin"
                  className={cn(
                    "px-3 py-2.5 rounded-md transition-colors flex items-center gap-3",
                    pathname === "/admin" 
                      ? "bg-gradient-to-r from-emerald-500/10 to-sky-500/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <span className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full",
                    pathname === "/admin" 
                      ? "bg-primary/10 text-primary" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    <Shield className="h-4 w-4" />
                  </span>
                  Admin Panel
                </Link>
              )}
            </nav>
            
            {session ? (
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3 ring-2 ring-primary/20">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{session.user?.name}</p>
                    <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Link 
                    href="/dashboard" 
                    className="px-3 py-2.5 rounded-md transition-colors flex items-center gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground">
                      <User className="h-4 w-4" />
                    </span>
                    Dashboard
                  </Link>
                  <Link 
                    href="/dashboard?tab=settings" 
                    className="px-3 py-2.5 rounded-md transition-colors flex items-center gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground">
                      <Settings className="h-4 w-4" />
                    </span>
                    Settings
                  </Link>
                  <button 
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="px-3 py-2.5 rounded-md transition-colors flex items-center gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-left"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground">
                      <LogOut className="h-4 w-4" />
                    </span>
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 pt-6 border-t border-border/50">
                <Button 
                  onClick={() => signIn("discord")} 
                  className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:opacity-90"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign in with Discord
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
              <div className="relative w-7 h-7 rounded-lg overflow-hidden">
                <Image 
                  src="https://aqua-cdn-nine.vercel.app/assets/logo2.png" 
                  alt="AquaList Logo" 
                  fill 
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500">
                AquaList
              </span>
            </Link>
          </div>
          
         
          <div className="flex items-center gap-2">
    
            
       
            {hasAdminAccess && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" asChild className="hidden md:flex text-muted-foreground hover:text-foreground">
                      <Link href="/admin">
                        <Shield className="h-5 w-5" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Admin Panel</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            
            <ModeToggle />
            
            
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/profile/${(session.user as any).discordId || ''}`} className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard?tab=bots" className="flex items-center">
                      <Bot className="h-4 w-4 mr-2" />
                      My Bots
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onSelect={(event) => {
                      event.preventDefault()
                      signOut({ callbackUrl: "/" })
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => signIn("discord")} 
                className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:opacity-90"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

