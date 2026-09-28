// PROJECT DATA
const PROJECTS = [
  {
    id: 'biobrain',
    flag: 'Start here',
    num: '01',
    title: 'BioBrain',
    title_em: 'Insights',
    year: '2024 — 25',
    role: 'UI/UX Lead',
    company: 'Tooliqa Innovations',
    duration: '14 months',
    link: { label: 'Biobrain.io', href: 'https://www.biobrain.io/' },
    tags: ['MROps', 'AI Platform', 'B2B SaaS', 'Design System', 'Branding'],
    tagline: 'A next-gen Market Research Operations platform — unifying AI, automation, and agility into one workspace.',
    body: (
      <>
        BioBrain is an end-to-end MROps platform that folds survey programming, data processing and
        boardroom-ready insights into a single interface — replacing siloed tools, decks and spreadsheets,
        and delivering insights at <strong>record speed</strong>.
      </>
    ),
    contributions: [
      'Reworked and revamped a ResTech product (BioBrain) from the ground up — targeted for Q4 2024 launch.',
      'Established brand guidelines and a comprehensive design system.',
      'Redesigned logo, branding, website architecture, product navigation, process flows, and user journeys.',
    ],
    galleryItems: [
      { src: 'biobrain-assets/dashboard.webp', col: 'span 8', row: 'span 4', label: 'Analytics dashboard', pos: 'top' },
      { src: 'biobrain-assets/login.webp', col: 'span 4', row: 'span 4', label: 'Login', pos: 'center' },
      { src: 'biobrain-assets/onboarding-1.webp', col: 'span 4', row: 'span 3', label: 'Onboarding — email', pos: 'top' },
      { src: 'biobrain-assets/onboarding-2.webp', col: 'span 4', row: 'span 3', label: 'Onboarding — industry', pos: 'top' },
      { src: 'biobrain-assets/onboarding-3.webp', col: 'span 4', row: 'span 3', label: 'Onboarding — project path', pos: 'top' },
      { src: 'biobrain-assets/project-listing.webp', col: 'span 6', row: 'span 3', label: 'Project listing', pos: 'top' },
      { src: 'biobrain-assets/project-overview.webp', col: 'span 6', row: 'span 3', label: 'Project overview', pos: 'center' },
      { src: 'biobrain-assets/import-doc.webp', col: 'span 6', row: 'span 3', label: 'Import survey document', pos: 'top' },
      { src: 'biobrain-assets/survey-config.webp', col: 'span 6', row: 'span 3', label: 'Survey configuration', pos: 'top' },
      { src: 'biobrain-assets/builder-3d-grid.webp', col: 'span 4', row: 'span 3', label: 'Builder — 3D grid', pos: 'top' },
      { src: 'biobrain-assets/builder-single-select.webp', col: 'span 4', row: 'span 3', label: 'Builder — single select', pos: 'top' },
      { src: 'biobrain-assets/builder-image-select.webp', col: 'span 4', row: 'span 3', label: 'Builder — image select', pos: 'top' },
      { src: 'biobrain-assets/supply-details.webp', col: 'span 6', row: 'span 3', label: 'Sample — supply details', pos: 'top' },
      { src: 'biobrain-assets/data-insights.webp', col: 'span 6', row: 'span 3', label: 'Data — insights', pos: 'top' },
      { src: 'biobrain-assets/data-tabulation.webp', col: 'span 6', row: 'span 3', label: 'Data — tabulation', pos: 'top' },
      { src: 'biobrain-assets/data-insights-ota.webp', col: 'span 6', row: 'span 3', label: 'Data — insights / OTA', pos: 'top' },
      { src: 'biobrain-assets/website-homepage.webp', col: 'span 12', row: 'span 5', label: 'Marketing website', pos: 'top' },
    ],
  },
  {
    id: 'maxhealth',
    num: '02',
    title: 'Max',
    title_em: 'MyHealth',
    year: '2020 — 22',
    role: 'UI/UX Designer',
    company: 'MAX Healthcare',
    duration: '2 years',
    tags: ['Healthcare', 'Mobile App', 'iOS', 'Telemedicine', 'Branding'],
    tagline: 'A unified digital healthcare portal — appointments, video consults, lab tests, IPD tracking, and an emergency button, all under one roof.',
    body: (
      <>
        Max MyHealth runs patient care across the Max Hospitals network from one app — in-person and video
        consults across <strong>30+ medical specialties</strong>, lab tests, home care, a records vault,
        IPD tracking and a one-tap emergency button.
      </>
    ),
    contributions: [
      'Worked across Product and Marketing, collaborating with cross-functional teams end-to-end.',
      'Created new feature modules and revamped existing user journeys for the main website and mobile app.',
    ],
    galleryItems: [
      { src: 'maxhealth-assets/web-booking.webp', col: 'span 7', row: 'span 4', label: 'Web — appointment booking flow', pos: 'top' },
      { src: 'maxhealth-assets/blog-article.webp', col: 'span 5', row: 'span 8', label: 'Web — health blog article', pos: 'top' },
      { src: 'maxhealth-assets/radiology-guide.webp', col: 'span 7', row: 'span 4', label: 'Web — radiology instruction guide', pos: 'top' },
      { src: 'maxhealth-assets/app-home.webp', col: 'span 3', row: 'span 4', label: 'App home', pos: 'top' },
      { src: 'maxhealth-assets/doctor-search.webp', col: 'span 3', row: 'span 4', label: 'Find a doctor — availability', pos: 'top' },
      { src: 'maxhealth-assets/otp-verification.webp', col: 'span 3', row: 'span 4', label: 'Booking — OTP verification', pos: 'top' },
      { src: 'maxhealth-assets/health-records.webp', col: 'span 3', row: 'span 4', label: 'Health records vault', pos: 'top' },
      { src: 'maxhealth-assets/opd-reports.webp', col: 'span 3', row: 'span 4', label: 'OPD reports', pos: 'top' },
      { src: 'maxhealth-assets/report-parameters.webp', col: 'span 3', row: 'span 4', label: 'Lab report — parameters', pos: 'top' },
      { src: 'maxhealth-assets/trends.webp', col: 'span 3', row: 'span 4', label: 'Lab report — trends', pos: 'top' },
      { src: 'maxhealth-assets/max-at-home.webp', col: 'span 3', row: 'span 4', label: 'MAX @Home services', pos: 'top' },
      { src: 'maxhealth-assets/ipd-consultation.webp', col: 'span 4', row: 'span 4', label: 'In-hospital consultation details', pos: 'top' },
      { src: 'maxhealth-assets/ipd-share-records.webp', col: 'span 4', row: 'span 4', label: 'Consultation — share records', pos: 'top' },
      { src: 'maxhealth-assets/ipd-room-details.webp', col: 'span 4', row: 'span 4', label: 'IPD — room details', pos: 'top' },
    ],
  },
  {
    id: 'brazil',
    num: '03',
    title: 'Brazil',
    title_em: 'TMS',
    year: '2022 — 23',
    role: 'UI/UX Designer',
    company: 'Stupa Analytics',
    duration: '10 months',
    tags: ['Sports Tech', 'Esports', 'B2B Platform', 'Dashboards'],
    tagline: 'A tournament management system built for local and international bodies — automating brackets, scoring, and player registration across sports and esports.',
    body: (
      <>
        A tournament platform for the Brazil Sports Federation that replaces spreadsheets and group chats with
        <strong> real-time data tracking</strong>, automated brackets, league standings and player registration —
        scaling from a Sunday futsal cup to a 64-team esports league.
      </>
    ),
    contributions: [
      'Designed complete design systems for the Brazil Sports Federation and World Table Tennis Federation (WTT).',
      'Delivered B2B and B2C solutions for event creation, management, analysis, and broadcasting.',
    ],
    galleryItems: [
      { src: 'brazil-assets/tms-start.webp', col: 'span 7', row: 'span 4', label: 'Tournament Management System — entry', pos: 'top' },
      { src: 'brazil-assets/landing-page.webp', col: 'span 5', row: 'span 8', label: 'Public events landing page', pos: 'top' },
      { src: 'brazil-assets/event-creation.webp', col: 'span 7', row: 'span 5', label: 'Event creation — details & categories', pos: 'top' },
      { src: 'brazil-assets/add-officials-start.webp', col: 'span 6', row: 'span 3', label: 'Add officials — overview', pos: 'top' },
      { src: 'brazil-assets/add-officials.webp', col: 'span 6', row: 'span 3', label: 'Add officials — member & bulk import', pos: 'top' },
      { src: 'brazil-assets/live-stream.webp', col: 'span 5', row: 'span 4', label: 'Live stream — quality & branding', pos: 'top' },
      { src: 'brazil-assets/results-knockout.webp', col: 'span 7', row: 'span 4', label: 'Results — knockout matches', pos: 'top' },
      { src: 'brazil-assets/results-group.webp', col: 'span 6', row: 'span 3', label: 'Results — group / playoff', pos: 'top' },
      { src: 'brazil-assets/videos.webp', col: 'span 6', row: 'span 3', label: 'Live & streamed match videos', pos: 'top' },
    ],
  },
  {
    id: 'more',
    num: '04',
    title: 'More',
    title_em: 'work',
    year: '2019 — 24',
    role: 'Various',
    company: 'Mix',
    duration: 'Selected',
    tags: ['Mix', 'Enterprise', 'Web', 'Redesign'],
    tagline: 'A grab-bag of end-to-end projects — enterprise dashboards, a marketing-site redesign, and early-stage product explorations.',
    body: (
      <>
        A selection from across my career: a <strong>marketing-site redesign for Felizeek</strong>, distribution
        dashboards for Allied Engineering Works, and product work at Work Companion — plus a few smaller experiments.
      </>
    ),
    contributions: [
      'Revamped marketing websites end to end — information architecture, page layouts and a reusable blog system.',
      'Reworked key pages on existing products, sharpening hierarchy, conversion paths and visual consistency.',
      'Picked up focused screens across other products — from industrial dashboards to subscription flows — and shipped them fast.',
    ],
    galleryItems: [
      { src: 'morework-assets/home.jpg', col: 'span 4', row: 'span 5', label: 'Felizeek — home', pos: 'top' },
      { src: 'morework-assets/about-us.jpg', col: 'span 4', row: 'span 5', label: 'Felizeek — about', pos: 'top' },
      { src: 'morework-assets/services.jpg', col: 'span 4', row: 'span 5', label: 'Felizeek — services', pos: 'top' },
      { src: 'morework-assets/blogs.jpg', col: 'span 6', row: 'span 4', label: 'Felizeek — blog index', pos: 'top' },
      { src: 'morework-assets/felizeek-overview.jpg', col: 'span 6', row: 'span 4', label: 'Growtomation — full site overview', pos: 'top' },
      { src: 'morework-assets/distribution-chain.jpg', col: 'span 6', row: 'span 3', label: 'AEW — distribution chain, add transformer', pos: 'top' },
      { src: 'morework-assets/distribution-chain-2.jpg', col: 'span 6', row: 'span 3', label: 'AEW — distribution chain, schematic detail', pos: 'top' },
      { src: 'morework-assets/product-placement-selection.jpg', col: 'span 4', row: 'span 3', label: 'Work Companion — product placement', pos: 'top' },
      { src: 'morework-assets/woco-revamp-subscribe.jpg', col: 'span 4', row: 'span 3', label: 'Work Companion — subscribe revamp', pos: 'top' },
      { src: 'morework-assets/real-estate.jpg', col: 'span 4', row: 'span 4', label: 'Real estate — listings concept', pos: 'top' },
    ],
  },
];

window.PROJECTS = PROJECTS;
