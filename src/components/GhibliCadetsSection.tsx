import React, { useState } from 'react';
import { Sparkles, Heart, Rocket, Compass, Star, Award, Bot, Orbit } from 'lucide-react';

interface CadetStory {
  id: string;
  name: string;
  badge: string;
  title: string;
  image: string;
  description: string;
  favoriteCosmicSnack: string;
  dreamDestination: string;
  speciesOrRole: string;
}

const cadetStories: CadetStory[] = [
  {
    id: 'chandrayaan-squad',
    name: 'ISRO Kid Cadet & Pragyan',
    badge: 'SOUTH POLE EXPLORER',
    title: 'Touchdown at Shiv Shakti Point',
    image: '/assets/images/isro_chandrayaan_ghibli_1792512886965.jpg',
    description:
      'Together with the brave little 6-wheeled Pragyan rover and robotic pal Bot-Mitra, this junior astronaut planted a golden mission flag on the lunar south pole dust under a radiant Earth.',
    favoriteCosmicSnack: 'Spiced Cardamom Ladoos',
    dreamDestination: 'Shiv Shakti South Pole Crater',
    speciesOrRole: 'ISRO Junior Pioneer & Rover',
  },
  {
    id: 'lumi-alien',
    name: 'Lumi the Starlight Alien & Chrono',
    badge: 'COSMIC CARTOGRAPHER',
    title: 'Reading the Ancient Star Chart',
    image: '/assets/images/ghibli_alien_guide_1792512888701.jpg',
    description:
      'A gentle, fluffy starlight alien with glowing blue eyes and star antennae sitting beside his brass clockwork robot Chrono, plotting peaceful trade routes across the Milky Way.',
    favoriteCosmicSnack: 'Nebula Starlight Nectar',
    dreamDestination: 'The Great Orion Star Nursery',
    speciesOrRole: 'Extraterrestrial Guide & Robot',
  },
  {
    id: 'ice-crystal-cavern',
    name: 'Moon Ice Explorers',
    badge: 'HYDROLOGY SCIENTIST',
    title: 'Discovery of Lunar Water Crystals',
    image: '/assets/images/ghibli_moon_water_1792512889733.jpg',
    description:
      'Venturing deep into the permanently shadowed cryogenic caverns of the Moon, these young explorers discover glittering, self-luminous water ice crystals with their brass lantern.',
    favoriteCosmicSnack: 'Cinnamon Hot Cocoa',
    dreamDestination: 'Shackleton Crater Ice Vaults',
    speciesOrRole: 'Lunar Cryo-Geologists',
  },
  {
    id: 'gaganyaan-anaya',
    name: 'Cadet Anaya & Vyommitra',
    badge: 'HUMAN-ROBOT TEAM',
    title: 'Earth Orbit in Gaganyaan',
    image: '/assets/images/isro_gaganyaan_ghibli_1792512888871.jpg',
    description:
      'Inside the warm glowing cockpit of the Gaganyaan orbital module, young Cadet Anaya smiles alongside Vyommitra, the humanoid AI companion monitoring crew safety and life-support.',
    favoriteCosmicSnack: 'Freeze-Dried Alphonso Mangoes',
    dreamDestination: 'Low Earth Orbit & Space Station',
    speciesOrRole: 'Gaganyaan Flight Cadet & AI',
  },
  {
    id: 'ren',
    name: 'Cadet Ren & Orion',
    badge: 'STELLAR NAVIGATOR',
    title: 'Gazing at Saturn’s Rings',
    image: '/assets/images/ghibli_cadet_portrait_1792510363439.jpg',
    description:
      'A brave and gentle junior cadet who studies planetary rings from the cozy command deck while his space kitten Orion naps quietly under warm wool blankets.',
    favoriteCosmicSnack: 'Freeze-Dried Peach Mochi',
    dreamDestination: 'Rings of Saturn & Titan Lakes',
    speciesOrRole: 'Space Navigator & Cat Companion',
  },
  {
    id: 'yuki',
    name: 'Starhopper Yuki',
    badge: 'COSMIC DRIFTER',
    title: 'Dancing with the Starlight',
    image: '/assets/images/ghibli_kid_astro_1792510360715.jpg',
    description:
      'Floating among watercolor nebulas in his cozy spacesuit, Yuki collects shimmering starlight jars to bring back to Earth’s night skies.',
    favoriteCosmicSnack: 'Honey Star Crackers',
    dreamDestination: 'Orion Nebula Clouds',
    speciesOrRole: 'Zero-Gravity Drifter',
  },
];

export const GhibliCadetsSection: React.FC = () => {
  const [selectedCadet, setSelectedCadet] = useState<CadetStory>(cadetStories[0]);

  return (
    <div className="relative w-full py-8 sm:py-12 px-4 sm:px-8 md:px-12 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-xl mt-8 sm:mt-12 overflow-hidden shadow-2xl">
      {/* Decorative whimsical starry glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10 text-center md:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-xs font-barlow-condensed tracking-[0.2em] text-pink-300 uppercase mb-2">
            <Heart className="w-3.5 h-3.5 fill-pink-400" />
            <span>Studio Ghibli Space Cadets, Aliens & Robots</span>
          </div>
          <h3 className="font-bellefair text-3xl sm:text-4xl text-white uppercase tracking-wider">
            Junior Astronaut Academy & Cosmic Friends
          </h3>
          <p className="font-barlow text-xs sm:text-sm text-[#d0d6f9] max-w-xl mt-1 font-light">
            Inspiring the next generation of dreamers. Hand-painted Ghibli-style artwork celebrating kid astronauts, ISRO rovers, and friendly alien guides.
          </p>
        </div>

        {/* Scrollable / Wrap Filter for Mobile & Desktop */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/10 max-w-full overflow-x-auto">
          {cadetStories.map((cadet) => {
            const isActive = cadet.id === selectedCadet.id;
            return (
              <button
                key={cadet.id}
                onClick={() => setSelectedCadet(cadet)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-barlow-condensed tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Star className="w-3 h-3" />
                <span>{cadet.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Feature Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Featured Artwork with Animated Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative group max-w-md w-full rounded-2xl overflow-hidden border border-white/20 bg-black/60 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
            <img
              src={selectedCadet.image}
              alt={selectedCadet.title}
              className="w-full h-72 sm:h-96 md:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 select-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            {/* Badge overlay */}
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-mono text-cyan-300">
              {selectedCadet.badge}
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-left">
              <p className="font-bellefair text-lg sm:text-xl text-white">{selectedCadet.title}</p>
              <p className="text-xs font-barlow text-[#d0d6f9]">{selectedCadet.name}</p>
            </div>
          </div>
        </div>

        {/* Right: Story Description & Cosmic Details */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          <div className="inline-flex items-center gap-2 mb-1.5 text-xs font-barlow-condensed tracking-widest uppercase text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Character Dossier · {selectedCadet.speciesOrRole}</span>
          </div>

          <h4 className="font-bellefair text-2xl sm:text-3xl md:text-4xl text-white uppercase mb-3">
            {selectedCadet.name}
          </h4>

          <p className="font-barlow text-sm sm:text-base text-[#d0d6f9] leading-relaxed mb-6 font-light">
            {selectedCadet.description}
          </p>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 mb-6 text-xs">
            <div>
              <span className="text-slate-400 block uppercase font-barlow-condensed tracking-wider text-[10px] sm:text-xs">
                Favorite Cosmic Snack
              </span>
              <span className="text-white font-medium text-xs sm:text-sm mt-0.5 block">
                {selectedCadet.favoriteCosmicSnack}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase font-barlow-condensed tracking-wider text-[10px] sm:text-xs">
                Dream Destination
              </span>
              <span className="text-cyan-300 font-medium text-xs sm:text-sm mt-0.5 block">
                {selectedCadet.dreamDestination}
              </span>
            </div>
          </div>

          {/* Cadet Gallery Thumbnails */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xs font-barlow-condensed tracking-wider uppercase text-slate-400 mr-1 block sm:inline">
              Choose:
            </span>
            {cadetStories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCadet(c)}
                className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  c.id === selectedCadet.id
                    ? 'border-cyan-400 scale-110 shadow-[0_0_12px_#22d3ee]'
                    : 'border-white/20 hover:border-white/60 opacity-60 hover:opacity-100'
                }`}
                title={c.name}
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
