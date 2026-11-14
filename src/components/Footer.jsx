import { profile } from '../data';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Built with React, GSAP &amp; Lenis</span>
      </div>
    </footer>
  );
}
