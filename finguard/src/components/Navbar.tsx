import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './navbar.css';

const LINKS = ['Products', 'Features', 'Benefits', 'Partners'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="wrap nav__row">
        <a href="#top" className="nav__logo" data-cursor>
          <span className="nav__mark" />
          finguard
        </a>
        <nav className="nav__links">
          {LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} data-cursor>
              {l}
            </a>
          ))}
        </nav>
        <a href="#get-started" className="nav__cta" data-cursor>
          Sign up <span>↗</span>
        </a>
      </div>
    </motion.header>
  );
}
