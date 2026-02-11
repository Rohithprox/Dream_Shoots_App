import React from 'react';

const services = [
  {
    title: 'Short-Form Videos',
    desc: 'Engaging reels and short videos optimized for social media platforms. Perfect for brands looking to boost their online presence.',
    items: ['Instagram Reels', 'TikTok Content', 'YouTube Shorts', 'Social Media Ready'],
  },
  {
    title: 'Event Coverage',
    desc: 'Comprehensive event documentation with professional creators. Capture every important moment with cinematic quality.',
    items: ['Live Coverage', 'Highlight Reels', 'Multi-angle Shots', 'Same-day Delivery'],
  },
  {
    title: 'Product & Brand',
    desc: 'Showcase your products with stunning visuals that convert. Brand storytelling that resonates with your audience.',
    items: ['Product Demos', 'Brand Stories', 'Testimonials', 'Commercial Quality'],
  },
  {
    title: 'Commercial Shoots',
    desc: 'Full-scale commercial production for businesses. From concept to final delivery, we handle it all professionally.',
    items: ['Creative Direction', 'Professional Equipment', 'Post-production', 'Fast Turnaround'],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" data-testid="services-section" className="py-20 px-4 border-t border-[var(--ds-border)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <span className="inline-block px-5 py-2 rounded-full border border-[var(--ds-red)] text-[var(--ds-red)] text-xs font-semibold tracking-widest uppercase">
            Our Services
          </span>
        </div>
        <h2 className="section-heading text-center text-4xl md:text-5xl mb-4">
          Designed for <span className="text-[var(--ds-red)]" style={{ fontStyle: 'italic' }}>Businesses</span>
        </h2>
        <p className="text-center text-gray-400 mb-14 text-base">
          Designed for businesses, brands, events, and creators.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              data-testid={`service-card-${i}`}
              className="service-card bg-[var(--ds-card)] border border-[var(--ds-border)] rounded-xl p-6 flex flex-col"
            >
              <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed flex-1">{s.desc}</p>
              <ul className="space-y-2 mb-5">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--ds-red)] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                data-testid={`service-learn-more-${i}`}
                className="btn-outline-red text-sm w-full"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button data-testid="view-all-services-btn" className="btn-red text-sm">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
