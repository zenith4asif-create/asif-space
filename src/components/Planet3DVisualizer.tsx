import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Play, Pause, Scan, Compass, Maximize2, Sparkles, Orbit } from 'lucide-react';

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
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [tilt, setTilt] = useState(12);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentAngleRef = useRef(0);

  // Auto rotation loop
  useEffect(() => {
    let animId: number;
    const animate = () => {
      if (isAutoRotating) {
        setRotationAngle((prev) => (prev + 0.35 * rotationSpeed) % 360);
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isAutoRotating, rotationSpeed]);

  // Drag to rotate handling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentAngleRef.current = rotationAngle;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    setRotationAngle((currentAngleRef.current + deltaX * 0.75) % 360);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Sci-Fi HUD Coordinates Badge */}
      <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-widest text-cyan-300 uppercase mb-4 backdrop-blur-md">
        <Scan className="w-3 h-3 text-cyan-400 animate-pulse" />
        <span>SECTOR: {planetName.toUpperCase()} · ORBIT: {orbitalPeriod}</span>
      </div>

      {/* Interactive Planet Viewport */}
      <div
        className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[440px] lg:h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        title="Click and drag to rotate the planet in 3D"
      >
        {/* Ambient atmospheric backlight */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-35 transition-all duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${themeColor} 0%, transparent 70%)`,
          }}
        />

        {/* Outer Orbital Measurement Ring with Coordinates */}
        <div
          className="absolute inset-[-12px] sm:inset-[-24px] border border-cyan-400/20 rounded-full pointer-events-none animate-spin"
          style={{ animationDuration: '90s' }}
        >
          {/* Tick marks on orbital compass */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-cyan-400/60 rounded-full" />
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400/60 rounded-full" />
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400/60 rounded-full" />
        </div>

        {/* Counter-rotating secondary gyro ring */}
        <div
          className="absolute inset-[-28px] sm:inset-[-48px] border border-white/5 border-dashed rounded-full pointer-events-none animate-spin"
          style={{ animationDuration: '140s', animationDirection: 'reverse' }}
        />

        {/* Planet sphere with dynamic rotation, perspective tilt, and shadow */}
        <div
          className="relative w-full h-full rounded-full transition-transform duration-75 flex items-center justify-center"
          style={{
            transform: `perspective(1000px) rotateX(${tilt}deg) rotateY(${rotationAngle}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <img
            src={imageSrc}
            alt={planetName}
            className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] pointer-events-none select-none transition-all duration-300"
            referrerPolicy="no-referrer"
          />

          {/* Sci-Fi Scanning HUD Reticle Overlay */}
          {isScanning && (
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none border border-cyan-400/50">
              <div
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-pulse"
                style={{
                  top: `${(Math.sin(rotationAngle * (Math.PI / 180)) * 45 + 50)}%`,
                  transition: 'top 0.1s linear',
                }}
              />
              <div className="absolute inset-0 bg-cyan-500/10 backdrop-brightness-110" />
              {/* Latitude/longitude grid */}
              <div className="absolute inset-0 border-y border-cyan-400/30 top-1/4 bottom-1/4" />
              <div className="absolute inset-0 border-x border-cyan-400/30 left-1/4 right-1/4" />
              <div className="absolute top-4 left-4 font-mono text-[10px] text-cyan-300">
                LAT: +28.54° · SCAN ACTIVE
              </div>
            </div>
          )}
        </div>

        {/* Drag Helper Tooltip */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-slate-300 pointer-events-none">
          DRAG TO ROTATE · {Math.round(rotationAngle)}°
        </div>
      </div>

      {/* Control Console Toolbar */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 bg-white/[0.04] backdrop-blur-xl border border-white/10 p-2.5 rounded-2xl max-w-md w-full">
        {/* Play/Pause Rotation */}
        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-barlow-condensed tracking-wider uppercase transition-all cursor-pointer ${
            isAutoRotating
              ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300'
              : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
          }`}
          title={isAutoRotating ? 'Pause auto-spin' : 'Resume auto-spin'}
        >
          {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isAutoRotating ? 'Rotating' : 'Paused'}</span>
        </button>

        {/* Speed Stepper */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
          <span className="text-slate-400 font-barlow-condensed uppercase tracking-wider">Speed:</span>
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => setRotationSpeed(s)}
              className={`px-1.5 py-0.5 rounded text-[11px] cursor-pointer transition-colors ${
                rotationSpeed === s ? 'bg-cyan-400 text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Sci-Fi Scan Overlay Toggle */}
        <button
          onClick={() => setIsScanning(!isScanning)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-barlow-condensed tracking-wider uppercase transition-all cursor-pointer ${
            isScanning
              ? 'bg-amber-500/20 border border-amber-400/50 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
              : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <Scan className="w-3.5 h-3.5" />
          <span>{isScanning ? 'HUD Scan ON' : 'Scan HUD'}</span>
        </button>

        {/* Tilt Toggle */}
        <button
          onClick={() => setTilt((prev) => (prev === 12 ? 28 : prev === 28 ? 0 : 12))}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-barlow-condensed tracking-wider uppercase text-slate-400 hover:text-white transition-all cursor-pointer"
          title="Adjust orbital axial tilt"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Tilt {tilt}°</span>
        </button>
      </div>
    </div>
  );
};
