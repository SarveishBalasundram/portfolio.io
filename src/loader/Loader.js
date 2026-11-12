import { useEffect, useRef, useState } from "react";
import sbLogo from "../SB_Logo.png";
import "./loader.css";

/* ══════════════════════════════════════════════════════════
   PORTFOLIO LOADER — 4 looks, one file
   ──────────────────────────────────────────────────────────
   Pick a look by changing LOADER_VARIANT, or preview any of
   them without editing code:  yoursite.com/?loader=boot

     'glint'   Metallic logo with a light sweep + name rising in
     'boot'    Terminal "system boot" that lists your real info
     'counter' Huge 00 → 100 counter with the logo on top
     'name'    Giant name reveal + rotating highlights

   Why it stays smooth:
   • Every animation is transform / opacity only, so the browser
     runs it on the GPU compositor, even if the main thread is busy.
   • The progress bar and counter are written straight to the DOM
     with requestAnimationFrame: zero React re-renders.
   • The site mounts only when the curtain starts opening, and the
     curtain is pure CSS, so mounting the site can't freeze it.
══════════════════════════════════════════════════════════ */

export const LOADER_VARIANT = "glint";

/* Keep this in sync with your resume */
const INFO = {
  first: "SARVEISH",
  last: "BALASUNDRAM",
  role: "Digital Business Analyst",
  company: "Hilti Asia Services",
  education: "B.CompSci (Software Eng.) · UTM · 3.99 CGPA",
  stack: "Java · Spring Boot · React · Vite.js",
};

const VARIANTS = ["glint", "boot", "counter", "name"];

/* Minimum time on screen per look (ms). Longer waits only if assets aren't ready. */
const MIN_MS = { glint: 1500, boot: 2000, counter: 1500, name: 1700 };
const REPEAT_MS = 700; // returning visitor in the same tab session
const MAX_MS = 4000; // never hold the site hostage
const FINISH_MS = 300; // bar runs 90% → 100%
const HOLD_MS = 150; // "READY" beat before the curtain opens
const EXIT_MS = 800; // must match the CSS transition in loader.css
const EXIT_MS_REDUCED = 300; // reduced-motion fade

function pickVariant() {
  try {
    const q = new URLSearchParams(window.location.search).get("loader");
    if (VARIANTS.includes(q)) return q;
  } catch (e) {
    /* ignore */
  }
  return LOADER_VARIANT;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* Evaluated once per page load (safe under React StrictMode).
   A refresh or a ?loader= preview always shows the full intro. */
const IS_REPEAT_VISIT = (() => {
  try {
    const nav = performance.getEntriesByType("navigation")[0];
    const isReload = !!nav && nav.type === "reload";
    const isPreview = new URLSearchParams(window.location.search).has("loader");
    const seen = sessionStorage.getItem("sb_loader_seen") === "1";
    sessionStorage.setItem("sb_loader_seen", "1");
    return seen && !isReload && !isPreview;
  } catch (e) {
    return false;
  }
})();

function decodeImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    if (img.decode) img.decode().then(resolve, resolve);
    else {
      img.onload = resolve;
      img.onerror = resolve;
    }
  });
}

/* Drives the bar + number straight in the DOM. No React state, no re-renders. */
function useLoaderProgress({ barRef, numRef, ready, duration }) {
  const st = useRef({ p: 0, t0: 0, from: null, finishT0: 0 });

  useEffect(() => {
    const s = st.current;
    let raf;
    const tick = (now) => {
      if (!s.t0) s.t0 = now;
      if (!ready) {
        const t = Math.min(1, (now - s.t0) / duration);
        s.p = 0.9 * (1 - Math.pow(1 - t, 3)); // ease-out to 90%
      } else {
        if (s.from === null) {
          s.from = s.p;
          s.finishT0 = now;
        }
        const t = Math.min(1, (now - s.finishT0) / FINISH_MS);
        s.p = s.from + (1 - s.from) * (1 - Math.pow(1 - t, 3));
      }
      if (barRef.current)
        barRef.current.style.transform = `scaleX(${s.p.toFixed(4)})`;
      if (numRef.current)
        numRef.current.textContent = String(Math.round(s.p * 100)).padStart(
          2,
          "0",
        );
      if (!(ready && s.p >= 1)) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, duration, barRef, numRef]);
}

/* ── Building blocks ───────────────────────────────────── */

function Emblem() {
  const mask = `url(${sbLogo})`;
  return (
    <div className="ld__emblem" aria-hidden="true">
      <span className="ld__glow" />
      <span className="ld__ring ld__ring--a" />
      <span className="ld__ring ld__ring--b" />
      <div className="ld__logo">
        <img src={sbLogo} alt="" draggable="false" />
        {/* light sweep, clipped to the logo's own shape */}
        <span
          className="ld__glint"
          style={{ WebkitMaskImage: mask, maskImage: mask }}
        />
      </div>
    </div>
  );
}

function SplitName({ words }) {
  return (
    <h1 className="ld__name" aria-label={words.join(" ")}>
      {words.map((word, w) => (
        <span className="ld__word" key={word} aria-hidden="true">
          {[...word].map((ch, i) => (
            <span className="ld__char" key={i} style={{ "--i": i + w * 8 }}>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

function Status({ ready, barRef, numRef, showNumber = true }) {
  return (
    <div className="ld__progress">
      <div className="ld__track">
        <div className="ld__bar" ref={barRef} />
      </div>
      <div className="ld__status">
        <span className={ready ? "is-ready" : ""}>
          {ready ? "READY" : "LOADING PORTFOLIO"}
        </span>
        {showNumber && (
          <span>
            <b ref={numRef}>00</b>%
          </span>
        )}
      </div>
    </div>
  );
}

const BOOT_LINES = [
  [
    "identity",
    `${INFO.first[0]}${INFO.first.slice(1).toLowerCase()} ${INFO.last[0]}${INFO.last.slice(1).toLowerCase()}`,
  ],
  ["role", `${INFO.role} @ ${INFO.company}`],
  ["education", INFO.education],
  ["stack", INFO.stack],
];

/* ── Component ─────────────────────────────────────────── */

export default function Loader({ onReveal, onDone }) {
  const [variant] = useState(pickVariant);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  const barRef = useRef(null);
  const numRef = useRef(null);
  const [reduced] = useState(prefersReducedMotion);

  const minMs = reduced ? 400 : IS_REPEAT_VISIT ? REPEAT_MS : MIN_MS[variant];

  useLoaderProgress({ barRef, numRef, ready, duration: minMs });

  // 1) Wait for the minimum time AND for fonts + logo to be ready (capped)
  useEffect(() => {
    let alive = true;
    const timers = [];
    const t0 = performance.now();
    const assets = Promise.race([
      Promise.all([
        document.fonts ? document.fonts.ready : null,
        decodeImage(sbLogo),
      ]),
      new Promise((r) => timers.push(setTimeout(r, MAX_MS))),
    ]);
    assets.then(() => {
      const wait = Math.max(0, minMs - (performance.now() - t0));
      timers.push(setTimeout(() => alive && setReady(true), wait));
    });
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [minMs]);

  // 2) Bar hits 100% → short "READY" beat → open the curtain
  useEffect(() => {
    if (!ready) return undefined;
    const timers = [];
    timers.push(
      setTimeout(() => {
        setExiting(true);
        // two frames so the first curtain frame is painted before the site mounts
        requestAnimationFrame(() =>
          requestAnimationFrame(() => onReveal && onReveal()),
        );
        timers.push(
          setTimeout(
            () => onDone && onDone(),
            (reduced ? EXIT_MS_REDUCED : EXIT_MS) + 60,
          ),
        );
      }, FINISH_MS + HOLD_MS),
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <div
      className={`ld ld--${variant}${exiting ? " ld--exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="ld__panel ld__panel--l" aria-hidden="true" />
      <div className="ld__panel ld__panel--r" aria-hidden="true" />
      <div className="ld__bg" aria-hidden="true" />

      <div className="ld__stage">
        {variant === "glint" && (
          <>
            <Emblem />
            <SplitName words={[INFO.first, INFO.last]} />
            <span className="ld__role">
              <i className="ld__dot" />
              {INFO.role} @ {INFO.company}
            </span>
            <span className="ld__sub">{INFO.education}</span>
            <Status ready={ready} barRef={barRef} numRef={numRef} />
          </>
        )}

        {variant === "boot" && (
          <>
            <Emblem />
            <ul className="ld__log" aria-hidden="true">
              {BOOT_LINES.map(([k, v], i) => (
                <li key={k} style={{ "--d": `${0.45 + i * 0.3}s` }}>
                  <span className="ld__ok">✓</span>
                  <span className="ld__key">{k}</span>
                  <span className="ld__val">{v}</span>
                </li>
              ))}
              <li style={{ "--d": `${0.45 + BOOT_LINES.length * 0.3}s` }}>
                <span className="ld__caret" />
                <span className="ld__key">launching portfolio…</span>
              </li>
            </ul>
            <Status ready={ready} barRef={barRef} numRef={numRef} />
          </>
        )}

        {variant === "counter" && (
          <>
            <Emblem />
            <div className="ld__count" aria-hidden="true">
              <span ref={numRef}>00</span>
              <small>%</small>
            </div>
            <span className="ld__role">
              <i className="ld__dot" />
              {INFO.role} @ {INFO.company}
            </span>
            <Status
              ready={ready}
              barRef={barRef}
              numRef={numRef}
              showNumber={false}
            />
          </>
        )}

        {variant === "name" && (
          <>
            <Emblem />
            <SplitName words={[INFO.first, INFO.last]} />
            <div className="ld__ticker" aria-hidden="true">
              <span className="ld__tick" style={{ "--k": 0 }}>
                <i className="ld__dot" />
                {INFO.role} @ {INFO.company}
              </span>
              <span className="ld__tick" style={{ "--k": 1 }}>
                {INFO.education}
              </span>
              <span className="ld__tick" style={{ "--k": 2 }}>
                {INFO.stack}
              </span>
            </div>
            <Status ready={ready} barRef={barRef} numRef={numRef} />
          </>
        )}
      </div>
    </div>
  );
}
