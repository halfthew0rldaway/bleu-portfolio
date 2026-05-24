import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface SectionWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  stagger?: boolean;
}

export const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

export const sectionItemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)', 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

export function SectionWrapper({ children, className, stagger = false, ...props }: SectionWrapperProps) {
  if (stagger) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        variants={sectionContainerVariants}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={sectionItemVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
