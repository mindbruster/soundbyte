/**
 * Commission Page
 *
 * Standalone commission form page for easy sharing and bookmarking.
 * Features the full questionnaire experience.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { CommissionQuestionnaire } from '../components/sections';
import { ScrollReveal } from '../components/animations/ScrollReveal';

export function CommissionPage() {
  return (
    <section className="relative py-32 sm:py-40 bg-luxury-black min-h-screen">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px]" />
      </div>

      <Container size="xl">
        {/* Back link */}
        <ScrollReveal direction="up" className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </ScrollReveal>

        {/* Page intro */}
        <ScrollReveal direction="up" className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-6xl mb-6"
          >
            🎨
          </motion.div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-bold mb-6">
            Begin Your <span className="text-gradient-gold">SoundBYTE®</span> Journey
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Transform your most meaningful sounds into a one-of-a-kind masterpiece.
            Share your story, and Amrita will bring your voice to life in timeless visual art.
          </p>
        </ScrollReveal>

        {/* Key info cards */}
        <ScrollReveal direction="up" className="mb-12">
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
              <div className="text-3xl mb-3">💎</div>
              <h3 className="text-white font-semibold mb-2">Starting at $3,500</h3>
              <p className="text-white/50 text-sm">Museum-quality craftsmanship</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
              <div className="text-3xl mb-3">⏱️</div>
              <h3 className="text-white font-semibold mb-2">6-8 Weeks</h3>
              <p className="text-white/50 text-sm">Average creation time</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-white font-semibold mb-2">Ships Worldwide</h3>
              <p className="text-white/50 text-sm">Insured gallery crating</p>
            </div>
          </div>
        </ScrollReveal>
      </Container>

      {/* Questionnaire component */}
      <CommissionQuestionnaire />
    </section>
  );
}
