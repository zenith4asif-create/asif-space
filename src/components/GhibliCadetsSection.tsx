import React, { useState } from 'react';
import { Sparkles, Heart, Rocket, Compass, Star, Award } from 'lucide-react';

interface CadetStory {
  id: string;
  name: string;
  badge: string;
  title: string;
  image: string;
  description: string;
  favoriteCosmicSnack: string;
  dreamDestination: string;
}

const cadetStories: CadetStory[] = [
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
  },
  {
    id: 'luna-crew',
    name: 'The Lunar Explorers & Pipo',
    badge: 'SURFACE PATHFINDER',
    title: 'First Steps on the Moon',
    image: '/assets/images/ghibli_lunar_kids_1792510362117.jpg',
    description:
      'Hand-in-hand with their cheerful little helper droid Pipo, these young explorers look back at home Earth with boundless wonder and friendship.',
    favoriteCosmicSnack: 'Moonberry Juice Pouches',
    dreamDestination: 'Oceanus Procellarum',
  },
];

export const GhibliCadetsSection: React.FC = () => {
  const [selectedCadet, setSelectedCadet] = useState<CadetStory>(cadetStories[0]);

  return (
    <div className="relative w-full py-12 px-6 md:px-12 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-xl mt-12 overflow-hidden shadow-2xl">
      {/* Decorative whimsical starry glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-xs font-barlow-condensed tracking-[0.2em] text-pink-300 uppercase mb-2">
            <Heart className="w-3.5 h-3.5 fill-pink-400" />
            <span>Studio Ghibli Space Cadets Edition</span>
          </div>
          <h3 className="font-bellefair text-3xl md:text-4xl text-white uppercase tracking-wider">
            Junior Astronaut Academy
          </h3>
          <p className="font-barlow text-sm text-[#d0d6f9] max-w-xl mt-1 font-light">
            Inspiring the next generation of dreamers. Hand-painted Ghibli-style artwork celebrating kid astronauts exploring the wonders of the cosmos.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
          {cadetStories.map((cadet) => {
            const isActive = cadet.id === selectedCadet.id;
            return (
              <button
                key={cadet.id}
                onClick={() => setSelectedCadet(cadet)}
                className={`px-3 py-1.5 rounded-xl text-xs font-barlow-condensed tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
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
              className="w-full h-[380px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 select-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Badge overlay */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-mono text-cyan-300">
              {selectedCadet.badge}
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <p className="font-bellefair text-xl text-white">{selectedCadet.title}</p>
              <p className="text-xs font-barlow text-[#d0d6f9]">{selectedCadet.name}</p>
            </div>
          </div>
        </div>

        {/* Right: Story Description & Cosmic Details */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 mb-2 text-xs font-barlow-condensed tracking-widest uppercase text-cyan-300">
            <Sparkles className="w-4 h-4" />
            <span>Cadet Dossier</span>
          </div>

          <h4 className="font-bellefair text-3xl md:text-4xl text-white uppercase mb-4">
            {selectedCadet.name}
          </h4>

          <p className="font-barlow text-base text-[#d0d6f9] leading-relaxed mb-6 font-light">
            {selectedCadet.description}
          </p>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-6 text-xs">
            <div>
              <span className="text-slate-400 block uppercase font-barlow-condensed tracking-wider">
                Favorite Space Snack
              </span>
              <span className="text-white font-medium text-sm mt-0.5 block">
                {selectedCadet.favoriteCosmicSnack}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase font-barlow-condensed tracking-wider">
                Dream Destination
              </span>
              <span className="text-cyan-300 font-medium text-sm mt-0.5 block">
                {selectedCadet.dreamDestination}
              </span>
            </div>
          </div>

          {/* Cadet Gallery Thumbnails */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-barlow-condensed tracking-wider uppercase text-slate-400 mr-1">
              Select Cadet:
            </span>
            {cadetStories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCadet(c)}
                className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
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
