import React, { useState } from 'react';
import { Rocket, Sparkles, Orbit, Compass, Globe, Info, Award, HelpCircle, CheckCircle2, ChevronRight, BookOpen, Layers } from 'lucide-react';

interface DiscoveryMilestone {
  year: string;
  mission: string;
  agency: string;
  title: string;
  discovery: string;
  image?: string;
  tag: string;
}

const moonDiscoveries: DiscoveryMilestone[] = [
  {
    year: '2023',
    mission: 'Chandrayaan-3',
    agency: 'ISRO',
    title: 'Historic South Pole Soft Landing & Sulfur Discovery',
    discovery:
      'First nation in human history to land near the lunar south pole (Shiv Shakti Point at 69.37°S). Pragyan rover’s LIBS instrument confirmed the presence of Sulfur (S), Iron, Calcium, and Titanium. ChaSTE payload recorded extreme thermal gradients from 50°C surface to -10°C just 8cm deep.',
    image: '/assets/images/isro_chandrayaan_ghibli_1792512886965.jpg',
    tag: 'Historic Landmark',
  },
  {
    year: '2008',
    mission: 'Chandrayaan-1',
    agency: 'ISRO / NASA',
    title: 'Definitive Discovery of Water Molecules (H2O)',
    discovery:
      'Moon Mineralogy Mapper (M3) aboard Chandrayaan-1 detected unambiguous absorption features of water and hydroxyl molecules across lunar polar ice traps, transforming our understanding of the Moon from a bone-dry desert to a water-bearing celestial world.',
    image: '/assets/images/ghibli_moon_water_1792512889733.jpg',
    tag: 'Breakthrough Discovery',
  },
  {
    year: '2019',
    mission: 'Chang’e 4',
    agency: 'CNSA',
    title: 'First Landing on the Moon’s Far Side',
    discovery:
      'First robotic spacecraft landing inside the South Pole-Aitken basin on the lunar far side, relaying communications via the Queqiao satellite and germinating cotton seeds in a sealed mini-biosphere.',
    tag: 'Far Side Exploration',
  },
  {
    year: '1969',
    mission: 'Apollo 11',
    agency: 'NASA',
    title: 'First Human Bootprints & Sample Return',
    discovery:
      'Neil Armstrong and Buzz Aldrin collected 21.5 kg of lunar regolith rocks from the Sea of Tranquility, proving the Moon’s volcanic basalt origins and placing seismic experiment stations.',
    tag: 'Human Moon Landing',
  },
  {
    year: '1959',
    mission: 'Luna 2 & Luna 3',
    agency: 'Soviet Space Program',
    title: 'First Impact & First Far Side Images',
    discovery:
      'Luna 2 was the first human-made object to reach the Moon, confirming lack of an active magnetic field. Luna 3 transmitted the first photographs of the heavily cratered lunar far side.',
    tag: 'Space Age Origin',
  },
];

interface ExplainerCharacter {
  id: string;
  name: string;
  role: string;
  avatar: string;
  intro: string;
  topics: {
    question: string;
    answer: string;
  }[];
}

const explainerGuides: ExplainerCharacter[] = [
  {
    id: 'lumi-chrono',
    name: 'Alien Lumi & Droid Chrono',
    role: 'Cosmic Star Navigators',
    avatar: '/assets/images/ghibli_alien_guide_1792512888701.jpg',
    intro:
      'Warm greetings, Earth traveler! With my star antennae and Chrono’s ancient brass astro-compass, we decode the mysteries of planetary atmospheres and cosmic stardust.',
    topics: [
      {
        question: 'Why is the Moon’s South Pole so valuable?',
        answer:
          'Deep craters at the South Pole never see sunlight and act as cryogenic cold traps (-240°C), preserving billions of tons of ancient water ice. This ice can be harvested for drinking water and split into liquid hydrogen and oxygen fuel for voyages to Mars!',
      },
      {
        question: 'What is inside Europa’s ice crust?',
        answer:
          'Beneath Europa’s 15-mile icy crust lies a warm saltwater ocean deeper than anything on Earth, warmed by tidal gravitational kneading from giant Jupiter. Hydrothermal vents on its ocean floor could even support extraterrestrial microbial life!',
      },
      {
        question: 'Can humans fly on Saturn’s moon Titan?',
        answer:
          'Yes! Titan’s atmosphere is 50% thicker than Earth’s, and its gravity is only 14% of Earth’s. A human wearing a thermal suit could literally strap on artificial wings and take flight with arm power alone!',
      },
    ],
  },
  {
    id: 'vyommitra',
    name: 'Robot Vyommitra & Cadet Anaya',
    role: 'ISRO Humanoid AI & Flight Cadet',
    avatar: '/assets/images/isro_gaganyaan_ghibli_1792512888871.jpg',
    intro:
      'Namaste! I am Vyommitra (Sanskrit for "Friend in the Sky"), ISRO’s half-humanoid robot designed to monitor crew life-support, cabin pressure, and microgravity conditions inside the Gaganyaan spacecraft.',
    topics: [
      {
        question: 'What is the Gaganyaan Programme?',
        answer:
          'Gaganyaan is India’s flagship indigenous human spaceflight mission designed to carry 3 Indian astronauts (Gaganauts) into a 400 km low Earth orbit for 3 days and safely bring them back to Earth with a parachute ocean splashdown.',
      },
      {
        question: 'How do astronauts eat and sleep in zero-G?',
        answer:
          'In microgravity, food must not produce crumbs that could damage electrical panels! Astronauts eat vacuum-sealed pouches (like delicious mango barfi and spiced rice), and sleep inside tethered sleeping bags zipped to the cabin wall so they do not drift away.',
      },
      {
        question: 'What is Aditya-L1 doing at Lagrange Point 1?',
        answer:
          'Aditya-L1 is stationed 1.5 million kilometers from Earth at L1, where gravitational forces balance. It observes the Sun continuously without eclipses, studying solar flares, coronal mass ejections, and space weather that affect Earth satellites.',
      },
    ],
  },
  {
    id: 'pragyan',
    name: 'Pragyan Rover & Vikram Squad',
    role: 'Lunar Surface Geological Explorers',
    avatar: '/assets/images/isro_chandrayaan_ghibli_1792512886965.jpg',
    intro:
      'Chirp chirp! I am Pragyan, the 26-kilogram, 6-wheeled robotic explorer that rolled down Vikram’s ramp onto the lunar south pole dust, imprinting India’s national emblem and ISRO logo into eternity.',
    topics: [
      {
        question: 'How did Pragyan navigate lunar craters?',
        answer:
          'Using rocker-bogie suspension and dual stereoscopic navigation cameras, Pragyan climbed rocks and detoured around a 4-meter-wide crater safely, autonomously analyzing soil chemistry with laser-induced breakdown spectroscopy.',
      },
      {
        question: 'What is Shiv Shakti Point?',
        answer:
          'Shiv Shakti Point is the official international name designated for the touchdown coordinates of the Chandrayaan-3 Vikram lander on the Moon (69.3676° S, 32.3481° E), located between Manzinus C and Simpelius N craters.',
      },
      {
        question: 'Why did the lander go to sleep after 14 Earth days?',
        answer:
          'One lunar day lasts 14 Earth days. When the lunar night fell, temperatures plummeted to -200°C without solar power. Pragyan and Vikram successfully completed 100% of their primary scientific mission objectives!',
      },
    ],
  },
];

export const IsroAndMoonDiscovery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'discoveries' | 'isro' | 'guides'>('discoveries');
  const [selectedGuideIndex, setSelectedGuideIndex] = useState(0);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);

  const currentGuide = explainerGuides[selectedGuideIndex];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 py-8 md:py-12 flex flex-col">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-xs font-barlow-condensed tracking-[0.2em] text-cyan-300 uppercase mb-2">
            <Orbit className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Lunar Science & ISRO Space Programme</span>
          </div>
          <h2 className="font-bellefair text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-wider text-center md:text-left">
            Moon Discoveries & Space Cadets
          </h2>
          <p className="font-barlow text-sm sm:text-base text-[#d0d6f9] max-w-2xl mt-1 font-light text-center md:text-left">
            Explore authentic lunar scientific milestones from Chandrayaan-3 and Apollo, illustrated with heartwarming Studio Ghibli artwork, robots, and friendly alien guides.
          </p>
        </div>

        {/* Navigation Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 w-full sm:w-auto justify-center">
          <button
            onClick={() => setActiveTab('discoveries')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-barlow-condensed tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === 'discoveries'
                ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Moon Discoveries
          </button>
          <button
            onClick={() => setActiveTab('isro')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-barlow-condensed tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === 'isro'
                ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            ISRO Programme
          </button>
          <button
            onClick={() => setActiveTab('guides')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-barlow-condensed tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === 'guides'
                ? 'bg-pink-500 text-white font-bold shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Aliens & Robots
          </button>
        </div>
      </div>

      {/* TAB 1: MOON DISCOVERIES TIMELINE */}
      {activeTab === 'discoveries' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Featured Chandrayaan Discovery Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-black/60 to-purple-950/30 border border-cyan-400/30 shadow-2xl items-center">
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/50 text-[11px] font-mono text-cyan-300 uppercase tracking-widest mb-3">
                CRATER SHAKTI · 2008 & 2023 FINDINGS
              </span>
              <h3 className="font-bellefair text-3xl sm:text-4xl text-white uppercase mb-3">
                Water Ice Detected in Lunar South Pole
              </h3>
              <p className="font-barlow text-sm sm:text-base text-[#d0d6f9] leading-relaxed mb-6 font-light">
                For centuries, scientists believed the Moon was bone-dry. In 2008, ISRO’s Chandrayaan-1 payload confirmed water ice inside permanently shadowed craters. In 2023, Chandrayaan-3 landed directly in the South Pole region, measuring soil temperatures and confirming sulfur deposits vital for lunar habitat building.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full p-4 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">WATER ICE DEPTH</span>
                  <span className="text-cyan-300 font-bold text-sm">Top 1–2 Meters</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">TEMP AT CRATER BASE</span>
                  <span className="text-amber-300 font-bold text-sm">-240°C Cryogenic</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">TOTAL ESTIMATE</span>
                  <span className="text-white font-bold text-sm">&gt;600M Metric Tons</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-cyan-400/30 shadow-xl group">
              <img
                src="/assets/images/ghibli_moon_water_1792512889733.jpg"
                alt="Kid astronauts discovering lunar water crystals"
                className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-black/80 border-t border-white/10 text-center">
                <p className="text-xs font-barlow text-cyan-200">
                  Ghibli Art: Young cadets discover glowing water ice crystals in lunar caves
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moonDiscoveries.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-cyan-400 font-bold text-lg">{item.year}</span>
                    <span className="text-[11px] font-barlow-condensed tracking-wider uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300">
                      {item.agency}
                    </span>
                  </div>
                  <h4 className="font-bellefair text-xl text-white uppercase mb-2">{item.title}</h4>
                  <p className="font-barlow text-xs sm:text-sm text-[#d0d6f9] leading-relaxed font-light mb-4">
                    {item.discovery}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-barlow-condensed text-slate-400">
                  <span>{item.mission}</span>
                  <span className="text-cyan-300 font-mono text-[10px]">{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ISRO PROGRAMME SHOWCASE */}
      {activeTab === 'isro' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left ISRO Gaganyaan Showcase */}
            <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-amber-400/30 bg-black/50 shadow-2xl flex flex-col">
              <img
                src="/assets/images/isro_gaganyaan_ghibli_1792512888871.jpg"
                alt="ISRO Gaganyaan Mission in Ghibli Art"
                className="w-full h-80 sm:h-96 object-cover object-top select-none"
                referrerPolicy="no-referrer"
              />
              <div className="p-6 bg-[#0c101c]">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono uppercase">
                    GAGANYAAN PROGRAMME
                  </span>
                  <span className="text-xs font-mono text-slate-400">LVM3 LAUNCHER</span>
                </div>
                <h3 className="font-bellefair text-2xl text-white uppercase mb-2">
                  Human Spaceflight & Robot Vyommitra
                </h3>
                <p className="font-barlow text-sm text-[#d0d6f9] leading-relaxed mb-4 font-light">
                  India’s premier human spaceflight mission is set to take 3 astronauts into low Earth orbit. Accompanied by the female humanoid robot Vyommitra, who monitors life support systems and operates switch panels autonomously.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                    Orbit: 400 km LEO
                  </span>
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                    Crew: 3 Gaganauts
                  </span>
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-amber-300">
                    Payload: Orbital Module
                  </span>
                </div>
              </div>
            </div>

            {/* Right ISRO Chandrayaan-3 Rover & Lander Showcase */}
            <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-cyan-400/30 bg-black/50 shadow-2xl flex flex-col">
              <img
                src="/assets/images/isro_chandrayaan_ghibli_1792512886965.jpg"
                alt="Chandrayaan-3 Pragyan Rover Ghibli Art"
                className="w-full h-80 sm:h-96 object-cover object-center select-none"
                referrerPolicy="no-referrer"
              />
              <div className="p-6 bg-[#0c101c]">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono uppercase">
                    CHANDRAYAAN-3 SUCCESS
                  </span>
                  <span className="text-xs font-mono text-cyan-300">SHIV SHAKTI POINT</span>
                </div>
                <h3 className="font-bellefair text-2xl text-white uppercase mb-2">
                  Pragyan Rover & Vikram Lunar Station
                </h3>
                <p className="font-barlow text-sm text-[#d0d6f9] leading-relaxed mb-4 font-light">
                  On August 23, 2023, India celebrated National Space Day as Vikram made a gentle touchdown on the lunar south pole. Rover Pragyan traversed the rocky lunar dust, discovering sulfur and proving water-ice rich polar soil.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                    Weight: 26 kg Rover
                  </span>
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                    Wheels: 6-Wheel Rocker Bogie
                  </span>
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-cyan-300">
                    Sensors: LIBS + APXS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GHIBLI ALIENS & ROBOTS EXPLAINERS */}
      {activeTab === 'guides' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Guide Selection Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {explainerGuides.map((guide, idx) => {
              const isSelected = idx === selectedGuideIndex;
              return (
                <button
                  key={guide.id}
                  onClick={() => {
                    setSelectedGuideIndex(idx);
                    setSelectedTopicIndex(0);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/30 border-pink-400/60 shadow-[0_0_20px_rgba(236,72,153,0.3)]'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/30'
                  }`}
                >
                  <img
                    src={guide.avatar}
                    alt={guide.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0 border border-white/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bellefair text-lg text-white leading-tight">{guide.name}</h4>
                    <p className="font-barlow-condensed text-xs uppercase tracking-wider text-cyan-300">
                      {guide.role}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Guide Dossier & Interactive Question/Answer Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-3xl bg-black/60 border border-white/15 backdrop-blur-xl items-start">
            {/* Left: Guide Portrait & Intro Speech */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border-2 border-pink-400/40 shadow-2xl mb-4 group">
                <img
                  src={currentGuide.avatar}
                  alt={currentGuide.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-bellefair text-2xl text-white uppercase">{currentGuide.name}</h3>
              <p className="font-barlow-condensed text-xs text-pink-300 uppercase tracking-widest mb-3">
                {currentGuide.role}
              </p>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs font-barlow text-[#d0d6f9] leading-relaxed italic text-left">
                "{currentGuide.intro}"
              </div>
            </div>

            {/* Right: Question Answer Accordion */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex items-center gap-2 text-xs font-barlow-condensed tracking-widest text-cyan-300 uppercase mb-4">
                <HelpCircle className="w-4 h-4" />
                <span>Ask the Cosmic Guide: Select a Space Question</span>
              </div>

              {/* Questions list */}
              <div className="flex flex-col gap-3 mb-6">
                {currentGuide.topics.map((t, tIdx) => {
                  const isActive = tIdx === selectedTopicIndex;
                  return (
                    <button
                      key={tIdx}
                      onClick={() => setSelectedTopicIndex(tIdx)}
                      className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-barlow-condensed tracking-wider uppercase transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'bg-cyan-500/20 border-cyan-400 text-white font-semibold shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{t.question}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90 text-cyan-400' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Explaining Answer Bubble */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-black/80 to-purple-950/40 border border-cyan-400/40 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs uppercase tracking-widest text-cyan-300">
                    Cosmic Explanation
                  </span>
                </div>
                <h4 className="font-bellefair text-xl text-white mb-2">
                  {currentGuide.topics[selectedTopicIndex].question}
                </h4>
                <p className="font-barlow text-sm sm:text-base text-[#d0d6f9] leading-relaxed font-light">
                  {currentGuide.topics[selectedTopicIndex].answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
