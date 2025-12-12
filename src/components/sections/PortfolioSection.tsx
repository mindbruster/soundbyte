/**
 * Portfolio Section
 *
 * Premium gallery showcase with immersive artwork viewing.
 * Features:
 * - Masonry/grid layout with hover effects
 * - Full-screen modal with smooth transitions
 * - Category filtering
 * - Parallax image effects
 */

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Container } from '../ui/Container';
import { Heading, Text, Label } from '../ui/Typography';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../animations/ScrollReveal';
import { getFeaturedArtworks, categories, type Artwork } from '../../data/artworks';
import { springs, durations } from '../../lib/animations';
import { cn } from '../../lib/utils';

// ═══════════════════════════════════════════════════════════════════════════
// ARTWORK CARD COMPONENT - 3D Tilt Effect with Glow
// ═══════════════════════════════════════════════════════════════════════════

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
  onClick: () => void;
}

function ArtworkCard({ artwork, index, onClick }: ArtworkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth spring animation for tilt
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), springConfig);

  // Glowing light position
  const glowX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);

  // Handle mouse movement for 3D effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  // Vary card heights for masonry effect
  const heights = ['h-72', 'h-96', 'h-80', 'h-[400px]', 'h-72', 'h-96'];
  const heightClass = heights[index % heights.length];

  // Price badge for sold/price items
  const showPriceBadge = artwork.priceRange || artwork.sold;

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: durations.smooth, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-2xl',
        heightClass
      )}
    >
      {/* Animated glow effect following cursor */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(212, 168, 83, 0.4) 0%, transparent 50%)`
          ),
        }}
      />

      {/* Video, Image, or placeholder gradient background */}
      {artwork.video ? (
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            src={artwork.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-luxury-black/30" />
        </motion.div>
      ) : artwork.image ? (
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-luxury-black/40" />
        </motion.div>
      ) : (
        <motion.div
          className={cn(
            'absolute inset-0',
            'bg-gradient-to-br',
            index % 4 === 0 && 'from-gold-500/30 via-gold-700/20 to-luxury-black',
            index % 4 === 1 && 'from-amber-600/30 via-gold-600/20 to-luxury-black',
            index % 4 === 2 && 'from-gold-400/30 via-amber-700/20 to-luxury-black',
            index % 4 === 3 && 'from-yellow-600/30 via-gold-500/20 to-luxury-black'
          )}
          animate={{
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {/* Animated sound wave pattern */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.rect
              key={i}
              x={i * 4 + 1}
              width="2"
              fill="currentColor"
              className="text-gold-500"
              initial={{
                y: 50 - (Math.sin(i * 0.5) * 25 + 10),
                height: Math.sin(i * 0.5) * 50 + 20
              }}
              animate={isHovered ? {
                y: 50 - (Math.sin(i * 0.5 + Date.now() * 0.001) * 35 + 10),
                height: Math.sin(i * 0.5) * 70 + 30
              } : {
                y: 50 - (Math.sin(i * 0.5) * 25 + 10),
                height: Math.sin(i * 0.5) * 50 + 20
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </svg>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent opacity-90" />

      {/* Price/Sold badge */}
      {showPriceBadge && (
        <motion.div
          className="absolute top-4 right-4 z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <span className={cn(
            'px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm',
            artwork.sold
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
          )}>
            {artwork.sold ? 'SOLD' : artwork.priceRange}
          </span>
        </motion.div>
      )}

      {/* Content - 3D lifted effect */}
      <motion.div
        className="absolute inset-0 p-6 flex flex-col justify-end"
        style={{
          transform: 'translateZ(30px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? 0 : 5 }}
          transition={{ duration: 0.3 }}
          className="mb-3"
        >
          <span className="inline-block px-3 py-1 text-xs text-gold-400 bg-gold-500/10 rounded-full border border-gold-500/20 backdrop-blur-sm">
            {artwork.collection?.replace('-', ' ').toUpperCase()}
          </span>
        </motion.div>

        {/* Title with shine effect */}
        <h3 className="font-display text-xl sm:text-2xl text-white font-semibold mb-2 group-hover:text-gradient-gold transition-all duration-500">
          {artwork.title}
        </h3>

        {/* Year and medium */}
        <p className="text-white/50 text-sm mb-3">
          {artwork.year} • {artwork.medium}
        </p>

        {/* Description preview on hover */}
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/60 text-sm leading-relaxed mb-3 line-clamp-2"
        >
          {artwork.description}
        </motion.p>

        {/* View indicator */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-gold-500 text-sm font-medium"
        >
          <span>View Details</span>
          <motion.svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ x: isHovered ? [0, 5, 0] : 0 }}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </motion.div>
      </motion.div>

      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? '0 0 30px rgba(212, 168, 83, 0.3), inset 0 0 30px rgba(212, 168, 83, 0.1)'
            : '0 0 0px rgba(212, 168, 83, 0), inset 0 0 0px rgba(212, 168, 83, 0)',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold-500/40 transition-colors duration-500" />
    </motion.article>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ARTWORK MODAL COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  if (!artwork) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: durations.smooth }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-luxury-black/95 backdrop-blur-xl" />

      {/* Modal content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: 'spring', ...springs.smooth }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-luxury-charcoal border border-white/10"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Artwork preview - Image, Video, or Placeholder */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gold-500/20 via-gold-700/10 to-luxury-black">
            {/* Video if available */}
            {artwork.video ? (
              <video
                src={artwork.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : artwork.image ? (
              /* Image if available */
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            ) : (
              /* Sound wave visualization fallback */
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <svg className="w-3/4 h-3/4" viewBox="0 0 100 100">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <rect
                      key={i}
                      x={i * 3.33 + 1}
                      y={50 - (Math.sin(i * 0.4) * 35 + 10)}
                      width="2"
                      height={Math.sin(i * 0.4) * 70 + 20}
                      fill="currentColor"
                      className="text-gold-500"
                    />
                  ))}
                </svg>
              </div>
            )}

            {/* Sold badge */}
            {artwork.sold && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full">
                <span className="text-xs text-red-400 font-medium">SOLD</span>
              </div>
            )}
          </div>

          {/* Artwork details */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-gold-500 text-sm uppercase tracking-widest">
                {artwork.collection?.replace('-', ' ')}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mb-4">
              {artwork.title}
            </h2>

            <div className="space-y-3 mb-6 text-white/60">
              <p><span className="text-white/40">Year:</span> {artwork.year}</p>
              <p><span className="text-white/40">Medium:</span> {artwork.medium}</p>
              {artwork.dimensions && (
                <p><span className="text-white/40">Dimensions:</span> {artwork.dimensions}</p>
              )}
              {artwork.priceRange && (
                <p><span className="text-white/40">Price Range:</span> <span className="text-gold-500">{artwork.priceRange}</span></p>
              )}
            </div>

            <p className="text-white/70 leading-relaxed mb-6">
              {artwork.description}
            </p>

            {artwork.story && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                <p className="text-white/60 text-sm italic leading-relaxed">
                  "{artwork.story}"
                </p>
              </div>
            )}

            <div className="mt-auto pt-6 border-t border-white/10">
              <Button variant="primary" size="lg" fullWidth>
                Inquire About This Piece
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY FILTER COMPONENT - Magnetic Buttons
// ═══════════════════════════════════════════════════════════════════════════

interface MagneticButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

function MagneticButton({ children, isActive, onClick }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    x.set(deltaX * 0.3);
    y.set(deltaY * 0.3);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 relative overflow-hidden',
        isActive
          ? 'bg-gold-500 text-luxury-black shadow-lg shadow-gold-500/30'
          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
      )}
    >
      {/* Shine effect on hover */}
      <span className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <span className="relative">{children}</span>
    </motion.button>
  );
}

interface CategoryFilterProps {
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      <MagneticButton
        isActive={activeCategory === null}
        onClick={() => onCategoryChange(null)}
      >
        All Works
      </MagneticButton>
      {categories.map((cat) => (
        <MagneticButton
          key={cat.id}
          isActive={activeCategory === cat.id}
          onClick={() => onCategoryChange(cat.id)}
        >
          {cat.name}
        </MagneticButton>
      ))}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PORTFOLIO SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const featuredArtworks = getFeaturedArtworks();

  const filteredArtworks = activeCategory
    ? featuredArtworks.filter(a => a.collection === activeCategory)
    : featuredArtworks;

  const handleArtworkClick = useCallback((artwork: Artwork) => {
    setSelectedArtwork(artwork);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedArtwork(null);
    document.body.style.overflow = '';
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-24 sm:py-32 lg:py-40 bg-luxury-charcoal overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      <Container size="xl">
        {/* Section header */}
        <ScrollReveal direction="up" className="text-center mb-12 sm:mb-16">
          <Label variant="gold" className="mb-4">The Collection</Label>
          <Heading as="h2" size="title" align="center" className="mb-6">
            Selected <span className="text-gradient-gold">Works</span>
          </Heading>
          <Text size="lg" color="muted" align="center" className="max-w-2xl mx-auto">
            Each piece tells a story, transforming intimate moments and voices
            into timeless visual art.
          </Text>
        </ScrollReveal>

        {/* Category filter */}
        <ScrollReveal direction="up" className="mb-12">
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </ScrollReveal>

        {/* Artwork grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                index={index}
                onClick={() => handleArtworkClick(artwork)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View all CTA */}
        <ScrollReveal direction="up" className="text-center mt-16">
          <Button variant="outline" size="lg">
            View Complete Collection
          </Button>
        </ScrollReveal>
      </Container>

      {/* Artwork modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <ArtworkModal
            artwork={selectedArtwork}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>

      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-luxury-black to-transparent" />
    </section>
  );
}
