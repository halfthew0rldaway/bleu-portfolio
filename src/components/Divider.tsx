import React from 'react';
import { motion } from 'motion/react';

export function Divider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-center"
    />
  );
}
