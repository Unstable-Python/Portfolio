'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './page.module.css';

type SectionKey =
  | 'experience'
  | 'skills'
  | 'certs'
  | 'education'
  | 'projects'
  | 'contact'
  | 'resume';

const sections: { key: SectionKey; label: string }[] = [
  { key: 'experience', label: 'Experience' },
  { key: 'skills', label: 'Skills' },
  { key: 'certs', label: 'Certs' },
  { key: 'education', label: 'Education' },
  { key: 'projects', label: 'Projects' },
  { key: 'contact', label: 'Contact' },
  { key: 'resume', label: 'Resume' },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return;
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

export default function Page() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<SectionKey>('experience');

  const scrollTo = (key: SectionKey) => {
    const el = document.getElementById(key);
    if (!el) return;
    el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    setActive(key);
  };

  const skillCards = useMemo(
    () => [
      { title: 'New Site Development', tag: 'top skill' },
      { title: 'Front-End Development', tag: 'top skill' },
      { title: '3D Printing', tag: 'top skill' },
    ],
    []
  );

  const certs = useMemo(
    () => [
      { group: 'CEH', label: 'Certified Ethical Hacker', meta: 'SEC' },
      { group: 'C100DEV', label: 'MongoDB Certified Developer Associate', meta: 'DB' },
      { group: 'Node.js', label: 'Server-side JavaScript', meta: 'JS' },
      { group: 'HTML5 + CSS3', label: 'Programming in HTML5 with JavaScript and CSS3', meta: 'WEB' },
      { group: 'Python Intro', label: 'Introduction to Programming Using Python', meta: 'PY' },
    ],
    []
  );

  const projects = useMemo(
    () => [
      {
        title: 'Python Security Scripts',
        linkLabel: 'github.com/Unstable-Python →',
        path: 'python / security',
        desc: 'Scripting practice around recon and automation.',
      },
      {
        title: 'Front-End Builds',
        linkLabel: '',
        path: 'web / front-end',
        desc: 'Sites built from scratch with HTML, CSS and JavaScript.',
      },
      {
        title: '3D Printed Designs',
        linkLabel: '',
        path: '3d / maker',
        desc: 'Custom enclosures and parts, modeled and printed.',
      },
    ],
    []
  );

  // Simple scroll spy
  useEffect(() => {
    const keys = sections.map((s) => s.key);
    const observers: IntersectionObserver[] = [];
    const opts = { threshold: 0.25 };

    keys.forEach((key) => {
      const el = document.getElementById(key);
      if (!el) return;

      const obs = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) setActive(key);
      }, opts);

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className={styles.shell}>
      <main className={styles.page}>
        {/* Terminal header / hero */}
        <header className={styles.hero}>
          <div className={styles.terminalBar} aria-hidden="true">
            <span className={styles.termBtn} />
            <span className={styles.termBtn} />
            <span className={styles.termBtn} />
          </div>

          <div className={styles.heroGrid}>
            {/* Left terminal column */}
            <section className={styles.terminal} aria-label="Terminal header">
              <div className={styles.terminalTop}>
                <span className={styles.promptTag}>@dev:~$</span>
              </div>

              <div className={styles.heroTitle}>
                <div className={styles.heroName}>Brendan Master</div>
                <div className={styles.heroRole}>Your Cyber Professional</div>
              </div>

              <div className={styles.heroSubtitle}>
                Aspiring cybersecurity professional and self-taught front-end developer in Warsaw, Indiana —
                building a real skill set one certification and one shipped project at a time.
              </div>

              <div className={styles.heroMetaRow}>
                <button className={styles.primaryBtn} onClick={() => scrollTo('resume')}>
                  Resume
                </button>
                <button className={styles.secondaryBtn} onClick={() => scrollTo('contact')}>
                  Get in touch
                </button>
              </div>

              <div className={styles.promptBlock}>
                <div className={styles.promptLine}>
                  <span className={styles.promptSym}>$</span> whoami
                </div>
                <div className={styles.outputLine}>Brendan Master</div>

                <div className={styles.promptLine}>
                  <span className={styles.promptSym}>$</span> cat location.txt
                </div>
                <div className={styles.outputLine}>Warsaw, Indiana, United States</div>

                <div className={styles.promptLine}>
                  <span className={styles.promptSym}>$</span> status
                </div>
                <div className={styles.outputLine}>
                  <span className={styles.statusOpen}>open to work</span>
                </div>
              </div>
            </section>

            {/* Right nav / sections */}
            <aside className={styles.navAndContent}>
              <div className={styles.nav}>
                {sections.map((s) => (
                  <button
                    key={s.key}
                    className={s.key === active ? styles.navItemActive : styles.navItem}
                    onClick={() => scrollTo(s.key)}
                    aria-current={s.key === active ? 'page' : undefined}
                  >
                    <span className={styles.navIndex}>{String(sections.findIndex((x) => x.key === s.key) + 1).padStart(2, '0')}</span>
                    {s.label}
                  </button>
                ))}
              </div>

              <div className={styles.content}>
                {/* Experience */}
                <section id="experience" className={styles.section}>
                  <SectionHeader number="01" title="Experience" />
                  <TimelineItem
                    title="Floor Staff"
                    org="ACE Hardware"
                    place="Indiana, United States"
                    dates="May 2025 — January 2026 · 9 months"
                  />
                  <TimelineItem
                    title="Sandwich Artist"
                    org="Subway"
                    place="Culver, Indiana, United States"
                    dates="January 2025 — February 2025 · 2 months"
                  />
                  <TimelineItem
                    title="Bagger"
                    org="Kroger"
                    place="Indiana, United States"
                    dates="January 2024 — December 2024 · 1 year"
                  />
                  <TimelineItem
                    title="Food Service Worker"
                    org="McDonald's"
                    place="Plymouth, Indiana, United States"
                    dates="January 2024 — February 2025 · 1 year 2 months"
                  />
                </section>

                {/* Skills */}
                <section id="skills" className={styles.section}>
                  <SectionHeader number="02" title="Skills" />
                  <div className={styles.cards3}>
                    {skillCards.map((c) => (
                      <div key={c.title} className={styles.card}>
                        <div className={styles.cardTag}>{c.tag}</div>
                        <div className={styles.cardTitle}>{c.title}</div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Certs */}
                <section id="certs" className={styles.section}>
                  <SectionHeader number="03" title="Certifications" />
                  <div className={styles.certsList}>
                    {certs.map((c) => (
                      <div key={c.group} className={styles.certRow}>
                        <div className={styles.certMeta}>{c.meta}</div>
                        <div className={styles.certBody}>
                          <div className={styles.certLabel}>{c.label}</div>
                          <div className={styles.certGroup}>{c.group}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section id="education" className={styles.section}>
                  <SectionHeader number="04" title="Education" />
                  <div className={styles.educationBlock}>
                    <div className={styles.eduTitle}>Culver Community Middle/High School</div>
                    <div className={styles.eduDegree}>
                      High School Diploma, General Studies
                    </div>
                    <div className={styles.eduDates}>January 2023 — May 2026</div>
                  </div>
                </section>

                {/* Projects */}
                <section id="projects" className={styles.section}>
                  <SectionHeader number="05" title="Projects" />
                  <div className={styles.projects}>
                    {projects.map((p) => (
                      <article key={p.title} className={styles.projectCard}>
                        <div className={styles.projectTop}>
                          <div className={styles.projectTitle}>{p.title}</div>
                          {p.linkLabel ? <div className={styles.projectLink}>{p.linkLabel}</div> : null}
                        </div>
                        <div className={styles.projectPath}>{p.path}</div>
                        <div className={styles.projectDesc}>{p.desc}</div>
                      </article>
                    ))}
                  </div>
                </section>

                {/* Contact */}
                <section id="contact" className={styles.section}>
                  <SectionHeader number="06" title="Contact" />
                  <div className={styles.contactGrid}>
                    <ContactRow label="email" value="bam@linuxmail.org" />
                    <ContactRow label="mobile" value="574 521 4534" />
                    <ContactRow label="linkedin" value="in/brendan-master" />
                  </div>
                </section>

                {/* Resume */}
                <section id="resume" className={styles.section}>
                  <SectionHeader number="07" title="Resume" />
                  <div className={styles.resumeBlock}>
                    <div className={styles.resumeHint}>
                      In the original UI this is a downloadable resume. Here you can wire your file/link.
                    </div>
                    <div className={styles.resumeActions}>
                      <button className={styles.primaryBtn} onClick={() => alert('Hook up your resume download URL/file here.')}>
                        Download resume
                      </button>
                      <button className={styles.secondaryBtn} onClick={() => scrollTo('contact')}>
                        Contact instead
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </aside>
          </div>
        </header>

        <footer className={styles.footer}>
          © 2026 Brendan Master <span className={styles.footerSep}>•</span> Warsaw, IN
        </footer>
      </main>
    </div>
  );
}

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.sectionNumber}>{number}</div>
      <div className={styles.sectionTitle}>{title}</div>
    </div>
  );
}

function TimelineItem({
  title,
  org,
  dates,
  place,
}: {
  title: string;
  org: string;
  dates: string;
  place: string;
}) {
  return (
    <div className={styles.timelineItem}>
      <div className={styles.timelineTop}>
        <div className={styles.timelineTitle}>{title}</div>
        <div className={styles.timelineOrg}>{org}</div>
      </div>
      <div className={styles.timelineDates}>{dates}</div>
      <div className={styles.timelinePlace}>{place}</div>
    </div>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.contactRow}>
      <div className={styles.contactLabel}>{label}</div>
      <div className={styles.contactValue}>{value}</div>
    </div>
  );
}