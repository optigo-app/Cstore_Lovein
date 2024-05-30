// import React, { useState } from 'react';
// import './Video.css';
// import demovide from '../../../assets/Video/demo2.mp4';

// export default function Video() {
//   const [loading, setLoading] = useState(true);

//   const handleImageLoad = () => {
//     setLoading(false);
//   };

//   const handleVideoLoad = () => {
//     setLoading(false);
//   };

//   return (
//     <div>
//       {loading ? (
//         <img
//           src="https://media.istockphoto.com/id/1180931397/photo/alluring-woman-dressed-in-a-posh-jewelry-set-of-necklace-ring-and-earrings-elegant-evening.jpg?s=612x612&w=0&k=20&c=miNpkI_ekZ8HoC0U9NhHNacsgcdq8xIFxR-n0zjO5p8="
//           style={{ height: 'auto', width: '100%' }}
//           onLoad={handleImageLoad}
//         />
//       ) : (
//         <video width="500" autoPlay loop style={{ height: 'auto', width: '100%' }} onLoad={handleVideoLoad}>
//           <source src={demovide} type="video/mp4" />
//         </video>
//       )}
//     </div>
//   );
// }



// import React, { useState } from "react";
// import "./Video.css";
// import demovide from "../../../assets/Video/demo2.mp4";
// import { useRef } from "react";

// export default function Video() {
//   const [loading, setLoading] = useState(false);

//   const videoRef = useRef(null);

//   const handleVideoLoad = () => {
//     setLoading(false);
//     // Unmute the video once it's loaded
//     videoRef.current.muted = false;
//   };



//   return (
//     <div>
//       {/* {loading ? (
//         <img
//           src="https://media.istockphoto.com/id/1180931397/photo/alluring-woman-dressed-in-a-posh-jewelry-set-of-necklace-ring-and-earrings-elegant-evening.jpg?s=612x612&w=0&k=20&c=miNpkI_ekZ8HoC0U9NhHNacsgcdq8xIFxR-n0zjO5p8="
//           style={{ height: "auto", width: "100%" }}
//         />
//       ) : (

//       )} */}
//         <video
//           ref={videoRef}
//           width="500"
//           autoPlay
//           muted
//           controls  
//           loop
//           style={{ height: "auto", width: "100%" }}
//           onLoadedData={handleVideoLoad}
//         >
//           <source src={demovide} type="video/mp4" />
//         </video>

//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import "./Video.css";
import { storImagePath } from "../../../../Utils/globalFunctions/GlobalFunction";

export default function Video({videoUrl, videoId, width, height}) {

  console.log(videoUrl);
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player('player', {
        videoId: {videoId},
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          loop: 1,
          autohide: 0,
          mute: 1,
          playsinline: 1,
        },
        events: {
          onReady: onPlayerReady,
        },
      });
    };
  }, []);

  const onPlayerReady = (event) => {
    event.target.setVolume(50);
  };

  // "https://www.youtube.com/embed/DkVfi2ApzwQ?autoplay=1&controls=0&mute=1&loop=1&playlist=DkVfi2ApzwQ"
  return (
    <div>
      {/* <iframe
        width="500"
        height="315"
        src="https://www.youtube.com/embed/DkVfi2ApzwQ?autoplay=1&loop=1&playlist=DkVfi2ApzwQ"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <video
        ref={videoRef}
        width="500"
        autoPlay
        muted
        controls={!videoStarted} // Show controls only if the video hasn't started playing
        loop
        style={{ height: "auto", width: "100%" }}
        onLoadedData={handleVideoLoad}
        onPlay={handleVideoPlay}
      >
        <source src="https://www.youtube.com/watch?v=DkVfi2ApzwQ" type="video/mp4" />

      </video> */}
      <div>
        <iframe
          id="player"
          width={width}
          height={height}
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          style={{ pointerEvents: 'none' }}
          className="topVideoShow"
        ></iframe>
      </div>
    </div>
  );
}

{/* <source src={`${storImagePath()}/images/HomePage/MainBanner/videos/HomepageMainBannerVideo.mp4`} type="video/mp4" /> */ }