import "./aboutMe.css"
import React, { useEffect, useState,useRef } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import debounce from 'lodash/debounce';
import Particles from 'react-particles';
import resume from "./resume.pdf";
import AOS from "aos";
import "aos/dist/aos.css";



function AboutMe(){

    useEffect(()=>{
        AOS.init();
        AOS.refresh();
    },[])

return(
    <>
    <div  className="container-fluid aboutMe">
    <div className="row mainRow ">
    <div className="row-3 pl-4 mb-4">
        <h1 data-aos-duration="1500" data-aos="fade-up" id="aboutme">About <span id="span">Me</span></h1>
    </div>

            <div  className= "col-12 col-lg-6 col-md-6 order-md-1 order-lg-1 order-2">
                <div data-aos-duration="1500" data-aos="fade-left" className="row-3 pl-4 aboutMe-info-container">
                    <p className="aboutMe-info">Hey there! I'm Sarveish, a tech-savvy guy with a passion for computer science. I love building awesome apps and websites, and the feeling of seeing lines of code come together to create something amazing. Collaboration is key for me, so I'm always eager to team up with fellow tech enthusiasts. When I'm not coding, you'll find me gaming, tinkering with gadgets, or skateboarding. Let's geek out, have fun, and make waves in the tech world!</p>
                <div style={{height:"90px"}} className="button-holder">
                <a  href={resume} download="B.Sarveish_Resume.pdf">
                <button class="button-82-pushable" role="button">
                    <span class="button-82-shadow"></span>
                    <span class="button-82-edge"></span>
                    <span class="button-82-front text">
                        Download Resume
                    </span>
                </button>
                </a>

                </div>
                
                </div>


            </div>
            <div data-aos-duration="1500" data-aos="fade-right" className= "col-12 col-lg-6 col-md-6 order-md-2 order-lg-2  order-1" >
                <div className="image-card">
                <img className="img-responsive profileImage" src="sarveish.png" alt="sarveish"></img>
                </div>
                
            </div>


        </div>
    </div>
    </>

)
}

export default AboutMe