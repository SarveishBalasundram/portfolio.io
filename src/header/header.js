import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Box, Typography, Button, IconButton } from "@mui/material";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Starfield = () => {
  const starsRef = useRef();
  const count = 2000;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 2000;
  }

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.0002;
      starsRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={1.5}
        sizeAttenuation={true}
        color="#ffffff"
        transparent
        opacity={0.8}
      />
    </points>
  );
};

const ThreeJSBackground = () => {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
      camera={{ position: [0, 0, 1], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <Starfield />
    </Canvas>
  );
};

const Header = () => {
  const [typedText, setTypedText] = useState("");
  const tagline =
    "Unlocking limitless possibilities through the art of software engineering.";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < tagline.length) {
        setTypedText(tagline.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [tagline]);

  const socialLinks = [
    {
      icon: <FaGithub />,
      url: "https://github.com/SarveishBalasundram",
      color: "#f0f6fc",
    },
    {
      icon: <FaEnvelope />,
      url: "mailto:b.sarveish26@gmail.com",
      color: "#ea4335",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/sarveish-balasundram/",
      color: "#0a66c2",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/sarveish/",
      color: "#e1306c",
    },
  ];

  return (
    <Box
      component="header"
      sx={{
        height: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        background: "linear-gradient(to bottom, #0a0a1a 0%,rgb(5, 5, 21) 100%)",
        textAlign: "center",
        px: 2,
      }}
      id="header"
    >
      <ThreeJSBackground />

      <Box
        sx={{
          zIndex: 2,
          maxWidth: "1000px",
          width: "90%",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Name with Glitch Effect */}
        <Box sx={{ mb: { xs: 3, md: 5 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Typography
              variant="h1"
              sx={{
                position: "relative",
                fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
                fontWeight: 700,
                letterSpacing: "3px",
                mb: 2,
                textTransform: "uppercase",
                lineHeight: 1.1,
                "&::before, &::after": {
                  content: "attr(data-text)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0.8,
                },
                "&::before": {
                  left: "2px",
                  textShadow: "-2px 0 #ff00c1",
                  clip: "rect(44px, 450px, 56px, 0)",
                  animation: "glitch-anim 5s infinite linear alternate-reverse",
                },
                "&::after": {
                  left: "-2px",
                  textShadow: "-2px 0 #00fff9",
                  clip: "rect(44px, 450px, 56px, 0)",
                  animation:
                    "glitch-anim2 5s infinite linear alternate-reverse",
                },
                "@keyframes glitch-anim": {
                  "0%": { clip: "rect(31px, 9999px, 94px, 0)" },
                  "20%": { clip: "rect(112px, 9999px, 76px, 0)" },
                  "40%": { clip: "rect(75px, 9999px, 107px, 0)" },
                  "60%": { clip: "rect(98px, 9999px, 109px, 0)" },
                  "80%": { clip: "rect(95px, 9999px, 53px, 0)" },
                  "100%": { clip: "rect(31px, 9999px, 14px, 0)" },
                },
                "@keyframes glitch-anim2": {
                  "0%": { clip: "rect(65px, 9999px, 119px, 0)" },
                  "20%": { clip: "rect(66px, 9999px, 22px, 0)" },
                  "40%": { clip: "rect(33px, 9999px, 85px, 0)" },
                  "60%": { clip: "rect(87px, 9999px, 4px, 0)" },
                  "80%": { clip: "rect(58px, 9999px, 103px, 0)" },
                  "100%": { clip: "rect(8px, 9999px, 100px, 0)" },
                },
              }}
              data-text="Sarveish Balasundram"
            >
              Sarveish Balasundram
            </Typography>
          </motion.div>

          {/* Tagline with Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Typography
              variant="h3"
              sx={{
                display: "inline-block",
                position: "relative",
                letterSpacing: "1.5px",
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                fontWeight: 400,
                lineHeight: 1.5,
                maxWidth: "700px",
                "&::after": {
                  content: '"|"',
                  display: "inline-block",
                  ml: 0.5,
                  animation: "blink 0.7s infinite",
                },
                "@keyframes blink": {
                  "0%, 100%": { opacity: 1 },
                  "50%": { opacity: 0 },
                },
              }}
            >
              {typedText}
            </Typography>
          </motion.div>
        </Box>

        {/* Social Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.75rem",
            width: "100%",
          }}
        >
          {/* Hire Me Button */}
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
            <Button
              component="a"
              href="https://www.linkedin.com/in/sarveish-balasundram/"
              target="_blank"
              variant="contained"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: "50px",
                fontWeight: 600,
                fontSize: "1.1rem",
                bgcolor: "#0a66c2",
                "&:hover": {
                  bgcolor: "#004182",
                },
              }}
            >
              Hire Me
            </Button>
          </motion.div>

          {/* Social Icons */}
          <Box
            sx={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {socialLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton
                  component="a"
                  href={link.url}
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      color: "white",
                      fontSize: "1.5rem",
                      "&:hover": {
                        color: link.color,
                      },
                    }}
                  >
                    {link.icon}
                  </Box>
                </IconButton>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
            marginTop: "3rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "60px",
            }}
          >
            {[...Array(3)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: "20px",
                  height: "20px",
                  borderRight: "3px solid",
                  borderBottom: "3px solid",
                  borderColor: "white",
                  transform: "rotate(45deg)",
                  mt: "-10px",
                  opacity: 0,
                  animation: "pulse 2s infinite",
                  animationDelay: `${i * 0.33}s`,
                  "@keyframes pulse": {
                    "0%": {
                      opacity: 0,
                      transform: "rotate(45deg) translateY(-20px)",
                    },
                    "50%": { opacity: 1 },
                    "100%": {
                      opacity: 0,
                      transform: "rotate(45deg) translateY(20px)",
                    },
                  },
                }}
              />
            ))}
          </Box>
          <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
            Explore my portfolio
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Header;
