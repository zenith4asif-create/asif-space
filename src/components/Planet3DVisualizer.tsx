import React, { useState } from 'react';
import { Scan, Compass, Sparkles, Orbit, Radio, Zap } from 'lucide-react';

interface Planet3DVisualizerProps {
  planetName: string;
  imageSrc: string;
  themeColor: string;
  distance: string;
  orbitalPeriod: string;
}

export const Planet3DVisualizer: React.FC<Planet3DVisualizerProps> = ({
  planetName,
  imageSrc,
  themeColor,
  distance,
  orbitalPeriod,
}) => {
  const [isScanning, setIsScanning] = useState(true);
  const [activeLayer, setActiveLayer] = useState<'surface' | 'atmosphere' | 'grid'>('surface');
  const [touchTilt, setTouchTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTouchTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTouchTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Sci-Fi Live Telemetry Badge (No spin rotation, pure live animation) */}
      <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/5 border border-cyan-400/30 text-xs font-mono tracking-widest text-cyan-300 uppercase mb-4 backdrop-blur-md">
        <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>LIVE SENSOR FEED · {planetName.toUpperCase()} · ORBIT: {orbitalPeriod}</span>
      </div>

      {/* Planet Stage Viewport */}
      <div
        className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-84 md:h-84 lg:w-[420px] lg:h-[420px] flex items-center justify-center select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Live Atmospheric Breathing Corona Halo */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-40 transition-all duration-1000 pointer-events-none animate-pulse"
          style={{
            background: `radial-gradient(circle, ${themeColor} 0%, transparent 70%)`,
            animationDuration: '4s',
          }}
        />

        {/* Outer Orbital Measurement Ring (Static measurement ring with live pulsing markers, no rotation) */}
        <div className="absolute inset-[-8px] sm:inset-[-18px] border border-cyan-400/20 rounded-full pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] animate-ping" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-cyan-400/60 rounded-full" />
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400/60 rounded-full" />
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400/60 rounded-full" />
        </div>

        {/* Secondary Static Calibration Ring */}
        <div className="absolute inset-[-20px] sm:inset-[-36px] border border-white/5 border-dashed rounded-full pointer-events-none" />

        {/* Planet Sphere with Live Floating Levitation & Interactive Perspective Tilt */}
        <div
          className="relative w-full h-full rounded-full flex items-center justify-center transition-transform duration-300 ease-out animate-float"
          style={{
            transform: `perspective(1000px) rotateY(${touchTilt.x}deg) rotateX(${touchTilt.y}deg)`,
          }}
        >
          <img
            src={imageSrc}
            alt={planetName}
            className="w-full h-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] pointer-events-none select-none transition-all duration-500"
            referrerPolicy="no-referrer"
          />

          {/* Live Scanning Laser Beam HUD Overlay */}
          {isScanning && (
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none border border-cyan-400/40">
              <div
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] animate-pulse"
                style={{
                  top: '48%',
                  animationDuration: '2.5s',
                }}
              />
              <div className="absolute inset-0 bg-cyan-500/5 backdrop-brightness-105" />
              {/* Latitude & Longitude HUD grid */}
              <div className="absolute inset-0 border-y border-cyan-400/20 top-1/3 bottom-1/3" />
              <div className="absolute inset-0 border-x border-cyan-400/20 left-1/3 right-1/3" />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/70 border border-cyan-400/30 font-mono text-[10px] text-cyan-300">
                LIVE SPECTRAL ANALYSIS · NOMINAL
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live Sensor Controls */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 bg-white/[0.04] backdrop-blur-xl border border-white/10 p-2 rounded-2xl max-w-sm w-full">
        {/* Toggle Scanning HUD */}
        <button
          onClick={() => setIsScanning(!isScanning)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-barlow-condensed tracking-wider uppercase transition-all cursor-pointer ${
            isScanning
              ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
              : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <Scan className="w-3.5 h-3.5" />
          <span>{isScanning ? 'Scanner Active' : 'Scanner Idle'}</span>
        </button>

        {/* Layer View Filter */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-barlow-condensed uppercase tracking-wider">
          <button
            onClick={() => setActiveLayer('surface')}
            className={`px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
              activeLayer === 'surface' ? 'bg-white text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Surface
          </button>
          <button
            onClick={() => setActiveLayer('atmosphere')}
            className={`px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
              activeLayer === 'atmosphere' ? 'bg-cyan-400 text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Aura
          </button>
        </div>
      </div>
    </div>
  );
};
