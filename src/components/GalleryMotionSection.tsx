import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { Play, Tv, Volume2, Monitor, Terminal, Server, Code2, Database } from 'lucide-react';

// ===============================================
// MAIN WORKSTATION PANE 1: SYSTEM MONITOR READOUT
// ===============================================
function SystemStationLogs() {
  const [logs, setLogs] = useState<string[]>([
    '[INIT] LOAD VXI_BOOTLOADER v9.9.8...',
    '[ OK ] SEEDING DYNAMIC PARSING FOR TSX',
    '[ OK ] INTEGRATE VITE PLUGINS // TAILWIND',
    '[ OK ] EXPRESS ROUTING ENGINE LINK: BIND 3000',
    '[ OK ] CONNECTED TO COMPOSITE-0 DEV PORT',
    '----------------------------------------',
    '[$] npm run build',
    'vite v5.2.11 building for production...',
    '✓ 182 modules transformed.',
    'dist/index.html                     0.45 kB │ gzip: 0.28 kB',
    'dist/assets/index-D8gHls13.css     84.12 kB │ gzip: 12.35 kB',
    'dist/assets/index-C8g7hX1k.js     342.90 kB │ gzip: 98.42 kB',
    '✓ built in 1420ms.',
    '[$] node dist/server.cjs',
    'Server running on http://0.0.0.0:3000'
  ]);

  useEffect(() => {
    const stream = [
      '[EVENT] INTERACTIVE VISUAL PORTAL ATTACHED_OK',
      '[PING] KEEP-ALIVE TRANSIT SENT SUCCESS ms=8',
      '✓ state re-indexing completed cleanly.',
      '[EVENT] REACT RE-RENDER TIMELINE RECONCILED',
      '[SYNC] REPOSITORY DIRECTORY CONTEXT ACTIVE',
      '[PING] WEBSOCKET BIND STATE STABLE'
    ];
    let idx = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(1), stream[idx]]);
      idx = (idx + 1) % stream.length;
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full p-6 bg-[#060B14] text-emerald-400 font-mono text-[9px] md:text-[10px] leading-relaxed flex flex-col justify-between select-none">
      <div className="flex justify-between items-center border-b border-emerald-500/20 pb-1.5 opacity-80 text-[8.5px]">
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> CORE SERVICE MONITOR</span>
        <span>STREAM_ACTIVE</span>
      </div>
      <div className="flex-1 my-3 font-mono text-[8.5px] md:text-[9px] leading-relaxed overflow-y-auto flex flex-col gap-1 pr-1 border border-emerald-500/10 p-3 bg-black/40 rounded scrollbar-none max-h-[140px] md:max-h-none">
        {logs.map((log, i) => (
          <div key={i} className={
            log.startsWith('[$]') 
              ? 'text-amber-400 font-bold' 
              : log.startsWith('✓') || log.includes('[ OK ]')
              ? 'text-emerald-400' 
              : log.startsWith('[INIT]')
              ? 'text-sky-455'
              : 'text-[#F4EFE6]/70'
          }>
            {log}
          </div>
        ))}
      </div>
      <div className="text-[7.5px] text-[#F4EFE6]/40 flex justify-between border-t border-emerald-500/10 pt-2 font-mono uppercase">
        <span>RUNTIME INSTANCE OK</span>
        <span>LATENCY: 12ms</span>
      </div>
    </div>
  );
}

// ===============================================
// MAIN WORKSTATION PANE 2: INTERACTIVE GIT MATRIX
// ===============================================
function GitContributionsTracker() {
  const [selectedCommit, setSelectedCommit] = useState({
    date: 'May 22, 2026',
    count: 8,
    msg: 'Refactored works architecture & cleaned fictional images'
  });

  const commitStories = [
    { date: 'May 18, 2026', count: 4, msg: 'Initialized FluxState global store core' },
    { date: 'May 19, 2026', count: 7, msg: 'Built Jikan endpoints and local caching tier' },
    { date: 'May 20, 2026', count: 2, msg: 'Calibrated Fedora script diagnostics pipelines' },
    { date: 'May 21, 2026', count: 12, msg: 'Designed receipt OCR claiming structures in ReimburseKu' },
    { date: 'May 22, 2026', count: 8, msg: 'Refactored works architecture & cleaned fictional images' },
  ];

  // Grid blocks representing calendar weeks
  const mockGrid = Array.from({ length: 5 }, (_, wIdx) => {
    return Array.from({ length: 7 }, (_, dIdx) => {
      const idx = (wIdx * 7 + dIdx) % commitStories.length;
      const commits = commitStories[idx];
      return {
        ...commits,
        intensity: commits.count > 10 ? 'bg-emerald-500 shadow-[0_0_5px_#22c55e]' : commits.count > 5 ? 'bg-emerald-600' : commits.count > 2 ? 'bg-emerald-700' : 'bg-[#1D253A]',
        dayIndex: dIdx
      };
    });
  });

  return (
    <div className="w-full h-full p-6 bg-[#0A0F1D] text-[#F4EFE6] font-mono text-[9px] md:text-[10px] flex flex-col justify-between select-none">
      <div className="flex justify-between items-center border-b border-[#F4EFE6]/10 pb-1.5 text-[8.5px] text-emerald-400">
        <span>// GIT_CONTRIBUTION_TRACKER_ONLINE</span>
        <span>CONTRIBUTION SESSIONS</span>
      </div>

      <div className="my-auto flex flex-col gap-3">
        <span className="text-[8px] text-[#F4EFE6]/40 uppercase tracking-widest font-black">// INTERACTIVE TELEMETRY COMMITS_</span>
        
        {/* Interactive Git Heatmap Grid */}
        <div className="flex gap-1.5 flex-wrap">
          {mockGrid.map((week, wI) => (
            <div key={wI} className="flex flex-col gap-1.5">
              {week.map((day, dI) => (
                <div
                  key={dI}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCommit({ date: day.date, count: day.count, msg: day.msg });
                  }}
                  className={`w-4 h-4 rounded-sm cursor-pointer border border-[#F4EFE6]/5 transition-all hover:scale-125 hover:rotate-6 ${day.intensity}`}
                  title={`${day.count} commits on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Selected Commit Detail Box */}
        <div className="bg-[#121A2C] border border-[#F4EFE6]/10 p-2.5 rounded-md flex flex-col gap-1 mutual-selection">
          <div className="flex justify-between text-[8px] text-emerald-400 font-bold uppercase leading-none">
            <span>Commit Date: {selectedCommit.date}</span>
            <span>Count: {selectedCommit.count} Commits</span>
          </div>
          <p className="text-[9.5px] text-[#F4EFE6]/85 leading-snug font-mono italic">
            "{selectedCommit.msg}"
          </p>
        </div>
      </div>

      <div className="text-[7.5px] text-[#F4EFE6]/40 border-t border-[#F4EFE6]/10 pt-2 flex justify-between">
        <span>CLICK GRID TILES FOR DETAILED SPECS</span>
        <span className="text-[#9E2A2B]">DEVELOPMENT COMPILATION EST. 1998</span>
      </div>
    </div>
  );
}

// ===============================================
// MAIN WORKSTATION PANE 3: INFRA ARCH BLUEPRINT
// ===============================================
function SystemArchitectureViewer() {
  return (
    <div className="w-full h-full p-6 bg-[#0E1524] text-[#F4EFE6] font-mono text-[9px] md:text-[10.5px] flex flex-col justify-between select-none">
      <div className="flex justify-between items-center border-b border-orange-500/20 pb-1.5 text-[8.5px] text-orange-400">
        <span>// FULL_STACK_SCHEMATIC_SERVICE_MAP</span>
        <span>BLUEPRINT_ACTIVE</span>
      </div>

      {/* Relational Schematic Vector Visual */}
      <div className="relative border border-orange-500/10 bg-black/40 p-4 rounded-md my-auto flex items-center justify-between gap-1.5 max-h-[140px] overflow-hidden">
        {/* Connection flow horizontal line */}
        <div className="absolute inset-x-8 top-[38px] h-[0.5px] bg-orange-500/25 z-0 border-dashed" />

        <div className="flex flex-col items-center gap-1.5 z-10 w-[22%]">
          <div className="w-9 h-9 bg-[#172136] border border-orange-500/30 rounded flex items-center justify-center text-orange-400">
            <Monitor size={14} />
          </div>
          <span className="text-[6.5px] text-[#F4EFE6]/55 uppercase font-black tracking-wider text-center max-w-[50px] leading-[1.1]">SPA VITE CLIENT</span>
        </div>

        <div className="text-orange-500/40 text-xs">»</div>

        <div className="flex flex-col items-center gap-1.5 z-10 w-[22%]">
          <div className="w-9 h-9 bg-[#172136] border border-orange-500/30 rounded-full flex items-center justify-center text-orange-400">
            <span className="text-[7px] font-black">EXPR</span>
          </div>
          <span className="text-[6.5px] text-[#F4EFE6]/55 uppercase font-black tracking-wider text-center max-w-[50px] leading-[1.1]">REST API CORE</span>
        </div>

        <div className="text-orange-500/40 text-xs text-right">»</div>

        <div className="flex flex-col items-center gap-1.5 z-10 w-[22%]">
          <div className="w-9 h-9 bg-[#172136] border border-orange-500/30 rounded flex items-center justify-center text-orange-400">
            <span className="text-[7px] font-black">AST</span>
          </div>
          <span className="text-[6.5px] text-[#F4EFE6]/55 uppercase font-black tracking-wider text-center max-w-[50px] leading-[1.1]">PARSING ENGINE</span>
        </div>

        <div className="text-orange-500/40 text-xs">»</div>

        <div className="flex flex-col items-center gap-1.5 z-10 w-[22%]">
          <div className="w-9 h-9 bg-[#172136] border border-orange-500/50 rounded flex flex-col items-center justify-center text-orange-500 shadow-[0_0_5px_rgba(214,106,44,0.3)] font-black text-[7px]">
            DB_S
          </div>
          <span className="text-[6.5px] text-[#F4EFE6]/55 uppercase font-black tracking-wider text-center max-w-[50px] leading-[1.1]">RELATION STORE</span>
        </div>
      </div>

      <p className="text-[8.5px] text-[#F4EFE6]/70 leading-relaxed max-w-2xl bg-[#121A2C] p-2.5 rounded-md border border-white/5">
        Requests clear from Client Widgets into Express REST controller structures, validating data trees securely against Postgres SQL relational stores.
      </p>

      <div className="text-[7px] text-[#F4EFE6]/40 border-t border-orange-500/10 pt-2 flex justify-between">
        <span>ARCHITECTURAL DRAWING SPEC REGISTERED FOR TOYO SYSTEM PLATFORMS</span>
        <span>SPEC_04_ARCH</span>
      </div>
    </div>
  );
}

// ===============================================
// MAIN WORKSTATION PANE 4: LIVE GITHUB API QUERY
// ===============================================
function GithubApiQueryConsole() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>({
    status: 200,
    statusText: 'OK',
    data: {
      username: 'halfthew0rldaway',
      total_repos: 51,
      profile: 'https://github.com/halfthew0rldaway',
      scope: 'public_repos'
    }
  });

  const queryApi = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    setResponse(null);
    setTimeout(() => {
      setResponse({
        status: 200,
        statusText: 'OK (FROM MEMORY_ CACHE)',
        data: {
          username: 'halfthew0rldaway',
          verified: true,
          fetched_at: new Date().toLocaleTimeString(),
          latency_ms: 6,
          active_projects: [
            'frontend-reimburseku',
            'fedora-dev-profiler',
            'docsmith',
            'FluxState',
            'animyx'
          ]
        }
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="w-full h-full p-6 bg-[#0B101D] text-violet-400 font-mono text-[9px] md:text-[10px] flex flex-col justify-between select-none">
      <div className="flex justify-between items-center border-b border-violet-500/20 pb-1.5 text-[8.5px]">
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" /> GITHUB API DIAL STATUS</span>
        <span>GATEWAY_STABLE</span>
      </div>

      <div className="my-auto flex-1 flex flex-col justify-center gap-2.5 max-h-[140px] overflow-hidden">
        <div className="flex gap-2 items-center">
          <span className="bg-violet-600 text-white text-[7.5px] px-1.5 py-0.5 rounded font-black max-h-[16px] leading-none">GET</span>
          <span className="font-mono text-[#F4EFE6]/70 text-[8.3px] select-all truncate bg-black/40 px-2 py-1 rounded border border-white/5 flex-1">
            https://api.github.com/users/halfthew0rldaway/repos
          </span>
        </div>

        <div className="bg-black/60 p-2.5 rounded border border-violet-500/10 flex-1 font-mono text-[8vw] lg:text-[8px] leading-tight overflow-y-auto w-full max-h-[85px] scrollbar-none">
          {loading ? (
            <div className="text-violet-300 animate-pulse flex flex-col gap-1.5 py-1">
              <span>&gt; ATTEMPTING HANDSHAKE WITH REMOTE REPOS INSTANCE...</span>
              <span>&gt; ROUTING DATA PARSE PACKETS...</span>
              <span>&gt; VERIFIED SSL CERTIFICATION ... DONE</span>
            </div>
          ) : response ? (
            <pre className="text-[#F4EFE6]/90 font-mono whitespace-pre-wrap leading-relaxed select-text">
              {JSON.stringify(response, null, 2)}
            </pre>
          ) : (
            <div className="text-[#F4EFE6]/40 leading-normal">
              No remote connection established. Press button below to launch dynamic queries.
            </div>
          )}
        </div>
      </div>

      <button
        onClick={queryApi}
        disabled={loading}
        className={`w-full py-2 border rounded font-black uppercase transition-all tracking-widest text-[8px] mt-2 ${
          loading 
            ? 'bg-violet-500/10 border-violet-500/20 text-violet-500/40 cursor-not-allowed' 
            : 'bg-violet-600/15 hover:bg-violet-600/30 border-violet-500/30 text-violet-300 cursor-pointer active:scale-[0.98]'
        }`}
      >
        {loading ? 'COMPILING REPOSITORY METRICS...' : 'LAUNCH GITHUB STATUS DIAG'}
      </button>
    </div>
  );
}

// Visual Switcher logic inside Gallery panel Frame
function GalleryPaneVisual({ type }: { type: string }) {
  switch (type) {
    case 'dev_setup':
      return <SystemStationLogs />;
    case 'git_contributions':
      return <GitContributionsTracker />;
    case 'sys_arch':
      return <SystemArchitectureViewer />;
    case 'api_feed':
      return <GithubApiQueryConsole />;
    default:
      return (
        <div className="w-full h-full bg-[#0B1220] flex items-center justify-center font-mono text-white text-xs">
          STATION OFFLINE
        </div>
      );
  }
}

export default function GalleryMotionSection() {
  const [activeItem, setActiveItem] = useState<GalleryItem>(GALLERY_ITEMS[0]);
  const [timecodeStr, setTimecodeStr] = useState('00:03:14:00');
  const [vhsStat, setVhsStat] = useState<'PLAY' | 'REW'>('PLAY');

  // timecode generator ticking naturally like physical VCR decks
  useEffect(() => {
    let frame = 0;
    let sec = 14;
    let min = 3;
    let hr = 0;

    const interval = setInterval(() => {
      frame += 1;
      if (frame >= 30) {
        frame = 0;
        sec += 1;
        if (sec >= 60) {
          sec = 0;
          min += 1;
          if (min >= 60) {
            min = 0;
            hr += 1;
          }
        }
      }

      const fStr = frame.toString().padStart(2, '0');
      const sStr = sec.toString().padStart(2, '0');
      const mStr = min.toString().padStart(2, '0');
      const hStr = hr.toString().padStart(2, '0');

      setTimecodeStr(`${hStr}:${mStr}:${sStr}:${fStr}`);
    }, 33.3); // roughly 30fps clock

    return () => clearInterval(interval);
  }, []);

  const selectItem = (item: GalleryItem) => {
    setVhsStat('REW');
    setTimeout(() => {
      setActiveItem(item);
      setVhsStat('PLAY');
    }, 400); // Speed index switch with distortion warp
  };

  return (
    <section
      id="gallery"
      className="relative min-h-screen py-24 bg-[#F4EFE6] text-[#0B1220] overflow-hidden flex flex-col justify-center border-b-2 border-[#0B1220]"
    >
      {/* Decorative layout grids background */}
      <div className="absolute inset-0 halftone-bg pointer-events-none opacity-[0.04]" />
      
      {/* Inner spacing bounds borders */}
      <div className="absolute top-0 inset-x-12 h-[1px] bg-[#0B1220]/15" />
      <div className="absolute bottom-0 inset-x-12 h-[1px] bg-[#0B1220]/15" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10">
        
        {/* Editorial Heading Grid */}
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-12 border-b-2 border-[#0B1220] pb-6">
          <div className="flex gap-4 items-center">
            <span className="bg-[#D66A2C] text-[#F4EFE6] text-xs font-mono px-2 py-0.5 tracking-widest skew-x-[-10deg]">
              SEC.04
            </span>
            <h3 className="font-display font-black text-2xl md:text-3xl italic text-[#0B1220] uppercase tracking-tighter">
              DEVELOPMENT WORKSTATIONS // 実驗室
            </h3>
          </div>
          <span className="font-mono text-[9px] text-[#0B1220]/60 uppercase tracking-widest">
            PROCESS SIMULATORS // MULTI-CHANNEL PROCESS // NO ANALOG CHARACTERS OUTSIDE HERO BOUNDS
          </span>
        </div>

        {/* METICULOUS SPLIT-SCREEN WORKSTATION LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch pt-2">
          
          {/* THEATER TERMINAL SCREEN (LEFT/CENTER) */}
          <div className="flex-1 flex flex-col gap-4">
            
            <div className="relative w-full aspect-[16/9] bg-[#0B1220] rounded-[24px] border-[4px] border-[#0B1220] shadow-[12px_12px_0px_rgba(11,18,32,0.1)] overflow-hidden flex items-center justify-center group select-none">
              
              {/* Continuous micro CRT scanline layer */}
              <div className="absolute inset-0 vintage-scanlines opacity-25 z-20 pointer-events-none" />
              
              {/* Overlay CRT screen glint curvature highlight */}
              <div className="absolute inset-0 pointer-events-none bg-radial from-white/5 via-transparent to-black/40 z-20" />
              
              {/* CRT Static distortion flicker simulation on actions */}
              <AnimatePresence mode="wait">
                {vhsStat === 'REW' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.8, 0.4, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-[#F4EFE6] z-30 pointer-events-none flex flex-col items-center justify-center mix-blend-difference"
                  >
                    {/* VHS Warp lines */}
                    <div className="w-full h-8 bg-black/60 absolute top-1/4 animate-bounce" />
                    <div className="w-full h-4 bg-black/40 absolute bottom-1/3" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ACTIVE INTERACTIVE WORKSTATION PANEL WITH TRANSITION */}
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0.8, filter: 'blur(3px)', scale: 1.01 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <GalleryPaneVisual type={activeItem.imageUrl} />
              </motion.div>

              {/* VHS VCR HUD STATS OVERLAYS */}
              <div className="absolute top-5 left-6 select-none font-mono text-[9px] md:text-[11px] text-[#F4EFE6] tracking-widest z-20 flex flex-col gap-1 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse border border-white/20" />
                  <span>{vhsStat === 'REW' ? 'SYSTEM REW' : 'RUNNING >>'}</span>
                </div>
                <span>CORE METRICS</span>
              </div>

              <div className="absolute top-5 right-6 select-none font-mono text-[9px] md:text-[11px] text-[#F4EFE6] tracking-widest z-20 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] flex flex-col items-end">
                <span>STEREO 100%_</span>
                <span className="text-[9px] opacity-70 uppercase">M98 STACK</span>
              </div>

              {/* Timecode absolute HUD */}
              <div className="absolute bottom-5 left-6 select-none font-mono text-xs md:text-sm text-[#F4EFE6] tracking-widest z-20 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] font-bold">
                TCR {timecodeStr}
              </div>

              <div className="absolute bottom-5 right-6 select-none font-mono text-xs md:text-sm text-[#F4EFE6] tracking-widest z-20 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] text-right">
                CH. {activeItem.tag}
              </div>

              {/* Decorative crosshair target lines */}
              <div className="absolute inset-y-12 left-1/2 w-[0.5px] bg-[#F4EFE6]/15 pointer-events-none z-10" />
              <div className="absolute inset-x-20 top-1/2 h-[0.5px] bg-[#F4EFE6]/15 pointer-events-none z-10" />

            </div>

            {/* SCREEN FEEDBACK DETAILS GRID */}
            <div className="flex justify-between items-center bg-[#0B1220] text-[#F4EFE6] px-6 py-4 rounded-xl border border-[#0B1220] shadow select-none">
              <div className="flex gap-4 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D66A2C] animate-ping" />
                <span className="font-mono text-[9px] tracking-widest uppercase text-[#F4EFE6]/80">
                  DASHBOARD INPUT // STATION PORT_3000
                </span>
              </div>
              <div className="flex items-center gap-3 text-[#F4EFE6]/50">
                <Volume2 size={14} />
                <Tv size={14} className="text-[#D66A2C]" />
                <span className="font-mono text-[9px] font-black uppercase text-white tracking-widest">
                  MONEX_SYS_INDEX FEED
                </span>
              </div>
            </div>

            {/* INTROSPECTIVE GRAPHIC CAPTIONS */}
            <div className="py-4 px-1 select-none">
              <h4 className="font-display font-black text-xl italic uppercase tracking-tighter text-[#0B1220] mb-2">
                {activeItem.title} // <span className="text-[#9E2A2B]">{activeItem.japaneseTranslation}</span>
              </h4>
              <p className="font-mono text-xs text-[#0B1220]/75 leading-relaxed max-w-2xl bg-white/40 p-4 rounded-xl border border-[#0B1220]/10 border-dashed">
                {activeItem.descriptionText}
              </p>
            </div>

          </div>

          {/* CELLULOID NEGS FILMSTRIP BAR (RIGHT/BOTTOM) */}
          <div className="w-full lg:w-80 flex flex-col justify-start">
            
            {/* Sprocket track Header info */}
            <div className="flex justify-between items-center text-mono px-3 py-1 font-mono text-[8px] text-[#0B1220]/45 border-b border-[#0B1220]/15 select-none font-bold">
              <span> TOYO MOUNT SAFETY COMP_B // SYS_X</span>
              <span>EXP. 1998</span>
            </div>

            {/* TACTILE MOUNTED CELL LIST */}
            <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible py-4 select-none scrollbar-none">
              
              {GALLERY_ITEMS.map((item, index) => {
                const isActive = item.id === activeItem.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => selectItem(item)}
                    className="relative shrink-0 flex flex-col group cursor-pointer focus:outline-none"
                  >
                    {/* Simulated film-strip frame cell edge spacing gaps */}
                    <div className="flex lg:flex-row justify-between w-full h-2 px-6 opacity-40 select-none pointer-events-none">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-[#0B1220] rounded-sm" />
                      ))}
                    </div>

                    <div className={`relative aspect-[4/3] w-48 sm:w-56 lg:w-full rounded-xl border-[2px] p-1.5 transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#0B1220] border-[#0B1220] scale-[1.02] shadow-[4px_4px_10px_rgba(11,18,32,0.15)]' 
                        : 'bg-[#F4EFE6] border-[#0B1220]/25 hover:border-[#9E2A2B]'
                    }`}>
                      
                      {/* Film cell styled container representing real metrics */}
                      <div className="relative w-full rounded-lg overflow-hidden border border-[#0B1220]/10 h-[96px] lg:h-[120px]">
                        <div className={`w-full h-full flex flex-col items-center justify-center p-3 select-none transition-all duration-300 ${
                          isActive ? 'bg-[#121A2C] text-[#F4EFE6]' : 'bg-[#1D253A] text-[#F4EFE6]/65 hover:bg-[#232E4B]'
                        }`}>
                          {item.imageUrl === 'dev_setup' && (
                            <div className="flex flex-col items-center gap-1.5">
                              <Terminal size={18} className="text-emerald-400" />
                              <span className="font-mono text-[7px] font-black uppercase tracking-widest text-[#F4EFE6]/50">CONSOLE_LOGS</span>
                            </div>
                          )}
                          {item.imageUrl === 'git_contributions' && (
                            <div className="flex flex-col items-center gap-1.5">
                              <div className="grid grid-cols-4 gap-0.5">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-sm" />
                                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-sm" />
                                <div className="w-1.5 h-1.5 bg-emerald-700 rounded-sm" />
                                <div className="w-1.5 h-1.5 bg-[#1D253A] rounded-sm" />
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-sm" />
                                <div className="w-1.5 h-1.5 bg-[#1D253A] rounded-sm" />
                                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-sm" />
                                <div className="w-1.5 h-1.5 bg-emerald-700 rounded-sm" />
                              </div>
                              <span className="font-mono text-[7px] font-black uppercase tracking-widest text-[#F4EFE6]/50">COMMITS_HEAT</span>
                            </div>
                          )}
                          {item.imageUrl === 'sys_arch' && (
                            <div className="flex flex-col items-center gap-1.5">
                              <Server size={18} className="text-orange-400" />
                              <span className="font-mono text-[7px] font-black uppercase tracking-widest text-[#F4EFE6]/50">SERVICE_NODE</span>
                            </div>
                          )}
                          {item.imageUrl === 'api_feed' && (
                            <div className="flex flex-col items-center gap-1.5">
                              <Database size={18} className="text-indigo-400" />
                              <span className="font-mono text-[7px] font-black uppercase tracking-widest text-[#F4EFE6]/50">GITHUB_API</span>
                            </div>
                          )}
                          <div className="absolute inset-0 halftone-bg opacity-10" />
                        </div>

                        <div className="absolute bottom-1.5 left-2 bg-[#0B1220]/80 backdrop-blur-sm text-[#F4EFE6] text-[7.5px] font-mono px-1.5 py-0.5 rounded-sm">
                          CH_{item.tag.slice(-2)}
                        </div>
                      </div>

                    </div>

                    {/* Cell title marker subscript */}
                    <div className="flex justify-between pr-3 pl-1.5 mt-2 select-none pointer-events-none font-mono text-[8px] text-[#0B1220]/60 uppercase">
                      <span>FRAME _{index + 1}</span>
                      <span className={isActive ? 'text-[#9E2A2B] font-bold' : ''}>
                        {isActive ? '● IN SCREEN' : 'SWITCH'}
                      </span>
                    </div>

                    <div className="flex lg:flex-row justify-between w-full h-2 px-6 mt-1 opacity-40 select-none pointer-events-none">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-[#0B1220] rounded-sm" />
                      ))}
                    </div>

                  </div>
                );
              })}

            </div>

            {/* Sprocket track Footer info */}
            <div className="flex justify-between items-center text-mono px-3 py-1 mt-4 font-mono text-[7px] text-[#0B1220]/45 border-t border-[#0B1220]/15 select-none font-semibold uppercase">
              <span>DIAGNOSTIC PROCESS GRID // CODE CORES STATUS</span>
              <span>100% RELIABILITY</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
