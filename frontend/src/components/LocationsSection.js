import React from 'react';
import { MapPin } from 'lucide-react';

const locations = [
  { city: 'Nellore', tagline: 'Our Home Base', main: true, icon: '/Dream Shoots Logo nlr.png' },
  { city: 'Hyderabad', tagline: 'The City of Pearls', main: false, icon: '/Dream Shoots Logo hyd.png' },
  { city: 'Vijayawada', tagline: 'The Business Capital', main: false, icon: '/Dream Shoots Logo vjw.png' },
  { city: 'Tirupati', tagline: 'The Spiritual Hub', main: false, icon: '/dream shoots tpt.png' },
  { city: 'Ongole', tagline: 'The Pride of Prakasam', main: false, icon: '/Dream Shoots Logo - Ongole.png' },
];

const LocationsSection = () => {
  return (
    <section id="locations" data-testid="locations-section" className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--ds-red)] text-[var(--ds-red)] text-xs font-bold tracking-widest uppercase">
            <MapPin size={14} /> Where We Operate
          </span>
        </div>
        <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Available <span className="text-[var(--ds-red)] italic">Near You</span>
        </h2>
        <p className="text-center text-gray-500 mb-12 text-sm">
          Professional creators ready to shoot in these locations
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {locations.map((loc, i) => (
            <div
              key={i}
              data-testid={`location-card-${i}`}
              className={`service-card bg-[var(--ds-card)] border rounded-xl p-6 text-center ${loc.main ? 'border-[var(--ds-red)] red-glow md:col-span-1' : 'border-[var(--ds-border)]'
                }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden ${loc.main ? 'bg-[var(--ds-red)]/20 border border-[var(--ds-red)] shadow-[0_0_15px_rgba(220,38,38,0.3)]' : 'bg-[rgba(220,38,38,0.08)] border border-[rgba(220,38,38,0.25)]'
                }`}>
                <img src={loc.icon} alt={loc.city} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{loc.city}</h3>
              <p className="text-gray-500 text-xs">{loc.tagline}</p>
              {loc.main && (
                <div className="mt-2">
                  <span className="inline-block bg-[var(--ds-red)] text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase">HQ</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
