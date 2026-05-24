import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

const isTouchDevice = typeof window !== 'undefined' && 
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

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

  // Mobile: animate per-word (fewer observers, less overhead)
  if (isTouchDevice) {
    return (
      <span className={className} {...props}>
        {words.map((word, wordIndex) => {
          const currentDelay = delay + (wordIndex * stagger * 3);
          return (
            <React.Fragment key={wordIndex}>
              <motion.span
                initial={{ opacity: 0, y: '0.2em' }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: currentDelay,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
              {wordIndex !== words.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </React.Fragment>
          );
        })}
      </span>
    );
  }

  // Desktop: animate per-character (full premium effect)
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

