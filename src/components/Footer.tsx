import { Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full py-12 px-8 md:px-16 lg:px-24 bg-bg-navy">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-t border-text-light/10 pt-8">
        <div className="flex items-center gap-6 cursor-default text-text-light">
          <span className="font-display font-black text-3xl tracking-tighter uppercase">BLEU</span>
          <span className="w-[2px] h-6 bg-text-light/20"></span>
          <span className="font-sans text-sm font-medium text-text-light/60 uppercase tracking-[0.15em]">Wisnu Widya Pradana</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-sans text-xs text-text-light/30 tracking-widest uppercase hidden md:block">© 2024</span>
          <a
            href="https://github.com/halfthew0rldaway"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-text-light/10 text-text-light/50 hover:text-accent hover:border-accent transition-all duration-300 rounded-full"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://id.linkedin.com/in/wisnu-widya-pradana-152004324"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-text-light/10 text-text-light/50 hover:text-accent hover:border-accent transition-all duration-300 rounded-full"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
