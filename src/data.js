// ============================================================
//  EDIT THIS FILE — all the text on the site comes from here.
// ============================================================

export const profile = {
  name: 'Robert John Lucero',
  initials: 'RJL',
  availability: 'Open to remote project support & freelance work',
  // Each item is one line of the big hero title. The last line is highlighted.
  heroTitle: ["Hi, I'm Robert.", 'From the field', 'to the dashboard.'],
  intro:
    'BSEE graduate with 8 years in construction, plant operations and maintenance. I track project progress on site — and build the dashboards that make reporting faster.',
  email: 'robertjohnlucero1234@gmail.com',
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/robert-john-lucero/' },
    { label: 'GitHub', url: 'https://github.com/robertjohn1234' },
    // Add more, e.g. { label: 'Facebook', url: 'https://facebook.com/your-profile' },
  ],
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const about = {
  // This sentence lights up word by word as you scroll
  statement:
    'I connect field work and technology, so teams spend less time on manual reports and more time getting work done.',
  paragraphs: [
    'Electrical Engineering graduate (BSEE) with 8 years of experience across construction, facilities maintenance, and plant operations — currently coordinating electrical works on industrial construction projects.',
    'My work sits where the field meets the paperwork: reviewing drawings, checking materials against specifications, tracking installation progress, managing punch lists and inspection requests, and turning site data into reports that management can act on.',
    'To make that faster, I build my own tools — from Excel and Google Sheets trackers to web dashboards that show project status in real time.',
  ],
  stats: [
    { value: '8', label: 'Years in the field' },
    { value: '6', label: 'Companies' },
    { value: '3', label: 'Live dashboards' },
    { value: '∞', label: 'Things to learn' },
  ],
};

// Work history, newest first. "points" are the bullet lines.
export const experience = [
  {
    role: 'Electrical Project Engineer',
    company: 'PH Pertama ISTC Inc.',
    period: 'Oct 2024 — Present',
    location: 'Lemery, Batangas',
    points: [
      'Review electrical drawings and check materials against project specifications before installation.',
      'Prepare and coordinate material requirements to keep site work on schedule.',
      'Monitor daily electrical installation and arrange manpower when needed.',
      'Coordinate with clients and foreign equipment consultants on installation requirements and site concerns.',
      'Track installation progress and prepare progress reports used as the basis for billing.',
      'Built web-based dashboards (Node.js, hosted online) that turn site tracking files into live status views, cutting manual reporting time.',
    ],
  },
  {
    role: 'Site Engineer — Electrical',
    company: 'S-G-B Contractors Co. / PH Pertama ISTC Inc.',
    period: 'Dec 2022 — Jul 2023',
    location: 'Liloan, Cebu',
    points: [
      'Prepared and monitored on-site material requirements.',
      'Developed and maintained an Excel-based project progress monitoring system used by the team.',
      'Led electrical crews on site when needed to speed up progress.',
      'Supported the as-built and billing team, ensuring complete documentation for project turnover.',
    ],
  },
  {
    role: 'Facilities Technician',
    company: 'Manchester Inc.',
    period: 'May 2021 — Apr 2022',
    location: 'Lapu-Lapu, Cebu',
    points: [
      'Performed thermal scanning of electrical equipment, analyzed findings, and recommended corrective actions.',
      'Diagnosed and resolved electrical breakdowns to minimize production downtime.',
      'Installed 110V and 220V power supply for production machines and equipment.',
    ],
  },
  {
    role: 'Water Facility Shift Head',
    company: 'Cebu Manila Water Development Inc.',
    period: 'Oct 2018 — Jan 2021',
    location: 'Cebu',
    points: [
      'Led shift operations, resolving process upsets, flow-related incidents, and equipment issues.',
      'Diagnosed root causes of process upsets and implemented corrective measures.',
      'Monitored and consolidated operational data and expenditures.',
      "Served as the facility's designated Pollution Control Officer (PCO).",
    ],
  },
  {
    role: 'Site Engineer — Electrical',
    company: 'Cebu Echo-Thermal Horizon Inc.',
    period: 'Jan 2018 — Aug 2018',
    location: 'Liloan, Cebu',
    points: [
      'Designed and estimated small-scale electrical projects for client proposals.',
      'Oversaw project completion: organized tools and materials, guided crews, and closed punch list items through turnover.',
    ],
  },
  {
    role: 'Field Engineer — Electrical',
    company: 'Romago Inc.',
    period: 'Oct 2016 — Dec 2017',
    location: 'Mandaluyong, Metro Manila',
    points: [
      'Directed foremen and leadmen on daily tasks in line with project objectives and timelines.',
      'Updated electrical drawings in AutoCAD based on project specifications.',
      'Ensured compliance with LEED (Leadership in Energy and Environmental Design) requirements.',
      'Prepared progress billings, progress reports, and milestone updates for the project owner.',
    ],
  },
];

export const education = [
  {
    school: 'Colegio de San Antonio de Padua',
    course: 'Bachelor of Science in Electrical Engineering',
    period: '2010 — 2015',
  },
  {
    school: 'Zuitt Coding Bootcamp',
    course: 'Full Stack Web Development',
    period: 'Mar 2024 — Jul 2024',
  },
];

export const skills = [
  {
    group: 'Project Controls',
    items: ['Progress Monitoring', 'Progress Billing', 'Punch List & IR', 'Specification Compliance', 'Drawing Review', 'Stakeholder Coordination'],
  },
  {
    group: 'Field & Maintenance',
    items: ['Electrical Installation', 'Site Supervision', 'Preventive Maintenance', 'Thermal Scanning', 'AutoCAD'],
  },
  { group: 'Data & Reporting', items: ['Excel', 'Google Sheets', 'Dashboards'] },
  { group: 'Web Development', items: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'GSAP', 'Git & GitHub'] },
];

// image: put screenshots in /public/projects/ and use e.g. '/projects/cable.png'
// color: background colour used when there's no image yet
export const projects = [
  {
    title: 'Cable Status Dashboard',
    description:
      'A live dashboard that tracks cable installation status across a construction project, with charts and progress summaries.',
    tags: ['Node.js', 'Charts', 'Render'],
    image: '/projects/cable-status.png',
    color: '#7b5cff',
    live: 'https://project-dashboard-demo-vvyy.onrender.com',
    code: 'https://github.com/robertjohn1234/Project_Dashboard_Demo',
  },
  {
    title: 'Punch List Dashboard',
    description:
      'Turns a consolidated Excel punch list into a clean web dashboard so open items are easy to filter and follow up.',
    tags: ['Node.js', 'Excel data', 'Render'],
    image: '',
    color: '#ff4d8d',
    live: '',
    code: '',
  },
  {
    title: 'Online Shop',
    description:
      'A personal e-commerce website built from scratch — product pages, cart and checkout. Currently in progress.',
    tags: ['Web', 'In progress'],
    image: '',
    color: '#00b3a4',
    live: '',
    code: '',
  },
  {
    title: 'This Portfolio',
    description:
      'The site you are on — built with React, GSAP ScrollTrigger and Lenis smooth scrolling.',
    tags: ['React', 'GSAP', 'Lenis'],
    image: '',
    color: '#c6a03d',
    live: 'https://fourthforlio.onrender.com',
    code: 'https://github.com/robertjohn1234/4thforlio',
  },
];

export const contact = {
  text: 'Need help with project monitoring, reporting, or a dashboard for your team? Or just want to say hi? My inbox is always open.',
};
