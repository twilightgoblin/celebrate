'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MessageSquare, Lightbulb, Code, Eye, Rocket } from 'lucide-react';

export default function Process() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { amount: 0.3 });

  const steps = [
    {
      number: "01",
      title: "Contact Us",
      description: "Reach out and tell us about your celebration. We'll schedule a quick chat to understand your vision.",
      Icon: MessageSquare
    },
    {
      number: "02",
      title: "We Discuss Requirements",
      description: "We dive deep into your needs, preferences, and ideas to ensure we capture every detail perfectly.",
      Icon: Lightbulb
    },
    {
      number: "03",
      title: "We Design and Develop",
      description: "Our team brings your vision to life with custom designs and seamless functionality.",
      Icon: Code
    },
    {
      number: "04",
      title: "Your Review",
      description: "We present the invitation for your feedback and make any adjustments you need.",
      Icon: Eye
    },
    {
      number: "05",
      title: "Deliver",
      description: "Your beautiful invitation is ready to share. We provide everything you need to wow your guests.",
      Icon: Rocket
    }
  ];

  return (
    <section 
      id="process"
      className="relative min-h-screen py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 flex items-center"
      style={{ 
        background: 'linear-gradient(180deg, rgba(255, 217, 199, 0.2) 0%, rgba(255, 217, 199, 0.4) 10%, #FFD9C7 25%, #FFD9C7 100%)'
      }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.h2
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)' }}
          >
            Our Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-body)' }}
          >
            From first contact to final delivery, we make it simple and stress-free
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {steps.map((step, index) => {
            const stepRef = useRef(null);
            const Icon = step.Icon;
            
            return (
              <motion.div
                key={index}
                ref={stepRef}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3, once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="relative rounded-xl p-5 sm:p-6 lg:p-7 flex flex-col"
                style={{
                  backgroundColor: 'rgba(245, 230, 220, 0.6)',
                  border: '1px solid rgba(255, 177, 153, 0.25)',
                  boxShadow: '0 4px 16px rgba(90, 74, 69, 0.08)',
                  minHeight: '240px'
                }}
              >
                <motion.div 
                  className="mb-3 sm:mb-4 lg:mb-5"
                  whileHover={{ 
                    rotate: [0, -5, 5, 0],
                    scale: 1.15,
                    transition: { duration: 0.5 }
                  }}
                >
                  <div 
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--btn-primary)' }}
                  >
                    <Icon 
                      size={22}
                      className="sm:w-6 sm:h-6 lg:w-7 lg:h-7"
                      strokeWidth={2}
                      style={{ color: 'white' }}
                    />
                  </div>
                </motion.div>
                
                <div className="flex-1 flex flex-col">
                  <span 
                    className="text-xs font-semibold opacity-40 block mb-1 sm:mb-2"
                    style={{ 
                      fontFamily: 'var(--font-body)', 
                      color: 'var(--text-heading)' 
                    }}
                  >
                    {step.number}
                  </span>
                  <h3 
                    className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3"
                    style={{ 
                      fontFamily: 'var(--font-heading)', 
                      color: 'var(--text-heading)' 
                    }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-xs sm:text-sm lg:text-base leading-relaxed"
                    style={{ 
                      fontFamily: 'var(--font-body)', 
                      color: 'var(--text-body)' 
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
