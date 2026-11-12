// Education & Experience timeline — verified from source
// NOTE: UTHM (Oct 2020–Apr 2023) overlaps with Worldtech internship (Aug 2022–Jan 2023)
//       These were concurrent (internship/work during diploma).

import logoSMKRM       from '../education/logoSMKRM.png';
import pidmLogo        from '../education/pidm.png';
import uthmLogo        from '../education/logoUTHM.png';
import worldtechLogo   from '../education/logoWTECH.png';
import utmLogo         from '../education/utm.png';
import antLogo         from '../education/ant_international.png';
import hiltiLogo       from '../education/hiltiAsia.png';

const experiences = [
  {
    id: "smk",
    type: "education",
    place: "SMK Raja Mahadi",
    logo: logoSMKRM,
    title: "SPM — Secondary School",
    date: "Jan 2015 – Dec 2019",
    description: [
      "Achieved outstanding SPM results: 8As",
      "Ranked among the top students in the school",
      "Active participant in science and mathematics competitions",
      "Developed a strong foundation in problem-solving and analytical thinking",
    ],
  },
  {
    id: "uthm",
    type: "education",
    place: "Universiti Tun Hussein Onn Malaysia (UTHM), Pagoh",
    logo: uthmLogo,
    title: "Diploma in Information Technology",
    date: "Oct 2020 – Apr 2023",
    description: [
      "First Class Diploma Holder — CGPA: 3.98 / 4.00",
      "Dean's List achiever for all semesters (Perfect 4.00 for multiple semesters)",
      "Course Representative for the Diploma in IT programme",
      "Developed multiple full-stack projects including inventory systems",
      "Active in competitive programming and hackathon events",
    ],
  },
  {
    id: "pidm",
    type: "award",
    place: "PIDM Scholarship",
    logo: pidmLogo,
    title: "Perbadanan Insurans Deposit Malaysia Scholar",
    date: "2022 – Present",
    description: [
      "Awarded prestigious national scholarship for outstanding academic achievements",
      "Recognised as one of Malaysia's top diploma students in the IT field",
      "Participated in leadership development programmes and community initiatives",
      "Represented PIDM at various academic and professional events",
    ],
  },
  {
    id: "worldtech-intern",
    type: "work",
    place: "Worldtech Solutions Sdn Bhd",
    logo: worldtechLogo,
    title: "Information Technology Intern",
    date: "Aug 2022 – Jan 2023",
    description: [
      "Developed a full-stack system using Angular and Spring Boot within an Agile lifecycle — from sprint planning to deployment",
      "The system built during the internship remains actively in use by the company",
      "Contributed to software quality assurance by writing and executing automated test cases",
      "Gained hands-on experience in enterprise software development practices",
    ],
  },
  {
    id: "worldtech-dev",
    type: "work",
    place: "Worldtech Solutions Sdn Bhd",
    logo: worldtechLogo,
    title: "Junior Software Developer",
    date: "Jan 2023 – Sept 2024",
    description: [
      "Led full-stack development efforts using Angular and Spring Boot, managing cross-functional teams as project leader",
      "Delivered complex, production-ready software solutions for enterprise clients",
      "Expanded data analytics capabilities using Power BI for business intelligence reporting",
      "Improved software quality through automated testing and performance optimisation",
    ],
  },
  {
    id: "utm",
    type: "education",
    place: "Universiti Teknologi Malaysia (UTM)",
    logo: utmLogo,
    title: "Bachelor of Computer Science (Software Engineering)",
    date: "Oct 2023 – Aug 2026",
    description: [
      "Graduated with Overall CGPA: 3.99 / 4.00",
      "Final Year Project: MARA Student Disciplinary Management System (React.js, Laravel, YOLOv8s, TensorFlow)",
      "Specialised in advanced software engineering, web and mobile applications",
      "Deputy of Activity Department — PERSAKA UTM (Aug 2024 – Jan 2026)",
      "Program Director, Global Outreach Programme — Taiwan (Jun 2024), leading 51 participants",
    ],
  },
  {
    id: "ant",
    type: "work",
    place: "Ant International Malaysia",
    logo: antLogo,
    title: "Java Backend Engineer Intern",
    date: "Aug 2025 – Feb 2026",
    description: [
      "Developed and deployed scalable Java backend features for production fintech systems",
      "Built and optimised RESTful APIs with robust error handling and rollback strategies",
      "Led end-to-end backend feature delivery from design to deployment",
      "Collaborated with cross-functional teams applying production-ready practices including testing, monitoring, and performance optimisation",
    ],
  },
  {
    id: "hilti",
    type: "work",
    place: "Hilti Asia Services Sdn Bhd",
    logo: hiltiLogo,
    title: "Digital Business Analyst",
    date: "Oct 2026 – Present",
    description: [
      "Partner with business teams to define requirements and work with technical staff to develop convincing solution scenarios",
      "Define technical specifications, perform system configurations, execute testing and support go-lives in an Agile manner",
      "Improve systems through further product increments and provide maintenance and operational support",
      "Apply business-process and IT-system knowledge to develop frameworks that continuously improve global product data offerings",
    ],
  },
];

export default experiences;
