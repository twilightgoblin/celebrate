'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTA() {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { amount: 0.3 });

  return (
    <section 
      id="contact"
      ref={ctaRef}
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
      style={{ 
        background: 'linear-gradient(180deg, #FFD9C7 0%, rgba(255, 217, 199, 0.95) 50%, rgba(255, 205, 181, 0.9) 100%)',
        minHeight: '60vh'
      }}
    >
      <div className="w-full max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={ctaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(245, 230, 220, 0.5)',
            border: '1px solid rgba(255, 177, 153, 0.25)',
            boxShadow: '0 8px 32px rgba(90, 74, 69, 0.1)'
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)' }}
          >
            Want to Book?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl mb-10 sm:mb-12 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-body)' }}
          >
            Let's create something beautiful for your celebration
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center"
          >
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2.5 px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-medium transition-all w-full sm:w-auto justify-center"
              style={{ 
                backgroundColor: 'var(--btn-primary)',
                color: 'white',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 16px rgba(243, 139, 117, 0.3)'
              }}
            >
              Book Now
              <motion.div
                className="transition-transform group-hover:translate-x-1"
              >
                <ArrowRight size={20} strokeWidth={2.5} />
              </motion.div>
            </motion.a>

            <motion.a
              href="tel:+91 9148505291"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-medium transition-all w-full sm:w-auto justify-center"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                color: 'var(--text-heading)',
                fontFamily: 'var(--font-body)',
                border: '2px solid rgba(138, 107, 99, 0.2)',
                boxShadow: '0 2px 12px rgba(90, 74, 69, 0.08)'
              }}
            >
              <Phone size={20} strokeWidth={2.5} />
              +91 9148505291
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
