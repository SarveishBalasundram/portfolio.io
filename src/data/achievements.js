// Achievements & Certifications — verified entries from source

import firstCert  from '../certifications/first.png';
import secondCert from '../certifications/second.png';
import iHaxPic    from '../certifications/iHaxPic.png';
import inventX    from '../certifications/inventX.jpeg';
import iTank      from '../certifications/itank.jpeg';
import forthCert  from '../certifications/forth.png';
import fifthCert  from '../certifications/fifth.png';

const achievements = [
  {
    id: 1,
    type: "certification",
    image: firstCert,
    title: "Meta Back-End Developer",
    issuer: "Meta",
    date: "September 2023",
    description: "Professional certification covering end-to-end backend engineering, RESTful APIs, Django, databases, and version control.",
  },
  {
    id: 2,
    type: "certification",
    image: secondCert,
    title: "Python for Data Science, AI & Development",
    issuer: "IBM",
    date: "January 2023",
    description: "Applied machine learning algorithms, data analysis, and Python programming for AI solutions.",
  },
  {
    id: 4,
    type: "award",
    image: iHaxPic,
    title: "iHAX 2023 — Champion",
    issuer: "IIUM Malaysia",
    date: "October 2023",
    description: "Champion at national hackathon. Also awarded the Best Business Idea Award and the Most Impactful Idea Award.",
  },
  {
    id: 5,
    type: "award",
    image: inventX,
    title: "iNVENTX 2023 — Gold Medal",
    issuer: "Multimedia University / UTM",
    date: "August 2023",
    description: "Gold Medal winner at iNVENTX exhibition for groundbreaking innovation. Also received the Best of Best Special Award.",
  },
  {
    id: 6,
    type: "award",
    image: iTank,
    title: "iTank 2023 — Champion",
    issuer: "USM Malaysia",
    date: "May 2023",
    description: "Champion at the international intervarsity think tank competition focused on high-impact technology solutions.",
  },
  {
    id: 7,
    type: "award",
    image: forthCert,
    title: "Top 10 Finalist — BizMaker 2023",
    issuer: "BizMaker",
    date: "October 2023",
    description: "Recognised among top business innovators in a national entrepreneurship competition.",
  },
  {
    id: 8,
    type: "award",
    image: fifthCert,
    title: "Best Presenter — GPBL 3.0",
    issuer: "GPBL",
    date: "November 2023",
    description: "Awarded for exceptional technical presentation and communication skills in global project-based learning.",
  },
];

export default achievements;
