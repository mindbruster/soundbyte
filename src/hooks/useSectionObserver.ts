/**
 * Section Observer Hook
 *
 * Detects which section is currently in view and provides
 * smooth transition values for section-aware animations.
 */

import { useState, useEffect, useCallback } from 'react';

export interface SectionInfo {
  id: string;
  index: number;
  progress: number; // 0-1 how far through this section
  isActive: boolean;
}

export interface SectionColors {
  primary: string;
  secondary: string;
  accent: string;
}

// Section color schemes for the background (Custom Green #33CC80 theme)
export const SECTION_THEMES: Record<string, SectionColors> = {
  hero: {
    primary: '#0a0a0a',
    secondary: '#0a140f',
    accent: '#33cc80'
  },
  legacy: {
    primary: '#0d0d0d',
    secondary: '#0a140f',
    accent: '#2ab36e'
  },
  portfolio: {
    primary: '#080808',
    secondary: '#08120d',
    accent: '#5ce0a3'
  },
  soundbyte: {
    primary: '#0c0c0c',
    secondary: '#0a140f',
    accent: '#33cc80'
  },
  sonic: {
    primary: '#0a0908',
    secondary: '#0a120d',
    accent: '#22995c'
  },
  commission: {
    primary: '#0d0b0a',
    secondary: '#0c1610',
    accent: '#8aebbf'
  },
  footer: {
    primary: '#050505',
    secondary: '#060a08',
    accent: '#2ab36e'
  }
};

export function useSectionObserver() {
  const [currentSection, setCurrentSection] = useState<SectionInfo>({
    id: 'hero',
    index: 0,
    progress: 0,
    isActive: true
  });

  const [sections, setSections] = useState<SectionInfo[]>([]);
  const [sectionElements, setSectionElements] = useState<Map<string, HTMLElement>>(new Map());

  // Calculate section progress based on scroll
  const calculateSectionProgress = useCallback((element: HTMLElement): number => {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Calculate how much of the section is above the viewport center
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    const viewportCenter = viewportHeight / 2;

    // Progress from 0 (just entering) to 1 (just leaving)
    const progress = (viewportCenter - sectionTop) / sectionHeight;

    return Math.max(0, Math.min(1, progress));
  }, []);

  // Handle scroll for progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const sectionsArray: SectionInfo[] = [];
      let activeSection: SectionInfo | null = null;
      let maxVisibility = 0;

      sectionElements.forEach((element, id) => {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate visibility (how much of section is in viewport)
        const top = Math.max(0, rect.top);
        const bottom = Math.min(viewportHeight, rect.bottom);
        const visibility = Math.max(0, bottom - top) / viewportHeight;

        const index = Array.from(sectionElements.keys()).indexOf(id);
        const progress = calculateSectionProgress(element);

        const sectionInfo: SectionInfo = {
          id,
          index,
          progress,
          isActive: visibility > 0.3
        };

        sectionsArray.push(sectionInfo);

        // Track most visible section
        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          activeSection = { ...sectionInfo, isActive: true };
        }
      });

      setSections(sectionsArray);

      if (activeSection) {
        setCurrentSection(activeSection);
      }
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [calculateSectionProgress, sectionElements]);

  // Set up intersection observer for sections
  useEffect(() => {
    // Find all sections
    const sectionIds = ['hero', 'legacy', 'portfolio', 'soundbyte', 'sonic', 'commission', 'footer'];
    const elements = new Map<string, HTMLElement>();

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        elements.set(id, element);
      }
    });

    setSectionElements(elements);
  }, []);

  // Get interpolated colors between sections
  const getInterpolatedColors = useCallback((): SectionColors => {
    const theme = SECTION_THEMES[currentSection.id] || SECTION_THEMES.hero;
    return {
      primary: theme.primary,
      secondary: theme.secondary,
      accent: theme.accent
    };
  }, [currentSection]);

  return {
    currentSection,
    sections,
    colors: getInterpolatedColors(),
    theme: SECTION_THEMES[currentSection.id] || SECTION_THEMES.hero
  };
}
