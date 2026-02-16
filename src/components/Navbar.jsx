'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Our Work', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`backdrop-blur-md bg-white/20 border border-white/30 shadow-lg transition-all duration-300 md:rounded-full ${
            scrolled ? 'shadow-xl' : ''
          }`}
          style={{
            boxShadow: scrolled
              ? '0 8px 32px rgba(255, 177, 153, 0.15)'
              : '0 4px 16px rgba(255, 177, 153, 0.1)',
            borderRadius: 'calc(var(--radius) + 8px)',
          }}
        >
          <div className="flex items-center justify-between px-8 py-4">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--text-heading)',
              }}
            >
              Celebrate
            </a>

            {/* Nav Links */}
            <ul className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm font-medium hover:opacity-70 transition-opacity relative group"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--text-body)',
                    }}
                  >
                    {item.name}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                      style={{ backgroundColor: 'var(--btn-primary)' }}
                    />
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <a
              href="/contact"
              className="hidden md:block px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: 'var(--btn-primary)',
                color: 'var(--text-heading)',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--btn-hover)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--btn-primary)';
              }}
            >
              Get Started
            </a>

            {/* Mobile Menu Button - Dots */}
            <button
              className="md:hidden p-2 flex flex-col gap-1.5"
              style={{ color: 'var(--text-heading)' }}
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="flex gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: mobileMenuOpen ? 'var(--btn-hover)' : 'var(--btn-primary)',
                    transform: mobileMenuOpen ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: mobileMenuOpen ? 'var(--btn-hover)' : 'var(--btn-primary)',
                    transform: mobileMenuOpen ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
              </div>
              <div className="flex gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: mobileMenuOpen ? 'var(--btn-hover)' : 'var(--btn-primary)',
                    transform: mobileMenuOpen ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: mobileMenuOpen ? 'var(--btn-hover)' : 'var(--btn-primary)',
                    transform: mobileMenuOpen ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-8 pb-6 pt-2">
              <ul className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <li
                    key={item.name}
                    className="transform transition-all duration-300"
                    style={{
                      transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
                      transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-base font-medium hover:opacity-70 transition-opacity block"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: 'var(--text-body)',
                      }}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className="w-full mt-6 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 block text-center"
                style={{
                  backgroundColor: 'var(--btn-primary)',
                  color: 'var(--text-heading)',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--btn-hover)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'var(--btn-primary)';
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
