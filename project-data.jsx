// PROJECT DATA
const PROJECTS = [
  {
    id: 'biobrain',
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
        BioBrain empowers researchers and decision-makers with an end-to-end MROps platform that eliminates
        manual errors, ensures data quality, and delivers deep insights at <strong>record speed</strong>.
        Built on 100+ years of combined industry experience, it folds survey programming, data processing,
        and boardroom-ready insights into a singular interface — replacing siloed tools, decks, and spreadsheets.
        I reworked the product from the ground up for its Q4 2024 launch — establishing brand guidelines,
        a comprehensive design system, the logo, website architecture, product navigation, process flows, and user journeys.
      </>
    ),
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
    id: 'brazil',
    num: '02',
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
        Tournament organizers in Brazil have long lived inside spreadsheets and group chats. This platform replaces
        the manual chaos with <strong>real-time data tracking</strong>, automated bracket generation, customized
        league standings, and integrated player registration. From a Sunday futsal cup to a 64-team esports league,
        the system scales the same way. Delivered end-to-end for the Brazil Sports Federation: B2B tooling for
        organizers, B2C experiences for players and fans, and a unified analytics layer powering it all.
      </>
    ),
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
    id: 'maxhealth',
    num: '03',
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
        Max MyHealth manages patient care across the entire Max Hospitals network from a single mobile app.
        Patients book in-person visits or video consults across <strong>30+ medical specialties</strong>, access
        urgent care within ~10 minutes, schedule lab tests and home healthcare, and store every prescription,
        report, and discharge summary in a centralized vault. The IPD tracker keeps an eye on hospital stays
        with itemized bills, and a one-tap emergency button surfaces the nearest facility instantly.
        I led UX revamps and new feature modules across product and marketing, working with cross-functional teams.
      </>
    ),
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
        A curated selection from across my career: <strong>water and electrical distribution dashboards</strong> for
        Allied Engineering Works — large-scale industrial UX with a partial frontend handoff;
        a full <strong>marketing site redesign for Felizeek</strong> — home, services, about and a blog system
        rebuilt end to end; and early-stage product work at <strong>Work Companion</strong> alongside a few smaller
        experiments I&apos;m fond of. Each project sharpened a different muscle — systems thinking, data density,
        editorial layout, or the discipline of shipping fast.
      </>
    ),
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
