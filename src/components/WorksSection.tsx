import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PROJECTS_DATA } from '../data';
import { Project } from '../types';
import { Sparkles, ChevronRight, CornerDownRight, Server, Terminal, Code2, Database } from 'lucide-react';

// ==========================================
// INTERACTIVE COMPONENT 1: REIMBURSEKU LEDGER
// ==========================================
function ReimbursekuConsole() {
  const [claims, setClaims] = useState([
    { id: 'CLM-08', user: 'Wisnu P.', amount: '$240.00', status: 'Approved' },
    { id: 'CLM-09', user: 'Dev Team', amount: '$1,250.00', status: 'Pending' },
    { id: 'CLM-10', user: 'Design Hub', amount: '$435.50', status: 'Approved' },
  ]);

  const addClaim = () => {
    const names = ['Infra Node', 'API Gateway', 'Marketing', 'Static CDN', 'Relay Hook'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomAmount = `$${(Math.random() * 500 + 40).toFixed(2)}`;
    const randomId = `CLM-${Math.floor(Math.random() * 90 + 11)}`;
    setClaims(prev => [
      ...prev.slice(1),
      { id: randomId, user: randomName, amount: randomAmount, status: 'Pending' }
    ]);
  };

  return (
    <div className="w-full h-full p-5 font-mono text-[10px] bg-[#0E1524] text-emerald-400 flex flex-col justify-between select-none border-b border-[#F4EFE6]/5">
      <div className="flex justify-between items-center border-b border-emerald-500/20 pb-1 mb-3 text-[9px] text-[#F4EFE6]/50">
        <span className="flex items-center gap-1"><Server size={10} className="text-emerald-400" /> REIMBURSEKU // FINANCE LEDGER</span>
        <span className="text-emerald-400">DB_ONLINE</span>
      </div>

      <div className="border border-emerald-500/20 rounded-md p-2 bg-[#080B13]/80 my-auto flex-1 flex flex-col justify-center gap-1 max-h-[140px] overflow-hidden">
        <div className="flex justify-between text-emerald-500 font-black border-b border-emerald-500/20 pb-1 mb-1 focus:outline-none text-[8.5px] uppercase tracking-wider">
          <span>CLAIM ID</span>
          <span>SUBMITTER</span>
          <span>AMOUNT</span>
          <span>STATUS</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {claims.map((c) => (
            <motion.div
              key={c.id}
              initial={{ x: -8, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="flex justify-between items-center bg-[#131B2E] px-2 py-1 rounded border border-white/5"
            >
              <span className="text-amber-400 font-semibold">{c.id}</span>
              <span className="text-[#F4EFE6]/80">{c.user}</span>
              <span className="font-bold text-white">{c.amount}</span>
              <span className={`text-[7.5px] font-black px-1.5 py-0.5 rounded leading-none ${
                c.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400 animate-pulse'
              }`}>{c.status}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-[#111A2D] rounded border border-emerald-500/10 p-3 text-[#F4EFE6]/70 flex flex-col gap-2 mt-3 select-none">
        <div className="flex justify-between items-center text-[8px] text-emerald-500 font-black">
          <span>// STOCHASTIC APPROVAL LOGS</span>
          <span className="text-[7.5px] bg-[#9E2A2B] text-[#F4EFE6] px-1 font-sans font-black skew-x-[-10deg]">MUTABLE</span>
        </div>
        <p className="text-[8.5px] text-[#F4EFE6]/55 leading-normal">
          Client claims pipeline testing local reactivity, state synchronization, and micro ledger hooks.
        </p>
        <button
          onClick={(e) => { e.stopPropagation(); addClaim(); }}
          className="w-full py-2 bg-emerald-500/15 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 font-bold rounded uppercase cursor-pointer transition-all hover:scale-[1.01] active:scale-95 text-center text-[8px] tracking-widest mt-1"
        >
          [+] APPEND SIMULATED claim_row()
        </button>
      </div>
    </div>
  );
}

// ==========================================
// INTERACTIVE COMPONENT 2: FEDORA DIAGNOSTICS
// ==========================================
function FedoraProfilerConsole() {
  const [logs, setLogs] = useState<string[]>([
    '[$] system-profiler --run_verif',
    '>> Scanning environments: /usr/local/bin',
    '>> GCC COMPILER v14.1.0 ... [FOUND]',
    '>> DOCKER ENGINE CONTROLLER ... [ACTIVE]',
    '>> SYSTEM LATENCY MAPPING ... [12ms]',
    '>> System profile diagnostics complete.'
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const runVerification = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRunning) return;
    setIsRunning(true);
    setLogs(['[$] system-profiler --run_verif']);
    
    const steps = [
      '>> SCANNING KERNEL MEMORY MAPS API...',
      '>> CPU_THROTTLE_LOCK: [OK]',
      '>> AUDITING CORNING SHELL PIPELINES...',
      '>> NODE RUNTIME: v20.11.0 [VERIFIED]',
      '>> PIPESTRAP SEEDING COMPLETE',
      '>> STATUS: SYSTEM INSTANCE CALIBRATION PASS [98%]'
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          setIsRunning(false);
        }
      }, (idx + 1) * 350);
    });
  };

  return (
    <div className="w-full h-full p-5 font-mono text-[10px] bg-[#090F1B] text-[#F4EFE6]/90 flex flex-col justify-between select-none">
      <div className="flex justify-between items-center border-b border-[#F4EFE6]/10 pb-1 mb-3 text-[#F4EFE6]/40 text-[9px]">
        <span className="flex items-center gap-1"><Terminal size={10} className="text-sky-400 animate-pulse" /> SHELL SESSION // FEDORA PROFILER</span>
        <span>SYS_OK</span>
      </div>

      <div className="flex-1 my-2 overflow-y-auto font-mono text-[8.5px] leading-relaxed text-sky-300 flex flex-col gap-1.5 bg-black/40 p-2.5 rounded border border-sky-500/20 max-h-[140px] scrollbar-none">
        {logs.map((log, i) => (
          <div key={i} className={
            log.startsWith('[$]') 
              ? 'text-amber-400 font-bold' 
              : log.includes('OK') || log.includes('VERIFIED') || log.includes('PASS') || log.includes('COMPLETE')
              ? 'text-emerald-400 font-bold' 
              : 'text-sky-300'
          }>
            {log}
          </div>
        ))}
        {isRunning && <span className="text-emerald-400 animate-ping">_</span>}
      </div>

      <button
        onClick={runVerification}
        disabled={isRunning}
        className={`w-full py-2 border rounded font-black uppercase transition-all tracking-widest text-[8px] mt-3 ${
          isRunning 
            ? 'bg-sky-500/10 border-sky-500/20 text-sky-500/40 cursor-not-allowed' 
            : 'bg-sky-600/15 hover:bg-sky-600/30 border-sky-500/40 text-sky-400 cursor-pointer active:scale-[0.98]'
        }`}
      >
        {isRunning ? 'PROFILING SUBSYSTEM VARIABLES...' : 'EXECUTE SYSTEM HEALTH AUDIT'}
      </button>
    </div>
  );
}

// ==========================================
// INTERACTIVE COMPONENT 3: DOCSMITH COMPILER
// ==========================================
function DocsmithConsole() {
  const [md, setMd] = useState('# DOCSMITH AST\n- [x] Webpack modules\n- [ ] Output nodes');
  const [astRows, setAstRows] = useState([
    { type: 'Header', level: 1, text: 'DOCSMITH AST' },
    { type: 'ListItem', checked: true, text: 'Webpack modules' },
    { type: 'ListItem', checked: false, text: 'Output nodes' },
  ]);

  const compileMarkdown = (newText: string) => {
    setMd(newText);
    const lines = newText.split('\n');
    const newAst = lines.map(l => {
      if (l.startsWith('# ')) return { type: 'Header', level: 1, text: l.replace('# ', '') };
      if (l.startsWith('- [x] ')) return { type: 'ListItem', checked: true, text: l.replace('- [x] ', '') };
      if (l.startsWith('- [ ] ')) return { type: 'ListItem', checked: false, text: l.replace('- [ ] ', '') };
      return { type: 'Text', text: l };
    });
    setAstRows(newAst as any);
  };

  return (
    <div className="w-full h-full p-5 font-mono text-[9px] bg-[#111A2E] text-white flex flex-col justify-between select-none">
      <div className="flex justify-between items-center border-b border-orange-500/20 pb-1 mb-3 text-[9px] text-orange-400/60 font-black">
        <span className="flex items-center gap-1"><Code2 size={10} className="text-orange-400" /> AST PARSER // DOCSMITH MODULE</span>
        <span>AST-LIVE</span>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1 items-stretch max-h-[140px] overflow-hidden">
        {/* Editor */}
        <div className="bg-[#090F1B] border border-orange-500/20 p-2 rounded flex flex-col">
          <div className="text-[7px] text-orange-400/50 font-black border-b border-orange-500/10 pb-0.5 mb-1.5 uppercase">RAW STRING STREAM</div>
          <textarea
            value={md}
            onChange={(e) => compileMarkdown(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full flex-1 bg-transparent border-0 text-[#F4EFE6] font-mono text-[8px] focus:ring-0 p-0 resize-none h-[100px] outline-none"
            placeholder="Type raw compile markdown here..."
          />
        </div>

        {/* Abstract Syntax Tree */}
        <div className="bg-[#090F1B] border border-orange-500/20 p-2 rounded flex flex-col">
          <div className="text-[7px] text-orange-400/50 font-black border-b border-orange-500/10 pb-0.5 mb-1.5 uppercase">AST PARSED ARRAY</div>
          <div className="flex-1 flex flex-col gap-1 overflow-y-auto max-h-[100px] scrollbar-none">
            {astRows.map((row, i) => (
              <div key={i} className="bg-[#1C253C] rounded px-1.5 py-0.5 leading-tight flex flex-col border border-white/5">
                <span className="text-[6px] text-orange-400 font-bold uppercase">{row.type === 'Header' ? `Header(L${row.level})` : row.type}</span>
                <span className="text-[7.5px] text-[#F4EFE6] truncate leading-tight">{row.text || '(empty)'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[7.5px] text-[#F4EFE6]/40 mt-3 border-t border-[#F4EFE6]/10 pt-2">
        <span>GENERATED: {astRows.length} STRUCTURAL NODES</span>
        <span className="text-orange-400 font-bold">TYPE TO REPARSING</span>
      </div>
    </div>
  );
}

// ==========================================
// INTERACTIVE COMPONENT 4: FLUXSTATE GRAPH
// ==========================================
function FluxStateConsole() {
  const [store, setStore] = useState({
    session: 'STABLE_N01',
    latency: '8ms',
    dispatches: 18
  });

  const [sparkPulse, setSparkPulse] = useState(false);

  const dispatchAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSparkPulse(true);
    setStore(prev => ({
      ...prev,
      dispatches: prev.dispatches + 1,
      latency: `${Math.floor(Math.random() * 8 + 4)}ms`
    }));
    setTimeout(() => setSparkPulse(false), 300);
  };

  return (
    <div className="w-full h-full p-5 font-mono text-[9px] bg-[#0F1422] text-[#F4EFE6] flex flex-col justify-between select-none">
      <div className="flex justify-between items-center border-b border-[#F4EFE6]/10 pb-1 mb-3 text-[#F4EFE6]/40 text-[9px] font-black">
        <span className="flex items-center gap-1"><CornerDownRight size={10} className="text-rose-500" /> FLUX REACTOR STATE TREE</span>
        <span className="text-rose-500">SINGLE-SOURCE</span>
      </div>

      {/* Reactive Nodes Graph Visual */}
      <div className="relative flex-1 my-2 flex items-center justify-around bg-[#080B13]/60 rounded-md border border-rose-500/15 p-3 overflow-hidden max-h-[140px]">
        {sparkPulse && (
          <div className="absolute inset-x-8 top-1/2 h-[1px] bg-rose-500 shadow-[0_0_8px_#9E2A2B] animate-pulse z-0" />
        )}

        <div className="flex flex-col items-center z-10">
          <div className="w-9 h-9 bg-[#161F34]/95 border border-rose-500/20 rounded flex items-center justify-center font-black text-[7.5px] text-amber-500">
            DISP_
          </div>
          <span className="text-[6.5px] text-[#F4EFE6]/40 mt-1 uppercase font-bold">Event</span>
        </div>

        <div className="text-rose-500/40 text-xs select-none">»</div>

        <div className="flex flex-col items-center z-10">
          <div className="w-9 h-9 bg-[#161F34]/95 border border-rose-500/20 rounded-full flex items-center justify-center font-black text-[7.5px] text-emerald-400">
            MUTATE
          </div>
          <span className="text-[6.5px] text-[#F4EFE6]/40 mt-1 uppercase font-bold">Reducer</span>
        </div>

        <div className="text-rose-500/40 text-xs select-none">»</div>

        <div className="flex flex-col items-center z-10">
          <div className="w-9 h-9 bg-[#161F34]/95 border border-rose-500/40 rounded flex flex-col items-center justify-center font-black text-[7.5px] text-rose-400 shadow-[0_0_8px_rgba(158,42,43,0.3)]">
            <span>STORE</span>
            <span className="text-[6.5px] text-white">[{store.dispatches}]</span>
          </div>
          <span className="text-[6.5px] text-[#F4EFE6]/40 mt-1 uppercase font-bold">State</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-[7.5px] bg-black/40 p-2 rounded border border-white/5 mt-1 select-none text-[#F4EFE6]/80 leading-none">
        <span>NODE: <strong className="text-rose-400">{store.session}</strong></span>
        <span>LATENCY: <strong className="text-emerald-400">{store.latency}</strong></span>
        <span>COUNTS: <strong className="text-rose-400">{store.dispatches}</strong></span>
      </div>

      <button
        onClick={dispatchAction}
        className="w-full py-1.5 bg-rose-600/15 hover:bg-rose-600/30 border border-rose-500/35 text-rose-300 font-bold rounded uppercase cursor-pointer text-center text-[8px] tracking-widest mt-3 transition-all hover:scale-[1.01] active:scale-95"
      >
        [!] DISPATCH EVENTACTION()
      </button>
    </div>
  );
}

// ==========================================
// INTERACTIVE COMPONENT 5: JIKAN API INTERFACE
// ==========================================
function AnimyxConsole() {
  const animeCollection = [
    { title: 'COWBOY BEBOP', yr: '1998', genre: 'Sci-Fi / Space', rating: '9.8' },
    { title: 'NEON GENESIS EVANGELION', yr: '1995', genre: 'Mecha / Cyber', rating: '9.9' },
    { title: 'PERFECT BLUE', yr: '1997', genre: 'Thriller / Drama', rating: '9.7' },
    { title: 'AKIRA', yr: '1988', genre: 'Cyberpunk', rating: '9.6' }
  ];
  
  const [activeAnime, setActiveAnime] = useState(animeCollection[0]);

  return (
    <div className="w-full h-full p-5 font-mono text-[9px] bg-[#0A0E1A] text-[#F4EFE6] flex flex-col justify-between select-none">
      <div className="flex justify-between items-center border-b border-indigo-500/20 pb-1 mb-3 text-[#F4EFE6]/40 text-[9px] font-bold">
        <span className="flex items-center gap-1"><Database size={10} className="text-indigo-400" /> JIKAN REST API // LOCAL CATALOG</span>
        <span className="text-indigo-400">REST_UP</span>
      </div>

      <div className="flex gap-2 flex-1 items-stretch max-h-[140px] overflow-hidden">
        {/* List index */}
        <div className="w-[38%] bg-[#121B2F]/80 p-1 rounded border border-[#F4EFE6]/5 flex flex-col gap-1 overflow-y-auto scrollbar-none">
          {animeCollection.map(a => (
            <div
              key={a.title}
              onClick={(e) => { e.stopPropagation(); setActiveAnime(a); }}
              className={`px-2 py-1 rounded cursor-pointer text-[7.5px] font-semibold leading-tight truncate transition-all ${
                a.title === activeAnime.title 
                  ? 'bg-[#9E2A2B] text-white font-bold scale-[1.02]' 
                  : 'bg-black/30 text-[#F4EFE6]/60 hover:bg-[#1C253B]'
              }`}
            >
              {a.title}
            </div>
          ))}
        </div>

        {/* Card view */}
        <div className="flex-1 bg-black/40 border border-indigo-500/10 rounded p-2 flex flex-col justify-between relative overflow-hidden select-none">
          <div className="absolute top-0 right-0 text-[11px] opacity-[0.03] select-none font-sans font-black italic tracking-tighter uppercase whitespace-nowrap">
            JIKAN AP
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[6px] text-[#9E2A2B] font-black uppercase tracking-widest border border-[#9E2A2B]/40 px-1 py-0.5 rounded leading-none">
                {activeAnime.genre.split(' / ')[0]}
              </span>
              <span className="text-[6.5px] text-[#F4EFE6]/40 font-bold">
                {activeAnime.yr}
              </span>
            </div>
            <div className="font-display font-black text-[11px] italic tracking-tight text-[#F4EFE6] mt-2 truncate">
              {activeAnime.title}
            </div>
            <p className="text-[7.5px] text-[#F4EFE6]/55 mt-1 leading-normal">
              Endpoint sync. Jikan rating profile index: {activeAnime.rating}/10.
            </p>
          </div>

          <div className="flex items-center gap-1 px-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[6.5px] text-emerald-400 font-bold uppercase tracking-widest leading-none">
              QUERY_STATE: STATUS_OK
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[7.5px] text-[#F4EFE6]/40 mt-3 pt-2 border-t border-[#F4EFE6]/5">
        <span>RATE RANGE: 60/MIN STABLE</span>
        <span className="text-indigo-400 font-bold">CLICK COLLECTION</span>
      </div>
    </div>
  );
}

// Router switcher to draw respective interactive console
function RepoVisual({ repoKey }: { repoKey: string }) {
  switch (repoKey) {
    case 'reimburseku':
      return <ReimbursekuConsole />;
    case 'fedora_profiler':
      return <FedoraProfilerConsole />;
    case 'docsmith':
      return <DocsmithConsole />;
    case 'fluxstate':
      return <FluxStateConsole />;
    case 'animyx':
      return <AnimyxConsole />;
    default:
      return (
        <div className="w-full h-full bg-[#121A2C] text-[#F4EFE6] flex items-center justify-center font-mono text-xs">
          [!] CONSOLE OFFLINE
        </div>
      );
  }
}

interface CardProps {
  project: Project;
  index: number;
  total: number;
  key?: any;
}

function ProjectCard({ project, index, total }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll parameters representing individual stacking scale
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start']
  });

  const cardScale = useTransform(scrollYProgress, [0, 1], [0.95 + index * 0.01, 1]);

  return (
    <div
      ref={cardRef}
      className="sticky w-full max-w-5xl mx-auto py-6"
      style={{
        top: `${110 + index * 30}px`,
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{ scale: cardScale }}
        className="w-full bg-[#121A2C] text-[#F4EFE6] rounded-[42px] border border-[#F4EFE6]/12 shadow-[0px_25px_60px_-15px_rgba(4,6,10,0.6)] overflow-hidden flex flex-col lg:flex-row relative group min-h-[500px]"
      >
        {/* Subtle background gridding inside project cell */}
        <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none halftone-bg opacity-[0.03]" />
        
        {/* Floating gradient ambient highlight that coordinates with mouse hover */}
        <div className="absolute -inset-1 px-8 rounded-[42px] bg-gradient-to-tr from-[#9E2A2B]/10 to-[#D66A2C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

        {/* INTERACTIVE WORKSTATION CORES (LEFT or RIGHT depending on design spacing) */}
        {/* 100% CLEAN OF GRAPHICS AND CHARACTER IMAGES -> SOLSTICE TO DEVELOPERS ARCHITECTURE */}
        <div className={`w-full lg:w-[48%] relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-[#0a0f1b] border-b lg:border-b-0 ${
          project.layoutStyle === 'left' ? 'lg:order-last lg:border-l' : 'lg:border-r'
        } border-[#F4EFE6]/10`}>
          
          {/* Live Component representing actual code operations */}
          <div className="absolute inset-x-0 top-0 bottom-0">
            <RepoVisual repoKey={project.mainImage} />
          </div>

          {/* Layered manga accent overlay labels */}
          <div className="absolute left-6 top-6 flex flex-col gap-1.5 z-20 pointer-events-none">
            <span className="bg-[#9E2A2B] text-[#F4EFE6] text-[8px] font-mono tracking-widest px-2 py-0.5 shadow-sm uppercase rounded-sm">
              PLATE // {project.category}
            </span>
            <span className="bg-black/60 backdrop-blur-sm text-white/90 text-[8px] font-mono tracking-wider px-2 py-0.5 rounded-sm w-fit">
              YEAR_ {project.year}
            </span>
          </div>

          <div className="absolute right-6 bottom-6 flex gap-2 z-20 pointer-events-none">
            {project.stats.slice(0, 1).map((stat, sIdx) => (
              <span key={sIdx} className="bg-[#0B1220]/80 backdrop-blur-sm border border-[#F4EFE6]/20 text-[#F4EFE6] text-[9px] font-mono px-2.5 py-1 uppercase rounded-md shadow">
                {stat.label}: <strong className="text-[#D66A2C]">{stat.value}</strong>
              </span>
            ))}
          </div>

          {/* Retro film roll cell details along the edge */}
          <div className="absolute bottom-6 left-6 flex gap-1 z-20 opacity-80 select-none pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-1.5 h-3 border border-[#F4EFE6]/30 bg-transparent rounded-sm" />
            ))}
          </div>

          <div className="absolute inset-0 bg-radial from-transparent via-black/5 to-black/40 pointer-events-none" />
        </div>

        {/* DETAILS COPY SIDE */}
        <div className="w-full lg:w-[52%] p-8 md:p-12 flex flex-col justify-between relative z-10">
          
          {/* Card main header block */}
          <div>
            <div className="flex justify-between items-baseline mb-4">
              <span className="font-mono text-[10px] text-[#D66A2C] tracking-widest font-bold">
                // {project.client}
              </span>
              <span className="font-mono text-xs text-[#F4EFE6]/40 font-bold">
                [{index + 1} OF {total}]
              </span>
            </div>

            <h3 className="font-display font-black text-3.5xl md:text-3xl italic uppercase tracking-tighter text-[#F4EFE6] group-hover:text-[#D66A2C] transition-colors leading-none mb-3">
              {project.title}
            </h3>

            <p className="font-display font-semibold text-xs text-[#9E2A2B] uppercase tracking-wide mb-6 leading-tight max-w-md border-b border-[#F4EFE6]/10 pb-4">
              {project.tagline}
            </p>

            <p className="font-mono text-xs text-[#F4EFE6]/75 leading-relaxed mb-6 max-w-md bg-black/10 p-4 rounded-xl border border-white/5">
              {project.description}
            </p>
          </div>

          {/* Staggered process checkings */}
          <div className="mb-6">
            <h5 className="font-display text-[10px] font-black tracking-widest text-[#F4EFE6]/50 uppercase mb-3 flex items-center gap-1.5">
              <Sparkles size={11} className="text-[#D66A2C]" /> DEVELOPMENT FLOW // 実裝プロセス
            </h5>
            <ul className="flex flex-col gap-2">
              {project.process.map((step, sIdx) => (
                <li key={sIdx} className="flex gap-2.5 items-start text-left font-mono text-[10px] text-[#F4EFE6]/80 leading-relaxed">
                  <span className="text-[#9E2A2B] font-bold mt-0.5">»</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Repository Dynamic Link Target */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-[#F4EFE6]/10">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#1C253B] text-[#F4EFE6] text-[8px] font-mono tracking-widest uppercase px-2 py-1 border border-[#F4EFE6]/10 rounded-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9E2A2B] text-white hover:bg-[#D66A2C] transition-all font-display text-[9px] font-black tracking-widest uppercase rounded shadow-lg select-none hover:scale-[1.04] active:scale-95 z-20 self-end shrink-0"
              >
                DEPLOY FILE_VIEW <ChevronRight size={11} className="text-white" />
              </a>
            )}
          </div>

        </div>

      </motion.div>
    </div>
  );
}

export default function WorksSection() {
  return (
    <section
      id="works"
      className="relative min-h-screen bg-[#0B1220] rounded-t-[48px] md:rounded-t-[64px] border-t-[4px] border-[#9E2A2B] pt-24 pb-32 px-6 md:px-12 mt-[-32px] overflow-hidden leading-relaxed z-30"
    >
      {/* Editorial layout markings (Crimson grid details on dark blue) */}
      <div className="absolute inset-y-0 left-12 w-[1px] bg-[#F4EFE6]/5 border-dashed" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-[#F4EFE6]/5 border-dashed" />

      {/* Decorative vertical katakana indicators */}
      <div className="absolute left-4 top-1/3 text-white/5 font-display text-[11vw] tracking-tighter uppercase font-black italic select-none pointer-events-none writing-vertical h-fit">
        PORTFOLIO
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-16 md:mb-24">
        
        {/* Section Heading with high-contrast colored bars */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#F4EFE6]/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#9E2A2B] text-white text-xs font-mono px-2 py-0.5 tracking-widest skew-x-[-10deg]">
                SEC.03
              </span>
              <span className="font-mono text-xs text-[#F4EFE6]/60">DEVELOPER CORES // 実績</span>
            </div>
            
            <h2 className="font-display font-black text-4xl md:text-6xl italic uppercase tracking-tighter text-[#F4EFE6]">
              REAL REPOSITORIES
            </h2>
          </div>

          <div className="max-w-xs text-left md:text-right font-mono text-[9px] text-[#F4EFE6]/55 uppercase leading-normal">
            A CINEMATIC PORTFOLIO SHOWCASING GENUINE GITHUB DEVELOPMENT WORK, COMPILED OVER ACTUAL PROJECT SESSIONS. EVERY MODULE RENDERER ON THE LEFT IS FULLY INTERACTIVE.
          </div>
        </div>

      </div>

      {/* STACKED STICKY CARDS CONTAINER */}
      <div className="max-w-7xl mx-auto relative flex flex-col gap-12 pb-24">
        {PROJECTS_DATA.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={PROJECTS_DATA.length}
          />
        ))}
      </div>

      {/* Section End mark */}
      <div className="max-w-5xl mx-auto text-center font-mono text-[9px] text-[#F4EFE6]/30 uppercase tracking-widest mt-12 pb-6">
        — END OF CLASSIFIED PORTFOLIO TRACKS // CONTINUING TO MONITOR FEEDBACKS —
      </div>

    </section>
  );
}
