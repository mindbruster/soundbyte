/**
 * BYTEclub CTA Section
 *
 * Final call-to-action to join the community
 * Newsletter signup with benefits
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { springs } from '../../lib/animations/easings';

// ═══════════════════════════════════════════════════════════════════════════
// BYTECLUB SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function ByteclubSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('BYTEclub signup:', email);
      setIsSubmitted(true);
      setEmail('');
    }
  };

  const benefits = [
    "Early access to new drops",
    "Exclusive behind-the-scenes content",
    "Priority commission slots",
    "Private collector events"
  ];

  return (
    <section className="py-32 bg-luxury-black">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...springs.waveGentle }}
          className="relative p-12 md:p-16 rounded-2xl bg-gradient-to-br from-gold-500/10 via-luxury-gray/20 to-luxury-black border border-gold-500/20 text-center overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, ...springs.waveGentle }}
            >
              <p className="text-gold-500 text-xs tracking-[0.2em] uppercase mb-4">
                Join the Community
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-4">
                Join BYTEclub
              </h2>
              <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
                Be the first to know about new collections, exclusive drops, and private events.
                Join 2,500+ collectors and art enthusiasts.
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-10"
            >
              {benefits.map((benefit, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm"
                >
                  {benefit}
                </span>
              ))}
            </motion.div>

            {/* Form */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gold-500 text-lg"
              >
                Welcome to BYTEclub! Check your email for confirmation.
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, ...springs.waveGentle }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
                />
                <Button type="submit" variant="primary" size="lg">
                  Join Free
                </Button>
              </motion.form>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-white/30 text-sm mt-4"
            >
              No spam, ever. Unsubscribe anytime.
            </motion.p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
