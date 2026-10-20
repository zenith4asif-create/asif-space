import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, FastForward, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2, Video, Sparkles, Navigation, Globe } from 'lucide-react';
import { isAudioPlaying, toggleSpaceAudio } from '../utils/audio';

type VideoMode = 'warp' | 'earth' | 'lunar';

export const SciFiWarpVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [warpSpeed, setWarpSpeed] = useState(1.5);
  const [activeMode, setActiveMode] = useState<VideoMode>('warp');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hudVisible, setHudVisible] = useState(true);
  const [audioActive, setAudioActive] = useState(isAudioPlaying());
  const [missionTimer, setMissionTimer] = useState(148);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mission timer simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setMissionTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Hyperspace canvas warp effect
  useEffect(() => {
    if (activeMode !== 'warp') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const numStars = 450;
    const stars: { x: number; y: number; z: number; oZ: number }[] = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        oZ: Math.random() * width,
      });
    }

    const render = () => {
      // Trail effect
      ctx.fillStyle = 'rgba(7, 10, 19, 0.25)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (const star of stars) {
        if (isPlaying) {
          star.z -= 4 * warpSpeed;
          if (star.z <= 0) {
            star.z = width;
            star.x = (Math.random() - 0.5) * width * 2;
            star.y = (Math.random() - 0.5) * height * 2;
          }
        }

        const k = 128 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.5, (1 - star.z / width) * 3);
          const alpha = Math.max(0.2, (1 - star.z / width));

          // Draw star streak in warp mode
          const prevK = 128 / (star.z + 12 * warpSpeed);
          const ppx = star.x * prevK + cx;
          const ppy = star.y * prevK + cy;

          ctx.strokeStyle = `rgba(180, 230, 255, ${alpha * 0.8})`;
          ctx.lineWidth = size * 0.9;
          ctx.beginPath();
          ctx.moveTo(ppx, ppy);
          ctx.lineTo(px, py);
          ctx.stroke();

          // Star core dot
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [activeMode, isPlaying, warpSpeed]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `T+00:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-[#070a13] shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col"
    >
      {/* Top Telemetry Header Ribbon */}
      <div className="relative z-20 flex items-center justify-between px-4 py-2.5 bg-black/60 backdrop-blur-md border-b border-white/10 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold uppercase tracking-wider">LIVE TELEMETRY STREAM</span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300 font-bold">{formatTimer(missionTimer)}</span>
        </div>

        {/* Video Camera Angles */}
        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setActiveMode('warp')}
            className={`px-2.5 py-1 rounded text-[11px] font-barlow-condensed uppercase tracking-wider transition-colors cursor-pointer ${
              activeMode === 'warp'
                ? 'bg-cyan-500 text-black font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Hyperspace Warp
          </button>
          <button
            onClick={() => setActiveMode('earth')}
            className={`px-2.5 py-1 rounded text-[11px] font-barlow-condensed uppercase tracking-wider transition-colors cursor-pointer ${
              activeMode === 'earth'
                ? 'bg-cyan-500 text-black font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Earth Orbit
          </button>
          <button
            onClick={() => setActiveMode('lunar')}
            className={`px-2.5 py-1 rounded text-[11px] font-barlow-condensed uppercase tracking-wider transition-colors cursor-pointer ${
              activeMode === 'lunar'
                ? 'bg-cyan-500 text-black font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Lunar Expedition
          </button>
        </div>
      </div>

      {/* Main Video Stage Viewport */}
      <div className="relative w-full aspect-video min-h-[300px] sm:min-h-[420px] bg-black flex items-center justify-center overflow-hidden">
        {/* Mode 1: Hyperspace Canvas */}
        {activeMode === 'warp' && (
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover select-none"
          />
        )}

        {/* Mode 2: Real Earth Orbit Photography */}
        {activeMode === 'earth' && (
          <div className="relative w-full h-full overflow-hidden">
            <img
              src="/assets/images/real_earth_orbit_1792510362397.jpg"
              alt="Earth from Orbit"
              className="w-full h-full object-cover filter contrast-105 scale-105 animate-float select-none"
              referrerPolicy="no-referrer"
            />
            {/* Atmospheric sunrise flare simulation */}
            <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-amber-400/25 blur-3xl pointer-events-none animate-pulse" />
          </div>
        )}

        {/* Mode 3: Ghibli Space Kids on Moon */}
        {activeMode === 'lunar' && (
          <div className="relative w-full h-full overflow-hidden">
            <img
              src="/assets/images/ghibli_lunar_kids_1792510362117.jpg"
              alt="Space Kids on Moon"
              className="w-full h-full object-cover filter brightness-105 select-none"
              referrerPolicy="no-referrer"
            />
            {/* Gentle starry twinkle on lunar horizon */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Sci-Fi Cockpit HUD Overlay */}
        {hudVisible && (
          <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between text-cyan-300 font-mono text-xs">
            {/* Top HUD elements */}
            <div className="flex items-start justify-between">
              <div className="p-2 rounded bg-black/50 border border-cyan-400/30 backdrop-blur-md">
                <p className="text-[10px] text-slate-400">PROPULSION STATUS</p>
                <p className="text-cyan-300 font-bold">
                  {activeMode === 'warp' ? `WARP VELOCITY: ${(warpSpeed * 2.4).toFixed(1)}c` : 'ORBITAL VELOCITY: 7.82 km/s'}
                </p>
                <p className="text-[10px] text-emerald-400">STABILIZERS: 100% NOMINAL</p>
              </div>

              <div className="p-2 rounded bg-black/50 border border-cyan-400/30 backdrop-blur-md text-right">
                <p className="text-[10px] text-slate-400">TARGET BEARING</p>
                <p className="text-white font-bold">ALPHA CENTAURI // SECTOR 7</p>
                <p className="text-[10px] text-cyan-300">COORDS: 14h 29m 42s</p>
              </div>
            </div>

            {/* Center Reticle Target */}
            <div className="self-center flex flex-col items-center">
              <div className="w-16 h-16 border border-cyan-400/40 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
              </div>
              <span className="text-[10px] tracking-widest text-cyan-400/70 mt-1">ALIGNMENT LOCKED</span>
            </div>

            {/* Bottom HUD elements */}
            <div className="flex items-end justify-between">
              <div className="p-2 rounded bg-black/50 border border-cyan-400/30 backdrop-blur-md">
                <p className="text-[10px] text-slate-400">CABIN PRESSURE</p>
                <p className="text-white">101.3 kPa · O2 21%</p>
              </div>

              <div className="p-2 rounded bg-black/50 border border-cyan-400/30 backdrop-blur-md text-right">
                <p className="text-[10px] text-slate-400">MISSION PASSENGERS</p>
                <p className="text-cyan-300">04 CADETS ONBOARD</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Control Bar */}
      <div className="relative z-20 px-6 py-4 bg-[#0a0e1a]/95 backdrop-blur-xl border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        {/* Play/Pause & Reset */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold hover:bg-cyan-300 transition-colors cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            title={isPlaying ? 'Pause Video' : 'Play Video'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
          </button>

          <button
            onClick={() => {
              setMissionTimer(0);
              setIsPlaying(true);
            }}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Reset flight timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              const active = toggleSpaceAudio();
              setAudioActive(active);
            }}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              audioActive
                ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            title={audioActive ? 'Mute engine drone' : 'Play engine ambient drone'}
          >
            {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {/* Warp Speed Controls (if warp mode) */}
        {activeMode === 'warp' && (
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
            <FastForward className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400 font-barlow-condensed uppercase tracking-wider">Speed:</span>
            {[1, 2, 4, 8].map((spd) => (
              <button
                key={spd}
                onClick={() => setWarpSpeed(spd)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                  warpSpeed === spd
                    ? 'bg-cyan-400 text-black shadow-[0_0_8px_#22d3ee]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {spd === 8 ? 'WARP 9.9' : `${spd}X`}
              </button>
            ))}
          </div>
        )}

        {/* Right Tools: HUD Toggle and Fullscreen */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setHudVisible(!hudVisible)}
            className={`px-3 py-1.5 rounded-lg text-xs font-barlow-condensed tracking-wider uppercase border transition-colors cursor-pointer ${
              hudVisible
                ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            {hudVisible ? 'HUD Active' : 'HUD Hidden'}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
