
import React from 'react';

const VideoHomeFour = () => {
  return (
    <> 
      <div className="tp-video-4-area">
        <div className="tp-video-4-wrap">
          <video className="play-video" loop={true} muted={true} autoPlay={true} playsInline={true}>
            <source src="https://html.hixstudio.net/videos/diego/diego-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div> 
    </>
  );
};

export default VideoHomeFour;