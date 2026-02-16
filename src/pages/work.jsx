'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Folder, FolderContent } from '@/components/ui/folder';

export default function Work() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  
  const headingInView = useInView(headingRef, { amount: 0.3 });
  const subtitleInView = useInView(subtitleRef, { amount: 0.3 });

  const projects = [
    {
      title: "Elegant Wedding",
      client: "Sarah & Michael",
      color: "#FFB199",
      tabColor: "#E07A66"
    },
    {
      title: "Birthday Bash",
      client: "Emma's 30th",
      color: "#FFB199",
      tabColor: "#E07A66"
    },
    {
      title: "Corporate Gala",
      client: "Tech Summit 2026",
      color: "#FFB199",
      tabColor: "#E07A66"
    },
    {
      title: "Graduation Party",
      client: "Class of 2026",
      color: "#FFB199",
      tabColor: "#E07A66"
    },
    {
      title: "Engagement",
      client: "Alex & Jordan",
      color: "#FFB199",
      tabColor: "#E07A66"
    },
    {
      title: "Anniversary",
      client: "25 Years Together",
      color: "#FFB199",
      tabColor: "#E07A66"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-20 sm:py-24 px-6 sm:px-8 lg:px-12 flex flex-col"
      style={{ 
        backgroundColor: '#F5E6DC',
        background: 'linear-gradient(180deg, rgba(255, 217, 199, 0.4) 0%, #F5E6DC 15%, rgba(245, 230, 220, 0.95) 85%, rgba(255, 217, 199, 0.2) 100%)'
      }}
    >
      <div className="w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.h2
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)' }}
          >
            Our Work
          </motion.h2>
          <motion.p
            ref={subtitleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={subtitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-body)' }}
          >
            A glimpse into the invitations we've crafted with love.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-16 sm:gap-y-20 lg:gap-y-24 gap-x-8 sm:gap-x-12 lg:gap-x-16 flex-1 content-center max-w-6xl mx-auto w-full">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="flex flex-col items-center justify-center"
            >
              <Folder 
                color={project.color} 
                tabColor={project.tabColor}
                size="xxs"
                className="lg:hidden"
              >
                <FolderContent>
                  <div className="text-center px-1">
                    <h3 
                      className="text-xs font-semibold mb-0.5"
                      style={{ 
                        fontFamily: 'var(--font-heading)', 
                        color: 'var(--text-heading)' 
                      }}
                    >
                      {project.title}
                    </h3>
                    <p 
                      className="text-[10px]"
                      style={{ color: 'var(--text-body)' }}
                    >
                      {project.client}
                    </p>
                  </div>
                </FolderContent>
              </Folder>
              <Folder 
                color={project.color} 
                tabColor={project.tabColor}
                size="xs"
                className="hidden lg:block"
              >
                <FolderContent>
                  <div className="text-center px-2">
                    <h3 
                      className="text-sm sm:text-base font-semibold mb-1"
                      style={{ 
                        fontFamily: 'var(--font-heading)', 
                        color: 'var(--text-heading)' 
                      }}
                    >
                      {project.title}
                    </h3>
                    <p 
                      className="text-xs sm:text-sm"
                      style={{ color: 'var(--text-body)' }}
                    >
                      {project.client}
                    </p>
                  </div>
                </FolderContent>
              </Folder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
