import React from "react";
import "./index.css";
import i1 from "../../assets/Impact/campaign/banner.webp";
import Campaign from "./campaign/Campaign";
import Header from "../home/Header/Header";
import Explore from "./Explore/Explore";
import { storImagePath } from "../../../Utils/globalFunctions/GlobalFunction";
import Footer from "../home/Footer/Footer";

const index = () => {
  return (
    <>
      <div style={{ paddingTop: '110px', background: '#efe5ff' }}>
        <div className="back-img-container">
          {/* <img
            src={
              "https://wallpapers.com/images/featured/tree-background-xgzu0ujdd4khh95j.jpg"
            }
            alt="..."
            className="impact-container"
          /> */}
          <div className="impact-container2"></div>
        </div>
        <img src={`${storImagePath()}/images/HomePage/Impact/ImpactMainBanner1.jpg`} alt="..." style={{ width: '100%' }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // marginTop: "-55px",
            flexDirection: "column",
            maxWidth: "1680px",
            marginRight: "auto",
            marginLeft: "auto",
            marginTop: '50px'
          }}
          className="main-front-container"
        >

          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "white",
              padding: "110px 0 105px",
            }}
            className="quotes-div1"
          >
            <p
              style={{
                fontSize: "42px",
                fontFamily: "FreightDisp Pro Medium",
                textTransform: "capitalize",
                paddingBottom: "15px",
              }}
              className="quotes-div1Title"
            >
              Together We Can Make An Impact
            </p>

            <p
              style={{
                width: "619px",
                textAlign: "center",
                fontSize: "22px",
                fontFamily: "FreightDisp Pro Medium",
              }}
              className="quotes-div1Descript"
            >
              Our purpose is to building a chain of smile through innovative lab
              grown diamonds, sustainable luxury and giving back to the
              community. We aim to spread smiles around the world with your
              contribution. Here's how we're working to make the world a better
              place.
            </p>
          </div> */}

          <Campaign />

          {/* <div
            style={{
              textAlign: "center",
              width: "620px",
              height: "441px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            className="quotes-div2"
          >
            <p
              style={{
                fontSize: "26px",
                fontFamily: "FreightDisp Pro Medium",
                color: "white",
                lineHeight: "25px",
                textAlign: 'center'
              }}
              className="quotes-div2Descript"
            >
              “Creating Love In Diamonds has been our dream and life mission as our
              way of spreading smiles around the world and to help make our
              world a better place.”
            </p>
            <p style={{ color: "white" }}>
              <small>
                <i>-Love In Diamonds Founders</i>
              </small>
            </p>
          </div> */}
          {/* <Explore/> */}
        </div>
        <div className="my-5" style={{ background: '#efe5ff' }}>
          <img src={`${storImagePath()}/images/HomePage/Impact/ImpactMainBanner2.jpg`} alt="..." style={{ width: '100%' }} />
        </div>
        <div style={{ marginTop: '-15%', background: 'white' }}>
          <Footer />
        </div>
        <div>
          <p style={{
            paddingBlock: '30px',
            margin: '0px',
            textAlign: 'center',
            color: 'rgb(95,73,122)',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '1px'
          }} onClick={() => window.scrollTo(0, 0)}>BACK TO TOP</p>
        </div>
      </div>
    </>
  );
};

export default index;
