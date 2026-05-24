import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section ref={ref} className="relative w-full py-32 overflow-hidden bg-bg-navy text-text-light">

      {/* Texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.08%22/%3E%3C/svg%3E')] pointer-events-none" />

      {/* Kinetic Typography Background */}
      <div className="absolute inset-0 flex flex-col justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <motion.div style={{ x: x1 }} className="whitespace-nowrap font-display font-black text-[10rem] md:text-[18rem] uppercase leading-[0.8] tracking-tighter">
          CREATIVE DEVELOPMENT CREATIVE DEVELOPMENT
        </motion.div>
        <motion.div style={{ x: x2, WebkitTextStroke: '4px #F4F1EA' }} className="whitespace-nowrap font-display font-black text-[10rem] md:text-[18rem] uppercase leading-[0.8] text-transparent tracking-tighter">
          IMMERSIVE UI UX IMMERSIVE UI UX
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 min-h-[50vh] flex flex-col items-center justify-center text-center">
        <motion.div style={{ opacity }} className="w-full">
          <h2 className="font-display font-black text-5xl md:text-7xl lg:text-[7rem] uppercase tracking-tighter mb-16 leading-[0.9]">
            Building systems <br /> that feel <span className="text-accent italic font-bold">alive.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border-t border-text-light/20 pt-8"
          >
            <h3 className="font-sans font-bold text-xl uppercase tracking-[0.1em] mb-4">Aesthetic Engineering</h3>
            <p className="font-sans font-medium text-text-light/70 text-base leading-relaxed">
              Merging strict technical architecture with obsessive visual direction. Code is a medium for narrative and spatial design.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border-t border-text-light/20 pt-8"
          >
            <h3 className="font-sans font-bold text-xl uppercase tracking-[0.1em] mb-4">Scalable Experimentation</h3>
            <p className="font-sans font-medium text-text-light/70 text-base leading-relaxed">
              Balancing bleeding-edge interactive techniques with stable, production-ready systems that scale without compromising the experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border-t border-text-light/20 pt-8"
          >
            <h3 className="font-sans font-bold text-xl uppercase tracking-[0.1em] mb-4">Interactive Motion</h3>
            <p className="font-sans font-medium text-text-light/70 text-base leading-relaxed">
              Applying cinematic transitions, reactive states, and fluid animations to create interfaces that respond intuitively to human interaction.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
