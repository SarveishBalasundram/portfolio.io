import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FaJava, FaPython, FaHtml5, FaCss3Alt, FaPhp, FaGitAlt,
  FaGithub, FaReact, FaAngular, FaSearch,
} from 'react-icons/fa';
import {
  SiJavascript, SiFlutter, SiCplusplus, SiMysql, SiTailwindcss,
  SiBootstrap, SiFlask, SiSpringboot, SiLaravel, SiFirebase,
  SiGitlab, SiTensorflow, SiAndroidstudio, SiUnity,
  SiMicrosoftoffice, SiPowerbi,
} from 'react-icons/si';
import { TbBrandYatse } from 'react-icons/tb';
import skillsData from '../data/skills.js';
import './skills.css';

const ICON_MAP = {
  FaJava: <FaJava />, FaPython: <FaPython />, FaHtml5: <FaHtml5 />,
  FaCss3Alt: <FaCss3Alt />, FaPhp: <FaPhp />, FaGitAlt: <FaGitAlt />,
  FaGithub: <FaGithub />, FaReact: <FaReact />, FaAngular: <FaAngular />,
  SiJavascript: <SiJavascript />, SiFlutter: <SiFlutter />,
  SiCplusplus: <SiCplusplus />, SiMysql: <SiMysql />,
  SiTailwindcss: <SiTailwindcss />, SiBootstrap: <SiBootstrap />,
  SiFlask: <SiFlask />, SiSpringboot: <SiSpringboot />,
  SiLaravel: <SiLaravel />, SiFirebase: <SiFirebase />,
  SiGitlab: <SiGitlab />, SiTensorflow: <SiTensorflow />,
  SiAndroidstudio: <SiAndroidstudio />, SiUnity: <SiUnity />,
  SiMicrosoftoffice: <SiMicrosoftoffice />, SiPowerbi: <SiPowerbi />,
  TbBrandYatse: <TbBrandYatse />,
};

const FILTERS = [
  { key: 'all',       label: 'All Technologies' },
  { key: 'language',  label: 'Languages'       },
  { key: 'framework', label: 'Frameworks & Libs' },
  { key: 'tool',      label: 'Tools & Platforms' },
];

/* ── Interactive Spotlight Card ─────────────────────────────── */
function SkillCard({ skill, index }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCoords(prev => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <motion.div
      ref={cardRef}
      layout
      custom={index}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      transition={{ duration: 0.45, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="skills__card"
      whileHover={{ y: -6, scale: 1.03 }}
    >
      {/* Dynamic radial spotlight follows cursor */}
      <div
        className="skills__card-spotlight"
        style={{
          opacity: coords.opacity,
          background: `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, rgba(167, 139, 250, 0.22), transparent 80%)`,
        }}
      />

      <div
        className="skills__icon-box"
        style={{ '--skill-brand': skill.color }}
      >
        <span className="skills__icon" aria-hidden="true">
          {ICON_MAP[skill.iconKey]}
        </span>
      </div>

      <div className="skills__info">
        <span className="skills__name">{skill.name}</span>
        <span className="skills__badge">{skill.category}</span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const filtered = skillsData.filter(s => {
    const matchesCat = filter === 'all' || s.category === filter;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="skills" ref={ref} aria-labelledby="skills-heading">
      <div className="skills__glow skills__glow--1" aria-hidden="true" />
      <div className="skills__glow skills__glow--2" aria-hidden="true" />

      <div className="skills__inner">
        {/* ── Section Header ───────────────────────────── */}
        <motion.div
          className="skills__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow-wrap">
            <span className="eyebrow-line" aria-hidden="true" />
            <p className="eyebrow">Arsenal &amp; Tools</p>
          </div>
          <h2 id="skills-heading" className="section-heading">
            Technical <span className="accent">Proficiencies</span>
          </h2>
          <p className="skills__sub">
            A comprehensive suite of modern frameworks, strongly typed languages, and developer workflows I command.
          </p>
        </motion.div>

        {/* ── Controls Bar: Filters & Search ───────────── */}
        <div className="skills__controls">
          <div className="skills__filters" role="group" aria-label="Category Filters">
            {FILTERS.map(f => (
              <button
                key={f.key}
                className={`skills__filter-btn ${filter === f.key ? 'skills__filter-btn--active' : ''}`}
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
              >
                {filter === f.key && (
                  <motion.span
                    layoutId="activeFilterPill"
                    className="skills__filter-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="skills__filter-text">{f.label}</span>
              </button>
            ))}
          </div>

          {/* Quick search input */}
          <div className="skills__search-wrap">
            <FaSearch className="skills__search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search skill (e.g. React, Java)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="skills__search-input"
            />
          </div>
        </div>

        {/* ── Skills Grid ──────────────────────────────── */}
        <motion.div className="skills__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="skills__empty">
            <p>No skills found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
