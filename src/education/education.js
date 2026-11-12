import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  FaGraduationCap,
  FaBriefcase,
  FaAward,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import experiences from "../data/experience.js";
import "./education.css";

const TYPE_CONFIG = {
  education: {
    label: "Education",
    icon: <FaGraduationCap />,
    color: "#A78BFA",
  },
  work: { label: "Work Experience", icon: <FaBriefcase />, color: "#8B5CF6" },
  award: { label: "Scholarship", icon: <FaAward />, color: "#C4B5FD" },
};

export default function Education() {
  const ref = useRef(null);
  const listRef = useRef(null);
  const btnRefs = useRef({});
  const firstScroll = useRef(true);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [active, setActive] = useState(experiences[experiences.length - 1].id);
  const [edges, setEdges] = useState({ left: false, right: false });
  const [compact, setCompact] = useState(false);

  const foundIndex = experiences.findIndex((e) => e.id === active);
  const activeIndex = foundIndex === -1 ? 0 : foundIndex;
  const activeEntry = experiences[activeIndex];

  const goTo = useCallback((index) => {
    const next = Math.max(0, Math.min(experiences.length - 1, index));
    setActive(experiences[next].id);
    return next;
  }, []);

  // Small-screen mode: timeline becomes a horizontal strip and the card can be swiped
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setCompact(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  // Keep the selected chip centred in the strip (no-op when the timeline is vertical)
  useEffect(() => {
    if (!inView) return;
    const list = listRef.current;
    const btn = btnRefs.current[active];
    if (!list || !btn || list.scrollWidth <= list.clientWidth + 1) {
      firstScroll.current = false;
      return;
    }
    const lr = list.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    const left =
      list.scrollLeft + (br.left - lr.left) - (lr.width - br.width) / 2;
    list.scrollTo({
      left,
      behavior: firstScroll.current || reduced ? "auto" : "smooth",
    });
    firstScroll.current = false;
  }, [active, inView, compact, reduced]);

  // Show an edge fade only on the side that still has hidden chips
  const updateEdges = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const left = el.scrollLeft > 4;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setEdges((prev) =>
      prev.left === left && prev.right === right ? prev : { left, right },
    );
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(updateEdges);
      ro.observe(el);
      Array.from(el.children).forEach((child) => ro.observe(child));
    }
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
      if (ro) ro.disconnect();
    };
  }, [updateEdges]);

  // Arrow keys / Home / End move between milestones
  const onTimelineKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[
      e.key
    ];
    let target;
    if (step) target = activeIndex + step;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = experiences.length - 1;
    else return;
    e.preventDefault();
    const next = goTo(target);
    btnRefs.current[experiences[next].id]?.focus({ preventScroll: true });
  };

  const onCardDragEnd = (_, info) => {
    if (info.offset.x < -70 || info.velocity.x < -500) goTo(activeIndex + 1);
    else if (info.offset.x > 70 || info.velocity.x > 500) goTo(activeIndex - 1);
  };

  return (
    <div className="exp" ref={ref} aria-labelledby="experience-heading">
      <div className="exp__glow exp__glow--1" aria-hidden="true" />
      <div className="exp__glow exp__glow--2" aria-hidden="true" />

      <div className="exp__inner">
        {/* ── Section Header ───────────────────────────── */}
        <motion.div
          className="exp__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow-wrap">
            <span className="eyebrow-line" aria-hidden="true" />
            <p className="eyebrow">Milestones &amp; Journey</p>
          </div>
          <h2 id="experience-heading" className="section-heading">
            Experience &amp; <span className="accent">Education</span>
          </h2>
          <p className="exp__header-sub">
            Chronological evolution of my engineering career, research
            contributions, and leadership awards.
          </p>
        </motion.div>

        {/* ── Interactive Layout ───────────────────────── */}
        <div className="exp__layout">
          {/* Timeline navigation sidebar */}
          <div
            className="exp__sidebar"
            data-edge-left={edges.left ? "true" : "false"}
            data-edge-right={edges.right ? "true" : "false"}
          >
            <div className="exp__line-track" aria-hidden="true">
              <div className="exp__line-beam" />
            </div>

            <ul
              className="exp__timeline"
              ref={listRef}
              onKeyDown={onTimelineKeyDown}
              aria-label="Career Milestones"
            >
              {experiences.map((entry, i) => {
                const isCurrent = active === entry.id;

                return (
                  <motion.li
                    key={entry.id}
                    initial={{ opacity: 0, x: -24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <button
                      ref={(el) => {
                        btnRefs.current[entry.id] = el;
                      }}
                      className={`exp__item-btn ${isCurrent ? "exp__item-btn--active" : ""}`}
                      onClick={() => setActive(entry.id)}
                      aria-pressed={isCurrent}
                      aria-label={`${entry.place} - ${entry.title}`}
                    >
                      {/* Interactive dot indicator */}
                      <span className="exp__dot-wrap" aria-hidden="true">
                        <span className="exp__dot" />
                        {isCurrent && (
                          <motion.span
                            layoutId="activeDotRing"
                            className="exp__dot-ring"
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 28,
                            }}
                          />
                        )}
                      </span>

                      {/* Info preview */}
                      <div className="exp__item-info">
                        <div className="exp__item-logo-wrap">
                          <img
                            src={entry.logo}
                            alt={entry.place}
                            className="exp__item-logo"
                          />
                        </div>
                        <div className="exp__item-meta">
                          <span className="exp__item-place">{entry.place}</span>
                          <span className="exp__item-date">
                            <FaCalendarAlt className="exp__date-icon" />{" "}
                            {entry.date}
                          </span>
                        </div>
                      </div>
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            {/* Small screens: previous / next + position counter */}
            <div className="exp__mobile-nav">
              <button
                type="button"
                className="exp__nav-btn"
                onClick={() => goTo(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous milestone"
              >
                <FaChevronLeft />
              </button>
              <span className="exp__nav-count" aria-live="polite">
                {activeIndex + 1} / {experiences.length}
              </span>
              <button
                type="button"
                className="exp__nav-btn"
                onClick={() => goTo(activeIndex + 1)}
                disabled={activeIndex === experiences.length - 1}
                aria-label="Next milestone"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          {/* Detailed view panel */}
          <div className="exp__content-pane">
            <AnimatePresence mode="wait">
              {activeEntry && (
                <motion.div
                  key={activeEntry.id}
                  className="exp__card"
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  drag={compact ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={onCardDragEnd}
                >
                  <div className="exp__card-header">
                    <div className="exp__card-logo-box">
                      <img
                        src={activeEntry.logo}
                        alt={activeEntry.place}
                        className="exp__card-logo"
                      />
                    </div>

                    <div className="exp__card-title-group">
                      <div
                        className="exp__card-type-badge"
                        style={{ color: TYPE_CONFIG[activeEntry.type]?.color }}
                      >
                        {TYPE_CONFIG[activeEntry.type]?.icon}
                        <span>{TYPE_CONFIG[activeEntry.type]?.label}</span>
                      </div>

                      <h3 className="exp__card-role">{activeEntry.title}</h3>
                      <div className="exp__card-place-date">
                        <span className="exp__card-place">
                          {activeEntry.place}
                        </span>
                        <span className="exp__card-sep">•</span>
                        <span className="exp__card-date">
                          {activeEntry.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="exp__card-divider" />

                  {/* Bullet points */}
                  <ul className="exp__card-desc-list">
                    {activeEntry.description.map((point, index) => (
                      <motion.li
                        key={index}
                        className="exp__card-desc-item"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.35 }}
                      >
                        <span className="exp__desc-bullet" aria-hidden="true">
                          <FaCheckCircle className="exp__bullet-icon" />
                        </span>
                        <span className="exp__desc-text">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
