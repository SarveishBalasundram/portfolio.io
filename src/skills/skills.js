import { useState } from "react";
import "./skills.css"
import { Tooltip } from 'react-tooltip'
import Hover from 'react-hover';
import{FaJava,FaCuttlefish,FaAngular,FaWordpress,FaPython}  from 'react-icons/fa';
import{SiAdobexd,SiMysql,SiSpring,SiMicrosoftoffice,SiPowerbi,SiJupyter,SiPhp,SiVisualstudiocode} from "react-icons/si"
import{TbApi} from "react-icons/tb"
import{DiPhotoshop} from "react-icons/di"
import{GrReactjs} from "react-icons/gr"
import{IoLogoJavascript} from "react-icons/io"
import{IoLogoFigma} from "react-icons/io5"
import { useEffect } from "react";
import Aos from "aos";



function Skills(){
let [anim,setAnim] = useState(false)
    useEffect(()=>{
        Aos.init()
        Aos.refresh()
    },[])

    let [tools, setTools] = useState([
        {
            icon: <FaPython />,
            name:"Python",
            filter:"FR"
        },
        {
            icon: <FaJava/>,
            name:"Java",
            filter:"FR"
        },
        {
            icon: <FaCuttlefish/>,
            name:"C",
            filter:"FR"
        },
        {
            icon: <SiMysql/>,
            name:"SQL",
            filter:"FR"
        },
        {
            icon: <IoLogoJavascript/>,
            name:"JavaScript",
            filter:"FR"
        },
        {
            icon: <SiPhp/>,
            name:"PHP",
            filter:"FR"
        },
        {
            icon: <GrReactjs/>,
            name:"ReactJS",
            filter:"FR"
        },
        {
            icon: <FaAngular/>,
            name:"Angular",
            filter:"FR"
        },
        {
            icon: <FaWordpress/>,
            name:"Wordpress",
            filter:"FR"
        },
        {
            icon: <SiSpring/>,
            name:"Spring Boot",
            filter:"FR"
        },
        
        {
            icon: <TbApi/>,
            name:"REST API",
            filter:"FR"
        },
        {
            icon: <DiPhotoshop/>,
            name:"Adobe Photoshop",
            filter:"DT"
        },
        {
            icon: <SiMicrosoftoffice/>,
            name:"Microsoft Office",
            filter:"DT"
        },
        {
            icon: <SiPowerbi/>,
            name:"PowerBI",
            filter:"DT"
        },
        {
            icon: <SiJupyter/>,
            name:"Jupyter",
            filter:"DT"
        },
        {
            icon: <IoLogoFigma />,
            name:"Figma",
            filter:"DT"
        },
        {
            icon: <SiAdobexd/>,
            name:"AdobeXD",
            filter:"DT"
        },
        {
            icon: <SiVisualstudiocode/>,
            name:"Visual Studio Code",
            filter:"DT"
        },

    ])
    let [val,setVal] = useState(tools)
    function filterSkills(e){

        console.log(e);
        if(e =="FR"){


                setVal(tools.filter((el)=>{
                    return el.filter == e
                }))

        }else if(e=="DT"){
                setVal(tools.filter((el)=>{
                    return el.filter == e
                }))


        }else{
            setVal(tools)

        }
    }

return(
    <>
          <h1  data-aos-duration="3000" id="skill" data-aos="fade-up">Skills</h1>
            <div  className="container-fluid con">
            <div  data-aos-duration="2000" data-aos="fade-left" className="row w-100">
            <div className="col-md-4 col-sm-4 col-small">
                <div>
                <button id="ALL" onClick={(e)=>{
                    filterSkills(e.target.id);
                }} className="btn-hover color-9">All</button>
                </div>
            </div>
            <div key={"btn2"} className=" col-md-4 col-sm-4 col-small">
            <div>
                <button id="FR" className="btn-hover color-9" onClick={(e)=>{
                    filterSkills(e.target.id);
                }}>Coding</button>
            </div>
            </div>
            <div key={"btn3"} className=" col-md-4 col-sm-4 col-small">
            <div>
                <button id="DT" className="btn-hover color-9" onClick={(e)=>{
                    filterSkills(e.target.id);
                }}>Digital Tool</button>
            </div>
            </div>
          </div>
            </div>


            <div data-aos="fade-left" className="row skillsCont">

                {val.map((el,index)=>{
                    return(
                        <>
                        <div data-tooltip-id={index+1} data-tooltip-content={el.name} key={index+1} className="tech-icons col-md-2 col-4">
                           <span key={index+3}>{el.icon}</span> 
                        </div>
                        <Tooltip key={index+2} id={index+1} />
                        </>

                    )
                })}         
        </div>




    </>
)
}

export default Skills