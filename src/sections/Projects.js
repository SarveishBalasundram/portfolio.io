import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaTerminal, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa';
import projects from '../data/projects.js';
import './Projects.css';

const CODE_SNIPPETS = [
  'const engine = new FullStackArchitecture();',
  'await engine.deploy({ scalability: "infinite" });',
  'git checkout -b feature/cutting-edge-ui',
  'status: 200 OK • latency: 12ms',
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div className="projects" ref={ref} aria-labelledby="projects-heading">
      <div className="projects__glow projects__glow--1" aria-hidden="true" />
      <div className="projects__glow projects__glow--2" aria-hidden="true" />

      <div className="projects__inner">
        {/* ── Section Header ───────────────────────────── */}
        <motion.div
          className="projects__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow-wrap">
            <span className="eyebrow-line" aria-hidden="true" />
            <p className="eyebrow">Works &amp; Artifacts</p>
          </div>
          <h2 id="projects-heading" className="section-heading">
            Featured <span className="accent">Creations</span>
          </h2>
          <p className="projects__header-sub">
            Showcase of full-stack applications, interactive systems, and client solutions engineered with precision.
          </p>
        </motion.div>

        {/* ── Placeholder Lab Card (Cyber Aesthetic) ───── */}
        {projects.length === 0 ? (
          <motion.div
            className="projects__terminal-card"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Terminal Header Bar */}
            <div className="projects__terminal-header">
              <div className="projects__terminal-dots">
                <span className="projects__terminal-dot projects__terminal-dot--red" />
                <span className="projects__terminal-dot projects__terminal-dot--yellow" />
                <span className="projects__terminal-dot projects__terminal-dot--green" />
              </div>
              <div className="projects__terminal-title">
                <FaTerminal className="projects__terminal-icon" /> sarveish@portfolio: ~/projects
              </div>
              <div className="projects__terminal-status">
                <FaCodeBranch /> main
              </div>
            </div>

            {/* Terminal Body */}
            <div className="projects__terminal-body">
              {/* Floating code background lines */}
              <div className="projects__terminal-code-bg" aria-hidden="true">
                {CODE_SNIPPETS.map((line, i) => (
                  <div key={i} className="projects__terminal-code-line">{line}</div>
                ))}
              </div>

              <div className="projects__terminal-content">
                <div className="projects__radar-circle">
                  <div className="projects__radar-scan" />
                  <span className="projects__radar-core">🚀</span>
                </div>

                <h3 className="projects__terminal-headline">
                  Curating Next-Gen Project Case Studies
                </h3>

                <p className="projects__terminal-text">
                  In-depth architectural write-ups, live interactive sandboxes, and repository deep-dives are actively being prepared.
                  In the meantime, feel free to inspect all public repositories, open-source commits, and active experimentations directly on GitHub.
                </p>

                <motion.a
                  href="https://github.com/SarveishBalasundram"
                  className="projects__terminal-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FaGithub className="projects__btn-icon" />
                  <span>Inspect GitHub Repositories</span>
                  <FaExternalLinkAlt className="projects__btn-arrow" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="projects__grid">
            {projects.map((project, i) => (
              <motion.article
                key={project.id}
                className="projects__card"
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
              >
                {/* Visual Header / Banner */}
                <div className="projects__card-banner">
                  <div className="projects__card-banner-glow" aria-hidden="true" />
                  <div className="projects__card-badge-wrap">
                    {project.soonPublic ? (
                      <span className="projects__card-badge projects__card-badge--pending">
                        🔒 Soon to be published publicly
                      </span>
                    ) : (
                      <span className="projects__card-badge projects__card-badge--live">
                        <span className="projects__badge-pulse" /> Live Project
                      </span>
                    )}
                  </div>
                </div>

                <div className="projects__card-body">
                  <h3 className="projects__card-title">{project.title}</h3>
                  <p className="projects__card-desc">{project.description}</p>
                  
                  <div className="projects__card-tags">
                    {project.tech.map(t => (
                      <span key={t} className="projects__card-tag">{t}</span>
                    ))}
                  </div>

                  <div className="projects__card-links">
                    {project.github ? (
                      <a
                        href={project.github}
                        className="projects__card-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub /> GitHub ↗
                      </a>
                    ) : null}

                    {project.live ? (
                      <a
                        href={project.live}
                        className="projects__card-link projects__card-link--primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt /> Live Demo ↗
                      </a>
                    ) : (
                      project.soonPublic && (
                        <span className="projects__card-link projects__card-link--disabled">
                          Repository Private
                        </span>
                      )
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
