import '@testing-library/jest-dom';

// Mock IntersectionObserver for Framer Motion's useInView
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};
