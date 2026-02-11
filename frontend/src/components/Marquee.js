import React from 'react';
import { Zap } from 'lucide-react';

const Marquee = () => {
  const items = Array(10).fill(null);
  return (
    <div className="marquee-container" data-testid="marquee-banner">
      <div className="marquee-content">
        {items.map((_, i) => (
          <span key={i} className="marquee-item">
            <Zap size={16} fill="white" /> BOOK A SHOOT
          </span>
        ))}
        {items.map((_, i) => (
          <span key={`dup-${i}`} className="marquee-item">
            <Zap size={16} fill="white" /> BOOK A SHOOT
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
