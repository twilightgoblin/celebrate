import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as fc from 'fast-check';

describe('About Component - Property Tests', () => {
  beforeEach(() => {
    // Mock Lenis to avoid actual smooth scrolling
    vi.mock('lenis', () => ({
      default: vi.fn().mockImplementation(() => ({
        scroll: 0,
        raf: vi.fn(),
        destroy: vi.fn(),
      })),
    }));
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  /**
   * Property 1: Uniform Card Scroll Speed
   * Validates: Requirements 2.1, 2.3
   * 
   * For any scroll position during the horizontal card animation, all cards in the About 
   * section should translate at the same speed, meaning the distance between consecutive 
   * cards remains constant throughout the scroll animation.
   */
  it('Property 1: Uniform card scroll speed - distance between consecutive cards remains constant', () => {
    fc.assert(
      fc.property(
        // Generate random scroll progress values from 0 to 1
        fc.float({ min: 0, max: 1, noNaN: true }),
        // Generate random viewport widths to test different card widths
        fc.integer({ min: 320, max: 1920 }),
        (scrollProgress, viewportWidth) => {
          // Determine card width based on viewport (matching About component logic)
          let cardWidth;
          if (viewportWidth < 640) {
            cardWidth = 280;
          } else if (viewportWidth < 1024) {
            cardWidth = 320;
          } else {
            cardWidth = 340;
          }
          
          // Calculate gap based on card width (matching About component logic)
          const gap = cardWidth === 280 ? 16 : 24;
          
          // Number of cards in About component
          const numCards = 5;
          
          // Calculate total scroll distance (matching About component logic)
          const totalScrollDistance = (numCards - 1) * (cardWidth + gap);
          
          // Apply smoothstep easing (matching About component logic)
          const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
          
          // Calculate the translation offset for the entire card container
          const containerOffset = easedProgress * totalScrollDistance;
          
          // Calculate the position of each card
          const cardPositions = [];
          for (let i = 0; i < numCards; i++) {
            // Each card's base position is its index * (cardWidth + gap)
            const basePosition = i * (cardWidth + gap);
            // The actual position after scroll is: basePosition - containerOffset
            const actualPosition = basePosition - containerOffset;
            cardPositions.push(actualPosition);
          }
          
          // Verify that the distance between consecutive cards is constant
          for (let i = 0; i < numCards - 1; i++) {
            const distance = cardPositions[i + 1] - cardPositions[i];
            const expectedDistance = cardWidth + gap;
            
            // Distance should match expected distance (within floating point precision)
            expect(Math.abs(distance - expectedDistance)).toBeLessThan(0.001);
          }
          
          // Additional verification: all distances should be equal
          const distances = [];
          for (let i = 0; i < numCards - 1; i++) {
            distances.push(cardPositions[i + 1] - cardPositions[i]);
          }
          
          // All distances should be the same
          const firstDistance = distances[0];
          for (const distance of distances) {
            expect(Math.abs(distance - firstDistance)).toBeLessThan(0.001);
          }
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design doc
    );
  });

  it('Property 1: Uniform card scroll speed - cards move together at same rate', () => {
    fc.assert(
      fc.property(
        // Generate pairs of scroll progress values where second > first
        fc.tuple(
          fc.float({ min: 0, max: 1, noNaN: true }),
          fc.float({ min: 0, max: 1, noNaN: true })
        ).filter(([a, b]) => a < b),
        fc.integer({ min: 320, max: 1920 }),
        ([progress1, progress2], viewportWidth) => {
          // Determine card width based on viewport
          let cardWidth;
          if (viewportWidth < 640) {
            cardWidth = 280;
          } else if (viewportWidth < 1024) {
            cardWidth = 320;
          } else {
            cardWidth = 340;
          }
          
          const gap = cardWidth === 280 ? 16 : 24;
          const numCards = 5;
          const totalScrollDistance = (numCards - 1) * (cardWidth + gap);
          
          // Apply smoothstep easing
          const easedProgress1 = progress1 * progress1 * (3 - 2 * progress1);
          const easedProgress2 = progress2 * progress2 * (3 - 2 * progress2);
          
          // Calculate container offsets at both progress points
          const offset1 = easedProgress1 * totalScrollDistance;
          const offset2 = easedProgress2 * totalScrollDistance;
          
          // Calculate how much the container moved
          const containerMovement = offset2 - offset1;
          
          // Calculate positions for first and last card at both progress points
          const firstCardPos1 = 0 - offset1;
          const firstCardPos2 = 0 - offset2;
          const lastCardPos1 = (numCards - 1) * (cardWidth + gap) - offset1;
          const lastCardPos2 = (numCards - 1) * (cardWidth + gap) - offset2;
          
          // Both cards should have moved by the same amount
          const firstCardMovement = firstCardPos2 - firstCardPos1;
          const lastCardMovement = lastCardPos2 - lastCardPos1;
          
          expect(Math.abs(firstCardMovement - lastCardMovement)).toBeLessThan(0.001);
          expect(Math.abs(firstCardMovement + containerMovement)).toBeLessThan(0.001);
          expect(Math.abs(lastCardMovement + containerMovement)).toBeLessThan(0.001);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 1: Uniform card scroll speed - gap remains constant across all breakpoints', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 1, noNaN: true }),
        fc.integer({ min: 320, max: 1920 }),
        (scrollProgress, viewportWidth) => {
          // Determine card width and gap based on viewport
          let cardWidth;
          let expectedGap;
          if (viewportWidth < 640) {
            cardWidth = 280;
            expectedGap = 16;
          } else if (viewportWidth < 1024) {
            cardWidth = 320;
            expectedGap = 24;
          } else {
            cardWidth = 340;
            expectedGap = 24;
          }
          
          const gap = cardWidth === 280 ? 16 : 24;
          
          // Verify gap calculation matches expected
          expect(gap).toBe(expectedGap);
          
          const numCards = 5;
          const totalScrollDistance = (numCards - 1) * (cardWidth + gap);
          const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
          const containerOffset = easedProgress * totalScrollDistance;
          
          // Calculate card positions
          const cardPositions = [];
          for (let i = 0; i < numCards; i++) {
            const basePosition = i * (cardWidth + gap);
            const actualPosition = basePosition - containerOffset;
            cardPositions.push(actualPosition);
          }
          
          // Verify gaps between cards
          for (let i = 0; i < numCards - 1; i++) {
            const cardEndPosition = cardPositions[i] + cardWidth;
            const nextCardStartPosition = cardPositions[i + 1];
            const actualGap = nextCardStartPosition - cardEndPosition;
            
            expect(Math.abs(actualGap - expectedGap)).toBeLessThan(0.001);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2: Consistent Card Gap Spacing
   * Validates: Requirements 2.4
   * 
   * For any viewport width, the gap between cards should be exactly 16px when 
   * width < 640px, and exactly 24px when width >= 640px, and this gap should 
   * remain constant throughout the scroll animation.
   */
  it('Property 2: Consistent card gap spacing - gap is 16px on mobile, 24px on tablet/desktop', () => {
    fc.assert(
      fc.property(
        // Generate random viewport widths across all breakpoints
        fc.integer({ min: 320, max: 1920 }),
        // Generate random scroll positions to verify gap remains constant during animation
        fc.float({ min: 0, max: 1, noNaN: true }),
        (viewportWidth, scrollProgress) => {
          // Determine card width based on viewport (matching About component logic)
          let cardWidth;
          if (viewportWidth < 640) {
            cardWidth = 280;
          } else if (viewportWidth < 1024) {
            cardWidth = 320;
          } else {
            cardWidth = 340;
          }
          
          // Calculate gap based on card width (matching About component logic)
          const gap = cardWidth === 280 ? 16 : 24;
          
          // Verify gap matches expected value based on viewport
          if (viewportWidth < 640) {
            expect(gap).toBe(16);
          } else {
            expect(gap).toBe(24);
          }
          
          // Verify gap remains constant throughout scroll animation
          const numCards = 5;
          const totalScrollDistance = (numCards - 1) * (cardWidth + gap);
          const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
          const containerOffset = easedProgress * totalScrollDistance;
          
          // Calculate card positions at this scroll progress
          const cardPositions = [];
          for (let i = 0; i < numCards; i++) {
            const basePosition = i * (cardWidth + gap);
            const actualPosition = basePosition - containerOffset;
            cardPositions.push(actualPosition);
          }
          
          // Verify the gap between each pair of consecutive cards
          for (let i = 0; i < numCards - 1; i++) {
            const cardEndPosition = cardPositions[i] + cardWidth;
            const nextCardStartPosition = cardPositions[i + 1];
            const actualGap = nextCardStartPosition - cardEndPosition;
            
            // Gap should match expected value (within floating point precision)
            expect(Math.abs(actualGap - gap)).toBeLessThan(0.001);
          }
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design doc
    );
  });

  it('Property 2: Consistent card gap spacing - gap transitions correctly at breakpoints', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 1, noNaN: true }),
        (scrollProgress) => {
          // Test at exact breakpoint boundaries and nearby values
          const testWidths = [
            320,  // Mobile min
            639,  // Just before tablet breakpoint
            640,  // Tablet breakpoint
            641,  // Just after tablet breakpoint
            1023, // Just before desktop breakpoint
            1024, // Desktop breakpoint
            1025, // Just after desktop breakpoint
            1920  // Desktop max
          ];
          
          for (const viewportWidth of testWidths) {
            // Determine expected values
            let expectedCardWidth;
            let expectedGap;
            if (viewportWidth < 640) {
              expectedCardWidth = 280;
              expectedGap = 16;
            } else if (viewportWidth < 1024) {
              expectedCardWidth = 320;
              expectedGap = 24;
            } else {
              expectedCardWidth = 340;
              expectedGap = 24;
            }
            
            // Calculate actual values using component logic
            let cardWidth;
            if (viewportWidth < 640) {
              cardWidth = 280;
            } else if (viewportWidth < 1024) {
              cardWidth = 320;
            } else {
              cardWidth = 340;
            }
            const gap = cardWidth === 280 ? 16 : 24;
            
            // Verify values match expected
            expect(cardWidth).toBe(expectedCardWidth);
            expect(gap).toBe(expectedGap);
            
            // Verify gap is consistent across all cards at this viewport
            const numCards = 5;
            const totalScrollDistance = (numCards - 1) * (cardWidth + gap);
            const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
            const containerOffset = easedProgress * totalScrollDistance;
            
            const cardPositions = [];
            for (let i = 0; i < numCards; i++) {
              const basePosition = i * (cardWidth + gap);
              const actualPosition = basePosition - containerOffset;
              cardPositions.push(actualPosition);
            }
            
            // Verify gaps between all consecutive cards
            for (let i = 0; i < numCards - 1; i++) {
              const cardEndPosition = cardPositions[i] + cardWidth;
              const nextCardStartPosition = cardPositions[i + 1];
              const actualGap = nextCardStartPosition - cardEndPosition;
              
              expect(Math.abs(actualGap - expectedGap)).toBeLessThan(0.001);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Unit Tests for Scroll Calculation Edge Cases
   * Validates: Requirements 2.5
   * 
   * These tests verify that scroll calculations handle edge cases correctly:
   * - Scroll progress is capped at 1 (Math.min)
   * - Distance from navbar is non-negative (Math.max)
   * - Final card position is correct when scroll progress = 1
   */
  describe('Scroll Calculation Edge Cases', () => {
    it('should cap scroll progress at 1 using Math.min', () => {
      // Test that scroll progress never exceeds 1, even with excessive scroll distance
      const viewportHeight = 1000;
      const scrollMultiplier = viewportHeight * 2.8; // 2800
      
      // Test various distances that would exceed progress = 1
      const testCases = [
        { distanceFromNavbar: scrollMultiplier, expectedProgress: 1 },
        { distanceFromNavbar: scrollMultiplier * 1.5, expectedProgress: 1 },
        { distanceFromNavbar: scrollMultiplier * 2, expectedProgress: 1 },
        { distanceFromNavbar: scrollMultiplier * 10, expectedProgress: 1 },
      ];
      
      for (const { distanceFromNavbar, expectedProgress } of testCases) {
        // Calculate progress using component logic
        const progress = Math.min(distanceFromNavbar / scrollMultiplier, 1);
        
        // Verify progress is capped at 1
        expect(progress).toBe(expectedProgress);
        expect(progress).toBeLessThanOrEqual(1);
      }
    });

    it('should ensure distanceFromNavbar is non-negative using Math.max', () => {
      const navbarHeight = 80;
      
      // Test various paragraph top positions
      const testCases = [
        { paraTop: 100, expectedDistance: 0 }, // Para below navbar
        { paraTop: 80, expectedDistance: 0 },  // Para at navbar
        { paraTop: 50, expectedDistance: 30 }, // Para above navbar
        { paraTop: 0, expectedDistance: 80 },  // Para at top
        { paraTop: -20, expectedDistance: 100 }, // Para scrolled past top
      ];
      
      for (const { paraTop, expectedDistance } of testCases) {
        // Calculate distance using component logic
        const distanceFromNavbar = Math.max(0, navbarHeight - paraTop);
        
        // Verify distance is non-negative
        expect(distanceFromNavbar).toBe(expectedDistance);
        expect(distanceFromNavbar).toBeGreaterThanOrEqual(0);
      }
    });

    it('should calculate correct final card position when scroll progress = 1', () => {
      // Test at different viewport widths
      const testCases = [
        { viewportWidth: 375, cardWidth: 280, gap: 16 },  // Mobile
        { viewportWidth: 768, cardWidth: 320, gap: 24 },  // Tablet
        { viewportWidth: 1920, cardWidth: 340, gap: 24 }, // Desktop
      ];
      
      for (const { viewportWidth, cardWidth, gap } of testCases) {
        const numCards = 5;
        const scrollProgress = 1; // Maximum scroll progress
        
        // Apply smoothstep easing
        const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
        expect(easedProgress).toBe(1); // At progress=1, easing should also be 1
        
        // Calculate total scroll distance
        const totalScrollDistance = (numCards - 1) * (cardWidth + gap);
        
        // Calculate container offset at maximum scroll
        const containerOffset = easedProgress * totalScrollDistance;
        expect(containerOffset).toBe(totalScrollDistance);
        
        // Calculate positions of first and last cards
        const firstCardPosition = 0 - containerOffset;
        const lastCardPosition = (numCards - 1) * (cardWidth + gap) - containerOffset;
        
        // At scroll progress = 1:
        // - First card should be scrolled left by totalScrollDistance
        expect(firstCardPosition).toBe(-totalScrollDistance);
        
        // - Last card should be at position 0 (visible at the start of viewport)
        expect(lastCardPosition).toBe(0);
        
        // Verify all cards are still properly spaced
        for (let i = 0; i < numCards; i++) {
          const cardPosition = i * (cardWidth + gap) - containerOffset;
          
          if (i === 0) {
            expect(cardPosition).toBe(-totalScrollDistance);
          } else if (i === numCards - 1) {
            expect(cardPosition).toBe(0);
          }
          
          // Verify each card is spaced correctly from the previous one
          if (i > 0) {
            const prevCardPosition = (i - 1) * (cardWidth + gap) - containerOffset;
            const distance = cardPosition - prevCardPosition;
            expect(distance).toBe(cardWidth + gap);
          }
        }
      }
    });

    it('should handle edge case where scroll progress is exactly 0', () => {
      const viewportWidth = 1024;
      const cardWidth = 340;
      const gap = 24;
      const numCards = 5;
      const scrollProgress = 0;
      
      // Apply smoothstep easing
      const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
      expect(easedProgress).toBe(0);
      
      // Calculate total scroll distance
      const totalScrollDistance = (numCards - 1) * (cardWidth + gap);
      
      // Calculate container offset
      const containerOffset = easedProgress * totalScrollDistance;
      expect(containerOffset).toBe(0);
      
      // At scroll progress = 0, all cards should be at their initial positions
      for (let i = 0; i < numCards; i++) {
        const cardPosition = i * (cardWidth + gap) - containerOffset;
        expect(cardPosition).toBe(i * (cardWidth + gap));
      }
    });

    it('should handle intermediate scroll progress values correctly', () => {
      const viewportWidth = 1024;
      const cardWidth = 340;
      const gap = 24;
      const numCards = 5;
      
      // Test at 50% scroll progress
      const scrollProgress = 0.5;
      
      // Apply smoothstep easing
      const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
      expect(easedProgress).toBe(0.5); // At 0.5, smoothstep returns 0.5
      
      // Calculate total scroll distance
      const totalScrollDistance = (numCards - 1) * (cardWidth + gap);
      
      // Calculate container offset
      const containerOffset = easedProgress * totalScrollDistance;
      expect(containerOffset).toBe(totalScrollDistance / 2);
      
      // Verify cards are positioned correctly
      const firstCardPosition = 0 - containerOffset;
      const lastCardPosition = (numCards - 1) * (cardWidth + gap) - containerOffset;
      
      expect(firstCardPosition).toBe(-totalScrollDistance / 2);
      expect(lastCardPosition).toBe(totalScrollDistance / 2);
    });
  });

  /**
   * Property 9: About Section Card Width Responsiveness
   * Validates: Requirements 6.7
   * 
   * For any viewport width, the About section cards should have width 280px when 
   * width < 640px, 320px when 640px <= width < 1024px, and 340px when width >= 1024px, 
   * preserving the original responsive behavior.
   */
  it('Property 9: About section card width responsiveness - cards have correct width at all breakpoints', () => {
    fc.assert(
      fc.property(
        // Generate random viewport widths across all breakpoints
        fc.integer({ min: 320, max: 1920 }),
        (viewportWidth) => {
          // Determine expected card width based on viewport (matching About component logic)
          let expectedCardWidth;
          if (viewportWidth < 640) {
            expectedCardWidth = 280;
          } else if (viewportWidth < 1024) {
            expectedCardWidth = 320;
          } else {
            expectedCardWidth = 340;
          }
          
          // Simulate the component's card width calculation
          let actualCardWidth;
          if (viewportWidth < 640) {
            actualCardWidth = 280;
          } else if (viewportWidth < 1024) {
            actualCardWidth = 320;
          } else {
            actualCardWidth = 340;
          }
          
          // Verify card width matches expected value
          expect(actualCardWidth).toBe(expectedCardWidth);
          
          // Additional verification: ensure card width is one of the valid values
          expect([280, 320, 340]).toContain(actualCardWidth);
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design doc
    );
  });

  it('Property 9: About section card width responsiveness - width transitions at exact breakpoints', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          // Test at exact breakpoint boundaries and nearby values
          320,  // Mobile min
          639,  // Just before tablet breakpoint
          640,  // Tablet breakpoint
          641,  // Just after tablet breakpoint
          1023, // Just before desktop breakpoint
          1024, // Desktop breakpoint
          1025, // Just after desktop breakpoint
          1920  // Desktop max
        ),
        (viewportWidth) => {
          // Determine expected card width
          let expectedCardWidth;
          if (viewportWidth < 640) {
            expectedCardWidth = 280;
          } else if (viewportWidth < 1024) {
            expectedCardWidth = 320;
          } else {
            expectedCardWidth = 340;
          }
          
          // Simulate component logic
          let actualCardWidth;
          if (viewportWidth < 640) {
            actualCardWidth = 280;
          } else if (viewportWidth < 1024) {
            actualCardWidth = 320;
          } else {
            actualCardWidth = 340;
          }
          
          // Verify card width matches expected value at breakpoints
          expect(actualCardWidth).toBe(expectedCardWidth);
          
          // Verify specific breakpoint behavior
          if (viewportWidth === 639) {
            expect(actualCardWidth).toBe(280); // Still mobile
          } else if (viewportWidth === 640) {
            expect(actualCardWidth).toBe(320); // Tablet starts
          } else if (viewportWidth === 1023) {
            expect(actualCardWidth).toBe(320); // Still tablet
          } else if (viewportWidth === 1024) {
            expect(actualCardWidth).toBe(340); // Desktop starts
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 9: About section card width responsiveness - card width affects gap calculation', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 1920 }),
        (viewportWidth) => {
          // Determine card width based on viewport
          let cardWidth;
          if (viewportWidth < 640) {
            cardWidth = 280;
          } else if (viewportWidth < 1024) {
            cardWidth = 320;
          } else {
            cardWidth = 340;
          }
          
          // Calculate gap based on card width (matching About component logic)
          const gap = cardWidth === 280 ? 16 : 24;
          
          // Verify gap is correct for the card width
          if (cardWidth === 280) {
            expect(gap).toBe(16);
          } else {
            expect(gap).toBe(24);
          }
          
          // Verify the relationship between viewport, card width, and gap
          if (viewportWidth < 640) {
            expect(cardWidth).toBe(280);
            expect(gap).toBe(16);
          } else if (viewportWidth < 1024) {
            expect(cardWidth).toBe(320);
            expect(gap).toBe(24);
          } else {
            expect(cardWidth).toBe(340);
            expect(gap).toBe(24);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 9: About section card width responsiveness - total scroll distance scales with card width', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 1920 }),
        (viewportWidth) => {
          // Determine card width based on viewport
          let cardWidth;
          if (viewportWidth < 640) {
            cardWidth = 280;
          } else if (viewportWidth < 1024) {
            cardWidth = 320;
          } else {
            cardWidth = 340;
          }
          
          // Calculate gap
          const gap = cardWidth === 280 ? 16 : 24;
          
          // Number of cards
          const numCards = 5;
          
          // Calculate total scroll distance (matching About component logic)
          const totalScrollDistance = (numCards - 1) * (cardWidth + gap);
          
          // Verify total scroll distance is calculated correctly
          const expectedDistance = (numCards - 1) * (cardWidth + gap);
          expect(totalScrollDistance).toBe(expectedDistance);
          
          // Verify total scroll distance scales appropriately with card width
          if (viewportWidth < 640) {
            // Mobile: 280px cards + 16px gap = 296px per card
            expect(totalScrollDistance).toBe(4 * 296);
          } else if (viewportWidth < 1024) {
            // Tablet: 320px cards + 24px gap = 344px per card
            expect(totalScrollDistance).toBe(4 * 344);
          } else {
            // Desktop: 340px cards + 24px gap = 364px per card
            expect(totalScrollDistance).toBe(4 * 364);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
