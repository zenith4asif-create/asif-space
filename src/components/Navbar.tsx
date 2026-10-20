import React, { useState } from 'react';
import { Volume2, VolumeX, Video, Sparkles, Orbit } from 'lucide-react';
import { isAudioPlaying, toggleSpaceAudio } from '../utils/audio';

export type MainTab = 'home' | 'destination' | 'isro' | 'crew' | 'technology';

interface NavbarProps {
  currentTab: MainTab;
  onNavigate: (tab: MainTab, subSlug?: string) => void;
  onOpenSimulation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate, onOpenSimulation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(isAudioPlaying());

  const navItems: { id: MainTab; number: string; label: string; href: string }[] = [
    { id: 'home', number: '00', label: 'Home', href: '/home.html' },
    { id: 'destination', number: '01', label: 'Destination', href: '/destination-moon.html' },
    { id: 'isro', number: '02', label: 'Moon & ISRO', href: '/isro-moon.html' },
    { id: 'crew', number: '03', label: 'Crew & Ghibli', href: '/crew-commander.html' },
    { id: 'technology', number: '04', label: 'Technology', href: '/technology-capsule.html' },
  ];

  const handleAudioToggle = () => {
    const newState = toggleSpaceAudio();
    setAudioActive(newState);
  };

  const handleLinkClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    e.preventDefault();
    onNavigate(item.id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-40 w-full pt-4 md:pt-0 lg:pt-8 flex items-center justify-between">
      {/* Brand Logo & Controls */}
      <div className="pl-4 sm:pl-8 lg:pl-14 shrink-0 flex items-center gap-2 sm:gap-3 md:gap-4">
        <a
          href="/home.html"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="group block transition-transform duration-300 hover:rotate-45"
          aria-label="Space Tourism Home"
        >
          <img
            src="/assets/shared/logo.svg"
            alt="Space Tourism Logo"
            className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Space Flight Video Simulation Launcher */}
        {onOpenSimulation && (
          <button
            onClick={onOpenSimulation}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-barlow-condensed tracking-widest uppercase transition-all duration-300 border bg-cyan-500/10 border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/20 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            title="Launch Sci-Fi Space Flight Video & Warp Simulation"
          >
            <Video className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="hidden xs:inline">Flight Video</span>
          </button>
        )}

        {/* Ambient Audio Toggle */}
        <button
          onClick={handleAudioToggle}
          className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-barlow-condensed tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
            audioActive
              ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/30'
          }`}
          title={audioActive ? 'Mute ambient sound' : 'Enable cosmic ambient sound'}
          aria-label={audioActive ? 'Mute ambient sound' : 'Enable cosmic ambient sound'}
        >
          {audioActive ? <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{audioActive ? 'Audio' : 'Muted'}</span>
        </button>
      </div>

      {/* Horizontal decorative connecting line (Desktop only) */}
      <div
        className="hidden lg:block relative z-20 flex-1 ml-10 -mr-6 h-[1px] bg-white/20"
        aria-hidden="true"
      />

      {/* Desktop & Tablet Navigation Bar */}
      <nav
        className="hidden md:flex items-center gap-6 lg:gap-10 px-8 lg:px-14 h-20 lg:h-22 glass-nav"
        style={{
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
        }}
        aria-label="Main Navigation"
      >
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item)}
              className={`relative flex items-center h-full text-xs sm:text-sm lg:text-base font-barlow-condensed tracking-[0.16em] uppercase transition-colors duration-200 whitespace-nowrap shrink-0 ${
                isActive ? 'text-white font-semibold' : 'text-[#d0d6f9] hover:text-white'
              }`}
            >
              <span className="font-bold text-white mr-2 hidden lg:inline">
                {item.number}
              </span>
              <span>{item.label}</span>

              {/* Active / Hover Underline indicator */}
              <span
                className={`absolute bottom-0 left-0 right-0 h-[3px] transition-all duration-300 ${
                  isActive
                    ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                    : 'bg-transparent group-hover:bg-white/50'
                }`}
              />
            </a>
          );
        })}
      </nav>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden pr-4 sm:pr-6">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 text-white hover:opacity-80 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Open Menu"
        >
          <img
            src="/assets/shared/icon-hamburger.svg"
            alt="Open menu icon"
            className="w-6 h-5"
            referrerPolicy="no-referrer"
          />
        </button>
      </div>

      {/* Mobile Sidebar / Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end md:hidden animate-in fade-in duration-200"
          style={{ background: 'rgba(0,0,0,0.65)' }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-[75vw] max-w-[320px] h-full bg-[#0b0e17]/95 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-white hover:opacity-75 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <img
                    src="/assets/shared/icon-close.svg"
                    alt="Close menu icon"
                    className="w-5 h-5"
                    referrerPolicy="no-referrer"
                  />
                </button>
              </div>

              {/* Menu Links */}
              <ul className="flex flex-col gap-5">
                {navItems.map((item) => {
                  const isActive = currentTab === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item)}
                        className={`flex items-center py-2 text-base font-barlow-condensed tracking-[0.2em] uppercase transition-colors ${
                          isActive
                            ? 'text-cyan-300 border-r-4 border-cyan-400 font-semibold'
                            : 'text-[#d0d6f9] hover:text-white'
                        }`}
                      >
                        <span className="font-bold text-white mr-3">
                          {item.number}
                        </span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  );
                })}

                {onOpenSimulation && (
                  <li className="pt-3 border-t border-white/10">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenSimulation();
                      }}
                      className="w-full text-left flex items-center gap-2 text-cyan-300 font-barlow-condensed tracking-wider uppercase text-sm py-2"
                    >
                      <Video className="w-4 h-4 text-cyan-400" />
                      <span>Launch Flight Video</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Social Icons matching original zip */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-barlow-condensed tracking-wider text-slate-400">
                <span>COMMUNICATION</span>
                <span className="text-cyan-400">ONLINE</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-xs">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  FB
                </a>
                <span>·</span>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Twitter
                </a>
                <span>·</span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Insta
                </a>
                <span>·</span>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
