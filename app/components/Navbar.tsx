'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { LayoutDashboard, LogOut, Upload, User, Menu, X, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Video className="h-8 w-8 text-reelspro-cyan" />
          <span className="text-xl font-bold">Reels<span className="text-reelspro-cyan">Pro</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-white/80 hover:text-reelspro-blue transition-colors">Features</Link>
          <Link href="#pricing" className="text-white/80 hover:text-reelspro-blue transition-colors">Pricing</Link>
          <Link href="#about" className="text-white/80 hover:text-reelspro-blue transition-colors">About</Link>
          <Link href="#contact" className="text-white/80 hover:text-reelspro-blue transition-colors">Contact</Link>

          {session?.user && (
            <>
              <Link href="/dashboard" className="flex items-center space-x-2 text-white/80 hover:text-reelspro-blue transition-colors">
                <LayoutDashboard className="w-5 h-5" /> <span>Dashboard</span>
              </Link>
              <Link href="/upload" className="flex items-center space-x-2 text-white/80 hover:text-reelspro-blue transition-colors">
                <Upload className="w-5 h-5" /> <span>Upload Video</span>
              </Link>
            </>
          )}
        </div>

        {/* Auth buttons / User info */}
        <div className="hidden md:flex items-center space-x-4">
          {session?.user ? (
            <>
              <div className="flex items-center space-x-2 text-white">
                <User className="w-5 h-5" />
                <span>{session.user.email?.split('@')[0]}</span>
              </div>
              <Button onClick={handleSignOut} className="bg-red-600 hover:bg-red-700">
                <div className="flex items-center space-x-2">
                  <LogOut className="w-4 h-4" /> <span>Sign Out</span>
                </div>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button  className="text-white  bg-gradient-to-r from-reelspro-blue/70 to-reelspro-blue/40 ">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-reelspro-pink/50 to-reelspro-purple/40 hover:opacity-90">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md absolute top-full left-0 right-0 p-4 flex flex-col space-y-4 shadow-lg border-t border-white/10">
          <Link href="#features" className="text-white/80 hover:text-reelspro-blue transition-colors py-2" onClick={closeMobileMenu}>Features</Link>
          <Link href="#pricing" className="text-white/80 hover:text-reelspro-blue transition-colors py-2" onClick={closeMobileMenu}>Pricing</Link>
          <Link href="#about" className="text-white/80 hover:text-reelspro-blue transition-colors py-2" onClick={closeMobileMenu}>About</Link>
          <Link href="#contact" className="text-white/80 hover:text-reelspro-blue transition-colors py-2" onClick={closeMobileMenu}>Contact</Link>

          {session?.user && (
            <>
              <Link href="/dashboard" className="flex items-center space-x-2 text-white/80 hover:text-reelspro-blue py-2" onClick={closeMobileMenu}>
                <LayoutDashboard className="w-5 h-5" /> <span>Dashboard</span>
              </Link>
              <Link href="/upload" className="flex items-center space-x-2 text-white/80 hover:text-reelspro-blue py-2" onClick={closeMobileMenu}>
                <Upload className="w-5 h-5" /> <span>Upload Video</span>
              </Link>
            </>
          )}

          <div className="pt-2 flex flex-col space-y-3 border-t border-white/10">
            {session?.user ? (
              <Button onClick={() => { handleSignOut(); closeMobileMenu(); }} className="w-full bg-red-600 hover:bg-red-700">
                <div className="flex items-center space-x-2 justify-center">
                  <LogOut className="w-4 h-4" /> <span>Sign Out</span>
                </div>
              </Button>
            ) : (
              <>
                <Link href="/login" onClick={closeMobileMenu}>
                  <Button variant="outline" className="w-full border-reelspro-blue text-reelspro-blue">Login</Button>
                </Link>
                <Link href="/register" onClick={closeMobileMenu}>
                  <Button className="w-full bg-gradient-to-r from-reelspro-purple to-reelspro-blue">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;