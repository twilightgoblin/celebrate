'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkles, Palette, Monitor, Zap, Link2, PartyPopper } from 'lucide-react';

export default function About() {
  const secondParaRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const cards = [
    {
      title: "Custom Design",
      description: "Every invitation is uniquely crafted to match your vision and celebration style.",
      Icon: Sparkles
    },
    {
      title: "Done-For-You",
      description: "Share your ideas, and we handle everything from concept to final delivery.",
      Icon: Palette
    },
    {
      title: "Digital Experience",
      description: "Beautiful, interactive websites that wow your guests before they arrive.",
      Icon: Monitor
    },
    {
      title: "Easy Sharing",
      description: "One link to share everywhere—email, text, social media, you name it.",
      Icon: Link2
    },
    {
      title: "Lasting Impression",
      description: "Create memories that start the moment your guests open their invitation.",
      Icon: PartyPopper
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!secondParaRef.current || !cardsContainerRef.current) return;

      const paraRect = secondParaRef.current.getBoundingClientRect();
      const navbarHeight = 80;
      
      const paraReachedNavbar = paraRect.top <= navbarHeight;
      
      if (paraReachedNavbar) {
        const distanceFromNavbar = navbarHeight - paraRect.top;
        // Calculate total width of all cards plus gaps
        const cardWidth = 340;
        const gap = 24; // 6 * 4px
        const totalCardsWidth = (cardWidth * cards.length) + (gap * (cards.length - 1));
        const viewportWidth = window.innerWidth;
        const maxScrollDistance = totalCardsWidth - viewportWidth;
        
        // Reduced multiplier for faster horizontal scrolling
        const scrollMultiplier = window.innerHeight * 2;
        const progress = Math.min(distanceFromNavbar / scrollMultiplier, 1);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="relative px-4 sm:px-6 lg:px-8"
      style={{ 
        backgroundColor: 'transparent',
        background: 'linear-gradient(180deg, transparent 0%, rgba(255, 177, 153, 0.08) 2%, rgba(255, 200, 180, 0.25) 6%, rgba(255, 217, 199, 0.5) 12%, #FFD9C7 22%, #FFCDB5 50%, rgba(224, 122, 102, 0.15) 80%, rgba(224, 122, 102, 0.25) 100%)',
        minHeight: '600vh'
      }}
    >
      <div className="max-w-4xl mx-auto pt-20 pb-12">
        <div className="text-center mb-12">
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)' }}
          >
            About Us
          </h2>
        </div>
        
        <div className="space-y-8 mb-16">
          <p 
            className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-center"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-body)' }}
          >
            At <span className="font-semibold" style={{ color: 'var(--text-heading)' }}>Celebrate</span>, we transform your special moments into beautifully crafted digital experiences. We are a done-for-you invitation design agency—meaning you simply share your vision, and we take care of everything from concept to final delivery.
          </p>
          
          <p 
            ref={secondParaRef}
            className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-center"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-body)' }}
          >
            We believe every celebration deserves more than just an invitation—it deserves a lasting impression. That's why we design custom invitation websites that not only inform but truly <span className="font-semibold italic" style={{ color: 'var(--text-heading)' }}>wow</span> your guests.
          </p>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div 
          className="sticky top-20 overflow-hidden"
          style={{ 
            height: 'calc(100vh - 5rem)',
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw'
          }}
        >
          <div className="flex items-center h-full w-full pl-8 pr-8">
            <div 
              ref={cardsContainerRef}
              className="flex gap-6 transition-transform duration-100 ease-out"
              style={{
                transform: `translateX(calc(-${scrollProgress * 100}% + ${scrollProgress * 100}vw - ${scrollProgress * 340}px))`,
                willChange: 'transform'
              }}
            >
              {cards.map((card, index) => {
                const Icon = card.Icon;
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 rounded-lg p-8 backdrop-blur-sm"
                    style={{
                      width: '340px',
                      minHeight: '280px',
                      backgroundColor: 'rgba(245, 230, 220, 0.6)',
                      border: '1px solid rgba(255, 177, 153, 0.3)',
                      fontFamily: 'var(--font-body)',
                      boxShadow: '0 4px 20px rgba(90, 74, 69, 0.08)'
                    }}
                  >
                    <div className="mb-5">
                      <Icon 
                        size={32} 
                        strokeWidth={1.5}
                        style={{ color: 'var(--btn-primary)' }}
                      />
                    </div>
                    <h3 
                      className="text-xl font-semibold mb-3"
                      style={{ 
                        fontFamily: 'var(--font-heading)', 
                        color: 'var(--text-heading)' 
                      }}
                    >
                      {card.title}
                    </h3>
                    <p 
                      className="text-base leading-relaxed"
                      style={{ color: 'var(--text-body)' }}
                    >
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
