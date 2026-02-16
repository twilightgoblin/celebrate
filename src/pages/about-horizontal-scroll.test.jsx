import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import About from './about';

/**
 * Task 6.1: Test About section horizontal scrolling
 * Validates: Requirements 6.3, 6.5
 * 
 * This test suite verifies that:
 * 1. The horizontal scrolling functionality is working correctly
 * 2. Sticky positioning is properly applied
 * 3. The Services component integration hasn't broken the About section functionality
 */
describe('About Component - Horizontal Scrolling and Sticky Positioning', () => {
  beforeEach(() => {
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });

    // Mock getBoundingClientRect for refs
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      top: 100,
      bottom: 200,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  /**
   * Test 1: Verify horizontal scrolling container exists and has correct structure
   * Validates: Requirement 6.5 - About section horizontal scrolling functionality
   */
  it('should render horizontal scrolling container with correct structure', () => {
    const { container } = render(<About />);
    
    // Find the sticky container (should have position: sticky)
    const stickyContainers = Array.from(container.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        return style && style.includes('position: sticky');
      }
    );
    
    expect(stickyContainers.length).toBeGreaterThan(0);
    
    // Verify the sticky container has the correct positioning
    const stickyContainer = stickyContainers[0];
    const style = stickyContainer.getAttribute('style');
    
    // Should be sticky at top: 5rem (80px for navbar)
    expect(style).toContain('position: sticky');
    expect(style).toContain('top: 5rem');
    
    // Should have overflow hidden to clip cards
    expect(style).toContain('overflow: hidden');
    
    // Should span full viewport width
    expect(style).toContain('width: 100vw');
  });

  /**
   * Test 2: Verify cards container has horizontal scroll transform
   * Validates: Requirement 6.5 - Cards scroll horizontally as expected
   */
  it('should apply horizontal transform to cards container', () => {
    const { container } = render(<About />);
    
    // Find the cards container (has flex display and translateX transform)
    const cardsContainers = Array.from(container.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        const className = div.getAttribute('class');
        return style && style.includes('translateX') && className && className.includes('flex');
      }
    );
    
    expect(cardsContainers.length).toBeGreaterThan(0);
    
    const cardsContainer = cardsContainers[0];
    const style = cardsContainer.getAttribute('style');
    const className = cardsContainer.getAttribute('class');
    
    // Should have translateX transform for horizontal scrolling
    expect(style).toContain('translateX');
    
    // Should have will-change for performance
    expect(style).toContain('will-change: transform');
    
    // Should have transition classes for smooth animation
    expect(className).toContain('transition');
  });

  /**
   * Test 3: Verify all 5 cards are rendered
   * Validates: Requirement 6.5 - All cards are present for horizontal scrolling
   */
  it('should render all 5 feature cards', () => {
    const { container } = render(<About />);
    
    // Count cards by looking for elements with specific card styling
    const cards = Array.from(container.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        const className = div.getAttribute('class');
        return style && 
               style.includes('rgba(245, 230, 220, 0.6)') && // Card background color
               className && className.includes('flex-shrink-0'); // Cards should not shrink
      }
    );
    
    // Should have exactly 5 cards as defined in About component
    expect(cards.length).toBe(5);
  });

  /**
   * Test 4: Verify card widths are responsive
   * Validates: Requirement 6.7 - Card width adjustments are preserved
   */
  it('should apply correct card widths based on viewport', () => {
    // Test mobile viewport
    window.innerWidth = 375;
    const { container: mobileContainer, unmount: unmountMobile } = render(<About />);
    
    let cards = Array.from(mobileContainer.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        return style && style.includes('width: 280px');
      }
    );
    
    expect(cards.length).toBeGreaterThan(0);
    unmountMobile();
    
    // Test tablet viewport
    window.innerWidth = 768;
    const { container: tabletContainer, unmount: unmountTablet } = render(<About />);
    
    cards = Array.from(tabletContainer.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        return style && style.includes('width: 320px');
      }
    );
    
    expect(cards.length).toBeGreaterThan(0);
    unmountTablet();
    
    // Test desktop viewport
    window.innerWidth = 1920;
    const { container: desktopContainer } = render(<About />);
    
    cards = Array.from(desktopContainer.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        return style && style.includes('width: 340px');
      }
    );
    
    expect(cards.length).toBeGreaterThan(0);
  });

  /**
   * Test 5: Verify sticky positioning properties
   * Validates: Requirement 6.3 - Sticky positioning behavior is preserved
   */
  it('should have correct sticky positioning properties', () => {
    const { container } = render(<About />);
    
    // Find the sticky container
    const stickyContainers = Array.from(container.querySelectorAll('div')).filter(
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
    
    // Verify height is viewport-based for proper sticky behavior
    expect(style).toContain('height: calc(100vh - 5rem)');
  });

  /**
   * Test 6: Verify section has correct height for scroll animation
   * Validates: Requirement 6.5 - Section provides enough scroll distance
   */
  it('should have 450vh height for scroll animation', () => {
    const { container } = render(<About />);
    
    // Find the main section element
    const section = container.querySelector('section');
    expect(section).toBeTruthy();
    
    const style = section.getAttribute('style');
    expect(style).toContain('height: 450vh');
  });

  /**
   * Test 7: Verify cards have proper gap spacing
   * Validates: Requirement 6.5 - Cards maintain proper spacing during scroll
   */
  it('should apply correct gap spacing between cards', () => {
    // Test mobile gap (16px)
    window.innerWidth = 375;
    const { container: mobileContainer, unmount: unmountMobile } = render(<About />);
    
    let cardsContainers = Array.from(mobileContainer.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        return style && style.includes('gap: 16px');
      }
    );
    
    expect(cardsContainers.length).toBeGreaterThan(0);
    unmountMobile();
    
    // Test desktop gap (24px)
    window.innerWidth = 1024;
    const { container: desktopContainer } = render(<About />);
    
    cardsContainers = Array.from(desktopContainer.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        return style && style.includes('gap: 24px');
      }
    );
    
    expect(cardsContainers.length).toBeGreaterThan(0);
  });

  /**
   * Test 8: Verify Framer Motion animations are present
   * Validates: Requirement 6.6 - Framer Motion animations are preserved
   */
  it('should have Framer Motion animation attributes on cards', () => {
    const { container } = render(<About />);
    
    // Find elements with Framer Motion data attributes
    const animatedElements = container.querySelectorAll('[style*="opacity"]');
    
    // Should have multiple animated elements (cards, heading, paragraphs)
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  /**
   * Test 9: Verify card icons are rendered with correct styling
   * Validates: Requirement 6.5 - Card content is properly displayed
   */
  it('should render card icons with correct styling', () => {
    const { container } = render(<About />);
    
    // Find SVG elements (Lucide icons render as SVG)
    const icons = container.querySelectorAll('svg');
    
    // Should have at least 5 icons (one per card)
    expect(icons.length).toBeGreaterThanOrEqual(5);
    
    // Verify icons have correct attributes
    icons.forEach(icon => {
      // Lucide icons have specific attributes
      expect(icon.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
    });
  });

  /**
   * Test 10: Verify section background gradient is applied
   * Validates: Requirement 6.5 - Visual styling is preserved
   */
  it('should have gradient background styling', () => {
    const { container } = render(<About />);
    
    const section = container.querySelector('section');
    expect(section).toBeTruthy();
    
    const style = section.getAttribute('style');
    
    // Should have gradient background
    expect(style).toContain('background: linear-gradient');
    expect(style).toContain('rgba');
  });

  /**
   * Test 11: Integration test - Verify About section works after Services integration
   * Validates: Requirement 6.5 - Services component integration hasn't broken About
   */
  it('should maintain functionality after Services component integration', () => {
    const { container } = render(<About />);
    
    // Verify all critical elements are present and functional
    const section = container.querySelector('section');
    expect(section).toBeTruthy();
    
    // Verify sticky container exists
    const stickyContainers = Array.from(container.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        return style && style.includes('position: sticky');
      }
    );
    expect(stickyContainers.length).toBeGreaterThan(0);
    
    // Verify cards container with transform exists
    const cardsContainers = Array.from(container.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        return style && style.includes('translateX');
      }
    );
    expect(cardsContainers.length).toBeGreaterThan(0);
    
    // Verify all 5 cards are rendered
    const cards = Array.from(container.querySelectorAll('div')).filter(
      div => {
        const style = div.getAttribute('style');
        const className = div.getAttribute('class');
        return style && 
               style.includes('rgba(245, 230, 220, 0.6)') &&
               className && className.includes('flex-shrink-0');
      }
    );
    expect(cards.length).toBe(5);
    
    // If all these elements are present and correctly configured,
    // the About section horizontal scrolling is working correctly
  });
});
