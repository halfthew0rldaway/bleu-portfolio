import { motion } from 'motion/react';

const techs = [
  "React", "TypeScript", "Tailwind CSS", "Framer Motion",
  "Node.js", "Express", "PHP", "MySQL",
  "Python", "C++", "Linux", "Git", "Vite"
];

function TechCard({ name, index }: { name: string; index: number; key?: string | number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative border-b border-bg-navy/10 py-6 pr-6 flex justify-between items-center bg-bg-main"
    >
      <span className="font-sans font-medium text-lg md:text-2xl text-bg-navy group-hover:text-accent transition-colors duration-300 group-hover:translate-x-2 transform">
        {name}
      </span>
      <span className="font-display text-sm tracking-widest text-bg-navy/30 group-hover:text-accent/50 transition-colors shrink-0 ml-4">
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.div>
  );
}

export function TechStack() {
  return (
    <section className="relative w-full py-32 px-8 md:px-16 lg:px-24 bg-bg-main">
      {/* Decorative vertical stroke */}
      <div className="absolute top-0 bottom-0 left-8 md:left-16 lg:left-24 w-[1px] bg-bg-navy/10 z-0 hidden md:block" />

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Sticky heading */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <div className="text-sm font-sans tracking-[0.4em] text-accent mb-6 font-bold">01. CAPABILITIES</div>
            <h2 className="font-display text-6xl md:text-7xl font-black uppercase tracking-tighter text-bg-navy leading-[0.9]">
              Tech<br />Stack
            </h2>
          </motion.div>
        </div>

        {/* Right: Tech list */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {techs.map((tech, i) => (
              <TechCard key={tech} name={tech} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
