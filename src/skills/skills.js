import { useState, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FaJava,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaPhp,
  FaGitAlt,
  FaGithub,
  FaReact,
  FaAngular,
} from "react-icons/fa";
import {
  SiJavascript,
  SiFlutter,
  SiCplusplus,
  SiMysql,
  SiTailwindcss,
  SiBootstrap,
  SiFlask,
  SiSpringboot,
  SiLaravel,
  SiFirebase,
  SiGitlab,
  SiTensorflow,
  SiAndroidstudio,
  SiUnity,
  SiMicrosoftoffice,
  SiPowerbi,
} from "react-icons/si";
import { TbBrandYatse } from "react-icons/tb";

const Skills = () => {
  const [filter, setFilter] = useState("ALL");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const constraintsRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  const skills = [
    // Programming Languages
    {
      icon: <FaJava size={40} />,
      name: "Java",
      category: "language",
      color: "#007396",
    },
    {
      icon: <SiJavascript size={40} />,
      name: "JavaScript",
      category: "language",
      color: "#F7DF1E",
    },
    {
      icon: <FaPython size={40} />,
      name: "Python",
      category: "language",
      color: "#3776AB",
    },
    {
      icon: <SiFlutter size={40} />,
      name: "Flutter",
      category: "language",
      color: "#02569B",
    },
    {
      icon: <FaHtml5 size={40} />,
      name: "HTML",
      category: "language",
      color: "#E34F26",
    },
    {
      icon: <FaCss3Alt size={40} />,
      name: "CSS",
      category: "language",
      color: "#1572B6",
    },
    {
      icon: <FaPhp size={40} />,
      name: "PHP",
      category: "language",
      color: "#777BB4",
    },
    {
      icon: <SiCplusplus size={40} />,
      name: "C++",
      category: "language",
      color: "#00599C",
    },
    {
      icon: <SiMysql size={40} />,
      name: "SQL",
      category: "language",
      color: "#4479A1",
    },

    // Frameworks & Libraries
    {
      icon: <SiTailwindcss size={40} />,
      name: "Tailwind CSS",
      category: "framework",
      color: "#06B6D4",
    },
    {
      icon: <SiBootstrap size={40} />,
      name: "Bootstrap",
      category: "framework",
      color: "#7952B3",
    },
    {
      icon: <SiFlask size={40} />,
      name: "Flask",
      category: "framework",
      color: "#000000",
    },
    {
      icon: <SiSpringboot size={40} />,
      name: "Spring Boot",
      category: "framework",
      color: "#6DB33F",
    },
    {
      icon: <FaReact size={40} />,
      name: "React",
      category: "framework",
      color: "#61DAFB",
    },
    {
      icon: <FaAngular size={40} />,
      name: "Angular",
      category: "framework",
      color: "#DD0031",
    },
    {
      icon: <SiLaravel size={40} />,
      name: "Laravel",
      category: "framework",
      color: "#FF2D20",
    },
    {
      icon: <TbBrandYatse size={40} />,
      name: "YOLO",
      category: "framework",
      color: "#00FFFF",
    },
    {
      icon: <SiTensorflow size={40} />,
      name: "Tensorflow",
      category: "framework",
      color: "#FF6F00",
    },

    // Tools & Technologies
    {
      icon: <SiFirebase size={40} />,
      name: "Firebase",
      category: "tool",
      color: "#FFCA28",
    },
    {
      icon: <FaGithub size={40} />,
      name: "GitHub",
      category: "tool",
      color: "#181717",
    },
    {
      icon: <SiGitlab size={40} />,
      name: "GitLab",
      category: "tool",
      color: "#FCA121",
    },
    {
      icon: <SiAndroidstudio size={40} />,
      name: "Android Studio",
      category: "tool",
      color: "#3DDC84",
    },
    {
      icon: <SiUnity size={40} />,
      name: "Unity",
      category: "tool",
      color: "#FFFFFF",
    },
    {
      icon: <SiPowerbi size={40} />,
      name: "PowerBI",
      category: "tool",
      color: "#F2C811",
    },
    {
      icon: <SiMicrosoftoffice size={40} />,
      name: "Office",
      category: "tool",
      color: "#D83B01",
    },
  ];

  const filteredSkills =
    filter === "ALL"
      ? skills
      : skills.filter((skill) => skill.category === filter.toLowerCase());

  const FilterButton = ({ children, active, onClick, color, sx }) => (
    <Box
      component={motion.div}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      sx={{
        margin: { xs: "4px", sm: "8px", md: "10px" },
        width: { xs: "100%", sm: "auto" },
        flex: { xs: "1 0 45%", sm: "0 1 auto" },
        maxWidth: { xs: "calc(50% - 8px)", sm: "none" },
      }}
    >
      <Button
        onClick={onClick}
        sx={{
          height: { xs: "48px", sm: "54px", md: "60px" },
          minWidth: { xs: "unset", sm: "140px", md: "150px" },
          width: "100%",
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
          fontWeight: 700,
          borderRadius: "12px",
          background: active
            ? `linear-gradient(135deg, ${color}, ${color}AA)`
            : "rgba(255,255,255,0.1)",
          color: active ? "white" : "text.primary",
          boxShadow: active
            ? `0 5px 15px -3px ${color}BB`
            : "0 3px 10px rgba(0,0,0,0.2)",
          border: active ? "none" : "2px solid rgba(255,255,255,0.15)",
          transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          px: { xs: 1.5, sm: 2 },
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: active
              ? `0 8px 25px -5px ${color}BB`
              : "0 5px 20px rgba(0,0,0,0.25)",
            background: active
              ? `linear-gradient(135deg, ${color}, ${color}CC)`
              : "rgba(255,255,255,0.2)",
          },
          "&:active": {
            transform: "translateY(1px)",
          },
          ...sx,
        }}
      >
        {children}
      </Button>
    </Box>
  );
  const [particles] = useState(
    Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }))
  );
  return (
    <Box
      id="skills"
      ref={sectionRef}
      sx={{
        py: 10,
        px: 3,
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400",
          margin: "0 auto",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Title with animation based on scroll */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
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
              sequence={["Tech Stack", 1000, "Skills", 1000, "Expertise", 1000]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
            />
          </Typography>
        </motion.div>

        {/* Animated Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box
            ref={constraintsRef}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: { xs: 4, md: 8 },
              flexWrap: "wrap",
              gap: { xs: 1, sm: 2 },
              px: { xs: 1, sm: 0 },
              width: "100%",
            }}
          >
            <FilterButton
              active={filter === "ALL"}
              onClick={() => setFilter("ALL")}
              color="#c62368"
            >
              All Skills
            </FilterButton>

            <FilterButton
              active={filter === "LANGUAGE"}
              onClick={() => setFilter("LANGUAGE")}
              color="#f562a9"
            >
              Languages
            </FilterButton>

            <FilterButton
              active={filter === "FRAMEWORK"}
              onClick={() => setFilter("FRAMEWORK")}
              color="#e94584"
            >
              Frameworks
            </FilterButton>

            <FilterButton
              active={filter === "TOOL"}
              onClick={() => setFilter("TOOL")}
              color="#ff7aa8"
            >
              Tools
            </FilterButton>
          </Box>
        </motion.div>

        {/* Skills Grid with scroll-triggered animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(5, 1fr)",
              },
              gap: 4,
              mx: "auto",
            }}
          >
            <AnimatePresence>
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            duration: 0.5,
                            delay: index * 0.05,
                            type: "spring",
                            stiffness: 100,
                            damping: 10,
                          },
                        }
                      : { opacity: 0, y: 50, scale: 0.8 }
                  }
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 3,
                      borderRadius: 3,
                      background: "rgba(30, 30, 46, 0.7)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                      transition: "all 0.3s ease",
                      transform:
                        hoveredSkill === skill.name
                          ? "translateY(-8px) scale(1.03)"
                          : "none",
                      position: "relative",
                      overflow: "hidden",
                      height: "100%",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: hoveredSkill === skill.name ? "6px" : 0,
                        background: skill.color,
                        transition: "all 0.3s ease",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "100%",
                        background: `linear-gradient(to bottom, transparent 0%, ${skill.color}22 100%)`,
                        opacity: hoveredSkill === skill.name ? 0.3 : 0,
                        transition: "all 0.3s ease",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        color: skill.color,
                        fontSize: "3.5rem",
                        mb: 2,
                        transition: "all 0.3s ease",
                        transform:
                          hoveredSkill === skill.name
                            ? "scale(1.2)"
                            : "scale(1)",
                        filter:
                          hoveredSkill === skill.name
                            ? `drop-shadow(0 5px 10px ${skill.color}88)`
                            : "drop-shadow(0 2px 5px rgba(0,0,0,0.3))",
                      }}
                    >
                      {skill.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#ffffff",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        transform:
                          hoveredSkill === skill.name
                            ? "scale(1.1)"
                            : "scale(1)",
                        textShadow: "0 2px 4px rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      {skill.name}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Skills;
