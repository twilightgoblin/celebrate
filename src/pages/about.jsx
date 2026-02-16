'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkles, Palette, Monitor, Link2, PartyPopper } from 'lucide-react';
import { motion, useInView } from 'motion/react';

export default function About() {
  const secondParaRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const firstParaRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cardWidth, setCardWidth] = useState(340);
  
  const headingInView = useInView(headingRef, { amount: 0.3 });
  const firstParaInView = useInView(firstParaRef, { amount: 0.3 });

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
    const updateCardWidth = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setCardWidth(280);
        } else if (window.innerWidth < 1024) {
          setCardWidth(320);
        } else {
          setCardWidth(340);
        }
      }
    };

    updateCardWidth();

    const handleScroll = () => {
      if (!secondParaRef.current || !cardsContainerRef.current || !sectionRef.current) return;

      const paraRect = secondParaRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const navbarHeight = 80;
      
      const paraReachedNavbar = paraRect.top <= navbarHeight;
      
      // Stop calculating if we've scrolled past the section
      if (sectionRect.bottom < 0) return;
      
      if (paraReachedNavbar && typeof window !== 'undefined') {
        // Ensure distanceFromNavbar is non-negative for safety
        const distanceFromNavbar = Math.max(0, navbarHeight - paraRect.top);
        
        // Calculate scroll needed to show all cards with smoother progression
        const scrollMultiplier = window.innerHeight * 2.8;
        const progress = Math.min(distanceFromNavbar / scrollMultiplier, 1);
        
        // Apply smoothstep easing for better acceleration curve
        const easedProgress = progress * progress * (3 - 2 * progress);
        
        setScrollProgress(easedProgress);
      } else if (!paraReachedNavbar) {
        setScrollProgress(0);
      }
    };

    const handleResize = () => {
      updateCardWidth();
      handleScroll();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      handleScroll();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Calculate gap
  const gap = cardWidth === 280 ? 16 : 24;
  
  // Calculate total scroll distance for all cards
  const totalScrollDistance = (cards.length - 1) * (cardWidth + gap);

  return (
    <section 
      ref={sectionRef}
      className="relative"
      style={{ 
        backgroundColor: 'transparent',
        background: 'linear-gradient(180deg, transparent 0%, rgba(255, 177, 153, 0.08) 2%, rgba(255, 200, 180, 0.25) 6%, rgba(255, 217, 199, 0.5) 12%, #FFD9C7 22%, #FFCDB5 50%, rgba(224, 122, 102, 0.15) 80%, rgba(224, 122, 102, 0.25) 100%)',
        height: '450vh',
        marginTop: '30vh'
      }}
    >
      <div className="max-w-4xl mx-auto pt-16 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)' }}
          >
            About Us
          </motion.h2>
        </div>
        
        <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
          <motion.p
            ref={firstParaRef}
            initial={{ opacity: 0, y: 20 }}
            animate={firstParaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-center"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-body)' }}
          >
            At <motion.span 
              className="font-semibold" 
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              style={{ display: 'inline-block', color: 'var(--text-heading)' }}
            >
              Celebrate
            </motion.span>, we transform your special moments into beautifully crafted digital experiences. We are a done-for-you invitation design agency—meaning you simply share your vision, and we take care of everything from concept to final delivery.
          </motion.p>
          
          <motion.p
            ref={secondParaRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-center"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-body)' }}
          >
            We believe every celebration deserves more than just an invitation—it deserves a lasting impression. That's why we design custom invitation websites that not only inform but truly <motion.span 
              className="font-semibold italic" 
              whileHover={{ 
                scale: 1.1, 
                rotate: [-2, 2, -2, 0],
                transition: { duration: 0.4 }
              }}
              style={{ display: 'inline-block', color: 'var(--text-heading)' }}
            >
              wow
            </motion.span> your guests.
          </motion.p>
        </div>
      </div>

      {/* Horizontal Scrolling Cards - Full Width */}
      <div 
        style={{ 
          height: 'calc(100vh - 5rem)',
          width: '100vw',
          position: 'sticky',
          top: '5rem',
          left: 0,
          overflow: 'hidden'
        }}
      >
        <div className="flex items-center h-full w-full">
          <div 
            ref={cardsContainerRef}
            className="flex transition-transform duration-100 ease-out"
            style={{
              transform: `translateX(calc(4rem - ${scrollProgress * totalScrollDistance}px))`,
              willChange: 'transform',
              gap: `${gap}px`
            }}
          >
            {cards.map((card, index) => {
              const Icon = card.Icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ amount: 0.3 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                  }}
                  className="flex-shrink-0 rounded-lg p-6 sm:p-8 backdrop-blur-sm cursor-pointer"
                  style={{
                    width: `${cardWidth}px`,
                    minHeight: '280px',
                    backgroundColor: 'rgba(245, 230, 220, 0.6)',
                    border: '1px solid rgba(255, 177, 153, 0.3)',
                    fontFamily: 'var(--font-body)',
                    boxShadow: '0 4px 20px rgba(90, 74, 69, 0.08)'
                  }}
                >
                  <motion.div 
                    className="mb-4 sm:mb-5"
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <Icon 
                      size={cardWidth === 280 ? 28 : 32}
                      strokeWidth={1.5}
                      style={{ color: 'var(--btn-primary)' }}
                    />
                  </motion.div>
                  <motion.h3 
                    className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3"
                    style={{ 
                      fontFamily: 'var(--font-heading)', 
                      color: 'var(--text-heading)' 
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p 
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: 'var(--text-body)' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    {card.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
