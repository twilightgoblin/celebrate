'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkles, Palette, Monitor, Link2, PartyPopper } from 'lucide-react';

export default function About() {
  const secondParaRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHorizontalComplete, setIsHorizontalComplete] = useState(false);

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
      if (!secondParaRef.current || !cardsContainerRef.current || !sectionRef.current) return;

      const paraRect = secondParaRef.current.getBoundingClientRect();
      const navbarHeight = 80;
      
      const paraReachedNavbar = paraRect.top <= navbarHeight;
      
      if (paraReachedNavbar) {
        const distanceFromNavbar = navbarHeight - paraRect.top;
        
        // Calculate scroll needed to center the last card
        const scrollMultiplier = window.innerHeight * 2.5;
        const progress = Math.min(distanceFromNavbar / scrollMultiplier, 1);
        setScrollProgress(progress);
        
        // Only mark complete when progress reaches 1 (last card centered)
        setIsHorizontalComplete(progress >= 0.99);
      } else {
        setScrollProgress(0);
        setIsHorizontalComplete(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative px-4 sm:px-6 lg:px-8"
      style={{ 
        backgroundColor: 'transparent',
        background: 'linear-gradient(180deg, transparent 0%, rgba(255, 177, 153, 0.08) 2%, rgba(255, 200, 180, 0.25) 6%, rgba(255, 217, 199, 0.5) 12%, #FFD9C7 22%, #FFCDB5 50%, rgba(224, 122, 102, 0.15) 80%, rgba(224, 122, 102, 0.25) 100%)',
        minHeight: isHorizontalComplete ? 'auto' : '450vh',
        paddingBottom: isHorizontalComplete ? '4rem' : '0'
      }}
    >
      <div className="max-w-4xl mx-auto pt-16 sm:pt-20 pb-8 sm:pb-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)' }}
          >
            About Us
          </h2>
        </div>
        
        <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16 px-4">
          <p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-center"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-body)' }}
          >
            At <span className="font-semibold" style={{ color: 'var(--text-heading)' }}>Celebrate</span>, we transform your special moments into beautifully crafted digital experiences. We are a done-for-you invitation design agency—meaning you simply share your vision, and we take care of everything from concept to final delivery.
          </p>
          
          <p 
            ref={secondParaRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-center"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-body)' }}
          >
            We believe every celebration deserves more than just an invitation—it deserves a lasting impression. That's why we design custom invitation websites that not only inform but truly <span className="font-semibold italic" style={{ color: 'var(--text-heading)' }}>wow</span> your guests.
          </p>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div 
          style={{ 
            height: isHorizontalComplete ? 'auto' : 'calc(100vh - 5rem)',
            width: '100vw',
            position: isHorizontalComplete ? 'relative' : 'sticky',
            top: isHorizontalComplete ? 'auto' : '5rem',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            overflow: 'hidden'
          }}
        >
          <div className="flex items-center justify-center h-full w-full">
            <div 
              ref={cardsContainerRef}
              className="flex gap-4 sm:gap-6 transition-transform duration-100 ease-out"
              style={{
                transform: `translateX(calc(50vw - 50% - ${scrollProgress * (cards.length - 1) * (window.innerWidth < 640 ? 296 : window.innerWidth < 1024 ? 344 : 364)}px))`,
                willChange: 'transform',
                paddingLeft: '2rem',
                paddingRight: '2rem'
              }}
            >
              {cards.map((card, index) => {
                const Icon = card.Icon;
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 rounded-lg p-6 sm:p-8 backdrop-blur-sm"
                    style={{
                      width: 'clamp(280px, 85vw, 340px)',
                      minHeight: '280px',
                      backgroundColor: 'rgba(245, 230, 220, 0.6)',
                      border: '1px solid rgba(255, 177, 153, 0.3)',
                      fontFamily: 'var(--font-body)',
                      boxShadow: '0 4px 20px rgba(90, 74, 69, 0.08)'
                    }}
                  >
                    <div className="mb-4 sm:mb-5">
                      <Icon 
                        size={window.innerWidth < 640 ? 28 : 32}
                        strokeWidth={1.5}
                        style={{ color: 'var(--btn-primary)' }}
                      />
                    </div>
                    <h3 
                      className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3"
                      style={{ 
                        fontFamily: 'var(--font-heading)', 
                        color: 'var(--text-heading)' 
                      }}
                    >
                      {card.title}
                    </h3>
                    <p 
                      className="text-sm sm:text-base leading-relaxed"
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

        {/* Next Section - Appears after horizontal scroll completes */}
        <div 
          className="mt-16 sm:mt-24 px-4 transition-opacity duration-500"
          style={{
            opacity: isHorizontalComplete ? 1 : 0,
            pointerEvents: isHorizontalComplete ? 'auto' : 'none'
          }}
        >
          <div className="max-w-4xl mx-auto text-center py-12 sm:py-16">
            <h3 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)' }}
            >
              Ready to Create Something Special?
            </h3>
            <p 
              className="text-base sm:text-lg md:text-xl leading-relaxed mb-8"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--text-body)' }}
            >
              Let's bring your celebration to life with a custom invitation that your guests will never forget.
            </p>
            <button
              className="px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: 'var(--btn-primary)',
                color: 'white',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 14px rgba(90, 74, 69, 0.2)'
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
