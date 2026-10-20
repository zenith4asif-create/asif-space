import React, { useState } from 'react';
import { spaceData, Destination } from '../data/spaceData';
import { Planet3DVisualizer } from '../components/Planet3DVisualizer';
import { Compass, Sparkles, Thermometer, Gauge, Clock, Navigation, Globe, Eye, Orbit } from 'lucide-react';

interface DestinationViewProps {
  currentDestId: string;
  onSelectDestination: (destId: string) => void;
  onOpenVideoSimulation?: () => void;
  onOpenMoonDiscoveries?: () => void;
}

export const DestinationView: React.FC<DestinationViewProps> = ({
  currentDestId,
  onSelectDestination,
  onOpenVideoSimulation,
  onOpenMoonDiscoveries,
}) => {
  const [showExtendedData, setShowExtendedData] = useState(false);

  // Find active destination or fallback to Moon
  const activeDest: Destination =
    spaceData.destinations.find((d) => d.id === currentDestId) ||
    spaceData.destinations[0];

  const getThemeColor = (id: string) => {
    switch (id) {
      case 'mars':
        return 'rgba(239, 68, 68, 0.45)';
      case 'europa':
        return 'rgba(56, 189, 248, 0.45)';
      case 'titan':
        return 'rgba(245, 158, 11, 0.45)';
      case 'moon':
      default:
        return 'rgba(255, 255, 255, 0.35)';
    }
  };

  return (
    <div className="relative z-10 flex-1 flex flex-col justify-between px-4 sm:px-8 md:px-16 lg:px-28 py-6 md:py-10 lg:py-12 max-w-7xl mx-auto w-full">
      {/* Page Title: 01 PICK YOUR DESTINATION */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 md:mb-10">
        <h2 className="font-barlow-condensed text-base sm:text-lg md:text-xl lg:text-2xl tracking-[0.25em] uppercase text-white text-center md:text-left">
          <span className="font-bold text-white/30 mr-3">01</span>
          Pick your destination
        </h2>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2">
          {activeDest.id === 'moon' && onOpenMoonDiscoveries && (
            <button
              onClick={onOpenMoonDiscoveries}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-xs font-barlow-condensed tracking-widest uppercase text-amber-300 hover:bg-amber-500/30 transition-all cursor-pointer shadow-[0_0_12px_rgba(251,191,36,0.3)]"
            >
              <Orbit className="w-3.5 h-3.5 text-amber-400" />
              <span>ISRO Moon Discoveries</span>
            </button>
          )}

          {onOpenVideoSimulation && (
            <button
              onClick={onOpenVideoSimulation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-xs font-barlow-condensed tracking-widest uppercase text-cyan-300 hover:bg-cyan-500/25 transition-all cursor-pointer shadow-[0_0_12px_rgba(34,211,238,0.25)]"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Flight Sim</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Left Rotatable 3D Planet, Right Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left: Live Animated Planet Visualizer (No spin rotation, pure live animation) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <Planet3DVisualizer
            planetName={activeDest.name}
            imageSrc={activeDest.images.webp || activeDest.images.png}
            themeColor={getThemeColor(activeDest.id)}
            distance={activeDest.distance}
            orbitalPeriod={activeDest.orbitalPeriod || '27.3 Earth days'}
          />

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setShowExtendedData(!showExtendedData)}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-barlow-condensed tracking-widest uppercase text-[#d0d6f9] hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>{showExtendedData ? 'Show Distance Specs' : 'Detailed Telemetry'}</span>
            </button>
          </div>
        </div>

        {/* Right: Planet Tabs, Details & Stats */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Destination Tabs (Moon, Mars, Europa, Titan) */}
          <div
            className="flex items-center gap-5 sm:gap-7 md:gap-9 mb-6 md:mb-8 border-b border-white/10 pb-2 w-full justify-center lg:justify-start"
            role="tablist"
            aria-label="Destinations"
          >
            {spaceData.destinations.map((dest) => {
              const isActive = dest.id === activeDest.id;
              return (
                <button
                  key={dest.id}
                  onClick={() => onSelectDestination(dest.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`relative pb-3 text-xs sm:text-sm md:text-base font-barlow-condensed tracking-[0.2em] uppercase transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-white font-semibold' : 'text-[#d0d6f9] hover:text-white'
                  }`}
                >
                  <span>{dest.name}</span>
                  {/* Underline indicator */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[3px] transition-all duration-300 ${
                      isActive
                        ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                        : 'bg-transparent hover:bg-white/40'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Planet Name */}
          <h3 className="font-bellefair text-5xl sm:text-7xl lg:text-8xl text-white uppercase tracking-wider mb-3 leading-none">
            {activeDest.name}
          </h3>

          {/* Planet Description */}
          <p className="font-barlow text-[#d0d6f9] text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mb-6 font-light">
            {activeDest.description}
          </p>

          {/* Fun fact highlight */}
          {activeDest.funFact && (
            <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left max-w-lg">
              <div className="flex items-center gap-2 mb-1 text-xs font-barlow-condensed tracking-widest uppercase text-cyan-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cosmic Fact</span>
              </div>
              <p className="text-xs sm:text-sm font-barlow text-slate-300">
                {activeDest.funFact}
              </p>
            </div>
          )}

          {/* Divider Line */}
          <div className="w-full h-[1px] bg-white/15 my-4 sm:my-6" />

          {/* Primary Stats: Distance & Travel Time */}
          {!showExtendedData ? (
            <div className="grid grid-cols-2 gap-6 w-full max-w-lg pt-1 text-left sm:text-center lg:text-left">
              <div>
                <p className="font-barlow-condensed text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#d0d6f9] mb-1 flex items-center gap-1.5 justify-start lg:justify-start">
                  <Navigation className="w-3 h-3 text-cyan-400" />
                  <span>Avg. Distance</span>
                </p>
                <p className="font-bellefair text-2xl sm:text-3xl text-white uppercase">
                  {activeDest.distance}
                </p>
              </div>
              <div>
                <p className="font-barlow-condensed text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#d0d6f9] mb-1 flex items-center gap-1.5 justify-start lg:justify-start">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>Est. Travel Time</span>
                </p>
                <p className="font-bellefair text-2xl sm:text-3xl text-white uppercase">
                  {activeDest.travel}
                </p>
              </div>
            </div>
          ) : (
            /* Extended Telemetry Specs */
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-lg pt-1 text-left">
              <div>
                <p className="font-barlow-condensed text-[11px] uppercase tracking-[0.15em] text-[#d0d6f9] mb-0.5 flex items-center gap-1">
                  <Gauge className="w-3 h-3 text-cyan-400" />
                  <span>Gravity</span>
                </p>
                <p className="font-mono text-base sm:text-lg text-white font-semibold">
                  {activeDest.gravity}
                </p>
              </div>
              <div>
                <p className="font-barlow-condensed text-[11px] uppercase tracking-[0.15em] text-[#d0d6f9] mb-0.5 flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-amber-400" />
                  <span>Avg. Temp</span>
                </p>
                <p className="font-mono text-base sm:text-lg text-white font-semibold">
                  {activeDest.temperature}
                </p>
              </div>
              <div>
                <p className="font-barlow-condensed text-[11px] uppercase tracking-[0.15em] text-[#d0d6f9] mb-0.5">
                  <span>Orbital Period</span>
                </p>
                <p className="font-mono text-base sm:text-lg text-white font-semibold">
                  {activeDest.orbitalPeriod}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
