import React,{ useEffect, useState } from "react";
import image1 from "../../../assets/staticImg/impact2.jpg";
import image2 from "../../../assets/Impact/campaign/img2.webp";
import image3 from "../../../assets/Impact/campaign/img3.webp";
import image4 from "../../../assets/Impact/campaign/img4.webp";
import edu1 from "../../../assets/Impact/smallogo/edu-logo-1.avif";
import edu2 from "../../../assets/Impact/smallogo/edu-logo-2.avif";
import med1 from "../../../assets/Impact/smallogo/med1.avif";
import med2 from "../../../assets/Impact/smallogo/med2.avif";
import trees1 from "../../../assets/Impact/smallogo/trees1.avif";
import tress2 from "../../../assets/Impact/smallogo/trees2.avif";
import tress3 from "../../../assets/Impact/smallogo/trees3.avif";
import ani from "../../../assets/Impact/smallogo/ani1.avif";
import hat from "../../../assets/Impact/smallicons/gradHat.png";
import leaf from "../../../assets/Impact/smallicons/leaf.png";
import heart from "../../../assets/Impact/smallicons/heart.png";
import paws from "../../../assets/Impact/smallicons/paws.png";
import './impcards.css'
import { storImagePath } from "../../../../Utils/globalFunctions/GlobalFunction";

const ImpCards = () => {


//   const [storeInit,setStoreInit] = useState();


//   useEffect(()=>{
//     setTimeout(()=>{
//         if(Object.keys(JSON.parse(localStorage.getItem("storeInit")))?.length){
//             let storeinit = JSON.parse(localStorage.getItem("storeInit"))
//             console.log("storeinit",storeinit?.UploadLogicalPath,storeinit?.ukey,storeinit?.ufcc)
//             setStoreInit(storeinit)
//         }
//     },800)
// },[])


  let subBannerChild1 = `${storImagePath()}/images/HomePage/Impact/ImpactSubBannerChildBanner1.jpg`
  let subBannerChild2 = `${storImagePath()}/images/HomePage/Impact/ImpactSubBannerChildBanner2.jpg`
  let subBannerChild3 = `${storImagePath()}/images/HomePage/Impact/ImpactSubBannerChildBanner3.jpg`
  let subBannerChild4 = `${storImagePath()}/images/HomePage/Impact/ImpactSubBannerChildBanner5.jpg`
  let subBannerChild5 = `${storImagePath()}/images/HomePage/Impact/ImpactSubBannerChildBanner6.jpg`
  let subBannerChild6 = `${storImagePath()}/images/HomePage/Impact/ImpactSubBannerChildBanner7.jpg`
  let subBannerChild7 = `${storImagePath()}/images/HomePage/Impact/ImpactSubBannerChildBanner8.jpg`
  let subBannerChild8 = `${storImagePath()}/images/HomePage/Impact/ImpactSubBannerChildBanner10.jpg`
  let subBannerChild9 = `${storImagePath()}/images/HomePage/Impact/ImpactSubBannerChildBanner11.jpg`
  let subBannerChild10 = `${storImagePath()}/images/HomePage/Impact/ImpactSubBannerChildBanner12.jpg`
  let subBannerChild11 = `${storImagePath()}/images/HomePage/Impact/ImpactSubBannerChildBanner13.jpg`
  let subBannerChild12 = `${storImagePath()}/images/HomePage/Impact/ImpactSubBannerChildBanner15.jpg`
  let subBannerChild13 = `${storImagePath()}/images/HomePage/Impact/ImpactSubBannerChildBanner17.jpg`

  const JsonData = [
    {
      banner:`${storImagePath()}/images/HomePage/Impact/ImpactSubBanner1.jpg`,
      // icon: hat,
      title: "RESPONSIBLE SUPPLY CHAINS. HUMANRIGHTS & DUE DILIGENCE",
      descript:
      "We apply responsible supply chains, human rights, and due diligence by ensuring transparency, sourcing materials ethically, conducting supplier audits, implementing due diligence processes, collaborating with stakeholders, and continuously improving practices.",
      fund: [{ i: subBannerChild1 }, { i: subBannerChild4 },{ i: subBannerChild8 },{ i: subBannerChild9 },{ i: subBannerChild13 }]
    },
    {
      banner:`${storImagePath()}/images/HomePage/Impact/ImpactSubBanner2.jpg`,
      icon: leaf,
      title: "LABOUR RIGHTS & WORKING CONDITIONS",
      descript:
      "We ensure the best labor rights and working conditions by offering fair wages, maintaining a safe work environment, prohibiting discrimination, respecting freedom of association, monitoring suppliers for compliance, providing training, establishing grievance mechanisms, and continuously improving practices.",
      fund: [{ i: subBannerChild1 }, { i: subBannerChild2 },{ i: subBannerChild4 },{ i: subBannerChild7 },{ i: subBannerChild8 }]
    },
    {
      banner:`${storImagePath()}/images/HomePage/Impact/ImpactSubBanner3.jpg`,
      icon: heart,
      title: "HEALTH, SAFETY & ENVIRONMENT",
      descript:
      "We provide health, safety, and environmental safety protocols, maintaining a safe working environment, adhering to environmental regulations, and minimizing the impact of their operations on the environment through sustainable practices.",
      // counter: [
      //   { a: "20", b: "Cleft Lip Surgeries" },
      //   { a: "", b: "" },
      //   { a: "", b: "" },

      // ],
      fund: [{ i: subBannerChild3 }, { i: subBannerChild5 },{ i: subBannerChild6 },{ i: subBannerChild10 },{ i: subBannerChild11 }]
    },
    {
      banner:`${storImagePath()}/images/HomePage/Impact/ImpactSubBanner4.jpg`,
      icon: paws,
      title: "RESPONSIBLE GROWING",
      descript:
      "We practice sustainable consumption by using lab-grown diamonds and ethically sourced materials, adhering to industry standards, ensuring transparency in the supply chain, and supporting initiatives that promote sustainable practices.",
      // counter: [
      //   { a: "", b: "" },
      //   { a: "", b: "" },
      //   { a: "", b: "" },

      // ],
      fund: [{ i: subBannerChild5 }, { i: subBannerChild6 },{ i: subBannerChild9 },{ i: subBannerChild10 },{ i: subBannerChild12 }]
    },
  ];

  const counterFunc = (num, text, i) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: i === 0 ? '15px' : '0px' }}>
        <span style={{ color: 'black', textAlign: 'center', fontSize: '19px' }}>{num}</span>
        <p style={{ color: '#020202', fontSize: '17px' }}>{text}</p>
      </div>
    )
  }

  return (
    <div style={{ marginTop: "70px", marginBottom:'30px' }}>
      <div
        style={{
          padding: "0px 85px 0px",
          display: "flex",
          flexDirection: "column",
          gap: '60px'
        }}
        className="impacrCardMobileMain"

      >
        {JsonData.map((jd, i) => (
          <div
            style={{
              display: "flex",
              flexDirection: i % 2 === 0 ? "row" : "row-reverse",
              width: "100%",
              border: "1px solid #e1e1e1",
            }}
            className="impacrCardMobileMain-sub"

         
            >
            <div className="impacrCardMobile" style={{ width: "50%",textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: 'column',
                  color: '#7d7f85',
                  borderBottom: '1px solid #e1e1e1',
                  paddingBottom: '30px',
                  margin: '0px 60px',
                  height: '75%',
                }}
              >
                {/* <img src={jd.icon} alt={'...'} style={{ margin: '30px 0px 20px 0px' }} /> */}
                <p style={{color:'#3f3151', fontSize: '25px' }}>{jd.title}</p>
                <p style={{color:'#5f497a', fontSize: '16px', width: '400px', textAlign: 'center' }} className="impacrCardMobileDesc">
                  {jd.descript}
                </p>
                {/* {jd.counter.map((countData, i) => (
                  counterFunc(countData.a, countData.b, i)
                ))} */}
              </div>
              <div style={{ display: 'flex', width: '18%', alignItems: 'center', padding: '30px 10px', marginLeft: i % 2 === 0 ? '56px' : '60px', height: '40%', gap:'10px' }}>
                {jd.fund.map((imgData) => (
                  <img src={imgData.i} alt={'...'} style={{width:'100%'}} />
                ))}
              </div>
            </div>
            <div className="impacrCardImgMobile" style={{ width: "50%" }}>
              <img
                src={jd.banner}
                alt={"..."}
                style={{ objectFit: 'cover',  height: "100%", width: '100%' }}
              />
            </div>
          </div>
        ))

        }
      </div>
    </div>
  );
};

export default ImpCards;
