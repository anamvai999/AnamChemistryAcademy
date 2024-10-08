import React, { useRef, useState, useEffect } from "react";
import "./Video.css";
import { Container } from "@mui/material";
import { formatTime } from "./Format";
import ReactPlayer from "react-player/youtube"; // Import the YouTube player
import Control from "./Control";

let count = 0;
const Video = ({ videoSrc, videoTitle }) => {
  const videoPlayerRef = useRef(null);
  const controlRef = useRef(null);
  const playerContainerRef = useRef(null);

  const [videoState, setVideoState] = useState({
    playing: true,
    muted: false,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    buffer: true,
    idmDetected: false,
    quality: 'hd720', // Default quality
  });

  const { playing, muted, volume, playbackRate, played, seeking, buffer, idmDetected, quality } = videoState;

  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current.getCurrentTime()
    : "00:00";
  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.getDuration()
    : "00:00";

  const formatCurrentTime = formatTime(currentTime);
  const formatDuration = formatTime(duration);

  const fakeVideoSrc = "dummy-video.mp4"; 

  // Function to detect IDM (checks for idm_id attribute)
  const checkForIDM = () => {
    const videoTag = document.getElementsByTagName('video')[0];
    if (videoTag && videoTag.hasAttribute('__idm_id__')) {
      setVideoState({ ...videoState, idmDetected: true });
    }
  };

  useEffect(() => {
    const idmCheckInterval = setInterval(() => {
      checkForIDM();
    }, 1000);

    return () => clearInterval(idmCheckInterval);
  }, []);

  const playPauseHandler = () => {
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const seekHandler = (e, value) => {
    setVideoState({ ...videoState, played: parseFloat(value / 100) });
    videoPlayerRef.current.seekTo(parseFloat(value / 100));
  };

  const changeQuality = (newQuality) => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.getInternalPlayer().setPlaybackQuality(newQuality);
      setVideoState({ ...videoState, quality: newQuality });
    }
  };

  return (
    <div className="video_container">
      <Container maxWidth="md" justify="center">
        <div
          ref={playerContainerRef}
          className="player__wrapper w-full min-h-[40vh]"
        >
          {idmDetected ? (
            <div>
              <h1>IDM Detected</h1>
              <p>Please disable IDM and reload the page to view this content.</p>
              <button onClick={() => window.location.reload()}>Reload</button>
            </div>
          ) : (
            <ReactPlayer
              ref={videoPlayerRef}
              className="player z-0"
              url={videoSrc}
              width="100%"
              height="100%"
              playing={playing}
              volume={volume}
              muted={muted}
              playbackRate={playbackRate}
              onProgress={(state) => {
                setVideoState({ ...videoState, ...state });
              }}
            />
          )}

          {buffer && <p>Loading</p>}

          <Control
            controlRef={controlRef}
            onPlayPause={playPauseHandler}
            playing={playing}
            onRewind={() => videoPlayerRef.current.seekTo(currentTime - 10)}
            onForward={() => videoPlayerRef.current.seekTo(currentTime + 10)}
            played={played}
            onSeek={seekHandler}
            volume={volume}
            mute={muted}
            onMute={() => setVideoState({ ...videoState, muted: !muted })}
            playbackRate={playbackRate}
            duration={formatDuration}
            currentTime={formatCurrentTime}
            onPlaybackRateChange={(rate) => setVideoState({ ...videoState, playbackRate: parseFloat(rate) })}
            handleFullScreen={() => {
              if (playerContainerRef.current) {
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                } else {
                  playerContainerRef.current.requestFullscreen();
                }
              }
            }}
            videoTitle={videoTitle}
            quality={quality}  // Pass the quality state
            onQualityChange={changeQuality} // Pass the quality change function
          />
        </div>
      </Container>
    </div>
  );
};

export default Video;
