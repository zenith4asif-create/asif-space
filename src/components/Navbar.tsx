import React, { useState } from 'react';
import { Volume2, VolumeX, Video, Sparkles } from 'lucide-react';
import { isAudioPlaying, toggleSpaceAudio } from '../utils/audio';

export type MainTab = 'home' | 'destination' | 'crew' | 'technology';

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
    { id: 'crew', number: '02', label: 'Crew', href: '/crew-commander.html' },
    { id: 'technology', number: '03', label: 'Technology', href: '/technology-capsule.html' },
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
    <header className="relative z-40 w-full pt-6 md:pt-0 lg:pt-10 flex items-center justify-between">
      {/* Brand Logo & Controls */}
      <div className="pl-6 md:pl-10 lg:pl-14 shrink-0 flex items-center gap-3 md:gap-4">
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
            className="w-10 h-10 md:w-12 md:h-12 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Space Flight Video Simulation Launcher */}
        {onOpenSimulation && (
          <button
            onClick={onOpenSimulation}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-barlow-condensed tracking-widest uppercase transition-all duration-300 border bg-cyan-500/10 border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/20 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            title="Launch Sci-Fi Space Flight Video & Warp Simulation"
          >
            <Video className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">Flight Video</span>
          </button>
        )}

        {/* Ambient Audio Toggle */}
        <button
          onClick={handleAudioToggle}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-barlow-condensed tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
            audioActive
              ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/30'
          }`}
          title={audioActive ? 'Mute ambient sound' : 'Enable cosmic ambient sound'}
          aria-label={audioActive ? 'Mute ambient sound' : 'Enable cosmic ambient sound'}
        >
          {audioActive ? <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{audioActive ? 'Audio ON' : 'Audio OFF'}</span>
        </button>
      </div>

      {/* Horizontal decorative connecting line (Desktop only) */}
      <div
        className="hidden lg:block relative z-20 flex-1 ml-16 -mr-8 h-[1px] bg-white/20"
        aria-hidden="true"
      />

      {/* Desktop & Tablet Navigation Bar */}
      <nav
        className="hidden md:flex items-center gap-8 lg:gap-12 px-12 lg:px-20 h-20 lg:h-24 glass-nav"
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
              className={`relative flex items-center h-full text-sm lg:text-base font-barlow-condensed tracking-[0.18em] uppercase transition-colors duration-200 whitespace-nowrap shrink-0 ${
                isActive ? 'text-white' : 'text-[#d0d6f9] hover:text-white'
              }`}
            >
              <span className="font-bold text-white mr-2.5 hidden lg:inline">
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
      <div className="md:hidden pr-6">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 text-white hover:opacity-80 transition-opacity"
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
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-[70vw] max-w-[320px] h-full bg-[#0b0e17]/95 backdrop-blur-2xl border-l border-white/10 p-8 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Close Button */}
              <div className="flex justify-end mb-12">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-white hover:opacity-75 transition-opacity"
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
              <ul className="flex flex-col gap-6">
                {navItems.map((item) => {
                  const isActive = currentTab === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item)}
                        className={`flex items-center py-2 text-lg font-barlow-condensed tracking-[0.2em] uppercase transition-colors ${
                          isActive
                            ? 'text-white border-r-4 border-white font-semibold'
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
                  <li className="pt-4 border-t border-white/10">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenSimulation();
                      }}
                      className="w-full text-left flex items-center gap-2 text-cyan-300 font-barlow-condensed tracking-wider uppercase text-base"
                    >
                      <Video className="w-4 h-4 text-cyan-400" />
                      <span>Launch Flight Video</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Social Icons matching original zip */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs font-barlow-condensed tracking-wider text-slate-400">
                <span>COMMUNICATION</span>
                <span className="text-cyan-400">ONLINE</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors text-sm font-barlow-condensed tracking-wider"
                >
                  Facebook
                </a>
                <span>·</span>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors text-sm font-barlow-condensed tracking-wider"
                >
                  Twitter
                </a>
                <span>·</span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors text-sm font-barlow-condensed tracking-wider"
                >
                  Instagram
                </a>
                <span>·</span>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors text-sm font-barlow-condensed tracking-wider"
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
