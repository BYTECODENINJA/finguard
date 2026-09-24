import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './features.css';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { title: 'Secure and easy transactions', body: 'Bank-grade encryption on every transfer, with biometric approval built in.' },
  { title: 'Real-time financial monitoring', body: 'Watch balances and spending update the instant a transaction clears.' },
  { title: 'Fast & easy transactions', body: 'Send, receive, and settle invoices in seconds — no waiting on banking hours.' },
  { title: 'Comprehensive financial planning', body: 'Automatic categorisation turns raw transactions into a plan you can act on.' },
];

const ROWS = [
  { name: 'Kelly Williams', date: '4 July 2024', status: 'Success' as const },
  { name: 'John Terry', date: '3 July 2024', status: 'Success' as const },
  { name: 'Caitlin Clark', date: '2 July 2024', status: 'Pending' as const },
];

export default function Features() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(2);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.feature-row');
      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });

      gsap.to('.feature-panel', {
        y: -18,
        ease: 'none',
        scrollTrigger: { trigger: '.features__inner', start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="features" ref={root}>
      <div className="wrap">
        <div className="features__head">
          <div>
            <p className="eyebrow">Features</p>
            <h2 className="features__title">
              All-in-one platform
              <br />
              for savings
            </h2>
          </div>
          <p className="about__copy">
            Simplify your financial life by securely connecting your accounts and
            automatically categorising every transaction.
          </p>
        </div>

        <div className="features__inner">
          <div className="features__list">
            {FEATURES.map((f, i) => (
              <div className={`feature-row ${active === i ? 'is-active' : ''}`} key={f.title}>
                <span className="feature-row__index">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{f.title}</h3>
                  {active === i && <p>{f.body}</p>}
                </div>
                <span className="feature-row__arrow">↗</span>
              </div>
            ))}
          </div>

          <div className="feature-panel">
            <div className="invoice-card">
              <div className="invoice-card__dots">
                <span />
                <span />
                <span />
              </div>
              <p className="invoice-card__title">Latest invoice</p>
              <div className="invoice-card__bar">
                <span style={{ width: '67%' }} />
                <span style={{ width: '14%', background: '#0b0b0c' }} />
              </div>
              <div className="invoice-card__legend">
                <span>
                  <i className="dot dot--signal" /> 67% Success
                </span>
                <span>
                  <i className="dot dot--ink" /> 14% Pending
                </span>
                <span>
                  <i className="dot dot--grey" /> 19% Cancel
                </span>
              </div>
              <div className="invoice-card__rows">
                {ROWS.map((r) => (
                  <div className="invoice-row" key={r.name}>
                    <img src={`https://i.pravatar.cc/40?u=${r.name}`} alt="" />
                    <div className="invoice-row__meta">
                      <strong>{r.name}</strong>
                      <span>{r.date}</span>
                    </div>
                    <span className={`invoice-row__status ${r.status === 'Pending' ? 'is-pending' : ''}`}>
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
