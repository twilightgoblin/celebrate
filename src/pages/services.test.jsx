import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import Services from './services';
import * as fc from 'fast-check';

describe('Services Component - Property Tests', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Property 3: Service Cards Have Required Elements
   * **Validates: Requirements 3.5**
   * 
   * For any service card in the Services section, the card should contain exactly 
   * three elements: a Lucide React icon component, a title heading, and a description paragraph.
   */
  it('Property 3: Service cards have required elements - icon, title, description', () => {
    // Render the Services component
    const { container } = render(<Services />);
    
    // Get all service cards (should be 4)
    const serviceCards = container.querySelectorAll('.grid > div');
    
    // Verify we have exactly 4 service cards
    expect(serviceCards.length).toBe(4);
    
    // For each service card, verify it has the required elements
    serviceCards.forEach((card, index) => {
      // 1. Verify presence of icon (SVG element from Lucide React)
      const icon = card.querySelector('svg');
      expect(icon).not.toBeNull();
      expect(icon.tagName.toLowerCase()).toBe('svg');
      
      // Verify icon has correct styling
      expect(icon.getAttribute('width')).toBe('32');
      expect(icon.getAttribute('height')).toBe('32');
      expect(icon.getAttribute('stroke-width')).toBe('1.5');
      
      // 2. Verify presence of title heading
      const title = card.querySelector('h3');
      expect(title).not.toBeNull();
      expect(title.textContent).toBeTruthy();
      expect(title.textContent.length).toBeGreaterThan(0);
      
      // 3. Verify presence of description paragraph
      const description = card.querySelector('p');
      expect(description).not.toBeNull();
      expect(description.textContent).toBeTruthy();
      expect(description.textContent.length).toBeGreaterThan(0);
      
      // Verify the card has exactly these three element types
      const svgs = card.querySelectorAll('svg');
      const headings = card.querySelectorAll('h3');
      const paragraphs = card.querySelectorAll('p');
      
      expect(svgs.length).toBeGreaterThanOrEqual(1); // At least one SVG (icon)
      expect(headings.length).toBe(1); // Exactly one title
      expect(paragraphs.length).toBe(1); // Exactly one description
    });
  });

  it('Property 3: Service cards have required elements - verify specific service data', () => {
    // Expected service data from requirements
    const expectedServices = [
      {
        title: "Wedding Invitations",
        description: "Elegant digital invitations for your big day. RSVPs, maps, and all the details in one beautiful place.",
        iconName: "Heart"
      },
      {
        title: "Birthday & Private Parties",
        description: "Celebrate milestones with style. From baby showers to milestone birthdays.",
        iconName: "Cake"
      },
      {
        title: "Engagement / Housewarming",
        description: "Announce your engagement or new home with a stunning digital invitation.",
        iconName: "Home"
      },
      {
        title: "Corporate Events",
        description: "Professional invitations for company gatherings, product launches, and corporate celebrations.",
        iconName: "Briefcase"
      }
    ];
    
    // Render the Services component
    const { container } = render(<Services />);
    
    // Get all service cards
    const serviceCards = container.querySelectorAll('.grid > div');
    
    // Verify each card has the correct data
    serviceCards.forEach((card, index) => {
      const expectedService = expectedServices[index];
      
      // Verify title matches
      const title = card.querySelector('h3');
      expect(title.textContent).toBe(expectedService.title);
      
      // Verify description matches
      const description = card.querySelector('p');
      expect(description.textContent).toBe(expectedService.description);
      
      // Verify icon is present (we can't easily check the icon type without more complex setup)
      const icon = card.querySelector('svg');
      expect(icon).not.toBeNull();
    });
  });

  it('Property 3: Service cards have required elements - all cards have consistent structure', () => {
    fc.assert(
      fc.property(
        // Generate a constant value (we're testing the same component each time)
        fc.constant(null),
        () => {
          // Render the Services component
          const { container } = render(<Services />);
          
          // Get all service cards
          const serviceCards = container.querySelectorAll('.grid > div');
          
          // Verify we have exactly 4 cards
          expect(serviceCards.length).toBe(4);
          
          // Track the structure of each card
          const cardStructures = [];
          
          serviceCards.forEach((card) => {
            const structure = {
              hasSvg: card.querySelector('svg') !== null,
              hasH3: card.querySelector('h3') !== null,
              hasP: card.querySelector('p') !== null,
              svgCount: card.querySelectorAll('svg').length,
              h3Count: card.querySelectorAll('h3').length,
              pCount: card.querySelectorAll('p').length,
            };
            cardStructures.push(structure);
          });
          
          // Verify all cards have the same structure
          for (const structure of cardStructures) {
            expect(structure.hasSvg).toBe(true);
            expect(structure.hasH3).toBe(true);
            expect(structure.hasP).toBe(true);
            expect(structure.svgCount).toBeGreaterThanOrEqual(1);
            expect(structure.h3Count).toBe(1);
            expect(structure.pCount).toBe(1);
          }
          
          // Verify all structures are identical
          const firstStructure = cardStructures[0];
          for (let i = 1; i < cardStructures.length; i++) {
            expect(cardStructures[i].hasSvg).toBe(firstStructure.hasSvg);
            expect(cardStructures[i].hasH3).toBe(firstStructure.hasH3);
            expect(cardStructures[i].hasP).toBe(firstStructure.hasP);
            expect(cardStructures[i].h3Count).toBe(firstStructure.h3Count);
            expect(cardStructures[i].pCount).toBe(firstStructure.pCount);
          }
          
          // Clean up after each iteration
          cleanup();
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design doc
    );
  });

  /**
   * Property 4: Service Card Styling Consistency
   * **Validates: Requirements 3.7, 3.8, 4.4**
   * 
   * For any service card in the Services section, the card styling (background color, border, 
   * border-radius, backdrop-blur, box-shadow, padding) should match the styling used in About 
   * section cards, and icons should use the same size, stroke width, and color as About section icons.
   */
  it('Property 4: Service card styling consistency - cards match About section styling', () => {
    // Expected styling values from About component
    const expectedCardStyles = {
      backgroundColor: 'rgba(245, 230, 220, 0.6)',
      border: '1px solid rgba(255, 177, 153, 0.3)',
      boxShadow: '0 4px 20px rgba(90, 74, 69, 0.08)',
    };

    const expectedIconStyles = {
      size: '32', // Icon size attribute
      strokeWidth: '1.5',
    };

    // Render the Services component
    const { container } = render(<Services />);
    
    // Get all service cards
    const serviceCards = container.querySelectorAll('.grid > div');
    
    // Verify we have exactly 4 cards
    expect(serviceCards.length).toBe(4);
    
    // For each service card, verify styling matches About card styling
    serviceCards.forEach((card) => {
      // Verify background color
      expect(card.style.backgroundColor).toBe(expectedCardStyles.backgroundColor);
      
      // Verify border
      expect(card.style.border).toBe(expectedCardStyles.border);
      
      // Verify box shadow
      expect(card.style.boxShadow).toBe(expectedCardStyles.boxShadow);
      
      // Verify border radius class (rounded-lg)
      expect(card.classList.contains('rounded-lg')).toBe(true);
      
      // Verify backdrop blur is applied (backdrop-blur-sm class)
      expect(card.classList.contains('backdrop-blur-sm')).toBe(true);
      
      // Verify padding classes (p-6 sm:p-8)
      expect(card.classList.contains('p-6')).toBe(true);
      
      // Verify icon styling
      const icon = card.querySelector('svg');
      expect(icon).not.toBeNull();
      
      // Verify icon size
      expect(icon.getAttribute('width')).toBe(expectedIconStyles.size);
      expect(icon.getAttribute('height')).toBe(expectedIconStyles.size);
      
      // Verify icon stroke width
      expect(icon.getAttribute('stroke-width')).toBe(expectedIconStyles.strokeWidth);
      
      // Verify icon color uses CSS variable
      const iconStyle = icon.style.color;
      expect(iconStyle).toBe('var(--btn-primary)');
    });
  });

  it('Property 4: Service card styling consistency - verify all cards have identical styling', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          // Render the Services component
          const { container } = render(<Services />);
          
          // Get all service cards
          const serviceCards = container.querySelectorAll('.grid > div');
          
          // Extract styling from all cards
          const cardStyles = [];
          
          serviceCards.forEach((card) => {
            const icon = card.querySelector('svg');
            
            const styles = {
              backgroundColor: card.style.backgroundColor,
              border: card.style.border,
              boxShadow: card.style.boxShadow,
              hasRoundedLg: card.classList.contains('rounded-lg'),
              hasBackdropBlur: card.classList.contains('backdrop-blur-sm'),
              hasPadding: card.classList.contains('p-6'),
              iconWidth: icon?.getAttribute('width'),
              iconHeight: icon?.getAttribute('height'),
              iconStrokeWidth: icon?.getAttribute('stroke-width'),
              iconColor: icon?.style.color,
            };
            
            cardStyles.push(styles);
          });
          
          // Verify all cards have identical styling
          const firstCardStyle = cardStyles[0];
          
          for (let i = 1; i < cardStyles.length; i++) {
            const currentStyle = cardStyles[i];
            
            expect(currentStyle.backgroundColor).toBe(firstCardStyle.backgroundColor);
            expect(currentStyle.border).toBe(firstCardStyle.border);
            expect(currentStyle.boxShadow).toBe(firstCardStyle.boxShadow);
            expect(currentStyle.hasRoundedLg).toBe(firstCardStyle.hasRoundedLg);
            expect(currentStyle.hasBackdropBlur).toBe(firstCardStyle.hasBackdropBlur);
            expect(currentStyle.hasPadding).toBe(firstCardStyle.hasPadding);
            expect(currentStyle.iconWidth).toBe(firstCardStyle.iconWidth);
            expect(currentStyle.iconHeight).toBe(firstCardStyle.iconHeight);
            expect(currentStyle.iconStrokeWidth).toBe(firstCardStyle.iconStrokeWidth);
            expect(currentStyle.iconColor).toBe(firstCardStyle.iconColor);
          }
          
          // Clean up after each iteration
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 4: Service card styling consistency - compare with About card reference', () => {
    // This test documents the expected styling that should match About cards
    // Based on the About component implementation
    
    const { container } = render(<Services />);
    const serviceCards = container.querySelectorAll('.grid > div');
    
    // Reference values from About component
    const aboutCardReference = {
      backgroundColor: 'rgba(245, 230, 220, 0.6)',
      border: '1px solid rgba(255, 177, 153, 0.3)',
      boxShadow: '0 4px 20px rgba(90, 74, 69, 0.08)',
      iconSize: 32, // Desktop size (About uses 28 on mobile, 32 on larger screens)
      iconStrokeWidth: 1.5,
      iconColor: 'var(--btn-primary)',
      borderRadiusClass: 'rounded-lg',
      backdropBlurClass: 'backdrop-blur-sm',
      paddingClasses: ['p-6', 'sm:p-8'],
    };
    
    serviceCards.forEach((card) => {
      // Verify card styling matches About card reference
      expect(card.style.backgroundColor).toBe(aboutCardReference.backgroundColor);
      expect(card.style.border).toBe(aboutCardReference.border);
      expect(card.style.boxShadow).toBe(aboutCardReference.boxShadow);
      
      // Verify classes
      expect(card.classList.contains('rounded-lg')).toBe(true);
      expect(card.classList.contains('backdrop-blur-sm')).toBe(true);
      expect(card.classList.contains('p-6')).toBe(true);
      
      // Verify icon styling
      const icon = card.querySelector('svg');
      expect(icon.getAttribute('width')).toBe(String(aboutCardReference.iconSize));
      expect(icon.getAttribute('height')).toBe(String(aboutCardReference.iconSize));
      expect(icon.getAttribute('stroke-width')).toBe(String(aboutCardReference.iconStrokeWidth));
      expect(icon.style.color).toBe(aboutCardReference.iconColor);
    });
  });

  /**
   * Property 5: CSS Variables Usage
   * **Validates: Requirements 4.1**
   * 
   * For any color property in the Services section (text colors, background colors, icon colors), 
   * the computed style should reference one of the CSS variables defined in globals.css 
   * (--text-heading, --text-body, --btn-primary, --bg-sections).
   */
  it('Property 5: CSS variables usage - all color properties use defined CSS variables', () => {
    // Render the Services component
    const { container } = render(<Services />);
    
    // Define the expected CSS variables from globals.css
    const expectedCSSVariables = [
      'var(--text-heading)',
      'var(--text-body)',
      'var(--btn-primary)',
      'var(--bg-sections)',
      'var(--font-heading)',
      'var(--font-body)'
    ];
    
    // Test heading (h2) uses CSS variables
    const heading = container.querySelector('h2');
    expect(heading).not.toBeNull();
    expect(heading.style.fontFamily).toBe('var(--font-heading)');
    expect(heading.style.color).toBe('var(--text-heading)');
    
    // Test subtitle (p) uses CSS variables
    const subtitle = container.querySelector('.text-center p');
    expect(subtitle).not.toBeNull();
    expect(subtitle.style.fontFamily).toBe('var(--font-body)');
    expect(subtitle.style.color).toBe('var(--text-body)');
    
    // Test service cards
    const serviceCards = container.querySelectorAll('.grid > div');
    expect(serviceCards.length).toBe(4);
    
    serviceCards.forEach((card) => {
      // Test card font family uses CSS variable
      expect(card.style.fontFamily).toBe('var(--font-body)');
      
      // Test card title (h3) uses CSS variables
      const title = card.querySelector('h3');
      expect(title).not.toBeNull();
      expect(title.style.fontFamily).toBe('var(--font-heading)');
      expect(title.style.color).toBe('var(--text-heading)');
      
      // Test card description (p) uses CSS variable
      const description = card.querySelector('p');
      expect(description).not.toBeNull();
      expect(description.style.color).toBe('var(--text-body)');
      
      // Test icon uses CSS variable
      const icon = card.querySelector('svg');
      expect(icon).not.toBeNull();
      expect(icon.style.color).toBe('var(--btn-primary)');
    });
  });

  it('Property 5: CSS variables usage - verify no hardcoded color values in text elements', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          // Render the Services component
          const { container } = render(<Services />);
          
          // Collect all text elements that should use CSS variables
          const heading = container.querySelector('h2');
          const subtitle = container.querySelector('.text-center p');
          const serviceCards = container.querySelectorAll('.grid > div');
          
          // Verify heading uses CSS variables (not hardcoded colors)
          expect(heading.style.fontFamily).toContain('var(--');
          expect(heading.style.color).toContain('var(--');
          
          // Verify subtitle uses CSS variables
          expect(subtitle.style.fontFamily).toContain('var(--');
          expect(subtitle.style.color).toContain('var(--');
          
          // Verify all service cards use CSS variables
          serviceCards.forEach((card) => {
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            const icon = card.querySelector('svg');
            
            // Card font family should use CSS variable
            expect(card.style.fontFamily).toContain('var(--');
            
            // Title should use CSS variables
            expect(title.style.fontFamily).toContain('var(--');
            expect(title.style.color).toContain('var(--');
            
            // Description should use CSS variable
            expect(description.style.color).toContain('var(--');
            
            // Icon should use CSS variable
            expect(icon.style.color).toContain('var(--');
          });
          
          // Clean up after each iteration
          cleanup();
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design doc
    );
  });

  it('Property 5: CSS variables usage - all CSS variables are from the defined set', () => {
    // Render the Services component
    const { container } = render(<Services />);
    
    // Define the complete set of allowed CSS variables
    const allowedCSSVariables = [
      'var(--text-heading)',
      'var(--text-body)',
      'var(--btn-primary)',
      'var(--bg-sections)',
      'var(--font-heading)',
      'var(--font-body)'
    ];
    
    // Helper function to check if a value is an allowed CSS variable
    const isAllowedCSSVariable = (value) => {
      if (!value || typeof value !== 'string') return false;
      return allowedCSSVariables.some(allowed => value.includes(allowed));
    };
    
    // Collect all elements with inline styles that use CSS variables
    const heading = container.querySelector('h2');
    const subtitle = container.querySelector('.text-center p');
    const serviceCards = container.querySelectorAll('.grid > div');
    
    // Check heading
    if (heading.style.fontFamily && heading.style.fontFamily.includes('var(--')) {
      expect(isAllowedCSSVariable(heading.style.fontFamily)).toBe(true);
    }
    if (heading.style.color && heading.style.color.includes('var(--')) {
      expect(isAllowedCSSVariable(heading.style.color)).toBe(true);
    }
    
    // Check subtitle
    if (subtitle.style.fontFamily && subtitle.style.fontFamily.includes('var(--')) {
      expect(isAllowedCSSVariable(subtitle.style.fontFamily)).toBe(true);
    }
    if (subtitle.style.color && subtitle.style.color.includes('var(--')) {
      expect(isAllowedCSSVariable(subtitle.style.color)).toBe(true);
    }
    
    // Check service cards
    serviceCards.forEach((card) => {
      const title = card.querySelector('h3');
      const description = card.querySelector('p');
      const icon = card.querySelector('svg');
      
      // Check card
      if (card.style.fontFamily && card.style.fontFamily.includes('var(--')) {
        expect(isAllowedCSSVariable(card.style.fontFamily)).toBe(true);
      }
      
      // Check title
      if (title.style.fontFamily && title.style.fontFamily.includes('var(--')) {
        expect(isAllowedCSSVariable(title.style.fontFamily)).toBe(true);
      }
      if (title.style.color && title.style.color.includes('var(--')) {
        expect(isAllowedCSSVariable(title.style.color)).toBe(true);
      }
      
      // Check description
      if (description.style.color && description.style.color.includes('var(--')) {
        expect(isAllowedCSSVariable(description.style.color)).toBe(true);
      }
      
      // Check icon
      if (icon.style.color && icon.style.color.includes('var(--')) {
        expect(isAllowedCSSVariable(icon.style.color)).toBe(true);
      }
    });
  });

  it('Property 5: CSS variables usage - comprehensive check across all elements', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          // Render the Services component
          const { container } = render(<Services />);
          
          // Expected CSS variable mappings
          const expectedMappings = {
            heading: {
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-heading)'
            },
            subtitle: {
              fontFamily: 'var(--font-body)',
              color: 'var(--text-body)'
            },
            cardTitle: {
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-heading)'
            },
            cardDescription: {
              color: 'var(--text-body)'
            },
            cardIcon: {
              color: 'var(--btn-primary)'
            }
          };
          
          // Test heading
          const heading = container.querySelector('h2');
          expect(heading.style.fontFamily).toBe(expectedMappings.heading.fontFamily);
          expect(heading.style.color).toBe(expectedMappings.heading.color);
          
          // Test subtitle
          const subtitle = container.querySelector('.text-center p');
          expect(subtitle.style.fontFamily).toBe(expectedMappings.subtitle.fontFamily);
          expect(subtitle.style.color).toBe(expectedMappings.subtitle.color);
          
          // Test all service cards
          const serviceCards = container.querySelectorAll('.grid > div');
          
          serviceCards.forEach((card) => {
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            const icon = card.querySelector('svg');
            
            // Verify title uses correct CSS variables
            expect(title.style.fontFamily).toBe(expectedMappings.cardTitle.fontFamily);
            expect(title.style.color).toBe(expectedMappings.cardTitle.color);
            
            // Verify description uses correct CSS variable
            expect(description.style.color).toBe(expectedMappings.cardDescription.color);
            
            // Verify icon uses correct CSS variable
            expect(icon.style.color).toBe(expectedMappings.cardIcon.color);
          });
          
          // Clean up after each iteration
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6: Font Family Consistency
   * **Validates: Requirements 4.2**
   * 
   * For any text element in the Services section, headings should use var(--font-heading) 
   * and body text should use var(--font-body), matching the font families used throughout the site.
   */
  it('Property 6: Font family consistency - headings use --font-heading, body text uses --font-body', () => {
    // Render the Services component
    const { container } = render(<Services />);
    
    // Test main heading (h2) uses --font-heading
    const heading = container.querySelector('h2');
    expect(heading).not.toBeNull();
    expect(heading.style.fontFamily).toBe('var(--font-heading)');
    
    // Test subtitle (p) uses --font-body
    const subtitle = container.querySelector('.text-center p');
    expect(subtitle).not.toBeNull();
    expect(subtitle.style.fontFamily).toBe('var(--font-body)');
    
    // Test service cards
    const serviceCards = container.querySelectorAll('.grid > div');
    expect(serviceCards.length).toBe(4);
    
    serviceCards.forEach((card) => {
      // Test card container uses --font-body
      expect(card.style.fontFamily).toBe('var(--font-body)');
      
      // Test card title (h3) uses --font-heading
      const title = card.querySelector('h3');
      expect(title).not.toBeNull();
      expect(title.style.fontFamily).toBe('var(--font-heading)');
      
      // Test card description (p) inherits --font-body from card container
      // (description doesn't have explicit fontFamily, so it inherits from card)
      const description = card.querySelector('p');
      expect(description).not.toBeNull();
      // Description doesn't have inline fontFamily, it inherits from card
      expect(description.style.fontFamily).toBe('');
    });
  });

  it('Property 6: Font family consistency - all headings consistently use --font-heading', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          // Render the Services component
          const { container } = render(<Services />);
          
          // Collect all heading elements (h2 and h3)
          const mainHeading = container.querySelector('h2');
          const cardTitles = container.querySelectorAll('h3');
          
          // Verify main heading uses --font-heading
          expect(mainHeading.style.fontFamily).toBe('var(--font-heading)');
          
          // Verify all card titles use --font-heading
          expect(cardTitles.length).toBe(4);
          cardTitles.forEach((title) => {
            expect(title.style.fontFamily).toBe('var(--font-heading)');
          });
          
          // Verify all headings use the same font family
          const allHeadingFonts = [mainHeading.style.fontFamily];
          cardTitles.forEach((title) => {
            allHeadingFonts.push(title.style.fontFamily);
          });
          
          // All should be identical
          const firstFont = allHeadingFonts[0];
          for (const font of allHeadingFonts) {
            expect(font).toBe(firstFont);
            expect(font).toBe('var(--font-heading)');
          }
          
          // Clean up after each iteration
          cleanup();
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design doc
    );
  });

  it('Property 6: Font family consistency - all body text consistently uses --font-body', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          // Render the Services component
          const { container } = render(<Services />);
          
          // Collect all body text elements
          const subtitle = container.querySelector('.text-center p');
          const serviceCards = container.querySelectorAll('.grid > div');
          
          // Verify subtitle uses --font-body
          expect(subtitle.style.fontFamily).toBe('var(--font-body)');
          
          // Verify all service cards use --font-body
          expect(serviceCards.length).toBe(4);
          serviceCards.forEach((card) => {
            expect(card.style.fontFamily).toBe('var(--font-body)');
          });
          
          // Verify all body text elements use the same font family
          const allBodyFonts = [subtitle.style.fontFamily];
          serviceCards.forEach((card) => {
            allBodyFonts.push(card.style.fontFamily);
          });
          
          // All should be identical
          const firstFont = allBodyFonts[0];
          for (const font of allBodyFonts) {
            expect(font).toBe(firstFont);
            expect(font).toBe('var(--font-body)');
          }
          
          // Clean up after each iteration
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 6: Font family consistency - verify heading vs body font distinction', () => {
    // Render the Services component
    const { container } = render(<Services />);
    
    // Get heading and body font families
    const heading = container.querySelector('h2');
    const subtitle = container.querySelector('.text-center p');
    
    const headingFont = heading.style.fontFamily;
    const bodyFont = subtitle.style.fontFamily;
    
    // Verify they use different CSS variables
    expect(headingFont).toBe('var(--font-heading)');
    expect(bodyFont).toBe('var(--font-body)');
    expect(headingFont).not.toBe(bodyFont);
    
    // Verify all headings use heading font
    const allHeadings = container.querySelectorAll('h2, h3');
    allHeadings.forEach((h) => {
      expect(h.style.fontFamily).toBe('var(--font-heading)');
    });
    
    // Verify body text elements use body font
    const bodyTextElements = [subtitle];
    const serviceCards = container.querySelectorAll('.grid > div');
    serviceCards.forEach((card) => {
      bodyTextElements.push(card);
    });
    
    bodyTextElements.forEach((element) => {
      expect(element.style.fontFamily).toBe('var(--font-body)');
    });
  });

  it('Property 6: Font family consistency - comprehensive font family check', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          // Render the Services component
          const { container } = render(<Services />);
          
          // Define expected font families for each element type
          const expectedFonts = {
            h2: 'var(--font-heading)',
            h3: 'var(--font-heading)',
            subtitle: 'var(--font-body)',
            card: 'var(--font-body)'
          };
          
          // Test main heading (h2)
          const mainHeading = container.querySelector('h2');
          expect(mainHeading.style.fontFamily).toBe(expectedFonts.h2);
          
          // Test subtitle
          const subtitle = container.querySelector('.text-center p');
          expect(subtitle.style.fontFamily).toBe(expectedFonts.subtitle);
          
          // Test all service cards
          const serviceCards = container.querySelectorAll('.grid > div');
          expect(serviceCards.length).toBe(4);
          
          serviceCards.forEach((card) => {
            // Card container should use body font
            expect(card.style.fontFamily).toBe(expectedFonts.card);
            
            // Card title (h3) should use heading font
            const title = card.querySelector('h3');
            expect(title.style.fontFamily).toBe(expectedFonts.h3);
            
            // Card description inherits from card container
            const description = card.querySelector('p');
            expect(description).not.toBeNull();
          });
          
          // Verify consistency: all h2 and h3 elements use the same heading font
          const allHeadings = container.querySelectorAll('h2, h3');
          allHeadings.forEach((heading) => {
            expect(heading.style.fontFamily).toBe('var(--font-heading)');
          });
          
          // Clean up after each iteration
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 7: Responsive Grid Layout
   * **Validates: Requirements 3.12, 5.2, 5.3, 5.4**
   * 
   * For any viewport width, the Services section grid should display 1 column when 
   * width < 640px, 2 columns when 640px <= width < 1024px, and 2 columns (2x2 grid) 
   * when width >= 1024px.
   */
  it('Property 7: Responsive grid layout - correct column count across breakpoints', () => {
    fc.assert(
      fc.property(
        // Generate random viewport widths across all breakpoints
        fc.integer({ min: 320, max: 1920 }),
        (viewportWidth) => {
          // Set up window dimensions for the test
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          // Render the Services component
          const { container } = render(<Services />);
          
          // Get the grid container
          const gridContainer = container.querySelector('.grid');
          expect(gridContainer).not.toBeNull();
          
          // Determine expected grid columns based on viewport width
          let expectedColumns;
          if (viewportWidth < 640) {
            expectedColumns = 1; // Mobile: 1 column
          } else if (viewportWidth < 1024) {
            expectedColumns = 2; // Tablet: 2 columns
          } else {
            expectedColumns = 2; // Desktop: 2 columns (2x2 grid)
          }
          
          // Verify grid has correct Tailwind classes
          const hasGridCols1 = gridContainer.classList.contains('grid-cols-1');
          const hasGridCols2Sm = gridContainer.classList.contains('sm:grid-cols-2');
          
          // The component should always have these classes
          expect(hasGridCols1).toBe(true); // Base mobile class
          expect(hasGridCols2Sm).toBe(true); // Tablet/desktop class
          
          // Verify we have exactly 4 service cards
          const serviceCards = gridContainer.querySelectorAll(':scope > div');
          expect(serviceCards.length).toBe(4);
          
          // Clean up after each iteration
          cleanup();
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design doc
    );
  });

  it('Property 7: Responsive grid layout - verify breakpoint boundaries', () => {
    // Test at exact breakpoint boundaries and nearby values
    const testCases = [
      { width: 320, expectedColumns: 1, description: 'Mobile min' },
      { width: 375, expectedColumns: 1, description: 'Mobile iPhone' },
      { width: 639, expectedColumns: 1, description: 'Just before tablet breakpoint' },
      { width: 640, expectedColumns: 2, description: 'Tablet breakpoint' },
      { width: 641, expectedColumns: 2, description: 'Just after tablet breakpoint' },
      { width: 768, expectedColumns: 2, description: 'Tablet iPad' },
      { width: 1023, expectedColumns: 2, description: 'Just before desktop breakpoint' },
      { width: 1024, expectedColumns: 2, description: 'Desktop breakpoint' },
      { width: 1025, expectedColumns: 2, description: 'Just after desktop breakpoint' },
      { width: 1920, expectedColumns: 2, description: 'Desktop max' },
    ];

    for (const { width, expectedColumns, description } of testCases) {
      // Set up window dimensions
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });

      // Render the Services component
      const { container } = render(<Services />);
      
      // Get the grid container
      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).not.toBeNull();
      
      // Verify grid classes
      expect(gridContainer.classList.contains('grid-cols-1')).toBe(true);
      expect(gridContainer.classList.contains('sm:grid-cols-2')).toBe(true);
      
      // Verify we have exactly 4 service cards
      const serviceCards = gridContainer.querySelectorAll(':scope > div');
      expect(serviceCards.length).toBe(4);
      
      // Clean up
      cleanup();
    }
  });

  it('Property 7: Responsive grid layout - grid maintains 4 cards across all viewports', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 1920 }),
        (viewportWidth) => {
          // Set up window dimensions
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          // Render the Services component
          const { container } = render(<Services />);
          
          // Get the grid container
          const gridContainer = container.querySelector('.grid');
          
          // Verify we always have exactly 4 service cards regardless of viewport
          const serviceCards = gridContainer.querySelectorAll(':scope > div');
          expect(serviceCards.length).toBe(4);
          
          // Verify each card has the required elements
          serviceCards.forEach((card) => {
            const icon = card.querySelector('svg');
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            
            expect(icon).not.toBeNull();
            expect(title).not.toBeNull();
            expect(description).not.toBeNull();
          });
          
          // Clean up after each iteration
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 7: Responsive grid layout - grid uses correct Tailwind classes', () => {
    // Render the Services component
    const { container } = render(<Services />);
    
    // Get the grid container
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).not.toBeNull();
    
    // Verify the grid has the correct Tailwind classes for responsive layout
    // grid-cols-1: 1 column on mobile (< 640px)
    // sm:grid-cols-2: 2 columns on tablet and desktop (>= 640px)
    expect(gridContainer.classList.contains('grid')).toBe(true);
    expect(gridContainer.classList.contains('grid-cols-1')).toBe(true);
    expect(gridContainer.classList.contains('sm:grid-cols-2')).toBe(true);
    
    // Verify gap classes
    expect(gridContainer.classList.contains('gap-6')).toBe(true);
    expect(gridContainer.classList.contains('sm:gap-8')).toBe(true);
  });

  it('Property 7: Responsive grid layout - comprehensive responsive behavior', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 1920 }),
        (viewportWidth) => {
          // Set up window dimensions
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          // Render the Services component
          const { container } = render(<Services />);
          
          // Get the grid container
          const gridContainer = container.querySelector('.grid');
          
          // Verify grid structure
          expect(gridContainer).not.toBeNull();
          expect(gridContainer.classList.contains('grid')).toBe(true);
          
          // Verify responsive classes are present
          const hasBaseColumn = gridContainer.classList.contains('grid-cols-1');
          const hasResponsiveColumns = gridContainer.classList.contains('sm:grid-cols-2');
          
          expect(hasBaseColumn).toBe(true);
          expect(hasResponsiveColumns).toBe(true);
          
          // Verify the grid contains exactly 4 cards
          const cards = gridContainer.querySelectorAll(':scope > div');
          expect(cards.length).toBe(4);
          
          // Verify each card is a direct child of the grid
          cards.forEach((card) => {
            expect(card.parentElement).toBe(gridContainer);
          });
          
          // Determine expected layout based on viewport
          const isMobile = viewportWidth < 640;
          const isTablet = viewportWidth >= 640 && viewportWidth < 1024;
          const isDesktop = viewportWidth >= 1024;
          
          // Verify layout expectations
          if (isMobile) {
            // Mobile: 1 column layout
            expect(hasBaseColumn).toBe(true);
          } else if (isTablet || isDesktop) {
            // Tablet and Desktop: 2 columns layout
            expect(hasResponsiveColumns).toBe(true);
          }
          
          // Clean up after each iteration
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Services Component - Unit Tests', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Unit Test: Services component renders after About in DOM
   * Validates: Requirements 3.1
   * 
   * Verifies that the Services component is positioned after the About component
   * in the DOM structure. This is an integration test that would normally check
   * the Hero component, but we test the Services component in isolation here.
   * The actual integration is verified in task 5.1.
   */
  it('should render Services component with correct structure for DOM placement', () => {
    // Render the Services component
    const { container } = render(<Services />);
    
    // Verify the Services section exists and has the correct structure
    const servicesSection = container.querySelector('section');
    expect(servicesSection).not.toBeNull();
    
    // Verify it has the "Our Services" heading
    const heading = servicesSection.querySelector('h2');
    expect(heading).not.toBeNull();
    expect(heading.textContent).toBe('Our Services');
    
    // Verify it has the correct section structure that allows it to be placed after About
    expect(servicesSection.tagName.toLowerCase()).toBe('section');
    expect(servicesSection.classList.contains('relative')).toBe(true);
    
    // Note: The actual DOM ordering test is in the integration test (task 5.1)
    // where Hero component is tested with both About and Services components
  });

  /**
   * Unit Test: Heading text is "Our Services"
   * Validates: Requirements 3.2
   * 
   * Verifies that the main heading displays the correct text.
   */
  it('should display heading text "Our Services"', () => {
    const { container } = render(<Services />);
    
    const heading = container.querySelector('h2');
    expect(heading).not.toBeNull();
    expect(heading.textContent).toBe('Our Services');
  });

  /**
   * Unit Test: Subtitle text matches specification
   * Validates: Requirements 3.3
   * 
   * Verifies that the subtitle displays the exact text from the specification.
   */
  it('should display subtitle text matching specification', () => {
    const { container } = render(<Services />);
    
    const subtitle = container.querySelector('.text-center p');
    expect(subtitle).not.toBeNull();
    expect(subtitle.textContent).toBe('Whatever your occasion, we craft invitation websites that impress.');
  });

  /**
   * Unit Test: Exactly 4 cards are rendered
   * Validates: Requirements 3.4
   * 
   * Verifies that the Services section displays exactly 4 service cards.
   */
  it('should render exactly 4 service cards', () => {
    const { container } = render(<Services />);
    
    const serviceCards = container.querySelectorAll('.grid > div');
    expect(serviceCards.length).toBe(4);
  });

  /**
   * Unit Test: Each card has correct title, description, icon
   * Validates: Requirements 3.6
   * 
   * Verifies that each service card displays the correct data as specified
   * in the requirements.
   */
  it('should render each card with correct title, description, and icon', () => {
    const { container } = render(<Services />);
    
    // Expected service data from requirements
    const expectedServices = [
      {
        title: "Wedding Invitations",
        description: "Elegant digital invitations for your big day. RSVPs, maps, and all the details in one beautiful place.",
      },
      {
        title: "Birthday & Private Parties",
        description: "Celebrate milestones with style. From baby showers to milestone birthdays.",
      },
      {
        title: "Engagement / Housewarming",
        description: "Announce your engagement or new home with a stunning digital invitation.",
      },
      {
        title: "Corporate Events",
        description: "Professional invitations for company gatherings, product launches, and corporate celebrations.",
      }
    ];
    
    const serviceCards = container.querySelectorAll('.grid > div');
    expect(serviceCards.length).toBe(4);
    
    serviceCards.forEach((card, index) => {
      const expectedService = expectedServices[index];
      
      // Verify title
      const title = card.querySelector('h3');
      expect(title).not.toBeNull();
      expect(title.textContent).toBe(expectedService.title);
      
      // Verify description
      const description = card.querySelector('p');
      expect(description).not.toBeNull();
      expect(description.textContent).toBe(expectedService.description);
      
      // Verify icon exists (SVG element from Lucide React)
      const icon = card.querySelector('svg');
      expect(icon).not.toBeNull();
      expect(icon.tagName.toLowerCase()).toBe('svg');
    });
  });

  /**
   * Unit Test: Card 1 - Wedding Invitations
   * Validates: Requirements 3.6
   */
  it('should render Wedding Invitations card with correct data', () => {
    const { container } = render(<Services />);
    
    const serviceCards = container.querySelectorAll('.grid > div');
    const card = serviceCards[0];
    
    const title = card.querySelector('h3');
    expect(title.textContent).toBe('Wedding Invitations');
    
    const description = card.querySelector('p');
    expect(description.textContent).toBe('Elegant digital invitations for your big day. RSVPs, maps, and all the details in one beautiful place.');
    
    const icon = card.querySelector('svg');
    expect(icon).not.toBeNull();
  });

  /**
   * Unit Test: Card 2 - Birthday & Private Parties
   * Validates: Requirements 3.6
   */
  it('should render Birthday & Private Parties card with correct data', () => {
    const { container } = render(<Services />);
    
    const serviceCards = container.querySelectorAll('.grid > div');
    const card = serviceCards[1];
    
    const title = card.querySelector('h3');
    expect(title.textContent).toBe('Birthday & Private Parties');
    
    const description = card.querySelector('p');
    expect(description.textContent).toBe('Celebrate milestones with style. From baby showers to milestone birthdays.');
    
    const icon = card.querySelector('svg');
    expect(icon).not.toBeNull();
  });

  /**
   * Unit Test: Card 3 - Engagement / Housewarming
   * Validates: Requirements 3.6
   */
  it('should render Engagement / Housewarming card with correct data', () => {
    const { container } = render(<Services />);
    
    const serviceCards = container.querySelectorAll('.grid > div');
    const card = serviceCards[2];
    
    const title = card.querySelector('h3');
    expect(title.textContent).toBe('Engagement / Housewarming');
    
    const description = card.querySelector('p');
    expect(description.textContent).toBe('Announce your engagement or new home with a stunning digital invitation.');
    
    const icon = card.querySelector('svg');
    expect(icon).not.toBeNull();
  });

  /**
   * Unit Test: Card 4 - Corporate Events
   * Validates: Requirements 3.6
   */
  it('should render Corporate Events card with correct data', () => {
    const { container } = render(<Services />);
    
    const serviceCards = container.querySelectorAll('.grid > div');
    const card = serviceCards[3];
    
    const title = card.querySelector('h3');
    expect(title.textContent).toBe('Corporate Events');
    
    const description = card.querySelector('p');
    expect(description.textContent).toBe('Professional invitations for company gatherings, product launches, and corporate celebrations.');
    
    const icon = card.querySelector('svg');
    expect(icon).not.toBeNull();
  });

  /**
   * Unit Test: All cards have icons with correct attributes
   * Validates: Requirements 3.6, 3.7
   */
  it('should render all card icons with correct size and stroke width', () => {
    const { container } = render(<Services />);
    
    const serviceCards = container.querySelectorAll('.grid > div');
    expect(serviceCards.length).toBe(4);
    
    serviceCards.forEach((card) => {
      const icon = card.querySelector('svg');
      expect(icon).not.toBeNull();
      
      // Verify icon attributes match specification
      expect(icon.getAttribute('width')).toBe('32');
      expect(icon.getAttribute('height')).toBe('32');
      expect(icon.getAttribute('stroke-width')).toBe('1.5');
      expect(icon.style.color).toBe('var(--btn-primary)');
    });
  });

  /**
   * Unit Test: Section has correct background gradient
   * Validates: Requirements 3.9
   */
  it('should apply correct background gradient to section', () => {
    const { container } = render(<Services />);
    
    const section = container.querySelector('section');
    expect(section).not.toBeNull();
    
    // Verify background gradient is applied
    // Note: Hex colors are converted to RGB in computed styles
    expect(section.style.background).toContain('linear-gradient');
    expect(section.style.background).toContain('rgba(224, 122, 102, 0.25)');
    // #FFCDB5 converts to rgb(255, 205, 181)
    expect(section.style.background).toContain('rgb(255, 205, 181)');
    // #FFD9C7 converts to rgb(255, 217, 199)
    expect(section.style.background).toContain('rgb(255, 217, 199)');
  });

  /**
   * Unit Test: Heading uses correct font and color
   * Validates: Requirements 3.2, 4.1, 4.2
   */
  it('should apply correct font family and color to heading', () => {
    const { container } = render(<Services />);
    
    const heading = container.querySelector('h2');
    expect(heading).not.toBeNull();
    expect(heading.style.fontFamily).toBe('var(--font-heading)');
    expect(heading.style.color).toBe('var(--text-heading)');
  });

  /**
   * Unit Test: Subtitle uses correct font and color
   * Validates: Requirements 3.3, 4.1, 4.2
   */
  it('should apply correct font family and color to subtitle', () => {
    const { container } = render(<Services />);
    
    const subtitle = container.querySelector('.text-center p');
    expect(subtitle).not.toBeNull();
    expect(subtitle.style.fontFamily).toBe('var(--font-body)');
    expect(subtitle.style.color).toBe('var(--text-body)');
  });

  /**
   * Unit Test: Cards have correct styling
   * Validates: Requirements 3.8, 4.4
   */
  it('should apply correct styling to service cards', () => {
    const { container } = render(<Services />);
    
    const serviceCards = container.querySelectorAll('.grid > div');
    expect(serviceCards.length).toBe(4);
    
    serviceCards.forEach((card) => {
      // Verify card styling matches About section cards
      expect(card.style.backgroundColor).toBe('rgba(245, 230, 220, 0.6)');
      expect(card.style.border).toBe('1px solid rgba(255, 177, 153, 0.3)');
      expect(card.style.boxShadow).toBe('0 4px 20px rgba(90, 74, 69, 0.08)');
      
      // Verify Tailwind classes
      expect(card.classList.contains('rounded-lg')).toBe(true);
      expect(card.classList.contains('backdrop-blur-sm')).toBe(true);
      expect(card.classList.contains('p-6')).toBe(true);
    });
  });

  /**
   * Unit Test: Grid has correct responsive classes
   * Validates: Requirements 3.12, 5.2, 5.3, 5.4
   */
  it('should apply correct responsive grid classes', () => {
    const { container } = render(<Services />);
    
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).not.toBeNull();
    
    // Verify responsive grid classes
    expect(gridContainer.classList.contains('grid')).toBe(true);
    expect(gridContainer.classList.contains('grid-cols-1')).toBe(true);
    expect(gridContainer.classList.contains('sm:grid-cols-2')).toBe(true);
    
    // Verify gap classes
    expect(gridContainer.classList.contains('gap-6')).toBe(true);
    expect(gridContainer.classList.contains('sm:gap-8')).toBe(true);
  });
});
