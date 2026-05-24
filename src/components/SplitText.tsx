import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface SplitTextProps extends HTMLMotionProps<"span"> {
  text: string;
  delay?: number;
  stagger?: number;
}

export function SplitText({ 
  text, 
  className = "", 
  delay = 0,
  stagger = 0.03,
  ...props
}: SplitTextProps) {
  const words = text.split(' ');
  let charCount = 0;

  return (
    <span className={className} {...props}>
      {words.map((word, wordIndex) => {
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split('').map((char, charIndex) => {
              const currentDelay = delay + (charCount * stagger);
              charCount++;
              return (
                <motion.span
                  key={charIndex}
                  initial={{ opacity: 0, y: '0.2em', rotateX: -45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.8,
                    delay: currentDelay,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-block origin-bottom"
                >
                  {char}
                </motion.span>
              );
            })}
            {wordIndex !== words.length - 1 && (
              charCount++,
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </span>
  );
}
