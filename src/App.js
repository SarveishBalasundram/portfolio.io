import {React,useEffect,useRef,useState} from 'react';
import './App.css';
import Header from './header/header.js';
import Footer from './footer/footer';
import AboutMe from './about-me/aboutMe';
import AOS from "aos";
import "aos/dist/aos.css";
import Education from './education/education';
import ScrollReveal from 'scrollreveal';
import Skills from './skills/skills';
import Cert from './certifications/cert';
import Pre_Loader from './pre_loader/pre_loader';
function App() {


  const [myElementIsVisible, updateMyElementIsVisible] = useState();
  const [activeSection, setActiveSection] = useState('');
  const [scroll, setScroll] = useState(false);
  let [toggler,setToggler] = useState(false);
  let [showPage,setShowPage] = useState(false)
  const observer = new IntersectionObserver((entries, observer) => {
    const entry = entries[0];
    console.log('entry', entry);
    console.log('entry.isIntersecting', entry.isIntersecting);
    updateMyElementIsVisible(entry.isIntersecting);
  });








  function changeToggler(){
    setToggler(!toggler);
  }




  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 20);
    })

    AOS.init();
    AOS.refresh();

    const sectionElements = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      },{ rootMargin: "450px" });
    });

    sectionElements.forEach((section) => {
      observer.observe(section);
    });


    setTimeout(() => {
      setShowPage(true)
    }, 4000);


  }, [observer]);

  let loader = <Pre_Loader></Pre_Loader>
  let page = (
    <div class="page">
  <section  id='header' style={{paddingBottom:"99px"}}>
    <Header scroll={scroll} sectionScroll={activeSection} changeToggler={changeToggler} ></Header>
    </section>
  <div className={toggler?"normal":"hidden"}>
    <section   id='aboutMe' style={{paddingBottom:"99px"}}>
      <AboutMe id="section2"></AboutMe>
    </section>
    <section   id='experience' style={{paddingBottom:"99px"}} >
    <Education id="section3"></Education>
    </section>
    <section   id='skills' style={{paddingBottom:"99px"}}  >
    {/* <svg id="wave" style={{transform:"rotate(180deg)",transition: "0.3s"} } viewBox="0 0 1440 490" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(216.013, 58.209, 241.709, 1)" offset="0%"></stop><stop stop-color="rgba(236.744, 191.773, 248.54, 1)" offset="100%"></stop></linearGradient></defs><path style={{transform:"translate(0, 0px)", opacity:"1"}} fill="url(#sw-gradient-0)" d="M0,294L144,196L288,98L432,196L576,294L720,343L864,245L1008,49L1152,0L1296,392L1440,392L1584,196L1728,294L1872,0L2016,294L2160,441L2304,392L2448,441L2592,294L2736,147L2880,49L3024,49L3168,441L3312,49L3456,49L3456,490L3312,490L3168,490L3024,490L2880,490L2736,490L2592,490L2448,490L2304,490L2160,490L2016,490L1872,490L1728,490L1584,490L1440,490L1296,490L1152,490L1008,490L864,490L720,490L576,490L432,490L288,490L144,490L0,490Z"></path><defs><linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(150.2, 62, 243, 1)" offset="0%"></stop><stop stop-color="rgba(162.966, 11, 255, 1)" offset="100%"></stop></linearGradient></defs><path style={{transform:"translate(0, 50px)", opacity:"0.9"}} fill="url(#sw-gradient-1)" d="M0,0L144,294L288,147L432,245L576,49L720,0L864,49L1008,392L1152,0L1296,98L1440,196L1584,343L1728,441L1872,0L2016,0L2160,0L2304,441L2448,196L2592,147L2736,441L2880,343L3024,49L3168,343L3312,0L3456,98L3456,490L3312,490L3168,490L3024,490L2880,490L2736,490L2592,490L2448,490L2304,490L2160,490L2016,490L1872,490L1728,490L1584,490L1440,490L1296,490L1152,490L1008,490L864,490L720,490L576,490L432,490L288,490L144,490L0,490Z"></path></svg> */}
   <Skills id="section3"></Skills>
    </section>
    <section   id='certification' style={{paddingBottom:"99px"}}  >
      <Cert id="section4"></Cert>
    </section>
    <section>
    <Footer></Footer>
    </section>
  </div>
    </div>

  )
  
  return (
    <>
        {showPage==false?loader:page}
    </>



  );
}

export default App;
