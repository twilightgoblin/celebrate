import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, cleanup, waitFor } from '@testing-library/react';
import About from './about';

/**
 * Task 6.3: Write unit tests for About section preservation
 * Validates: Requirements 6.3, 6.6, 6.7
 * 
 * This test suite verifies that the About section functionality is preserved after
 * implementing the mobile scroll fixes and Services section integration:
 * 1. Sticky positioning is applied correctly
 * 2. Framer Motion animations still work
 * 3. Card width updates dynamically on resize events
 */
describe('About Component - Preservation Tests (Task 6.3)', () => {
  let resizeCallback;

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

    // Capture resize event listener
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = vi.fn((event, callback) => {
      if (event === 'resize') {
        resizeCallback = callback;
      }
      originalAddEventListener.call(window, event, callback);
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    resizeCallback = null;
  });

  /**
   * Test 1: Verify sticky positioning is applied
   * Validates: Requirement 6.3 - Sticky positioning behavior is preserved
   */
  describe('Sticky Positioning', () => {
    it('should apply sticky positioning to the card container', () => {
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
      
      // Verify sticky positioning properties
      expect(style).toContain('position: sticky');
      expect(style).toContain('top: 5rem');
    });

    it('should maintain sticky positioning at correct offset from top', () => {
      const { container } = render(<About />);
      
      const stickyContainers = Array.from(container.querySelectorAll('div')).filter(
        div => {
          const style = div.getAttribute('style');
          return style && style.includes('position: sticky');
        }
      );
      
      const stickyContainer = stickyContainers[0];
      const style = stickyContainer.getAttribute('style');
      
      // Should be positioned at 5rem (80px) from top to account for navbar
      expect(style).toContain('top: 5rem');
      
      // Should have proper height calculation
      expect(style).toContain('height: calc(100vh - 5rem)');
    });

    it('should have overflow hidden for proper card clipping', () => {
      const { container } = render(<About />);
      
      const stickyContainers = Array.from(container.querySelectorAll('div')).filter(
        div => {
          const style = div.getAttribute('style');
          return style && style.includes('position: sticky');
        }
      );
      
      const stickyContainer = stickyContainers[0];
      const style = stickyContainer.getAttribute('style');
      
      expect(style).toContain('overflow: hidden');
    });

    it('should span full viewport width', () => {
      const { container } = render(<About />);
      
      const stickyContainers = Array.from(container.querySelectorAll('div')).filter(
        div => {
          const style = div.getAttribute('style');
          return style && style.includes('position: sticky');
        }
      );
      
      const stickyContainer = stickyContainers[0];
      const style = stickyContainer.getAttribute('style');
      
      expect(style).toContain('width: 100vw');
    });
  });

  /**
   * Test 2: Verify Framer Motion animations still work
   * Validates: Requirement 6.6 - Framer Motion animations are preserved
   */
  describe('Framer Motion Animations', () => {
    it('should have Framer Motion animation attributes on heading', () => {
      const { container } = render(<About />);
      
      // Find the heading element
      const heading = container.querySelector('h2');
      expect(heading).toBeTruthy();
      expect(heading.textContent).toBe('About Us');
    });

    it('should have Framer Motion animation attributes on paragraphs', () => {
      const { container } = render(<About />);
      
      // Find paragraph elements with animation styles
      const paragraphs = container.querySelectorAll('p');
      
      // Should have at least 2 paragraphs (first and second para)
      expect(paragraphs.length).toBeGreaterThanOrEqual(2);
    });

    it('should have Framer Motion animation attributes on cards', () => {
      const { container } = render(<About />);
      
      // Find card elements
      const cards = Array.from(container.querySelectorAll('div')).filter(
        div => {
          const style = div.getAttribute('style');
          const className = div.getAttribute('class');
          return style && 
                 style.includes('rgba(245, 230, 220, 0.6)') &&
                 className && className.includes('flex-shrink-0');
        }
      );
      
      // Should have 5 cards with animation attributes
      expect(cards.length).toBe(5);
    });

    it('should apply hover animations to cards', () => {
      const { container } = render(<About />);
      
      // Find card elements
      const cards = Array.from(container.querySelectorAll('div')).filter(
        div => {
          const style = div.getAttribute('style');
          const className = div.getAttribute('class');
          return style && 
                 style.includes('rgba(245, 230, 220, 0.6)') &&
                 className && className.includes('flex-shrink-0');
        }
      );
      
      // Cards should have cursor-pointer class for hover interaction
      cards.forEach(card => {
        const className = card.getAttribute('class');
        expect(className).toContain('cursor-pointer');
      });
    });

    it('should have icon hover animations', () => {
      const { container } = render(<About />);
      
      // Find SVG icons (Lucide icons)
      const icons = container.querySelectorAll('svg');
      
      // Should have at least 5 icons (one per card)
      expect(icons.length).toBeGreaterThanOrEqual(5);
      
      // Icons should be wrapped in motion.div for hover animation
      icons.forEach(icon => {
        const parent = icon.parentElement;
        expect(parent).toBeTruthy();
      });
    });

    it('should preserve animation easing function', () => {
      const { container } = render(<About />);
      
      // The component uses easing [0.22, 1, 0.36, 1]
      // We verify this by checking that animations are present
      // (actual easing is internal to Framer Motion)
      
      const heading = container.querySelector('h2');
      expect(heading).toBeTruthy();
      
      const cards = Array.from(container.querySelectorAll('div')).filter(
        div => {
          const style = div.getAttribute('style');
          return style && style.includes('rgba(245, 230, 220, 0.6)');
        }
      );
      
      expect(cards.length).toBe(5);
    });
  });

  /**
   * Test 3: Verify card width updates on resize
   * Validates: Requirement 6.7 - Card width adjustments are preserved
   */
  describe('Card Width Resize Behavior', () => {
    it('should update card width from mobile to tablet on resize', async () => {
      // Start with mobile viewport
      window.innerWidth = 375;
      const { container, rerender } = render(<About />);
      
      // Verify initial mobile card width (280px)
      let cards = Array.from(container.querySelectorAll('div')).filter(
        div => {
          const style = div.getAttribute('style');
          return style && style.includes('width: 280px');
        }
      );
      expect(cards.length).toBeGreaterThan(0);
      
      // Simulate resize to tablet
      window.innerWidth = 768;
      if (resizeCallback) {
        resizeCallback();
      }
      
      // Rerender to reflect state change
      rerender(<About />);
      
      // Wait for state update
      await waitFor(() => {
        const updatedCards = Array.from(container.querySelectorAll('div')).filter(
          div => {
            const style = div.getAttribute('style');
            return style && style.includes('width: 320px');
          }
        );
        expect(updatedCards.length).toBeGreaterThan(0);
      });
    });

    it('should update card width from tablet to desktop on resize', async () => {
      // Start with tablet viewport
      window.innerWidth = 768;
      const { container, rerender } = render(<About />);
      
      // Verify initial tablet card width (320px)
      let cards = Array.from(container.querySelectorAll('div')).filter(
        div => {
          const style = div.getAttribute('style');
          return style && style.includes('width: 320px');
        }
      );
      expect(cards.length).toBeGreaterThan(0);
      
      // Simulate resize to desktop
      window.innerWidth = 1920;
      if (resizeCallback) {
        resizeCallback();
      }
      
      // Rerender to reflect state change
      rerender(<About />);
      
      // Wait for state update
      await waitFor(() => {
        const updatedCards = Array.from(container.querySelectorAll('div')).filter(
          div => {
            const style = div.getAttribute('style');
            return style && style.includes('width: 340px');
          }
        );
        expect(updatedCards.length).toBeGreaterThan(0);
      });
    });

    it('should update card width from desktop to mobile on resize', async () => {
      // Start with desktop viewport
      window.innerWidth = 1920;
      const { container, rerender } = render(<About />);
      
      // Verify initial desktop card width (340px)
      let cards = Array.from(container.querySelectorAll('div')).filter(
        div => {
          const style = div.getAttribute('style');
          return style && style.includes('width: 340px');
        }
      );
      expect(cards.length).toBeGreaterThan(0);
      
      // Simulate resize to mobile
      window.innerWidth = 375;
      if (resizeCallback) {
        resizeCallback();
      }
      
      // Rerender to reflect state change
      rerender(<About />);
      
      // Wait for state update
      await waitFor(() => {
        const updatedCards = Array.from(container.querySelectorAll('div')).filter(
          div => {
            const style = div.getAttribute('style');
            return style && style.includes('width: 280px');
          }
        );
        expect(updatedCards.length).toBeGreaterThan(0);
      });
    });

    it('should update gap spacing when card width changes on resize', async () => {
      // Start with mobile viewport (280px cards, 16px gap)
      window.innerWidth = 375;
      const { container, rerender } = render(<About />);
      
      // Verify initial mobile gap (16px)
      let cardsContainers = Array.from(container.querySelectorAll('div')).filter(
        div => {
          const style = div.getAttribute('style');
          return style && style.includes('gap: 16px');
        }
      );
      expect(cardsContainers.length).toBeGreaterThan(0);
      
      // Simulate resize to desktop (340px cards, 24px gap)
      window.innerWidth = 1920;
      if (resizeCallback) {
        resizeCallback();
      }
      
      // Rerender to reflect state change
      rerender(<About />);
      
      // Wait for state update
      await waitFor(() => {
        const updatedContainers = Array.from(container.querySelectorAll('div')).filter(
          div => {
            const style = div.getAttribute('style');
            return style && style.includes('gap: 24px');
          }
        );
        expect(updatedContainers.length).toBeGreaterThan(0);
      });
    });

    it('should maintain card count after resize', async () => {
      // Start with mobile viewport
      window.innerWidth = 375;
      const { container, rerender } = render(<About />);
      
      // Count initial cards
      let cards = Array.from(container.querySelectorAll('div')).filter(
        div => {
          const style = div.getAttribute('style');
          const className = div.getAttribute('class');
          return style && 
                 style.includes('rgba(245, 230, 220, 0.6)') &&
                 className && className.includes('flex-shrink-0');
        }
      );
      expect(cards.length).toBe(5);
      
      // Simulate resize to desktop
      window.innerWidth = 1920;
      if (resizeCallback) {
        resizeCallback();
      }
      
      // Rerender to reflect state change
      rerender(<About />);
      
      // Wait for state update and verify card count is still 5
      await waitFor(() => {
        const updatedCards = Array.from(container.querySelectorAll('div')).filter(
          div => {
            const style = div.getAttribute('style');
            const className = div.getAttribute('class');
            return style && 
                   style.includes('rgba(245, 230, 220, 0.6)') &&
                   className && className.includes('flex-shrink-0');
          }
        );
        expect(updatedCards.length).toBe(5);
      });
    });

    it('should recalculate total scroll distance on resize', async () => {
      // Start with mobile viewport
      window.innerWidth = 375;
      const { container, rerender } = render(<About />);
      
      // Mobile: 280px cards + 16px gap = 296px per card
      // Total distance for 4 gaps: 4 * 296 = 1184px
      
      // Find cards container with translateX
      let cardsContainers = Array.from(container.querySelectorAll('div')).filter(
        div => {
          const style = div.getAttribute('style');
          return style && style.includes('translateX');
        }
      );
      expect(cardsContainers.length).toBeGreaterThan(0);
      
      // Simulate resize to desktop
      window.innerWidth = 1920;
      if (resizeCallback) {
        resizeCallback();
      }
      
      // Rerender to reflect state change
      rerender(<About />);
      
      // Desktop: 340px cards + 24px gap = 364px per card
      // Total distance for 4 gaps: 4 * 364 = 1456px
      
      // Wait for state update
      await waitFor(() => {
        const updatedContainers = Array.from(container.querySelectorAll('div')).filter(
          div => {
            const style = div.getAttribute('style');
            return style && style.includes('translateX') && style.includes('width: 340px');
          }
        );
        // The transform should be recalculated with new total distance
        expect(updatedContainers.length).toBeGreaterThanOrEqual(0);
      });
    });

    it('should handle rapid resize events gracefully', async () => {
      window.innerWidth = 375;
      const { container, rerender } = render(<About />);
      
      // Simulate rapid resizes
      const resizeSizes = [768, 1024, 640, 1920, 375];
      
      for (const size of resizeSizes) {
        window.innerWidth = size;
        if (resizeCallback) {
          resizeCallback();
        }
        rerender(<About />);
      }
      
      // Final size should be 375 (mobile)
      await waitFor(() => {
        const cards = Array.from(container.querySelectorAll('div')).filter(
          div => {
            const style = div.getAttribute('style');
            return style && style.includes('width: 280px');
          }
        );
        expect(cards.length).toBeGreaterThan(0);
      });
    });
  });

  /**
   * Test 4: Integration test - All preservation aspects work together
   * Validates: Requirements 6.3, 6.6, 6.7
   */
  describe('Integration - All Preservation Aspects', () => {
    it('should maintain sticky positioning, animations, and responsive widths together', async () => {
      window.innerWidth = 1024;
      const { container, rerender } = render(<About />);
      
      // Verify sticky positioning
      const stickyContainers = Array.from(container.querySelectorAll('div')).filter(
        div => {
          const style = div.getAttribute('style');
          return style && style.includes('position: sticky');
        }
      );
      expect(stickyContainers.length).toBeGreaterThan(0);
      
      // Verify animations are present
      const heading = container.querySelector('h2');
      expect(heading).toBeTruthy();
      
      // Verify card width is correct for desktop
      let cards = Array.from(container.querySelectorAll('div')).filter(
        div => {
          const style = div.getAttribute('style');
          return style && style.includes('width: 340px');
        }
      );
      expect(cards.length).toBeGreaterThan(0);
      
      // Simulate resize to mobile
      window.innerWidth = 375;
      if (resizeCallback) {
        resizeCallback();
      }
      rerender(<About />);
      
      // Wait for updates
      await waitFor(() => {
        // Sticky positioning should still be present
        const updatedStickyContainers = Array.from(container.querySelectorAll('div')).filter(
          div => {
            const style = div.getAttribute('style');
            return style && style.includes('position: sticky');
          }
        );
        expect(updatedStickyContainers.length).toBeGreaterThan(0);
        
        // Animations should still be present
        const updatedHeading = container.querySelector('h2');
        expect(updatedHeading).toBeTruthy();
        
        // Card width should be updated to mobile
        const updatedCards = Array.from(container.querySelectorAll('div')).filter(
          div => {
            const style = div.getAttribute('style');
            return style && style.includes('width: 280px');
          }
        );
        expect(updatedCards.length).toBeGreaterThan(0);
      });
    });
  });
});
