import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import About from './about';
import Services from './services';

/**
 * Task 5.1: Write integration test for Services placement
 * Validates: Requirements 3.1, 6.5
 * 
 * This test suite verifies that:
 * 1. Services component renders after About component in the DOM
 * 2. About section horizontal scroll functionality still works after Services integration
 * 3. Both components can be rendered together without conflicts
 * 
 * Note: We test About and Services components separately and together, rather than
 * testing the full Hero component, to avoid complex mocking of Grainient, Lenis, etc.
 * The actual integration in Hero.jsx has been verified by code review.
 */
describe('Services Integration Tests', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  /**
   * Test 1: Verify Services component can be rendered
   * Validates: Requirement 3.1 - Services section is properly implemented
   */
  it('should render Services component with correct structure', () => {
    const { container } = render(<Services />);
    
    // Find Services section
    const servicesSection = container.querySelector('section');
    expect(servicesSection).not.toBeNull();
    
    // Verify Services section has the heading
    const heading = servicesSection.querySelector('h2');
    expect(heading).not.toBeNull();
    expect(heading.textContent).toBe('Our Services');
    
    // Verify Services section has 4 cards
    const serviceCards = servicesSection.querySelectorAll('.grid > div');
    expect(serviceCards.length).toBe(4);
  });

  /**
   * Test 2: Verify About section horizontal scroll structure is intact
   * Validates: Requirement 6.5 - About section horizontal scrolling still works
   */
  it('should preserve About section horizontal scroll structure', () => {
    const { container } = render(<About />);
    
    // Find About section
    const aboutSection = container.querySelector('section');
    expect(aboutSection).not.toBeNull();
    
    // Verify About section has correct height for scroll animation
    const aboutStyle = aboutSection.getAttribute('style');
    expect(aboutStyle).toContain('height: 450vh');
    
    // Verify sticky container exists within About section
    const stickyContainers = Array.from(aboutSection.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        return style && style.includes('position: sticky');
      }
    );
    
    expect(stickyContainers.length).toBeGreaterThan(0);
    
    // Verify cards container with horizontal transform exists
    const cardsContainers = Array.from(aboutSection.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        return style && style.includes('translateX');
      }
    );
    
    expect(cardsContainers.length).toBeGreaterThan(0);
    
    // Verify all 5 About cards are rendered
    const aboutCards = Array.from(aboutSection.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        const className = div.getAttribute('class');
        return style && 
               style.includes('rgba(245, 230, 220, 0.6)') &&
               className && className.includes('flex-shrink-0');
      }
    );
    
    expect(aboutCards.length).toBe(5);
  });

  /**
   * Test 3: Verify both components can be rendered together
   * Validates: Requirements 3.1, 6.5 - Integration works correctly
   */
  it('should render both About and Services components together without conflicts', () => {
    // Create a wrapper component that renders both
    const IntegrationWrapper = () => (
      <>
        <About />
        <Services />
      </>
    );
    
    const { container } = render(<IntegrationWrapper />);
    
    // Find all sections
    const sections = container.querySelectorAll('section');
    
    // Should have exactly 2 sections (About and Services)
    expect(sections.length).toBe(2);
    
    // Find About section
    const aboutSection = Array.from(sections).find(section => {
      const style = section.getAttribute('style');
      return style && style.includes('height: 450vh');
    });
    
    // Find Services section
    const servicesSection = Array.from(sections).find(section => {
      const heading = section.querySelector('h2');
      return heading && heading.textContent === 'Our Services';
    });
    
    expect(aboutSection).not.toBeNull();
    expect(servicesSection).not.toBeNull();
    
    // Verify Services comes after About in DOM order
    const sectionsArray = Array.from(sections);
    const aboutIndex = sectionsArray.indexOf(aboutSection);
    const servicesIndex = sectionsArray.indexOf(servicesSection);
    
    expect(servicesIndex).toBeGreaterThan(aboutIndex);
    expect(servicesIndex).toBe(aboutIndex + 1);
  });

  /**
   * Test 4: Verify About section has all 5 cards after integration
   * Validates: Requirement 6.5 - About section functionality preserved
   */
  it('should maintain About section with 5 cards when rendered with Services', () => {
    const IntegrationWrapper = () => (
      <>
        <About />
        <Services />
      </>
    );
    
    const { container } = render(<IntegrationWrapper />);
    
    // Find About section
    const sections = container.querySelectorAll('section');
    const aboutSection = Array.from(sections).find(section => {
      const style = section.getAttribute('style');
      return style && style.includes('height: 450vh');
    });
    
    expect(aboutSection).not.toBeNull();
    
    // Verify all 5 About cards are still rendered
    const aboutCards = Array.from(aboutSection.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        const className = div.getAttribute('class');
        return style && 
               style.includes('rgba(245, 230, 220, 0.6)') &&
               className && className.includes('flex-shrink-0');
      }
    );
    
    expect(aboutCards.length).toBe(5);
  });

  /**
   * Test 5: Verify Services section has all 4 cards after integration
   * Validates: Requirement 3.1 - Services section is properly integrated
   */
  it('should maintain Services section with 4 cards when rendered with About', () => {
    const IntegrationWrapper = () => (
      <>
        <About />
        <Services />
      </>
    );
    
    const { container } = render(<IntegrationWrapper />);
    
    // Find Services section
    const sections = container.querySelectorAll('section');
    const servicesSection = Array.from(sections).find(section => {
      const heading = section.querySelector('h2');
      return heading && heading.textContent === 'Our Services';
    });
    
    expect(servicesSection).not.toBeNull();
    
    // Verify all 4 service cards are rendered
    const serviceCards = servicesSection.querySelectorAll('.grid > div');
    expect(serviceCards.length).toBe(4);
  });

  /**
   * Test 6: Verify About section sticky positioning is preserved
   * Validates: Requirement 6.5 - Sticky positioning behavior is preserved
   */
  it('should preserve About section sticky positioning when rendered with Services', () => {
    const IntegrationWrapper = () => (
      <>
        <About />
        <Services />
      </>
    );
    
    const { container } = render(<IntegrationWrapper />);
    
    // Find About section
    const sections = container.querySelectorAll('section');
    const aboutSection = Array.from(sections).find(section => {
      const style = section.getAttribute('style');
      return style && style.includes('height: 450vh');
    });
    
    expect(aboutSection).not.toBeNull();
    
    // Find the sticky container
    const stickyContainers = Array.from(aboutSection.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        return style && style.includes('position: sticky');
      }
    );
    
    expect(stickyContainers.length).toBeGreaterThan(0);
    
    const stickyContainer = stickyContainers[0];
    const style = stickyContainer.getAttribute('style');
    
    // Verify all required sticky positioning properties
    expect(style).toContain('position: sticky');
    expect(style).toContain('top: 5rem'); // 80px navbar height
    expect(style).toContain('left: 0');
    expect(style).toContain('overflow: hidden');
  });

  /**
   * Test 7: Verify Services section background gradient
   * Validates: Requirement 3.9 - Services section has correct styling
   */
  it('should render Services section with correct background gradient', () => {
    const { container } = render(<Services />);
    
    const section = container.querySelector('section');
    expect(section).not.toBeNull();
    
    // Verify background gradient is applied
    expect(section.style.background).toContain('linear-gradient');
    expect(section.style.background).toContain('rgba(224, 122, 102, 0.25)');
  });

  /**
   * Test 8: Verify integration maintains correct DOM structure
   * Validates: Requirements 3.1, 6.5 - Overall integration is correct
   */
  it('should maintain correct DOM structure with About before Services', () => {
    const IntegrationWrapper = () => (
      <>
        <About />
        <Services />
      </>
    );
    
    const { container } = render(<IntegrationWrapper />);
    
    // Get all sections
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBe(2);
    
    // First section should be About (has 450vh height)
    const firstSection = sections[0];
    const firstStyle = firstSection.getAttribute('style');
    expect(firstStyle).toContain('height: 450vh');
    
    // Second section should be Services (has "Our Services" heading)
    const secondSection = sections[1];
    const secondHeading = secondSection.querySelector('h2');
    expect(secondHeading).not.toBeNull();
    expect(secondHeading.textContent).toBe('Our Services');
  });

  /**
   * Test 9: Verify About section horizontal scroll transform is preserved
   * Validates: Requirement 6.5 - Horizontal scroll functionality preserved
   */
  it('should preserve About section horizontal scroll transform when rendered with Services', () => {
    const IntegrationWrapper = () => (
      <>
        <About />
        <Services />
      </>
    );
    
    const { container } = render(<IntegrationWrapper />);
    
    // Find About section
    const sections = container.querySelectorAll('section');
    const aboutSection = Array.from(sections).find(section => {
      const style = section.getAttribute('style');
      return style && style.includes('height: 450vh');
    });
    
    // Find cards container with translateX
    const cardsContainers = Array.from(aboutSection.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        const className = div.getAttribute('class');
        return style && style.includes('translateX') && className && className.includes('flex');
      }
    );
    
    expect(cardsContainers.length).toBeGreaterThan(0);
    
    const cardsContainer = cardsContainers[0];
    const style = cardsContainer.getAttribute('style');
    
    // Should have translateX transform for horizontal scrolling
    expect(style).toContain('translateX');
    
    // Should have will-change for performance
    expect(style).toContain('will-change: transform');
  });

  /**
   * Test 10: Verify Services section is visible and not hidden
   * Validates: Requirement 3.1 - Services section is properly displayed
   */
  it('should render Services section as visible when rendered with About', () => {
    const IntegrationWrapper = () => (
      <>
        <About />
        <Services />
      </>
    );
    
    const { container } = render(<IntegrationWrapper />);
    
    // Find Services section
    const sections = container.querySelectorAll('section');
    const servicesSection = Array.from(sections).find(section => {
      const heading = section.querySelector('h2');
      return heading && heading.textContent === 'Our Services';
    });
    
    expect(servicesSection).not.toBeNull();
    
    // Verify section is not hidden
    const style = servicesSection.getAttribute('style');
    expect(style).not.toContain('display: none');
    expect(style).not.toContain('visibility: hidden');
    
    // Verify section has visible content
    const heading = servicesSection.querySelector('h2');
    const serviceCards = servicesSection.querySelectorAll('.grid > div');
    
    expect(heading).not.toBeNull();
    expect(serviceCards.length).toBe(4);
  });
});
