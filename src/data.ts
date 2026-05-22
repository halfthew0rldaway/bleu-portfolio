import { Project, MarqueeCard, GalleryItem } from './types';

// Let's grab the actual generated image URLs to ensure precise rendering of the visual identity
export const IMAGES = {
  hero: '/src/assets/images/bleu_hero_1779430067423.png',
  about: '/src/assets/images/bleu_about_1779430092477.png',
  works: '/src/assets/images/bleu_works_1779430110272.png',
  gallery: '/src/assets/images/bleu_gallery_1779430125929.png',
  contact: '/src/assets/images/bleu_contact_1779430140625.png'
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj_reimburseku',
    title: 'FRONTEND-REIMBURSEKU',
    client: 'CORPORATE CLAIMS DEV',
    category: 'FINANCIAL CLIENT APP',
    year: '2024',
    tagline: 'IMMUTABLE EXPENSE ROUTING & TRANSACTIONAL WORKFLOWS.',
    description: 'A responsive administrative portal designed for real-time employee expense recording, digital receipt processing, and corporate reimbursement approval tracks. Built with optimized form validation and local security caching.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    mainImage: 'reimburseku', // Renders custom technical interactive schema in WorksSection
    repoUrl: 'https://github.com/halfthew0rldaway/frontend-reimburseku',
    color: '#9E2A2B', // Crimson
    layoutStyle: 'right',
    stats: [
      { label: 'Role', value: 'Frontend Developer' },
      { label: 'Core Tech', value: 'Vite SPA' },
      { label: 'Status', value: 'Stable Production' }
    ],
    process: [
      'Engineered localized authentication states and secure route guards.',
      'Developed high-density grid structures handling complex multi-currency tables.',
      'Integrated high-fidelity responsive forms with granular state checks.'
    ]
  },
  {
    id: 'proj_fedora_profiler',
    title: 'FEDORA-DEV-PROFILER',
    client: 'LINUX SYSTEMS LAB',
    category: 'SYSTEM SHELL TOOL',
    year: '2024',
    tagline: 'AUTOMATED WORKSPACE CALIBRATION & HARDWARE METERING.',
    description: 'A detailed system profiling and optimization tool designed specifically for Fedora environments, scanning available runtimes, compiling developer environment metrics, and executing system optimization scripts.',
    tags: ['Shell Script', 'Linux DevOps', 'Fedora Core', 'System Diagnostics'],
    mainImage: 'fedora_profiler', // Renders custom interactive terminal panel
    repoUrl: 'https://github.com/halfthew0rldaway/fedora-dev-profiler',
    color: '#0B1220', // Midnight Blue
    layoutStyle: 'left',
    stats: [
      { label: 'Role', value: 'DevOps Author' },
      { label: 'Platform', value: 'Fedora OS' },
      { label: 'Coverage', value: '100% Shell Native' }
    ],
    process: [
      'Constructed modular diagnostic tasks scanning GCC, Docker, and Node runtimes.',
      'Designed real-time metrics summarizing latency, disk usage, and temperature.',
      'Automated terminal output formatted in structural grid drawings.'
    ]
  },
  {
    id: 'proj_docsmith',
    title: 'DOCSMITH BUILDER',
    client: 'TEXT WORKSPACE UTILITY',
    category: 'MARKDOWN GRAPHICS TOOL',
    year: '2025',
    tagline: 'AST-DRIVEN DOCUMENT COMPILING & CLEAN MARKDOWN RENDERING.',
    description: 'A specialized web-based text workspace and documentation compiler parsing hierarchical documents and rendering instant previews on a high-contrast layout grid.',
    tags: ['TypeScript', 'JS Markdown', 'AST Compiler', 'Webpack'],
    mainImage: 'docsmith', // Renders interactive markdown renderer
    repoUrl: 'https://github.com/halfthew0rldaway/docsmith',
    color: '#D66A2C', // Safety Orange
    layoutStyle: 'split',
    stats: [
      { label: 'Role', value: 'Lead Engineer' },
      { label: 'Parsing', value: 'Unified Markdown AST' },
      { label: 'Latency', value: 'Immediate' }
    ],
    process: [
      'Implemented recursive custom parser logic converting markdown syntax maps.',
      'Crafted interactive keyboard shortcut hooks mapping editor view actions.',
      'Stylized 90s terminal print layout modes mimicking technical pamphlets.'
    ]
  },
  {
    id: 'proj_fluxstate',
    title: 'FLUXSTATE ENGINE',
    client: 'FRONTEND INFRASTRUCTURE',
    category: 'STATE MACHINE LIBRARY',
    year: '2025',
    tagline: 'LEAN, IMMUTABLE REACTION ENGINE WITH ZERO OVERHEAD.',
    description: 'A modular and lightweight state management framework crafted for high-performance React client apps. Implements unidirectional state trees with strict dispatch tracking and telemetry logging.',
    tags: ['TypeScript', 'NPM Package', 'Flux Pattern', 'Performance'],
    mainImage: 'fluxstate', // Renders interactive state dispatch loop
    repoUrl: 'https://github.com/halfthew0rldaway/FluxState',
    color: '#9E2A2B',
    layoutStyle: 'right',
    stats: [
      { label: 'Role', value: 'Package Author' },
      { label: 'Weight', value: '<1.3 KB Gzipped' },
      { label: 'Re-renders', value: 'Zero Overloading' }
    ],
    process: [
      'Formulated custom observer patterns tracking nested state objects.',
      'Created dispatch tracer hooks reporting snapshot changes directly to consoles.',
      'Validated package tree shaking under modern bundler requirements.'
    ]
  },
  {
    id: 'proj_animyx',
    title: 'ANIMYX DIRECTORY',
    client: 'MEDIA RESEARCH LAB',
    category: 'REST CATALOG UTILITY',
    year: '2024',
    tagline: 'IMMERSIVE CATALOG SYNCING AND LIST RECORDINGS.',
    description: 'A high-speed dashboard catalog compiling anime metadata, tracking user lists, and digesting REST API payloads into complex grid components.',
    tags: ['React', 'Tailwind', 'Jikan API', 'Local Caching'],
    mainImage: 'animyx', // Renders interactive catalog component
    repoUrl: 'https://github.com/halfthew0rldaway/animyx',
    color: '#0B1220',
    layoutStyle: 'left',
    stats: [
      { label: 'Role', value: 'UI Architect' },
      { label: 'Data Source', value: 'Jikan REST API' },
      { label: 'Caching Tier', value: 'Local Storage Sync' }
    ],
    process: [
      'Optimized client throttle intervals avoiding Jikan rate exceeding limits.',
      'Composed high-density visual list matrices using CSS grid classes.',
      'Configured local watchlists that persist completely across reload cycles.'
    ]
  }
];

export const MARQUEE_TOP_ROW: MarqueeCard[] = [
  {
    id: 'm1',
    type: 'image',
    title: 'SERENE ANGLE',
    imageUrl: IMAGES.about,
    aspectRatioClassName: 'w-72 h-96'
  },
  {
    id: 'm2',
    type: 'typography',
    text: '冷静と情熱のあいだ', // Between calmness and passion (Japanese title)
    highlightText: 'BLEU',
    aspectRatioClassName: 'w-96 h-48 bg-midnight text-paper p-6'
  },
  {
    id: 'm3',
    type: 'sketch',
    title: 'HEADPHONES CLOSE-UP',
    imageUrl: IMAGES.hero,
    aspectRatioClassName: 'w-80 h-80'
  },
  {
    id: 'm4',
    type: 'panel',
    title: 'COURT BLUEPRINT',
    subtitle: 'RETRO COURT // 1998',
    aspectRatioClassName: 'w-64 h-96 bg-crimson text-paper'
  },
  {
    id: 'm5',
    type: 'image',
    title: 'THE CHIN LEAN',
    imageUrl: IMAGES.works,
    aspectRatioClassName: 'w-72 h-96'
  }
];

export const MARQUEE_BOTTOM_ROW: MarqueeCard[] = [
  {
    id: 'mb1',
    type: 'typography',
    text: 'ブルー・バスケットボール', // Bleu Basketball
    highlightText: 'ACTIVE MIND',
    aspectRatioClassName: 'w-96 h-48 bg-crimson text-paper p-6'
  },
  {
    id: 'mb2',
    type: 'image',
    title: 'THE RISING GLAZE',
    imageUrl: IMAGES.gallery,
    aspectRatioClassName: 'w-72 h-96'
  },
  {
    id: 'mb3',
    type: 'sketch',
    title: 'PORTRAIT PROFILE',
    imageUrl: IMAGES.contact,
    aspectRatioClassName: 'w-80 h-96'
  },
  {
    id: 'mb4',
    type: 'panel',
    title: 'CASSETTE TAPE PLAYBACK',
    subtitle: 'STUDIO SESSIONS VOL. 4',
    aspectRatioClassName: 'w-80 h-48 bg-midnight text-paper'
  },
  {
    id: 'mb5',
    type: 'image',
    title: 'THE MAIN POSTER',
    imageUrl: IMAGES.hero,
    aspectRatioClassName: 'w-96 h-64'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal_dev',
    title: 'DEVELOPMENT WORKSTATION',
    caption: 'MONITORING SHUTTLE AND RUNTIME COMPILER STATUS.',
    imageUrl: 'dev_setup', // Renders interactive diagnostic station in GalleryMotionSection
    descriptionText: 'Real-time sandbox logs, build terminal traces, and compiling environments testing syntax rules. Represents 90s console-based local development rigs with scanline frames.',
    japaneseTranslation: '開発ワークステーション // システム構築',
    tag: 'MODULE 01'
  },
  {
    id: 'gal_git',
    title: 'COMMITS TELEMETRY TRACK',
    caption: 'VISUALIZING SOURCE CONTRIBUTION MATRICES.',
    imageUrl: 'git_contributions', // Renders dynamic animated contribution grid
    descriptionText: 'Iterative, sequential code repository logs, and developer build timelines. Illustrating the physical density of structured code updates across continuous project sessions.',
    japaneseTranslation: 'コミット統計 // 貢献マトリクス',
    tag: 'MODULE 02'
  },
  {
    id: 'gal_arch',
    title: 'MICRO-SERVICE INFRASTRUCTURE',
    caption: 'MAPPING RELATIONAL HIGH-DENSITY BLUEPRINTS.',
    imageUrl: 'sys_arch', // Renders relational architecture layout
    descriptionText: 'Visual structural flow routing Web Request APIs, Client Views, Cache systems, and Persistent databases. Styled like schematics in early tech technical manuals.',
    japaneseTranslation: 'システム構造 // アーキテクチャ設計',
    tag: 'MODULE 03'
  },
  {
    id: 'gal_api',
    title: 'LIVE INTERACTIVE API LOGGER',
    caption: 'GRABBING RAW JSON LOGS FROM REMOTE NODES.',
    imageUrl: 'api_feed', // Renders interactive client API query tool
    descriptionText: 'Direct query terminal requesting GitHub REST endpoints. Demonstrates structured user-facing results, diagnostic status headers, and rapid response cycles.',
    japaneseTranslation: 'API接続 // ログモニター',
    tag: 'MODULE 04'
  }
];
