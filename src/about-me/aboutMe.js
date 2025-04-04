import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, useAnimation, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import resume from "./resume.pdf";
import sarveishImage from "./sarveish.png"; // Import your image file
import { keyframes } from "@mui/system";

const floatBackground = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, 50px); }
`;

const AboutSection = styled("section")(({ theme }) => ({
  position: "relative",
  minHeight: "100vh",
  boxSizing: "border-box",
  padding: theme.spacing(15, 2),
  overflow: "visible",
  color: "#ffffff",
  zIndex: 1,

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    background: `
      radial-gradient(circle at 20% 30%, rgba(198, 35, 104, 0.05) 0%, transparent 25%),
      radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.05) 0%, transparent 25%)
    `,
    zIndex: -1,
    animation: `${floatBackground} 15s infinite alternate ease-in-out`,
  },
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: "1400px",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(6),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: "600px",
  zIndex: 2,
}));

const HighlightText = styled("span")(({ theme }) => ({
  color: "#c62368",
  fontWeight: "bold",
  textShadow: "0 0 8px rgba(198, 35, 104, 0.5)",
}));

const ResumeButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #c62368 0%, #a61a58 100%)",
  color: "white",
  borderRadius: "50px",
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  boxShadow: "0 4px 15px rgba(198, 35, 104, 0.4)",
  marginTop: theme.spacing(3),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 6px 20px rgba(198, 35, 104, 0.6)",
    background: "linear-gradient(45deg, #a61a58 0%, #851347 100%)",
  },
}));

const PhotoContainer = ({ src }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      style={{
        width: "400px",
        height: "450px",
        perspective: "1000px",
        position: "relative",
      }}
      initial={{ opacity: 0, rotateY: 90 }}
      animate={
        isInView
          ? {
              opacity: 1,
              rotateY: 0,
              transition: { delay: 0.3, duration: 0.8 },
            }
          : {}
      }
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* 3D Card Container with Depth */}
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? 5 : 0,
          scale: isHovered ? 1.05 : 1,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        {/* Front Face with Creative Image Styling */}
        <motion.div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: "15px",
            overflow: "hidden",
            transform: "translateZ(20px)",
            background: "linear-gradient(45deg, #00081a 0%, #000000 100%)",
          }}
        >
          {/* Image with Duotone Effect and Glow */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              mixBlendMode: "lighten",
              filter: "contrast(1.2) saturate(1.1)",
              isolation: "isolate",
            }}
          >
            <img
              src={src}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: `
                  grayscale(30%) 
                  contrast(120%) 
                  drop-shadow(0 0 8px rgba(198, 35, 104, 0.7))
                `,
                maskImage:
                  "linear-gradient(to bottom, black 80%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 80%, transparent 100%)",
              }}
            />

            {/* Color Overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(45deg, rgba(198, 35, 104, 0.15) 0%, rgba(0, 255, 255, 0.1) 100%)",
                mixBlendMode: "color",
              }}
            />
          </div>

          {/* Glowing Border Animation */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              border: "1px solid rgba(198, 35, 104, 0.3)",
              borderRadius: "15px",
              pointerEvents: "none",
            }}
            animate={{
              boxShadow: [
                "inset 0 0 10px rgba(198, 35, 104, 0.3), 0 0 15px rgba(198, 35, 104, 0.3)",
                "inset 0 0 15px rgba(198, 35, 104, 0.5), 0 0 25px rgba(198, 35, 104, 0.5)",
                "inset 0 0 10px rgba(198, 35, 104, 0.3), 0 0 15px rgba(198, 35, 104, 0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Floating Highlights */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(198, 35, 104, 0.2) 0%, transparent 70%)",
                filter: "blur(15px)",
              }}
              animate={{
                x: [0, 20, 0],
                y: [0, 30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
              }}
            />
          ))}
        </motion.div>

        {/* Back Face with Holographic Effect */}
        <motion.div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: "15px",
            background: `
              linear-gradient(135deg, 
                rgba(0, 8, 26, 0.9) 0%, 
                rgba(0, 0, 0, 0.9) 100%
            `,
            transform: "rotateY(180deg) translateZ(20px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Holographic Pattern */}
          <div
            style={{
              position: "absolute",
              width: "200%",
              height: "200%",
              background: `
              linear-gradient(45deg, 
                rgba(198, 35, 104, 0.05) 25%, 
                transparent 25%, 
                transparent 50%, 
                rgba(0, 255, 255, 0.05) 50%, 
                rgba(0, 255, 255, 0.05) 75%, 
                transparent 75%, 
                transparent)
            `,
              backgroundSize: "20px 20px",
              animation: "moveHologram 20s linear infinite",
              opacity: 0.7,
            }}
          />

          <Typography
            variant="h6"
            sx={{
              color: "transparent",
              textAlign: "center",
              background: "linear-gradient(45deg, #c62368, #00ffff)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              textShadow: "0 0 10px rgba(198, 35, 104, 0.7)",
              position: "relative",
              zIndex: 2,
              padding: "0.5rem 1rem",
              borderRadius: "5px",
            }}
          >
            Full Stack Developer
          </Typography>
        </motion.div>
      </motion.div>

      {/* CSS Animation for Hologram */}
      <style>{`
        @keyframes moveHologram {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-50%, -50%); }
        }
      `}</style>
    </motion.div>
  );
};

const AboutMe = () => {
  console.log("Image path:", sarveishImage); // Should show the correct path
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [particles] = useState(
    Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }))
  );

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <AboutSection id="about" ref={ref}>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            style={{
              position: "absolute",
              width: particle.size,
              height: particle.size,
              background: "rgba(255, 255, 255, 0.6)",
              borderRadius: "50%",
              filter: "blur(1px)",
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: ["0%", "-10%", "0%"],
              transition: {
                duration: 5 + particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </motion.div>

      <ContentContainer>
        <TextContent
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                textAlign: "left",
                mb: 6,
                background: "linear-gradient(45deg, #c62368, #f562a9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 800,
                fontSize: { xs: "2.8rem", md: "4rem" },
                textShadow: `
            0 0 5px rgba(198, 35, 104, 0.5),
            0 0 10px rgba(198, 35, 104, 0.4),
            0 0 15px rgba(198, 35, 104, 0.3),
            0 0 20px rgba(198, 35, 104, 0.2),
            0 0 25px rgba(198, 35, 104, 0.1),
            0 4px 8px rgba(0,0,0,0.3),
            0 8px 16px rgba(0,0,0,0.2)
          `,
                letterSpacing: "1px",
                lineHeight: "1.2",
                fontFamily: "'Poppins', sans-serif",
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  mixBlendMode: "overlay",
                  borderRadius: "inherit",
                  pointerEvents: "none",
                },
              }}
            >
              <TypeAnimation
                sequence={[
                  "About Me",
                  1500,
                  "My Journey",
                  1500,
                  "My Passion",
                  1500,
                ]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
              />
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
            >
              I'm <HighlightText>Sarveish</HighlightText>, a passionate{" "}
              <HighlightText>Full-Stack Developer</HighlightText> with expertise
              in creating modern, performant web applications that push
              boundaries. Currently a third year student at{" "}
              <HighlightText>Universiti Teknologi Malaysia (UTM)</HighlightText>{" "}
              pursuing my{" "}
              <HighlightText>
                Bachelor's in Computer Science (Software Engineering)
              </HighlightText>
              , where I combine academic knowledge with practical development
              experience.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
            >
              My journey in tech began with a curiosity for how things work,
              which evolved into a deep love for building digital experiences
              that make an impact.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
            >
              I specialize in <HighlightText>React</HighlightText>,{" "}
              <HighlightText>Java</HighlightText>, and modern JavaScript
              frameworks, with a strong focus on{" "}
              <HighlightText>performance optimization</HighlightText> and{" "}
              <HighlightText>user experience</HighlightText>.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box sx={{ display: "inline-block", position: "relative", mt: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                }}
                component="span"
              >
                <TypeAnimation
                  sequence={[
                    "Turning complex problems into elegant solutions.",
                    2000,
                    "Building the web of tomorrow, today.",
                    2000,
                    "Code is poetry when written with passion.",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
                <span
                  style={{
                    display: "inline-block",
                    marginLeft: "2px",
                    animation: "blink 0.7s infinite",
                  }}
                >
                  |
                </span>
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ResumeButton
              variant="contained"
              href={resume}
              download="Sarveish_Resume.pdf"
              endIcon={<span>↓</span>}
            >
              Download Resume
            </ResumeButton>
          </motion.div>
        </TextContent>

        <PhotoContainer src={sarveishImage} />
      </ContentContainer>
    </AboutSection>
  );
};

export default AboutMe;
