import React, { useState, useEffect } from 'react';
import { Navbar, MainTab } from './components/Navbar';
import { MobileBottomNav, ExtendedTab } from './components/MobileBottomNav';
import { Starfield } from './components/Starfield';
import { HomeView } from './views/HomeView';
import { DestinationView } from './views/DestinationView';
import { CrewView } from './views/CrewView';
import { TechnologyView } from './views/TechnologyView';
import { IsroAndMoonDiscovery } from './components/IsroAndMoonDiscovery';
import { SciFiWarpVideo } from './components/SciFiWarpVideo';
import { spaceData } from './data/spaceData';
import { FileJson, Orbit, Video, X, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<MainTab>('home');
  const [destId, setDestId] = useState<string>('moon');
  const [crewSlug, setCrewSlug] = useState<string>('commander');
  const [techSlug, setTechSlug] = useState<string>('capsule');
  const [showDataJsonModal, setShowDataJsonModal] = useState<boolean>(false);
  const [showVideoSimModal, setShowVideoSimModal] = useState<boolean>(false);

  // Parse path on initial load or popstate
  const syncFromUrl = () => {
    const path = window.location.pathname.toLowerCase();

    if (path.includes('isro') || path.includes('moon-discovery')) {
      setCurrentTab('isro');
    } else if (path.includes('destination')) {
      setCurrentTab('destination');
      if (path.includes('mars')) setDestId('mars');
      else if (path.includes('europa')) setDestId('europa');
      else if (path.includes('titan')) setDestId('titan');
      else setDestId('moon');
    } else if (path.includes('crew')) {
      setCurrentTab('crew');
      if (path.includes('specialist')) setCrewSlug('specialist');
      else if (path.includes('pilot')) setCrewSlug('pilot');
      else if (path.includes('engineer')) setCrewSlug('engineer');
      else setCrewSlug('commander');
    } else if (path.includes('technology')) {
      setCurrentTab('technology');
      if (path.includes('vehicle')) setTechSlug('vehicle');
      else if (path.includes('spaceport')) setTechSlug('spaceport');
      else setTechSlug('capsule');
    } else {
      setCurrentTab('home');
    }
  };

  useEffect(() => {
    syncFromUrl();
    const handlePopState = () => syncFromUrl();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL history when navigation happens
  const navigateTo = (tab: MainTab, subItem?: string) => {
    setCurrentTab(tab);
    let targetPath = '/home.html';

    if (tab === 'home') {
      targetPath = '/home.html';
    } else if (tab === 'destination') {
      const activeD = subItem || destId;
      setDestId(activeD);
      targetPath = `/destination-${activeD}.html`;
    } else if (tab === 'isro') {
      targetPath = '/isro-moon.html';
    } else if (tab === 'crew') {
      const activeC = subItem || crewSlug;
      setCrewSlug(activeC);
      targetPath = `/crew-${activeC}.html`;
    } else if (tab === 'technology') {
      const activeT = subItem || techSlug;
      setTechSlug(activeT);
      targetPath = `/technology-${activeT}.html`;
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  // Background image based on current active tab
  const getBackgroundImage = () => {
    switch (currentTab) {
      case 'destination':
        return 'url(/assets/destination/background-destination-desktop.jpg)';
      case 'isro':
        return 'url(/assets/destination/background-destination-desktop.jpg)';
      case 'crew':
        return 'url(/assets/crew/background-crew-desktop.jpg)';
      case 'technology':
        return 'url(/assets/technology/background-technology-desktop.jpg)';
      case 'home':
      default:
        return 'url(/assets/home/background-home-desktop.jpg)';
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col justify-between bg-cover bg-center bg-no-repeat transition-all duration-700 overflow-x-hidden selection:bg-cyan-500/30 pb-16 md:pb-0"
      style={{
        backgroundImage: getBackgroundImage(),
        backgroundColor: '#0b0d17',
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-[#0b0d17]/40 pointer-events-none z-0" />

      {/* Interactive Twinkling Stars */}
      <Starfield />

      {/* Main Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => navigateTo(tab)}
        onOpenSimulation={() => setShowVideoSimModal(true)}
      />

      {/* Content View Area */}
      <main className="relative z-10 flex-1 flex flex-col">
        {currentTab === 'home' && (
          <HomeView
            onExplore={() => navigateTo('destination', 'moon')}
            onSelectDestination={(dId) => navigateTo('destination', dId)}
            onOpenSimulation={() => setShowVideoSimModal(true)}
            onOpenGhibliCadets={() => navigateTo('crew')}
            onOpenIsro={() => navigateTo('isro')}
          />
        )}

        {currentTab === 'destination' && (
          <DestinationView
            currentDestId={destId}
            onSelectDestination={(dId) => navigateTo('destination', dId)}
            onOpenVideoSimulation={() => setShowVideoSimModal(true)}
            onOpenMoonDiscoveries={() => navigateTo('isro')}
          />
        )}

        {currentTab === 'isro' && (
          <IsroAndMoonDiscovery />
        )}

        {currentTab === 'crew' && (
          <CrewView
            currentCrewSlug={crewSlug}
            onSelectCrew={(cSlug) => navigateTo('crew', cSlug)}
          />
        )}

        {currentTab === 'technology' && (
          <TechnologyView
            currentTechSlug={techSlug}
            onSelectTechnology={(tSlug) => navigateTo('technology', tSlug)}
          />
        )}
      </main>

      {/* Minimalist Bottom Footer with Direct File Inspector (Desktop & Tablet) */}
      <footer className="relative z-20 w-full py-4 px-4 sm:px-8 md:px-14 border-t border-white/5 bg-[#0b0e17]/80 backdrop-blur-md hidden sm:block">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-barlow-condensed tracking-widest text-slate-400">
          <div className="flex items-center gap-2">
            <Orbit className="w-3.5 h-3.5 text-cyan-400" />
            <span>SPACE TOURISM ARCHIVE · CHANDRAYAAN-3 & ISRO INCLUDED</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowVideoSimModal(true)}
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Launch Video Sim</span>
            </button>

            <span>·</span>

            <button
              onClick={() => setShowDataJsonModal(true)}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              title="Inspect raw data.json"
            >
              <FileJson className="w-3.5 h-3.5 text-cyan-400" />
              <span>data.json</span>
            </button>

            <span>·</span>

            <a
              href="/home.html"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home');
              }}
              className="hover:text-white transition-colors"
            >
              Static Home
            </a>

            <span>·</span>

            <span className="text-slate-400">
              Orbital Velocity: <span className="text-cyan-300 font-mono">7.8 km/s</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Thumb-friendly Mobile Bottom Navigation */}
      <MobileBottomNav
        currentTab={currentTab}
        onNavigate={(tab) => navigateTo(tab as MainTab)}
      />

      {/* Sci-Fi Space Flight Video & Warp Simulation Modal */}
      {showVideoSimModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setShowVideoSimModal(false)}
        >
          <div
            className="w-full max-w-5xl bg-[#070a13] border border-cyan-400/30 rounded-2xl sm:rounded-3xl p-3 sm:p-6 flex flex-col shadow-[0_0_80px_rgba(34,211,238,0.2)] max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10 mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Video className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 animate-pulse" />
                <h3 className="font-barlow-condensed text-base sm:text-lg uppercase tracking-wider text-white">
                  Space Flight Video & Hyperspace Warp Simulation
                </h3>
              </div>
              <button
                onClick={() => setShowVideoSimModal(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Close Simulation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <SciFiWarpVideo />
          </div>
        </div>
      )}

      {/* Raw data.json Inspector Modal */}
      {showDataJsonModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setShowDataJsonModal(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[80vh] bg-[#0f172a] border border-white/20 rounded-2xl p-6 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileJson className="w-5 h-5 text-cyan-400" />
                <h3 className="font-barlow-condensed text-lg uppercase tracking-wider text-white">
                  Source Dataset (data.json)
                </h3>
              </div>
              <button
                onClick={() => setShowDataJsonModal(false)}
                className="text-slate-400 hover:text-white text-sm font-barlow-condensed uppercase tracking-wider cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="flex-1 overflow-auto mt-4 p-4 rounded-lg bg-black/60 font-mono text-xs text-cyan-200">
              <pre>{JSON.stringify(spaceData, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
