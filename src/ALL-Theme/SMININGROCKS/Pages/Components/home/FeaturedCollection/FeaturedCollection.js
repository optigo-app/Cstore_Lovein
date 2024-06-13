import React,{ useEffect, useState } from "react";
import "./FeaturedCollection.css";
import { Cards } from "../HomeCards/Cards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { storImagePath } from "../../../../Utils/globalFunctions/GlobalFunction";

export default function FeaturedCollection() {
  const [ring1ImageChange, setRing1ImageChange] = useState(false);
  const [ring2ImageChange, setRing2ImageChange] = useState(false);
  const [ring3ImageChange, setRing3ImageChange] = useState(false);
  const [ring4ImageChange, setRing4ImageChange] = useState(false);

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // prevArrow: false,
    // nextArrow: false,
  };

  const handleMouseEnterRing1 = () => {
    setRing1ImageChange(true);
  };
  const handleMouseLeaveRing1 = () => {
    setRing1ImageChange(false);
  };

  const handleMouseEnterRing2 = () => {
    setRing2ImageChange(true);
  };
  const handleMouseLeaveRing2 = () => {
    setRing2ImageChange(false);
  };

  const handleMouseEnterRing3 = () => {
    setRing3ImageChange(true);
  };
  const handleMouseLeaveRing3 = () => {
    setRing3ImageChange(false);
  };

  const handleMouseEnterRing4 = () => {
    setRing4ImageChange(true);
  };
  const handleMouseLeaveRing4 = () => {
    setRing4ImageChange(false);
  };
  return (
    <div>
      <div className="linkingLoveMain">
        <p className="linkingTitle">Bridal Collection</p>
        {/* <p className="linkingDesc">
          Love in Recycling Metals and Salvaging Nature
        </p> */}
        {/* <p className="linkingShopCol">SHOP COLLECTION</p> */}
        <div className="linkingLove">
          <Slider {...settings} className="sliderMain">
            <div className="linkRingLove">
              <div>
                <div className="linkLoveRing1">
                  <img
                    src={
                      !ring1ImageChange
                        ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4955?mode=t`
                        : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4955?mode=p`
                    }
                    className="likingLoveImages"
                    onMouseEnter={handleMouseEnterRing1}
                    onMouseLeave={handleMouseLeaveRing1}
                  />
                </div>
                {/* <div className="linkLoveRing1Desc">
                  <p className="ring1Desc">
                    Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT
                  </p>
                </div> */}
              </div>
              <div>
                <div className="linkLoveRing2">
                  <img
                    src={
                      !ring2ImageChange
                        ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4965?mode=t`
                        : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4965?mode=p`
                    }
                    className="likingLoveImages"
                    onMouseEnter={handleMouseEnterRing2}
                    onMouseLeave={handleMouseLeaveRing2}
                  />
                </div>
                {/* <div className="linkLoveRing1Desc">
                  <p className="ring1Desc">
                    Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT
                  </p>
                </div> */}
              </div>
            </div>

            <div className="linkRingLove">
              <div>
                <div className="linkLoveRing1">
                  <img
                    src={
                      !ring1ImageChange
                        ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4925?mode=t`
                        : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4925?mode=p`
                    }
                    className="likingLoveImages"
                    onMouseEnter={handleMouseEnterRing1}
                    onMouseLeave={handleMouseLeaveRing1}
                  />
                </div>
                {/* <div className="linkLoveRing1Desc">
                  <p className="ring1Desc">
                    Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT
                  </p>
                </div> */}
              </div>
              <div>
                <div className="linkLoveRing2">
                  <img
                    src={
                      !ring2ImageChange
                        ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4891?mode=t`
                        : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4891?mode=p`
                    }
                    className="likingLoveImages"
                    onMouseEnter={handleMouseEnterRing2}
                    onMouseLeave={handleMouseLeaveRing2}
                  />
                </div>
                {/* <div className="linkLoveRing1Desc">
                  <p className="ring1Desc">
                    Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT
                  </p>
                </div> */}
              </div>
            </div>

            <div className="linkRingLove">
              <div>
                <div className="linkLoveRing1">
                  <img
                    src={
                      !ring1ImageChange
                        ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4982?mode=t`
                        : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4982?mode=p`
                    }
                    className="likingLoveImages"
                    onMouseEnter={handleMouseEnterRing1}
                    onMouseLeave={handleMouseLeaveRing1}
                  />
                </div>
                {/* <div className="linkLoveRing1Desc">
                  <p className="ring1Desc">
                    Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT
                  </p>
                </div> */}
              </div>
              <div>
                <div className="linkLoveRing2">
                  <img
                    src={
                      !ring2ImageChange
                        ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4986?mode=t`
                        : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4986?mode=p`
                    }
                    className="likingLoveImages"
                    onMouseEnter={handleMouseEnterRing2}
                    onMouseLeave={handleMouseLeaveRing2}
                  />
                </div>
                {/* <div className="linkLoveRing1Desc">
                  <p className="ring1Desc">
                    Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT
                  </p>
                </div> */}
              </div>
            </div>
          </Slider>
          <div className="linkingLoveImage">
            <img
              src={`${storImagePath()}/images/HomePage/Future/FutureImageMain1.jpg`}
              className="linkingLoveImageDesign"
            />
          </div>
        </div>
      </div>

      <div className="linkingLoveMain">
        <p className="linkingTitle">Cocktail Jewelry</p>
        {/* <p className="linkingDesc">
          Love in Custom Made Enrapturing Lab Grown Jewellery.
        </p> */}
        {/* <p className="linkingShopCol">SHOP COLLECTION</p> */}
        <div style={{ display: 'flex' }}>
          <div className="linkingLoveImage">
            <img
              src={`${storImagePath()}/images/HomePage/BottombBanner/BottomBanner2.jpg`}
              className="linkingLoveImageDesign"
            />
          </div>

          <div className="linkingLove" style={{ width: '66.66%' }}>
            <Slider {...settings} className="sliderMainSeconMain">
              <div className="linkRingLove">
                <div>
                  <div className="linkLoveRing1">
                    <img
                      src={
                        !ring3ImageChange
                          ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-2173?mode=t`
                          : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-2173?mode=p`
                      }
                      className="likingLoveImages"
                      onMouseEnter={handleMouseEnterRing3}
                      onMouseLeave={handleMouseLeaveRing3}
                    />
                  </div>
                  {/* <div className="linkLoveRing1Desc">
                    <p className="ring1Desc">
                      Lab Grown Diamond 1.97ctw Chain Linking Bracelet
                      BL-01993WHT
                    </p>
                  </div> */}
                </div>
                <div>
                  <div className="linkLoveRing2">
                    <img
                      src={
                        !ring4ImageChange
                          ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-1252?mode=t`
                          : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-1252?mode=p`
                      }
                      className="likingLoveImages"
                      onMouseEnter={handleMouseEnterRing4}
                      onMouseLeave={handleMouseLeaveRing4}
                    />
                  </div>
                  {/* <div className="linkLoveRing1Desc">
                    <p className="ring1Desc">
                      Lab Grown Diamond 1.97ctw Chain Linking Bracelet
                      BL-01993WHT
                    </p>
                  </div> */}
                </div>
              </div>

              <div className="linkRingLove">
                <div>
                  <div className="linkLoveRing1">
                    <img
                      src={
                        !ring3ImageChange
                          ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-678-BM?mode=t`
                          : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-678-BM?mode=p`
                      }
                      className="likingLoveImages"
                      onMouseEnter={handleMouseEnterRing3}
                      onMouseLeave={handleMouseLeaveRing3}
                    />
                  </div>
                  {/* <div className="linkLoveRing1Desc">
                    <p className="ring1Desc">
                      Lab Grown Diamond 1.97ctw Chain Linking Bracelet
                      BL-01993WHT
                    </p>
                  </div> */}
                </div>
                <div>
                  <div className="linkLoveRing2">
                    <img
                      src={
                        !ring4ImageChange
                          ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-591?mode=t`
                          : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-591?mode=p`
                      }
                      className="likingLoveImages"
                      onMouseEnter={handleMouseEnterRing4}
                      onMouseLeave={handleMouseLeaveRing4}
                    />
                  </div>
                  {/* <div className="linkLoveRing1Desc">
                    <p className="ring1Desc">
                      Lab Grown Diamond 1.97ctw Chain Linking Bracelet
                      BL-01993WHT
                    </p>
                  </div> */}
                </div>
              </div>

              <div className="linkRingLove">
                <div>
                  <div className="linkLoveRing1">
                    <img
                      src={
                        !ring3ImageChange
                        ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-468?mode=t`
                        : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-468?mode=p`
                      }
                      className="likingLoveImages"
                      onMouseEnter={handleMouseEnterRing3}
                      onMouseLeave={handleMouseLeaveRing3}
                    />
                  </div>
                  {/* <div className="linkLoveRing1Desc">
                    <p className="ring1Desc">
                      Lab Grown Diamond 1.97ctw Chain Linking Bracelet
                      BL-01993WHT
                    </p>
                  </div> */}
                </div>
                <div>
                  <div className="linkLoveRing2">
                    <img
                      src={
                        !ring4ImageChange
                          ? `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-2088?mode=t`
                          : `https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-2088?mode=p`
                      }
                      className="likingLoveImages"
                      onMouseEnter={handleMouseEnterRing4}
                      onMouseLeave={handleMouseLeaveRing4}
                    />
                  </div>
                  {/* <div className="linkLoveRing1Desc">
                    <p className="ring1Desc">
                      Lab Grown Diamond 1.97ctw Chain Linking Bracelet
                      BL-01993WHT
                    </p>
                  </div> */}
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
