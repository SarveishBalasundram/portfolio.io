import { useMemo, useRef, useState, useEffect, useCallback, Suspense } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaArrowRight, FaReact, FaPython, FaNodeJs, FaJava } from 'react-icons/fa';
import { SiTypescript, SiVite, SiSpringboot, SiFlutter } from 'react-icons/si';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import './header.css';

/* ══════════════════════════════════════════════════════════
   SPLIT TEXT — character-by-character reveal
══════════════════════════════════════════════════════════ */
function SplitText({ text, className, delay = 0, stagger = 0.04 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, y: 32, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: delay + i * stagger, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   MAGNETIC BUTTON
══════════════════════════════════════════════════════════ */
function MagneticButton({ children, className, onClick, href, download }) {
  const ref = useRef(null);
  const x   = useMotionValue(0);
  const y   = useMotionValue(0);
  const sx  = useSpring(x, { stiffness: 200, damping: 20 });
  const sy  = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width  / 2) * 0.35);
    y.set((e.clientY - rect.top  - rect.height / 2) * 0.35);
  }, [x, y]);

  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  const Tag   = href ? motion.a : motion.button;
  const props = href
    ? { href, download, target: download ? undefined : '_blank', rel: download ? undefined : 'noopener noreferrer' }
    : { onClick };

  return (
    <Tag ref={ref} className={className} style={{ x: sx, y: sy }}
      onMouseMove={handleMove} onMouseLeave={handleLeave} {...props}>
      {children}
    </Tag>
  );
}

/* ══════════════════════════════════════════════════════════
   HOLOGRAPHIC 3D CYBER TERMINAL & TECH SATELLITES
══════════════════════════════════════════════════════════ */

const SNIPPETS = {
  react: {
    tab: 'Architect.tsx',
    lang: 'TypeScript',
    tag: 'Full-Stack',
    lines: [
      { num: '01', text: "import { Performance, Intelligence } from '@core/stack';", type: 'import' },
      { num: '02', text: "import type { SoftwareArchitect } from '@/sarveish';", type: 'import' },
      { num: '03', text: "" },
      { num: '04', text: "export const engineer: SoftwareArchitect = {", type: 'decl' },
      { num: '05', text: '  name: "Sarveish Balasundram",', type: 'prop' },
      { num: '06', text: '  role: "Digital Business Analyst & Software Engineer",', type: 'prop' },
      { num: '07', text: '  location: "Klang / Kuala Lumpur, Malaysia 🇲🇾",', type: 'prop' },
      { num: '08', text: '  company: "Hilti Asia Services | Ex-Ant International",', type: 'prop' },
      { num: '09', text: '  stack: ["Java", "Spring Boot", "React", "Agile", "Analytics"],', type: 'prop' },
      { num: '10', text: "  deploy: async () => await EnterpriseScale.execute()", type: 'func' },
      { num: '11', text: "};", type: 'decl' }
    ]
  },
  python: {
    tab: 'NeuralCore.py',
    lang: 'Python',
    tag: 'AI / Machine Learning',
    lines: [
      { num: '01', text: "import torch", type: 'import' },
      { num: '02', text: "from deep_learning import ProductionInferenceEngine", type: 'import' },
      { num: '03', text: "" },
      { num: '04', text: "class IntelligentAgent(torch.nn.Module):", type: 'decl' },
      { num: '05', text: "    def __init__(self, latency_budget='sub-30ms'):", type: 'func' },
      { num: '06', text: "        super().__init__()", type: 'import' },
      { num: '07', text: "        self.engine = ProductionInferenceEngine()", type: 'prop' },
      { num: '08', text: "        self.accuracy = '99.98% @ high concurrency'", type: 'prop' },
      { num: '09', text: "" },
      { num: '10', text: "    def forward(self, query):", type: 'func' },
      { num: '11', text: "        return self.engine.synthesize(query)", type: 'prop' }
    ]
  },
  backend: {
    tab: 'Backend.java',
    lang: 'Java',
    tag: 'Backend / APIs',
    lines: [
      { num: '01', text: "package com.sarveish.api;", type: 'import' },
      { num: '02', text: "import org.springframework.web.bind.annotation.*;", type: 'import' },
      { num: '03', text: "" },
      { num: '04', text: "@RestController", type: 'decl' },
      { num: '05', text: '@RequestMapping("/api/v1")', type: 'decl' },
      { num: '06', text: "public class PortfolioController {", type: 'decl' },
      { num: '07', text: '    @GetMapping("/engineer")', type: 'func' },
      { num: '08', text: "    public Engineer getEngineer() {", type: 'func' },
      { num: '09', text: "        return service.findSarveish();", type: 'prop' },
      { num: '10', text: "    }", type: 'decl' },
      { num: '11', text: "}", type: 'decl' }
    ]
  }
};

/* ── Sizing contract ──────────────────────────────────────
   The glass plane is PLANE_W x PLANE_H world units. The HTML terminal
   (TERM_PX wide) is scaled so it fills SCREEN_W world units of it.
   drei's <Html transform> renders 1 world unit = 400 / distanceFactor px,
   so distanceFactor = 400 * SCREEN_W / TERM_PX keeps both in sync. */
const PLANE_W  = 4.4;
const PLANE_H  = 2.85;
const SCREEN_W = 4.28;
const TERM_PX  = { full: 560, compact: 460 };

const SATELLITES = [
  { angleOffset: 0,    radiusX: 2.85, radiusZ: 1.8,  height: 0.65,  speed: 0.3,  Icon: FaReact,      label: 'React',      techKey: 'react'  },
  { angleOffset: 1.05, radiusX: 3.1,  radiusZ: 2.0,  height: -0.35, speed: 0.28, Icon: FaPython,     label: 'Python',     techKey: 'python' },
  { angleOffset: 2.1,  radiusX: 2.7,  radiusZ: 1.7,  height: 0.5,   speed: 0.32, Icon: SiTypescript, label: 'TypeScript', techKey: 'react'  },
  { angleOffset: 3.15, radiusX: 3.0,  radiusZ: 1.9,  height: -0.45, speed: 0.29, Icon: SiSpringboot, label: 'Spring Boot', techKey: 'backend' },
  { angleOffset: 4.2,  radiusX: 2.8,  radiusZ: 1.75, height: 0.3,   speed: 0.31, Icon: SiVite,       label: 'Vite.js',    techKey: 'react'  },
  { angleOffset: 5.25, radiusX: 2.95, radiusZ: 1.85, height: -0.2,  speed: 0.27, Icon: FaNodeJs,     label: 'Node.js',    techKey: 'react', desktopOnly: true },
];

const TECH_STRIP = [
  { icon: <FaReact />,      label: 'React' },
  { icon: <SiVite />,       label: 'Vite.js' },
  { icon: <SiTypescript />, label: 'TypeScript' },
  { icon: <FaNodeJs />,     label: 'Node.js' },
  { icon: <FaJava />,       label: 'Java' },
  { icon: <FaPython />,     label: 'Python' },
  { icon: <SiFlutter />,    label: 'Flutter' },
  { icon: <SiSpringboot />, label: 'Spring Boot' },
];

/** Holographic emitter rings rotating on the pedestal floor */
function HoloEmitterRings({ isLight, scale = 1 }) {
  const r1 = useRef();
  const r2 = useRef();
  const r3 = useRef();

  useFrame((_, delta) => {
    if (r1.current) r1.current.rotation.z += delta * 0.35;
    if (r2.current) r2.current.rotation.z -= delta * 0.22;
    if (r3.current) r3.current.rotation.z += delta * 0.12;
  });

  const ringColor = isLight ? "#7C3AED" : "#8B5CF6";

  return (
    <group position={[0, -1.95 * scale, 0]} scale={scale} rotation={[-Math.PI / 2.3, 0, 0]}>
      {/* Inner glowing ring */}
      <mesh ref={r1}>
        <ringGeometry args={[1.7, 1.73, 64]} />
        <meshBasicMaterial
          color={ringColor}
          transparent
          opacity={isLight ? 0.4 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Segmented middle ring */}
      <mesh ref={r2}>
        <ringGeometry args={[2.35, 2.39, 48]} />
        <meshBasicMaterial
          color={isLight ? "#A78BFA" : "#C4B5FD"}
          transparent
          opacity={isLight ? 0.3 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Outer faint ring */}
      <mesh ref={r3}>
        <ringGeometry args={[3.05, 3.08, 64]} />
        <meshBasicMaterial
          color={ringColor}
          transparent
          opacity={isLight ? 0.2 : 0.12}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/** Orbiting 3D Tech Satellite Badge */
function TechSatellite({
  angleOffset,
  radiusX = 2.9,
  radiusZ = 2.0,
  height = 0,
  speed = 0.32,
  icon,
  label,
  techKey,
  activeTech,
  onClick,
  isLight,
  orbit = 1,
  compact = false
}) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + angleOffset;
    const x = Math.cos(t) * radiusX * orbit;
    const z = Math.sin(t) * radiusZ * orbit;
    const y = (height + Math.sin(t * 1.8) * 0.16) * orbit;
    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }
  });

  const isActive = activeTech === techKey;

  return (
    <group ref={groupRef}>
      {/* Mini crystal node */}
      <mesh rotation={[0.4, 0.4, 0]}>
        <octahedronGeometry args={[0.14, 0]} />
        <meshStandardMaterial
          color={isActive ? "#D4AF37" : (isLight ? "#7C3AED" : "#A78BFA")}
          emissive={isActive ? "#D4AF37" : (isLight ? "#6D28D9" : "#5B21B6")}
          emissiveIntensity={isActive ? 0.6 : 0.3}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Floating 3D badge */}
      <Html
        distanceFactor={compact ? 5 : 6}
        style={{ pointerEvents: 'auto', userSelect: 'none' }}
        position={[0, 0.26, 0]}
        center
      >
        <button
          onClick={(e) => { e.stopPropagation(); onClick(techKey); }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`holo-tech-pill ${isActive ? 'holo-tech-pill--active' : ''}`}
          aria-label={`Switch to ${label} syntax`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 11px',
            borderRadius: '9999px',
            background: isActive
              ? (isLight ? 'linear-gradient(135deg, #7C3AED, #5B21B6)' : 'linear-gradient(135deg, #D4AF37, #B45309)')
              : (isLight ? 'rgba(255, 255, 255, 0.94)' : 'rgba(18, 12, 34, 0.9)'),
            color: isActive
              ? '#FFFFFF'
              : (isLight ? '#3D2B6B' : '#E2D9F3'),
            border: isActive
              ? '1.5px solid #D4AF37'
              : (isLight ? '1.5px solid rgba(124, 58, 237, 0.25)' : '1px solid rgba(167, 139, 250, 0.3)'),
            boxShadow: isActive
              ? '0 0 16px rgba(212, 175, 55, 0.55)'
              : (isLight ? '0 4px 14px rgba(124, 58, 237, 0.12)' : '0 4px 18px rgba(0, 0, 0, 0.6)'),
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif",
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(8px)',
            transition: 'all 220ms ease',
            transform: hovered ? 'scale(1.12) translateY(-2px)' : 'scale(1)'
          }}
        >
          <span style={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}>{icon}</span>
          <span>{label}</span>
        </button>
      </Html>
    </group>
  );
}

/** The 3D Floating Glass Cyber Terminal Screen */
function HoloTerminal({ isLight, activeTech, setActiveTech, compact, reduced, pointerRef }) {
  const groupRef = useRef();

  const termPx         = compact ? TERM_PX.compact : TERM_PX.full;
  const distanceFactor = (400 * SCREEN_W) / termPx;
  const gutter         = compact ? 22 : 28;
  const edgeGeo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.PlaneGeometry(PLANE_W + 0.02, PLANE_H + 0.02)),
    []
  );

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // Gentle floating elevation breath
    g.position.y = 0.1 + (reduced ? 0 : Math.sin(t * 0.8) * 0.08);
    // Cursor parallax tilt (+ slow sway) with damped easing
    const p = pointerRef?.current || { x: 0, y: 0 };
    const sway = reduced ? 0 : Math.sin(t * 0.45) * 0.08;
    const k = 1 - Math.pow(0.001, delta);
    g.rotation.x += ((0.05 + p.y * 0.12) - g.rotation.x) * k;
    g.rotation.y += ((-0.12 + p.x * 0.18 + sway) - g.rotation.y) * k;
  });

  const activeSnippet = SNIPPETS[activeTech] || SNIPPETS.react;

  return (
    <group ref={groupRef} position={[0, 0.1, 0]} rotation={[0.05, -0.12, 0]}>
      {/* 3D Glass Backplate Mesh */}
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[PLANE_W, PLANE_H]} />
        <meshStandardMaterial
          color={isLight ? "#FFFFFF" : "#0A0614"}
          transparent
          opacity={isLight ? 0.6 : 0.8}
          roughness={0.25}
          metalness={0.2}
        />
      </mesh>

      {/* Cybernetic Bezel Outline */}
      <lineSegments position={[0, 0, -0.02]}>
        <primitive object={edgeGeo} attach="geometry" />
        <lineBasicMaterial
          color={isLight ? "#7C3AED" : "#8B5CF6"}
          transparent
          opacity={isLight ? 0.5 : 0.4}
          linewidth={2}
        />
      </lineSegments>

      {/* 3D Transform HTML Terminal Window */}
      <Html
        transform
        distanceFactor={distanceFactor}
        position={[0, 0, 0.02]}
        className="holo-terminal-3d-wrap"
      >
        <div
          className={`holo-terminal ${isLight ? 'holo-terminal--light' : 'holo-terminal--dark'}`}
          style={{
            width: `${termPx}px`,
            borderRadius: '18px',
            overflow: 'hidden',
            background: isLight ? 'rgba(255, 255, 255, 0.94)' : 'rgba(12, 8, 24, 0.92)',
            border: isLight ? '1.5px solid rgba(124, 58, 237, 0.28)' : '1px solid rgba(167, 139, 250, 0.35)',
            boxShadow: isLight
              ? '0 16px 40px rgba(30, 10, 60, 0.14), 0 0 30px rgba(124, 58, 237, 0.12)'
              : '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(139, 92, 246, 0.3)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            fontFamily: "'Inter', monospace",
            display: 'flex',
            flexDirection: 'column',
            userSelect: 'none'
          }}
        >
          {/* Terminal Window Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              background: isLight ? 'rgba(243, 239, 251, 0.95)' : 'rgba(18, 12, 34, 0.95)',
              borderBottom: isLight ? '1px solid rgba(124, 58, 237, 0.14)' : '1px solid rgba(167, 139, 250, 0.18)',
            }}
          >
            {/* macOS Cyber Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444', display: 'inline-block', boxShadow: '0 0 6px rgba(239, 68, 68, 0.5)' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block', boxShadow: '0 0 6px rgba(245, 158, 11, 0.5)' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 6px rgba(16, 185, 129, 0.5)' }} />
            </div>

            {/* Clickable File Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {[
                { key: 'react', label: 'Architect.tsx', icon: <FaReact /> },
                { key: 'python', label: 'NeuralCore.py', icon: <FaPython /> },
                { key: 'backend', label: 'Backend.java', icon: <SiSpringboot /> }
              ].map((tab) => {
                const isTabActive = activeTech === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTech(tab.key)}
                    aria-label={tab.label}
                    title={tab.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      fontFamily: "'Space Grotesk', monospace",
                      cursor: 'pointer',
                      border: 'none',
                      transition: 'all 180ms ease',
                      background: isTabActive
                        ? (isLight ? '#FFFFFF' : 'rgba(139, 92, 246, 0.25)')
                        : 'transparent',
                      color: isTabActive
                        ? (isLight ? '#7C3AED' : '#C4B5FD')
                        : (isLight ? '#796F8E' : 'rgba(184, 176, 199, 0.6)'),
                      boxShadow: isTabActive
                        ? (isLight ? '0 1px 4px rgba(0,0,0,0.06)' : '0 0 10px rgba(139, 92, 246, 0.35)')
                        : 'none'
                    }}
                  >
                    <span>{tab.icon}</span>
                    {!compact && <span>{tab.label}</span>}
                  </button>
                );
              })}
            </div>

            {/* Git Branch Badge */}
            {!compact && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: isLight ? '#059669' : '#34D399', fontWeight: 600 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isLight ? '#059669' : '#34D399' }} />
              <span>git:(main)</span>
            </div>
            )}
          </div>

          {/* Terminal Code Body */}
          <div
            style={{
              padding: compact ? '14px 14px' : '16px 20px',
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
              fontSize: compact ? '10px' : '12.5px',
              lineHeight: compact ? '1.65' : '1.7',
              minHeight: compact ? '229px' : '286px',
              background: isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(10, 6, 18, 0.95)',
              position: 'relative'
            }}
          >
            {/* Code Lines with Syntax Coloring */}
            {activeSnippet.lines.map((line, idx) => {
              let codeColor = isLight ? '#0F0A1C' : '#F5F3FA';
              if (line.type === 'import') codeColor = isLight ? '#7C3AED' : '#C4B5FD';
              if (line.type === 'decl')   codeColor = isLight ? '#D97706' : '#FBBF24';
              if (line.type === 'prop')   codeColor = isLight ? '#473B63' : '#E2D9F3';
              if (line.type === 'func')   codeColor = isLight ? '#059669' : '#34D399';

              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <span
                    style={{
                      width: `${gutter}px`,
                      color: isLight ? '#A096B8' : 'rgba(184, 176, 199, 0.4)',
                      fontSize: compact ? '9px' : '11px',
                      flexShrink: 0,
                      userSelect: 'none'
                    }}
                  >
                    {line.num}
                  </span>
                  <span style={{ color: codeColor, whiteSpace: 'pre', fontWeight: line.type === 'decl' ? 600 : 400 }}>
                    {line.text}
                  </span>
                </div>
              );
            })}

            {/* Blinking Cyber Cursor */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px', paddingLeft: `${gutter}px` }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '15px',
                  background: isLight ? '#7C3AED' : '#D4AF37',
                  boxShadow: isLight ? '0 0 8px rgba(124, 58, 237, 0.6)' : '0 0 10px rgba(212, 175, 55, 0.7)',
                  animation: 'terminalCursorBlink 1s infinite'
                }}
              />
            </div>
          </div>

          {/* Terminal Footer Diagnostics Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 14px',
              fontSize: '10.5px',
              fontFamily: "'Space Grotesk', monospace",
              background: isLight ? '#F3EFFB' : 'rgba(16, 10, 30, 0.95)',
              borderTop: isLight ? '1px solid rgba(124, 58, 237, 0.12)' : '1px solid rgba(167, 139, 250, 0.14)',
              color: isLight ? '#796F8E' : 'rgba(184, 176, 199, 0.7)',
              fontWeight: 500
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: isLight ? '#059669' : '#34D399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isLight ? '#059669' : '#34D399' }} />
                <span>0 errors</span>
              </span>
              {!compact && <span>0 warnings</span>}
              <span style={{ color: isLight ? '#7C3AED' : '#C4B5FD' }}>{activeSnippet.tag}</span>
            </div>
            <div>
              <span>UTF-8 • {activeSnippet.lang}</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

/** Orbit controls: drag to tilt. Touch keeps vertical page scrolling. */
function TerminalControls({ compact }) {
  const { camera, gl } = useThree();

  // OrbitControls sets touch-action: none, which traps page scroll on phones.
  // Re-allow vertical panning so swiping over the stage scrolls the page.
  useEffect(() => {
    gl.domElement.style.touchAction = 'pan-y';
  }, [gl, compact]);

  return (
    <OrbitControls
      args={[camera, gl.domElement]}
      enableZoom={false}
      enablePan={false}
      minPolarAngle={Math.PI * 0.28}
      maxPolarAngle={Math.PI * 0.68}
      minAzimuthAngle={-Math.PI * 0.38}
      maxAzimuthAngle={Math.PI * 0.38}
      rotateSpeed={compact ? 0.35 : 0.55}
      enableDamping
      dampingFactor={0.08}
    />
  );
}

/** Everything inside the Canvas. Frames itself to the canvas size. */
function Scene({ isLight, pointerRef, reduced }) {
  const [activeTech, setActiveTech] = useState('react');
  const { camera, size } = useThree();

  // "Compact" is decided by the stage's own width, not the window's.
  const compact = size.width < 560;
  const orbit   = compact ? 0.64 : 1;

  // Pull the camera back until the whole scene (terminal + orbit) fits,
  // whatever the aspect ratio. Keeps direction so dragging isn't disturbed.
  useEffect(() => {
    const aspect  = size.width / Math.max(size.height, 1);
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const halfW   = compact ? 2.7 : 3.5;
    const halfH   = compact ? 2.3 : 2.45;
    const dist    = Math.max(halfW / (tanHalf * aspect), halfH / tanHalf);
    camera.position.setLength(dist);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height, compact]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={isLight ? 0.9 : 0.4} />
      <directionalLight position={[6, 6, 6]}    intensity={isLight ? 2.2 : 1.8} color="#C4B5FD" />
      <directionalLight position={[-6, -3, -4]} intensity={isLight ? 1.0 : 0.9} color="#7C3AED" />
      <pointLight position={[0, 3, 4]}          intensity={isLight ? 1.3 : 1.2} color="#A78BFA" />

      <Suspense fallback={null}>
        <HoloEmitterRings isLight={isLight} scale={orbit} />

        <HoloTerminal
          isLight={isLight}
          activeTech={activeTech}
          setActiveTech={setActiveTech}
          compact={compact}
          reduced={reduced}
          pointerRef={pointerRef}
        />

        {SATELLITES.filter((sat) => !(compact && sat.desktopOnly)).map((sat) => (
          <TechSatellite
            key={sat.label}
            angleOffset={sat.angleOffset}
            radiusX={sat.radiusX}
            radiusZ={sat.radiusZ}
            height={sat.height}
            speed={sat.speed}
            icon={<sat.Icon />}
            label={sat.label}
            techKey={sat.techKey}
            activeTech={activeTech}
            onClick={setActiveTech}
            isLight={isLight}
            orbit={orbit}
            compact={compact}
          />
        ))}
      </Suspense>

      <TerminalControls compact={compact} />
    </>
  );
}

/** Canvas shell: pauses off-screen, tracks the cursor, respects reduced motion */
function CyberTerminalScene({ isMobile, isLight }) {
  const reduced    = useReducedMotion();
  const wrapRef    = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (isMobile || reduced) return;
    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      pointerRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      pointerRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [isMobile, reduced]);

  return (
    <div ref={wrapRef} className="hero__canvas-wrap">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 42 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        frameloop={inView ? 'always' : 'never'}
        style={{ width: '100%', height: '100%' }}
        aria-label="Interactive 3D Holographic Cyber Terminal — drag to tilt, click orbiting tech nodes"
        className="globe-canvas"
      >
        <Scene isLight={isLight} pointerRef={pointerRef} reduced={!!reduced} />
      </Canvas>
    </div>
  );
}

/** CSS 2.5D perspective fallback for no-WebGL environments */
function TerminalFallback({ isLight }) {
  return (
    <div className="terminal-fallback" aria-hidden="true">
      <div className={`holo-terminal ${isLight ? 'holo-terminal--light' : 'holo-terminal--dark'}`}>
        <div className="terminal-fallback__header">
          <span className="terminal-fallback__dot terminal-fallback__dot--red" />
          <span className="terminal-fallback__dot terminal-fallback__dot--yellow" />
          <span className="terminal-fallback__dot terminal-fallback__dot--green" />
          <span className="terminal-fallback__title">bash - sarveish@portfolio: ~</span>
        </div>
        <div className="terminal-fallback__body">
          <p className="terminal-fallback__line"><span className="kw">const</span> developer = &#123;</p>
          <p className="terminal-fallback__line">&nbsp;&nbsp;name: <span className="str">"Sarveish Balasundram"</span>,</p>
          <p className="terminal-fallback__line">&nbsp;&nbsp;role: <span className="str">"Digital Business Analyst &amp; Software Engineer"</span>,</p>
          <p className="terminal-fallback__line">&nbsp;&nbsp;status: <span className="fn">"Delivering Agile digital transformation"</span></p>
          <p className="terminal-fallback__line">&#125;;</p>
        </div>
      </div>
    </div>
  );
}

function WebGLCyberTerminal({ isMobile, isLight }) {
  const supported = useMemo(() => {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
    } catch { return false; }
  }, []);

  if (!supported) return <TerminalFallback isLight={isLight} />;
  return <CyberTerminalScene isMobile={isMobile} isLight={isLight} />;
}

/* ══════════════════════════════════════════════════════════
   SOCIAL LINKS
══════════════════════════════════════════════════════════ */
const SOCIAL_LINKS = [
  { icon: <FaGithub />,    href: 'https://github.com/SarveishBalasundram',            label: 'GitHub'    },
  { icon: <FaLinkedin />,  href: 'https://www.linkedin.com/in/sarveish-balasundram/', label: 'LinkedIn'  },
  { icon: <FaEnvelope />,  href: 'mailto:b.sarveish26@gmail.com',                     label: 'Email'     },
  { icon: <FaInstagram />, href: 'https://www.instagram.com/sarveish/',               label: 'Instagram' },
];

/* ══════════════════════════════════════════════════════════
   HERO COMPONENT
══════════════════════════════════════════════════════════ */
export default function Hero() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  // Parallax lives in motion values, so moving the mouse never re-renders the hero.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 22 });
  const sy = useSpring(py, { stiffness: 70, damping: 22 });
  const textX = useTransform(sx, (v) => v * -10);
  const textY = useTransform(sy, (v) => v * -6);
  const visX  = useTransform(sx, (v) => v * 15);
  const visY  = useTransform(sy, (v) => v * 10);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || reduced) return; // no parallax on touch / reduced motion
    const handleMove = (e) => {
      if (e.pointerType === 'touch') return;
      px.set((e.clientX / window.innerWidth  - 0.5) * 2);
      py.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [isMobile, reduced, px, py]);

  const scrollToAbout    = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="hero">
      {/* Animated ambient glows */}
      <div className="hero__bg-orb hero__bg-orb--1" aria-hidden="true" />
      <div className="hero__bg-orb hero__bg-orb--2" aria-hidden="true" />
      <div className="hero__bg-orb hero__bg-orb--3" aria-hidden="true" />

      {/* Cyber grid */}
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__inner">
        {/* ── Left: Text ──────────────────────────────── */}
        <motion.div
          className="hero__text"
          style={{ x: textX, y: textY }}
        >
          {/* Eyebrow — Unique Interactive Badge */}
          <motion.div
            className="hero__eyebrow-badge"
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero__eyebrow-wave" role="img" aria-label="waving hand">👋</span>
            <span className="hero__eyebrow-text">Hello, I'm</span>
            <span className="hero__eyebrow-spark" />
          </motion.div>

          {/* Name — character split */}
          <h1 className="hero__name" id="hero-heading" style={{ perspective: '600px' }}>
            <SplitText text="Sarveish" className="hero__name-line"              delay={0.1} stagger={0.05} />
            <br />
            <SplitText text="Balasundram" className="hero__name-line hero__name-line--accent" delay={0.5} stagger={0.04} />
          </h1>

          {/* Role — typewriter */}
          <motion.div
            className="hero__role-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <span className="hero__role-prefix">I deliver </span>
            <TypeAnimation
              sequence={[
                'Freelance Web & Systems', 2800,
                'Digital Transformation',  2600,
                'Full-Stack Applications', 2400,
                'Scalable Java Backends',   2200,
                'Enterprise Agile Systems',2400,
                'AI-Powered Solutions',    2400,
              ]}
              wrapper="span"
              className="hero__role-typed"
              speed={60}
              repeat={Infinity}
              cursor
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="hero__tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Digital Business Analyst &amp; Software Engineering Graduate — Bridging enterprise solutions with scalable software. Also actively freelancing to develop bespoke, production-ready websites and systems for clients.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagneticButton className="btn btn--primary" onClick={scrollToProjects}>
              <span>View My Work</span>
              <FaArrowRight className="btn__arrow" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton className="btn btn--ghost" onClick={scrollToAbout}>
              About Me
            </MagneticButton>
          </motion.div>

          {/* Socials */}
          <motion.div
            className="hero__socials"
            aria-label="Social links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.5 }}
          >
            {SOCIAL_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="hero__social-link"
                aria-label={link.label}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.9 + i * 0.08, duration: 0.4, type: 'spring', stiffness: 200 }}
                whileHover={{ y: -5, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: 3D holographic terminal stage ─────── */}
        <motion.div
          className="hero__visual"
          style={{ x: visX, y: visY }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__globe-glow" aria-hidden="true" />

          <div className="hero__stage">
            <WebGLCyberTerminal isMobile={isMobile} isLight={isLight} />
          </div>

          <div className="hero__globe-hint">
            <span>{isMobile ? '⟳ Swipe to tilt • Tap a tech node' : '⟳ Drag 3D Terminal • Click Tech Nodes'}</span>
          </div>
        </motion.div>
      </div>

      {/* Tech strip */}
      <motion.div
        className="hero__tech"
        aria-label="Tech stack"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
      >
        <div className="hero__tech-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="hero__tech-list" aria-hidden={copy === 1 ? 'true' : undefined}>
              {TECH_STRIP.map((t) => (
                <li key={t.label} className="hero__tech-item">
                  <span className="hero__tech-icon" aria-hidden="true">{t.icon}</span>
                  {t.label}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        className="hero__scroll-cue"
        onClick={scrollToAbout}
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        whileHover={{ color: '#A78BFA' }}
      >
        <span className="hero__scroll-line" aria-hidden="true" />
        <span className="hero__scroll-text">Scroll</span>
      </motion.button>
    </div>
  );
}