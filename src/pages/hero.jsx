'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Grainient from '../components/Grainient';
import TextHighlighter from '@/components/ui/text-highlighter';
import Navbar from '../components/Navbar';

export default function Hero() {
  const textRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle scroll animation
    const handleScroll = () => {
      if (!textRef.current) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Scale increases as you scroll
      const scale = 1 + (scrollY / windowHeight) * 2;
      
      // Opacity decreases as you scroll - adjusted to fade later
      const opacity = Math.max(0, 1 - (scrollY / windowHeight) * 0.8);
      
      textRef.current.style.transform = `scale(${scale})`;
      textRef.current.style.opacity = opacity;
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
        <Grainient
          color1="#FFD9C7"
          color2="#FFB199"
          color3="#F38B75"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
          <div 
            ref={textRef}
            className="mx-auto max-w-3xl px-4 sm:px-6 text-center transition-transform"
            style={{ willChange: 'transform, opacity' }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 sm:mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)' }}>
              Make Every Celebration Unforgettable
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-body)' }}>
              Plan, Book, and {' '}
              <TextHighlighter type="wavy" highlightColor="#FFB199">
                <span>Celebrate!</span>
              </TextHighlighter>
            </p>
          </div>
        </div>
      </div>
      {/* Add extra content to enable scrolling */}
      <div style={{ height: '200vh', position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
        {/* Spacer for scroll effect */}
      </div>
      <div style={{ height: '100vh', position: 'relative', zIndex: 2 }}>
        {/* Your next section content goes here */}
      </div>
    </>
  );
}
