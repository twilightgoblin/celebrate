'use client';

import { useRef } from 'react';
import { Heart, Cake, Home, Briefcase, GraduationCap, Gift } from 'lucide-react';
import { motion, useInView } from 'motion/react';

export default function Services() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  
  const headingInView = useInView(headingRef, { amount: 0.3 });
  const subtitleInView = useInView(subtitleRef, { amount: 0.3 });

  const services = [
    {
      title: "Wedding Invitations",
      description: "Elegant digital invitations for your big day. RSVPs, maps, and all the details in one beautiful place.",
      Icon: Heart
    },
    {
      title: "Birthday & Private Parties",
      description: "Celebrate milestones with style. From baby showers to milestone birthdays.",
      Icon: Cake
    },
    {
      title: "Engagement / Housewarming",
      description: "Announce your engagement or new home with a stunning digital invitation.",
      Icon: Home
    },
    {
      title: "Corporate Events",
      description: "Professional invitations for company gatherings, product launches, and corporate celebrations.",
      Icon: Briefcase
    },
    {
      title: "Graduation Ceremonies",
      description: "Mark academic achievements with memorable invitations for graduation parties and celebrations.",
      Icon: GraduationCap
    },
    {
      title: "Special Occasions",
      description: "From anniversaries to retirement parties, create custom invitations for any celebration.",
      Icon: Gift
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      style={{ 
        backgroundColor: '#FFD9C7',
        background: 'linear-gradient(180deg, rgba(224, 122, 102, 0.25) 0%, #FFCDB5 20%, #FFD9C7 50%, rgba(255, 200, 180, 0.3) 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)' }}
          >
            Our Services
          </motion.h2>
          <motion.p
            ref={subtitleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={subtitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-body)' }}
          >
            Whatever your occasion, we craft invitation websites that impress.
          </motion.p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.Icon;
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
                className="rounded-lg p-6 sm:p-8 backdrop-blur-sm cursor-pointer"
                style={{
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
                    size={32}
                    strokeWidth={1.5}
                    style={{ color: 'var(--btn-primary)' }}
                  />
                </motion.div>
                <h3 
                  className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3"
                  style={{ 
                    fontFamily: 'var(--font-heading)', 
                    color: 'var(--text-heading)' 
                  }}
                >
                  {service.title}
                </h3>
                <p 
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: 'var(--text-body)' }}
                >
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
