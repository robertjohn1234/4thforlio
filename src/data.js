// ============================================================
//  EDIT THIS FILE — all the text on the site comes from here.
// ============================================================

export const profile = {
  name: 'Robert John Lucero',
  initials: 'RJL',
  availability: 'Open to projects & collaborations',
  // Each item is one line of the big hero title. The last line is highlighted.
  heroTitle: ["Hi, I'm Robert.", 'I build things', 'for the web.'],
  intro:
    'I turn spreadsheets, reports and rough ideas into clean, useful web apps — from project dashboards to full websites.',
  email: 'you@example.com',
  socials: [
    { label: 'GitHub', url: 'https://github.com/your-username' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/your-profile' },
    { label: 'Facebook', url: 'https://facebook.com/your-profile' },
  ],
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const about = {
  // This sentence lights up word by word as you scroll
  statement:
    'I like turning messy data and everyday problems into tools that people actually enjoy using.',
  paragraphs: [
    "I'm a developer from the Philippines. By day I work on project monitoring and reporting, and I build web dashboards that make that work faster and clearer.",
    "Outside work I treat development as a hobby — exploring websites, desktop apps, mobile and games, and learning something new with every build.",
  ],
  stats: [
    { value: '5+', label: 'Projects built' },
    { value: '3', label: 'Live dashboards' },
    { value: '∞', label: 'Things to learn' },
    { value: '24/7', label: 'Curiosity' },
  ],
};

export const skills = [
  { group: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'GSAP'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'REST APIs'] },
  { group: 'Data & Tools', items: ['Excel', 'Google Sheets', 'Git & GitHub', 'Render'] },
];

// image: put screenshots in /public/projects/ and use e.g. '/projects/cable.png'
// color: background colour used when there's no image yet
export const projects = [
  {
    title: 'Cable Status Dashboard',
    description:
      'A live dashboard that tracks cable installation status across a construction project, with charts and progress summaries.',
    tags: ['Node.js', 'Charts', 'Render'],
    image: '',
    color: '#7b5cff',
    live: '',
    code: '',
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
    live: '',
    code: 'https://github.com/your-username/portfolio',
  },
];

export const contact = {
  text: "Have a project in mind, or just want to say hi? My inbox is always open.",
};
