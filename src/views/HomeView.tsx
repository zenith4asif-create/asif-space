import React from 'react';
import { Compass, Sparkles, Orbit, Video, Heart, Globe, ArrowRight, Award } from 'lucide-react';
import { spaceData } from '../data/spaceData';

interface HomeViewProps {
  onExplore: () => void;
  onSelectDestination: (destId: string) => void;
  onOpenSimulation: () => void;
  onOpenGhibliCadets: () => void;
  onOpenIsro?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onExplore,
  onSelectDestination,
  onOpenSimulation,
  onOpenGhibliCadets,
  onOpenIsro,
}) => {
  return (
    <div className="relative z-10 flex-1 flex flex-col justify-between px-4 sm:px-8 md:px-16 lg:px-28 py-6 md:py-10 lg:py-16 max-w-7xl mx-auto w-full">
      {/* Hero content split */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16 pt-4 md:pt-10 lg:pt-16">
        {/* Left column: Text */}
        <div className="max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-3 md:mb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-barlow-condensed tracking-[0.2em] text-[#d0d6f9] uppercase">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Commercial Space 2026</span>
            </div>

            {/* ISRO Moon badge */}
            {onOpenIsro && (
              <button
                onClick={onOpenIsro}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-xs font-barlow-condensed tracking-[0.2em] text-amber-300 uppercase hover:bg-amber-500/30 transition-all cursor-pointer shadow-[0_0_12px_rgba(251,191,36,0.3)]"
              >
                <Orbit className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>ISRO Moon Hub</span>
              </button>
            )}

            {/* Flight video badge */}
            <button
              onClick={onOpenSimulation}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-xs font-barlow-condensed tracking-[0.2em] text-cyan-300 uppercase hover:bg-cyan-500/30 transition-all cursor-pointer shadow-[0_0_12px_rgba(34,211,238,0.3)]"
            >
              <Video className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>Flight Sim</span>
            </button>
          </div>

          <h3 className="font-barlow-condensed text-sm sm:text-base md:text-xl text-[#d0d6f9] uppercase tracking-[0.25em] mb-2 md:mb-4">
            So, you want to travel to
          </h3>

          <h1 className="font-bellefair text-6xl sm:text-8xl lg:text-9xl text-white uppercase tracking-wider mb-4 md:mb-6 leading-none drop-shadow-[0_0_50px_rgba(255,255,255,0.15)]">
            Space
          </h1>

          <p className="font-barlow text-[#d0d6f9] text-sm sm:text-base md:text-lg leading-relaxed max-w-md lg:max-w-lg mb-6 md:mb-8 font-light">
            Let’s face it; if you want to go to space, you might as well genuinely
            go to outer space and not hover kind of on the edge of it. Well sit
            back, and relax because we’ll give you a truly out of this world
            experience!
          </p>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6 md:mb-8">
            <button
              onClick={onOpenSimulation}
              className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-cyan-400 text-black font-barlow-condensed font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-pointer"
            >
              <Video className="w-4 h-4 fill-black" />
              <span>Watch Sci-Fi Warp Video</span>
            </button>

            {onOpenIsro && (
              <button
                onClick={onOpenIsro}
                className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-barlow-condensed text-xs sm:text-sm tracking-wider uppercase hover:bg-amber-500/30 transition-all cursor-pointer shadow-[0_0_15px_rgba(251,191,36,0.25)]"
              >
                <Orbit className="w-4 h-4 text-amber-400" />
                <span>Chandrayaan-3 & Moon</span>
              </button>
            )}

            <button
              onClick={onOpenGhibliCadets}
              className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/40 text-pink-300 font-barlow-condensed text-xs sm:text-sm tracking-wider uppercase hover:bg-pink-500/30 transition-all cursor-pointer shadow-[0_0_15px_rgba(236,72,153,0.25)]"
            >
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
              <span>Ghibli Space Kids Art</span>
            </button>
          </div>

          {/* Quick stats highlight */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-white/10 w-full max-w-md">
            <div>
              <p className="font-barlow-condensed text-[10px] sm:text-xs uppercase tracking-widest text-slate-400">
                Destinations
              </p>
              <p className="font-bellefair text-xl sm:text-2xl md:text-3xl text-white mt-0.5">
                04 Moons
              </p>
            </div>
            <div>
              <p className="font-barlow-condensed text-[10px] sm:text-xs uppercase tracking-widest text-slate-400">
                Warp Drive
              </p>
              <p className="font-bellefair text-xl sm:text-2xl md:text-3xl text-cyan-300 mt-0.5">
                Active
              </p>
            </div>
            <div>
              <p className="font-barlow-condensed text-[10px] sm:text-xs uppercase tracking-widest text-slate-400">
                ISRO Mission
              </p>
              <p className="font-bellefair text-xl sm:text-2xl md:text-3xl text-amber-300 mt-0.5">
                Pragyan
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Explore Button */}
        <div className="flex flex-col items-center justify-center pt-4 lg:pt-0">
          <div className="relative group">
            {/* Subtle animated ambient ripple */}
            <div
              className="absolute inset-0 rounded-full bg-white/5 scale-125 opacity-50 group-hover:scale-150 group-hover:bg-cyan-400/10 transition-all duration-700 ease-out animate-pulse"
              aria-hidden="true"
            />

            {/* Expanding outer aura ring */}
            <div
              className="absolute inset-0 rounded-full bg-white/10 scale-100 group-hover:scale-[1.4] transition-all duration-500 ease-out pointer-events-none"
              aria-hidden="true"
            />

            {/* Core Circular Explore Button */}
            <button
              onClick={onExplore}
              className="relative z-10 w-36 h-36 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-white text-[#0b0d17] font-bellefair text-xl sm:text-3xl md:text-4xl uppercase tracking-[0.08em] flex items-center justify-center transition-all duration-500 shadow-[0_10px_40px_rgba(255,255,255,0.2)] group-hover:shadow-[0_15px_60px_rgba(255,255,255,0.4)] group-active:scale-95 cursor-pointer"
              aria-label="Explore Destinations"
            >
              <span className="group-hover:tracking-[0.14em] transition-all duration-300">
                Explore
              </span>
            </button>
          </div>

          <p className="mt-6 sm:mt-8 text-[11px] sm:text-xs font-barlow-condensed tracking-[0.25em] text-slate-400 uppercase flex items-center gap-2">
            <Orbit className="w-3.5 h-3.5 text-cyan-400" />
            <span>Click Explore to plan your voyage</span>
          </p>
        </div>
      </div>

      {/* Bottom quick destination shortcuts (hidden on small phones to keep thumb-friendly) */}
      <div className="mt-8 sm:mt-12 pt-6 border-t border-white/10 hidden md:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="font-barlow-condensed text-xs uppercase tracking-[0.25em] text-slate-300">
              Celestial Destinations · Click to view
            </span>
          </div>
          <div className="flex items-center gap-6">
            {spaceData.destinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => onSelectDestination(dest.id)}
                className="group flex items-center gap-2 text-sm font-barlow-condensed tracking-wider text-[#d0d6f9] hover:text-white transition-colors cursor-pointer"
              >
                <img
                  src={dest.images.webp}
                  alt={dest.name}
                  className="w-5 h-5 rounded-full object-cover group-hover:scale-125 transition-transform"
                />
                <span className="uppercase">{dest.name}</span>
                <span className="text-xs text-slate-400 font-mono">({dest.distance})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
