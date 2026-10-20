import React, { useState } from 'react';
import { spaceData, Technology } from '../data/spaceData';
import { Shield, Rocket, Activity, CheckCircle2 } from 'lucide-react';

interface TechnologyViewProps {
  currentTechSlug: string;
  onSelectTechnology: (techSlug: string) => void;
}

export const TechnologyView: React.FC<TechnologyViewProps> = ({
  currentTechSlug,
  onSelectTechnology,
}) => {
  const [showBlueprint, setShowBlueprint] = useState(false);

  // Find active tech item by slug or id or htmlFile
  const activeTech: Technology =
    spaceData.technology.find(
      (t) =>
        t.slug === currentTechSlug ||
        t.id === currentTechSlug ||
        t.htmlFile.includes(currentTechSlug)
    ) || spaceData.technology[0];

  return (
    <div className="relative z-10 flex-1 flex flex-col justify-between py-6 sm:py-8 lg:py-12 max-w-7xl mx-auto w-full">
      {/* Page Title: 03 SPACE LAUNCH 101 */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-28">
        <h2 className="font-barlow-condensed text-base sm:text-lg md:text-xl lg:text-2xl tracking-[0.25em] uppercase text-white mb-6 md:mb-10 text-center md:text-left">
          <span className="font-bold text-white/30 mr-3">03</span>
          Space launch 101
        </h2>
      </div>

      {/* Main Grid: Left Number Buttons + Content, Right Tech Image */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
        {/* Left Column (Numbered buttons + Description) */}
        <div className="lg:col-span-7 flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-14 px-4 sm:px-8 md:px-16 lg:px-0 lg:pl-28 order-2 lg:order-1 text-center lg:text-left">
          {/* Numbers 1, 2, 3 buttons */}
          <div
            className="flex lg:flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6 shrink-0"
            role="tablist"
            aria-label="Technology steps"
          >
            {spaceData.technology.map((tech) => {
              const isActive = tech.id === activeTech.id;
              return (
                <button
                  key={tech.id}
                  onClick={() => onSelectTechnology(tech.slug)}
                  role="tab"
                  aria-selected={isActive}
                  className={`w-11 h-11 sm:w-14 sm:h-14 lg:w-20 lg:h-20 rounded-full font-bellefair text-lg sm:text-2xl lg:text-3xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#0b0d17] shadow-[0_0_20px_rgba(255,255,255,0.6)] scale-105'
                      : 'bg-transparent text-white border border-white/25 hover:border-white'
                  }`}
                  aria-label={`Step ${tech.step}: ${tech.name}`}
                >
                  {tech.step}
                </button>
              );
            })}
          </div>

          {/* Description Block */}
          <div className="flex flex-col items-center lg:items-start max-w-xl">
            <h5 className="font-barlow-condensed text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase text-[#d0d6f9] mb-2 sm:mb-3">
              The terminology...
            </h5>

            <h3 className="font-bellefair text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-wider mb-4 sm:mb-5 leading-tight">
              {activeTech.name}
            </h3>

            <p className="font-barlow text-[#d0d6f9] text-sm sm:text-base md:text-lg leading-relaxed mb-6 font-light">
              {activeTech.description}
            </p>

            {/* Engineering specs box */}
            {activeTech.specs && (
              <div className="w-full p-4 rounded-xl bg-white/[0.04] border border-white/10 text-left">
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-xs font-barlow-condensed tracking-widest uppercase text-cyan-300">
                    <Rocket className="w-3.5 h-3.5" />
                    <span>Aerospace Specifications</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    WEB-X CLASS
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  {activeTech.specs.height && (
                    <div>
                      <span className="text-slate-400 block uppercase font-barlow-condensed tracking-wider text-[10px] sm:text-xs">
                        Dimension/Site
                      </span>
                      <span className="text-white font-mono font-medium">
                        {activeTech.specs.height}
                      </span>
                    </div>
                  )}
                  {activeTech.specs.mass && (
                    <div>
                      <span className="text-slate-400 block uppercase font-barlow-condensed tracking-wider text-[10px] sm:text-xs">
                        Mass / Coord
                      </span>
                      <span className="text-white font-mono font-medium">
                        {activeTech.specs.mass}
                      </span>
                    </div>
                  )}
                  {activeTech.specs.stages && (
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-slate-400 block uppercase font-barlow-condensed tracking-wider text-[10px] sm:text-xs">
                        Configuration
                      </span>
                      <span className="text-cyan-300 font-mono font-medium">
                        {activeTech.specs.stages}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Technology Image) */}
        <div className="lg:col-span-5 w-full flex justify-end order-1 lg:order-2 overflow-hidden px-4 sm:px-0">
          <picture className="w-full flex justify-center lg:justify-end">
            {/* Desktop: Portrait */}
            <source
              media="(min-width: 1024px)"
              srcSet={activeTech.images.portrait}
            />
            {/* Mobile & Tablet: Landscape */}
            <img
              src={activeTech.images.landscape}
              alt={activeTech.name}
              className="w-full lg:w-[480px] h-56 sm:h-80 md:h-96 lg:h-[500px] object-cover object-center rounded-2xl lg:rounded-none shadow-[0_10px_40px_rgba(0,0,0,0.8)] filter contrast-105"
              referrerPolicy="no-referrer"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};
