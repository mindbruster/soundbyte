/**
 * Featured Exhibition Section
 *
 * Highlights upcoming/current exhibitions
 * Art Dubai 2026 style showcase
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { springs } from '../../lib/animations/easings';

export function FeaturedExhibitionSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-luxury-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-gray/20 to-luxury-black" />

      <Container size="xl" className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...springs.waveGentle }}
            className="relative aspect-square lg:aspect-[4/5] overflow-hidden rounded-sm"
          >
            {/* Placeholder gradient - replace with actual image */}
            <div className="w-full h-full bg-gradient-to-br from-gold-500/30 via-luxury-gray to-luxury-black" />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-transparent" />

            {/* Badge */}
            <div className="absolute top-6 left-6 px-4 py-2 bg-gold-500/90 backdrop-blur-sm">
              <span className="text-luxury-black text-xs tracking-widest uppercase font-medium">
                Coming 2026
              </span>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...springs.waveGentle, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-gold-500 text-xs tracking-[0.2em] uppercase">
              Major Exhibition
            </p>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Art Dubai 2026
            </h2>

            <p className="text-white/60 text-lg leading-relaxed max-w-lg">
              Presents of Sound — A groundbreaking exhibition featuring 145 new works
              exploring the intersection of voice, memory, and visual art. Experience
              the evolution of SoundBYTE technology in an immersive gallery setting.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <div>
                <p className="font-display text-3xl text-gold-500">145</p>
                <p className="text-white/40 text-sm">New Works</p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold-500">March</p>
                <p className="text-white/40 text-sm">2026</p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold-500">Dubai</p>
                <p className="text-white/40 text-sm">UAE</p>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
