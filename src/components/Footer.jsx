'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, Phone, Instagram, Facebook, Twitter, Heart, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { amount: 0.1, once: true });

  const socialLinks = [
    { name: 'Instagram', Icon: Instagram, href: '#' },
    { name: 'Facebook', Icon: Facebook, href: '#' },
    { name: 'Twitter', Icon: Twitter, href: '#' }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Process', href: '#process' }
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      style={{ 
        background: 'linear-gradient(180deg, #FFD9C7 0%, rgba(255, 205, 181, 0.95) 40%, rgba(255, 177, 153, 0.4) 100%)',
        borderTop: '1px solid rgba(138, 107, 99, 0.15)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
          {/* Brand Section */}
          <motion.div 
            className="sm:col-span-2 lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h3 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4"
              style={{ 
                fontFamily: 'var(--font-heading)', 
                color: 'var(--text-heading)' 
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              Celebrate
            </motion.h3>
            <p 
              className="text-sm sm:text-base lg:text-lg leading-relaxed mb-5 sm:mb-6 max-w-md"
              style={{ 
                fontFamily: 'var(--font-body)', 
                color: 'var(--text-body)' 
              }}
            >
              Making every celebration unforgettable with beautifully crafted digital invitations.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2.5 sm:gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.Icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={footerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.2 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ 
                      y: -4,
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: 'rgba(245, 230, 220, 0.7)',
                      border: '1px solid rgba(255, 177, 153, 0.3)',
                      boxShadow: '0 2px 8px rgba(90, 74, 69, 0.06)'
                    }}
                    aria-label={social.name}
                  >
                    <Icon 
                      size={18}
                      className="sm:w-5 sm:h-5"
                      strokeWidth={1.8}
                      style={{ color: 'var(--btn-primary)' }}
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 
              className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-5"
              style={{ 
                fontFamily: 'var(--font-heading)', 
                color: 'var(--text-heading)' 
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={footerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.2 + index * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <motion.a
                    href={link.href}
                    className="text-sm sm:text-base lg:text-lg inline-block"
                    style={{ 
                      fontFamily: 'var(--font-body)', 
                      color: 'var(--text-body)' 
                    }}
                    whileHover={{ 
                      x: 4,
                      color: 'var(--text-heading)',
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 
              className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-5"
              style={{ 
                fontFamily: 'var(--font-heading)', 
                color: 'var(--text-heading)' 
              }}
            >
              Get in Touch
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <motion.li 
                className="flex items-start gap-2.5 sm:gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={footerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="mt-0.5 flex-shrink-0"
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                >
                  <Mail 
                    size={18}
                    className="sm:w-5 sm:h-5"
                    strokeWidth={1.8}
                    style={{ color: 'var(--btn-primary)' }}
                  />
                </motion.div>
                <motion.a 
                  href="mailto:hello@celebrate.com" 
                  className="text-sm sm:text-base lg:text-lg break-all"
                  style={{ 
                    fontFamily: 'var(--font-body)', 
                    color: 'var(--text-body)' 
                  }}
                  whileHover={{ 
                    color: 'var(--text-heading)',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  hello@celebrate.com
                </motion.a>
              </motion.li>
              <motion.li 
                className="flex items-start gap-2.5 sm:gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={footerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="mt-0.5 flex-shrink-0"
                  whileHover={{ rotate: [0, 10, -10, 0], transition: { duration: 0.4 } }}
                >
                  <Phone 
                    size={18}
                    className="sm:w-5 sm:h-5"
                    strokeWidth={1.8}
                    style={{ color: 'var(--btn-primary)' }}
                  />
                </motion.div>
                <motion.a 
                  href="tel:+1234567890" 
                  className="text-sm sm:text-base lg:text-lg"
                  style={{ 
                    fontFamily: 'var(--font-body)', 
                    color: 'var(--text-body)' 
                  }}
                  whileHover={{ 
                    color: 'var(--text-heading)',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                 +91 9148505291
                </motion.a>
              </motion.li>
              <motion.li 
                className="flex items-start gap-2.5 sm:gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={footerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="mt-0.5 flex-shrink-0"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                  <MapPin 
                    size={18}
                    className="sm:w-5 sm:h-5"
                    strokeWidth={1.8}
                    style={{ color: 'var(--btn-primary)' }}
                  />
                </motion.div>
                <p 
                  className="text-sm sm:text-base lg:text-lg"
                  style={{ 
                    fontFamily: 'var(--font-body)', 
                    color: 'var(--text-body)' 
                  }}
                >
                  Prashanth Nagar, Chikkaballapur
                </p>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-6 sm:pt-8 mt-6 sm:mt-8 text-center"
          style={{ 
            borderTop: '1px solid rgba(138, 107, 99, 0.15)'
          }}
          initial={{ opacity: 0 }}
          animate={footerInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p 
            className="text-xs sm:text-sm lg:text-base flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap px-4"
            style={{ 
              fontFamily: 'var(--font-body)', 
              color: 'var(--text-body)' 
            }}
          >
            <span>© {currentYear} Celebrate.</span>
            <span className="hidden sm:inline">Made with</span>
            <motion.span
              className="hidden sm:inline"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart 
                size={14}
                className="sm:w-4 sm:h-4"
                fill="var(--btn-primary)"
                style={{ color: 'var(--btn-primary)' }}
              />
            </motion.span>
            <span className="hidden sm:inline">for unforgettable celebrations.</span>
            <span className="sm:hidden">All rights reserved.</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
