import React from 'react';
import { Home, Compass, Users, Rocket, Orbit, Sparkles } from 'lucide-react';
import { MainTab } from './Navbar';

export type ExtendedTab = MainTab | 'isro';

interface MobileBottomNavProps {
  currentTab: ExtendedTab;
  onNavigate: (tab: ExtendedTab) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentTab, onNavigate }) => {
  const items: { id: ExtendedTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'destination', label: 'Moons', icon: <Compass className="w-5 h-5" /> },
    { id: 'isro', label: 'ISRO Moon', icon: <Orbit className="w-5 h-5" /> },
    { id: 'crew', label: 'Crew & Art', icon: <Users className="w-5 h-5" /> },
    { id: 'technology', label: 'Tech', icon: <Rocket className="w-5 h-5" /> },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0b0e17]/95 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 flex items-center justify-around shadow-[0_-10px_25px_rgba(0,0,0,0.8)]"
      aria-label="Mobile Navigation"
    >
      {items.map((item) => {
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-w-[56px] min-h-[48px] ${
              isActive
                ? 'text-cyan-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <div
              className={`p-1 rounded-lg transition-transform ${
                isActive ? 'scale-110 bg-cyan-400/15' : ''
              }`}
            >
              {item.icon}
            </div>
            <span className="text-[10px] font-barlow-condensed uppercase tracking-wider mt-0.5 whitespace-nowrap">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
