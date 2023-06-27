import { useState,useEffect } from "react";
import "./education.css"
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import AOS from "aos";
import "aos/dist/aos.css";



function Education(){

  useEffect(()=>{
    AOS.init();
    AOS.refresh();
},[])


let [experience,setExperience] = useState([
  {
    id:1,
    place: "SMK RAJA MAHADI",
    image:"logoSMKRM.png",
    title: "SPM",
    date:"2013-2019",
    description:["1. Achieved great academic performance, earning 1A+ and 4A, as well as 3A- 2B+",
    "2. Ranked as one of the top student in the school, exhibiting a strong work ethic and dedication to success in all academic efforts"]
  },
  {
    id:2,
    place: "UNIVERSITI TUN HUSSEIN ONN MALAYSIA",
    image:"logoUTHM.png",
    title: "Diploma in Information Technology",
    date:"2020-2023",
    description:["1. Achieved Dean List for every semester",
    "2. CGPA : 3.98",
    "3. First Class Diploma Holder"]
  },
  {
    id:3,
    place: "WORLDTECH SOLUTIONS SDN BHD",
    image:"logoWTECH.png",
    title: "Junior Software Developer",
    date:"2022-2023",
    description:["1. As a junior software developer, I am gaining hands-on experience in modern development tools and techniques.",
    "2. contribute to both front-end and back-end systems, participate in testing and quality assurance processes, and learn about the entire software development lifecycle.",]
  }
])


    return(
      <>
      <div className="col-xl-12 col-md-12 col-sm-12">
      <h1 id="exp" data-aos-duration="3000" data-aos="fade-up">Experiences</h1>
      </div>
      
<VerticalTimeline >
  {experience.map((elements,index)=>{
   let idVal="img"+index
   return(
  <VerticalTimelineElement
    key={elements.id}
    className="vertical-timeline-element--work"
    iconStyle={{ background: 'rgb(255, 0, 212)', color: 'black' }}
    icon={<img id={idVal} src={elements.image} className="icon" alt="image"></img>}
  
  >
    <h3  className="vertical-timeline-element-title black">{elements.place}</h3>
    <h5 className="vertical-timeline-element-subtitle black">{elements.title}</h5>
    <div className="date-holder">
    <p3 className="text-primary ">{elements.date}</p3>
    </div>
    {elements.description.map((elements,index)=>{
      return(
        <p key={"txt"+elements} className="black">
        {elements}
      </p>
      )
    })}

  </VerticalTimelineElement>


    )
  })}
    </VerticalTimeline>
       </>









 
    )
}

export default Education