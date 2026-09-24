import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ctafooter.css';

gsap.registerPlugin(ScrollTrigger);

// Builds a stack of offset, progressively darker text layers behind a flat
// front face — the classic CSS "extruded block letters" trick — so the
// wordmark reads as solid 3D type rather than a flat outline.
const DEPTH = 16;
function mix(a: number[], b: number[], t: number) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}
const FRONT = [11, 11, 12];
const BACK = [92, 22, 6];
const LAYERS = Array.from({ length: DEPTH }, (_, idx) => {
  const depth = DEPTH - idx; // painted furthest-back first
  const t = depth / DEPTH;
  const [r, g, b] = mix(FRONT, BACK, t);
  return { depth, color: `rgb(${r},${g},${b})` };
});

const COLUMNS = [
  { title: 'Features', links: ['Analytics', 'Collaboration', 'Data management', 'Security'] },
  { title: 'Company', links: ['About us', 'Blog', 'Careers', 'Cookie policy'] },
  { title: 'Resource', links: ['Customers', 'Strategic', 'E-books & guides', 'Webinar'] },
  { title: 'Support', links: ['Help center', 'Contact'] },
];

export default function CTAFooter() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.wordmark',
        { y: 60 },
        {
          y: -30,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer id="get-started" className="cta-footer" ref={root}>
      <div className="wrap wordmark-wrap">
        <div className="wordmark">
          {LAYERS.map((l) => (
            <span
              key={l.depth}
              className="wordmark__layer"
              style={{ color: l.color, transform: `translate(${l.depth}px, ${l.depth}px)` }}
              aria-hidden="true"
            >
              finguard
            </span>
          ))}
          <span className="wordmark__front">finguard</span>
        </div>
      </div>

      <div className="wrap cta-footer__grid">
        <div className="cta-footer__lead">
          <div className="cta-footer__social">
            <a href="#" data-cursor>f</a>
            <a href="#" data-cursor>ig</a>
            <a href="#" data-cursor>x</a>
            <a href="#" data-cursor>in</a>
          </div>
          <h2>
            Ready to take control of
            <br />
            your financial future
          </h2>
          <a className="btn" href="#get-started" data-cursor>
            Get started
          </a>
        </div>

        {COLUMNS.map((col) => (
          <div className="cta-footer__col" key={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" data-cursor>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="wrap cta-footer__bottom">
        <span>© 2026 finguard</span>
        <span>All rights reserved</span>
        <span className="cta-footer__legal">
          <a href="#" data-cursor>Terms of service</a>
          <a href="#" data-cursor>Privacy policy</a>
        </span>
      </div>
    </footer>
  );
}
