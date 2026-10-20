import React, { useState } from 'react';
import { spaceData, CrewMember } from '../data/spaceData';
import { GhibliCadetsSection } from '../components/GhibliCadetsSection';
import { Award, ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';

interface CrewViewProps {
  currentCrewSlug: string;
  onSelectCrew: (crewSlug: string) => void;
}

export const CrewView: React.FC<CrewViewProps> = ({ currentCrewSlug, onSelectCrew }) => {
  const [showGhibliCadets, setShowGhibliCadets] = useState(false);

  // Find active crew member by slug or role or id
  const activeIndex = Math.max(
    0,
    spaceData.crew.findIndex(
      (c) =>
        c.slug === currentCrewSlug ||
        c.id === currentCrewSlug ||
        c.htmlFile.includes(currentCrewSlug)
    )
  );

  const activeCrew: CrewMember = spaceData.crew[activeIndex] || spaceData.crew[0];

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % spaceData.crew.length;
    onSelectCrew(spaceData.crew[nextIndex].slug);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + spaceData.crew.length) % spaceData.crew.length;
    onSelectCrew(spaceData.crew[prevIndex].slug);
  };

  return (
    <div className="relative z-10 flex-1 flex flex-col justify-between px-6 md:px-16 lg:px-28 py-8 lg:py-12 max-w-7xl mx-auto w-full">
      {/* Page Title: 02 MEET YOUR CREW with Ghibli Cadets Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 md:mb-10">
        <h2 className="font-barlow-condensed text-lg md:text-xl lg:text-2xl tracking-[0.25em] uppercase text-white text-center md:text-left">
          <span className="font-bold text-white/30 mr-4">02</span>
          Meet your crew
        </h2>

        {/* Ghibli Kids Astronaut Toggle Button */}
        <button
          onClick={() => setShowGhibliCadets(!showGhibliCadets)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-barlow-condensed tracking-widest uppercase transition-all cursor-pointer border ${
            showGhibliCadets
              ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/30 border-pink-400/50 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
              : 'bg-white/5 border-white/10 text-[#d0d6f9] hover:text-white hover:bg-white/10'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>{showGhibliCadets ? 'Hide Ghibli Cadets' : 'Ghibli Space Kids Art'}</span>
        </button>
      </div>

      {/* Main Grid: Left Details, Right Portrait */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Role, Name, Bio, Dots */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          {/* Role Kicker */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-bellefair text-xl md:text-2xl lg:text-3xl uppercase text-white/50 tracking-wider">
              {activeCrew.role}
            </span>
          </div>

          {/* Astronaut Name */}
          <h3 className="font-bellefair text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-wider mb-6 leading-tight">
            {activeCrew.name}
          </h3>

          {/* Bio Description */}
          <p className="font-barlow text-[#d0d6f9] text-base md:text-lg leading-relaxed max-w-lg mb-8 font-light min-h-[100px]">
            {activeCrew.bio}
          </p>

          {/* Mission highlights */}
          {activeCrew.missions && (
            <div className="mb-8 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="text-xs font-barlow-condensed tracking-widest uppercase text-slate-400 mr-2 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                Missions:
              </span>
              {activeCrew.missions.map((m) => (
                <span
                  key={m}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-cyan-200"
                >
                  {m}
                </span>
              ))}
            </div>
          )}

          {/* Dot Pagination Controls & Stepper */}
          <div className="flex items-center gap-6 mt-2">
            {/* Arrow Nav (Previous) */}
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous Crew Member"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* 4 Dots matching original website */}
            <div className="flex items-center gap-4">
              {spaceData.crew.map((member, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={member.id}
                    onClick={() => onSelectCrew(member.slug)}
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-white scale-125 shadow-[0_0_12px_rgba(255,255,255,0.9)]'
                        : 'bg-white/20 hover:bg-white/50'
                    }`}
                    aria-label={`Select crew member ${member.name}`}
                  />
                );
              })}
            </div>

            {/* Arrow Nav (Next) */}
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Next Crew Member"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Column: Crew Portrait with Gradient Mask */}
        <div className="lg:col-span-5 flex justify-center items-end order-1 lg:order-2 border-b border-white/10 lg:border-none">
          <div className="relative w-64 sm:w-80 md:w-96 lg:w-[460px] h-72 sm:h-96 md:h-[450px] lg:h-[550px] flex items-end justify-center overflow-hidden">
            {/* Ambient backlight */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(147,197,253,0.4) 0%, transparent 70%)',
              }}
            />

            {/* Crew Image with bottom fade */}
            <img
              src={activeCrew.images.webp || activeCrew.images.png}
              alt={activeCrew.name}
              className="relative z-10 max-h-full w-auto object-contain object-bottom filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] select-none transition-all duration-500 ease-out"
              referrerPolicy="no-referrer"
            />

            {/* Gradient shadow mask at the bottom so astronaut blends naturally */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b0d17] via-[#0b0d17]/60 to-transparent z-20 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Studio Ghibli Space Kids Astronaut Section */}
      {showGhibliCadets && <GhibliCadetsSection />}
    </div>
  );
};
