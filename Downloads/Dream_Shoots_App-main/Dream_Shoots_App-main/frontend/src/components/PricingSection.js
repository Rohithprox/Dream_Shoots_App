import React, { useState } from 'react';
import { Check, Sparkles, Building2, Heart } from 'lucide-react';

const studioPlans = [
  {
    name: 'One Reel',
    price: '1,999',
    features: ['1 Reel Delivered', 'Shot on Latest iPhone', 'Fast Delivery', 'Dream Shoots Branding Included'],
    tagline: 'Perfect for a quick social media update',
    popular: false,
  },
  {
    name: 'Two Reels',
    price: '3,499',
    features: ['2 Reels Delivered', 'Shot on Latest iPhone', 'Fast Delivery', 'Dream Shoots Branding Included'],
    tagline: 'Great for multiple angles and content variety',
    popular: true,
  },
  {
    name: 'Three Reels',
    price: '4,999',
    features: ['3 Reels Delivered', 'Shot on Latest iPhone', 'Fast Delivery', 'Dream Shoots Branding Included'],
    tagline: 'Best value for comprehensive content',
    popular: false,
  },
];

const corporatePlans = [
  {
    name: 'Monthly 5 Reels',
    price: '7,999',
    features: ['5 Reels per Month', 'Dedicated Creator Assigned', 'Consistent Brand Content', 'Priority Scheduling'],
    tagline: 'Ideal for growing brands and startups',
    popular: false,
  },
  {
    name: 'Monthly 10 Reels',
    price: '14,999',
    features: ['10 Reels per Month', 'Dedicated Creator Assigned', 'Consistent Brand Content', 'Priority Scheduling'],
    tagline: 'For brands that need daily content flow',
    popular: true,
  },
];

const weddingPlans = [
  {
    name: 'Silver',
    price: '9,999',
    subtitle: '1 Event, 5 Reels',
    features: ['Covers One Event', '5 Cinematic Reels', 'Complimentary Photos', 'Raw Content Included'],
    tagline: 'Perfect for intimate celebrations',
    popular: false,
  },
  {
    name: 'Gold',
    price: '29,999',
    subtitle: '3 Events, 15 Reels',
    features: ['Covers Three Events', '15 Cinematic Reels', 'Complimentary Photos', 'Raw Content + Extra Reels'],
    tagline: 'Comprehensive multi-event coverage',
    popular: true,
  },
  {
    name: 'Platinum',
    price: '49,999',
    subtitle: '4 Events, 20 Reels',
    features: ['Covers 4 Events', '20 Cinematic Reels', 'Complimentary Photos', 'Raw Content + Extra Reels'],
    tagline: 'Premium package for grand weddings',
    popular: false,
  },
  {
    name: 'Royal',
    price: '69,999',
    subtitle: 'Full Wedding, 30 Reels',
    features: ['Covers Whole Wedding', '30 Cinematic Reels', 'Complimentary Photos', 'Raw Content + Extra Reels'],
    tagline: 'The complete wedding content experience',
    popular: false,
  },
];

const tabs = [
  { key: 'studio', label: 'Studio', icon: <Sparkles size={16} /> },
  { key: 'corporate', label: 'Corporate', icon: <Building2 size={16} /> },
  { key: 'wedding', label: 'Wedding', icon: <Heart size={16} /> },
];

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState('studio');

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const plans = activeTab === 'studio' ? studioPlans : activeTab === 'corporate' ? corporatePlans : weddingPlans;

  return (
    <section id="pricing" data-testid="pricing-section" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
          {activeTab === 'wedding' ? (
            <>Turning Moments into <span className="text-[var(--ds-red)] italic">Memories</span></>
          ) : (
            <>Shoot <span className="text-[var(--ds-red)] italic">Packages</span></>
          )}
        </h2>
        <p className="text-center text-gray-500 mb-10 text-sm">
          {activeTab === 'studio' && 'Basic studio plans for creators and small businesses'}
          {activeTab === 'corporate' && 'Monthly subscription plans for consistent brand content'}
          {activeTab === 'wedding' && 'Complete wedding coverage packages for your special day'}
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.key}
              data-testid={`pricing-tab-${t.key}`}
              onClick={() => setActiveTab(t.key)}
              className={`pricing-tab flex items-center gap-2 ${
                activeTab === t.key ? 'pricing-tab-active' : 'pricing-tab-inactive'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Plans grid */}
        <div className={`grid gap-6 ${
          plans.length <= 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto' :
          plans.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}>
          {plans.map((pkg, i) => (
            <div
              key={`${activeTab}-${i}`}
              data-testid={`pricing-card-${activeTab}-${i}`}
              className={`relative bg-[var(--ds-card)] border rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-[rgba(220,38,38,0.4)] ${
                pkg.popular ? 'border-[var(--ds-red)] red-glow' : 'border-[var(--ds-border)]'
              }`}
            >
              {pkg.popular && (
                <div
                  data-testid="most-popular-badge"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--ds-red)] text-white text-[10px] font-bold px-4 py-1 rounded-full tracking-widest uppercase"
                >
                  Most Popular
                </div>
              )}

              <h3 className="text-white font-bold text-lg mb-1">{pkg.name}</h3>
              {pkg.subtitle && (
                <p className="text-gray-500 text-xs mb-2">{pkg.subtitle}</p>
              )}
              <div className="mb-1">
                <span className="text-[var(--ds-red)] text-3xl font-extrabold tracking-tight">
                  &#8377;{pkg.price}/-
                </span>
                <span className="text-gray-600 text-xs ml-1">+ GST</span>
              </div>
              {activeTab === 'corporate' && (
                <div className="text-gray-500 text-xs mb-4">per month</div>
              )}
              {activeTab !== 'corporate' && <div className="mb-4" />}

              <div className="space-y-3 flex-1">
                {pkg.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <Check size={15} className="text-[var(--ds-red)] flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--ds-border)] my-5" />
              <p className="text-gray-600 text-xs italic mb-4">{pkg.tagline}</p>

              <button
                data-testid={`pricing-book-btn-${activeTab}-${i}`}
                onClick={scrollToContact}
                className={`w-full py-3 rounded-lg font-bold text-sm tracking-wider uppercase transition-all ${
                  pkg.popular
                    ? 'bg-[var(--ds-red)] hover:bg-[var(--ds-red-dark)] text-white'
                    : 'bg-transparent border border-[var(--ds-border)] text-gray-300 hover:border-[var(--ds-red)] hover:text-white'
                }`}
              >
                Book A Shoot
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
