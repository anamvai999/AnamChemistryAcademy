import React, { useRef, useState } from "react";
import "./Video.css";
import { Container } from "@mui/material";
import { formatTime } from "./Format";
import ReactPlayer from "react-player";
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
  });

  const { playing, muted, volume, playbackRate, played, seeking, buffer } =
    videoState;

  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current.getCurrentTime()
    : "00:00";
  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.getDuration()
    : "00:00";

  const formatCurrentTime = formatTime(currentTime);
  const formatDuration = formatTime(duration);

  const playPauseHandler = () => {
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const rewindHandler = () => {
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 10);
  };

  const handleFastFoward = () => {
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
  };

  const progressHandler = (state) => {
    if (count > 3) {
      controlRef.current.style.visibility = "hidden";
    } else if (controlRef.current.style.visibility === "visible") {
      count += 1;
    }

    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const seekHandler = (e, value) => {
    setVideoState({ ...videoState, played: parseFloat(value / 100) });
    videoPlayerRef.current.seekTo(parseFloat(value / 100));
  };

  const seekMouseUpHandler = (e, value) => {
    setVideoState({ ...videoState, seeking: false });
    videoPlayerRef.current.seekTo(value / 100);
  };

  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;
    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0,
    });
  };

  const volumeSeekUpHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;
    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0,
    });
  };

  const muteHandler = () => {
    setVideoState({ ...videoState, muted: !videoState.muted });
  };

  const onSeekMouseDownHandler = (e) => {
    setVideoState({ ...videoState, seeking: true });
  };

  const mouseMoveHandler = () => {
    controlRef.current.style.visibility = "visible";
    count = 0;
  };

  const bufferStartHandler = () => {
    setVideoState({ ...videoState, buffer: true });
  };

  const bufferEndHandler = () => {
    setVideoState({ ...videoState, buffer: false });
  };

  const handleFullScreen = () => {
    if (playerContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerContainerRef.current.requestFullscreen();
      }
    }
  };

  const handleTouch = () => {
    controlRef.current.style.visibility = "visible";
    count = 0;
  };

  const handlePlaybackRateChange = (newPlaybackRate) => {
    setVideoState({ ...videoState, playbackRate: parseFloat(newPlaybackRate) });
  };

  return (
    <div className="video_container" onTouchStart={handleTouch}>
      <Container maxWidth="md" justify="center">
        <div
          ref={playerContainerRef}
          className="player__wrapper w-full min-h-[40vh]"
          onTouchStart={handleTouch}
          onMouseMove={mouseMoveHandler}
        >
          <ReactPlayer
            onTouchStart={handleTouch}
            ref={videoPlayerRef}
            className="player z-0"
            url={videoSrc}
            width="100%"
            height="100%"
            playing={playing}
            volume={volume}
            muted={muted}
            playbackRate={playbackRate}
            onProgress={progressHandler}
            onBuffer={bufferStartHandler}
            onBufferEnd={bufferEndHandler}
          />

          <div
            onTouchStart={handleTouch}
            className="opacity-0 absolute top-0 left-0 w-full h-full bg-red-400"
          ></div>

          {buffer && <p>Loading</p>}

          <Control
            controlRef={controlRef}
            onPlayPause={playPauseHandler}
            playing={playing}
            onRewind={rewindHandler}
            onForward={handleFastFoward}
            played={played}
            onSeek={seekHandler}
            onSeekMouseUp={seekMouseUpHandler}
            volume={volume}
            onVolumeChangeHandler={volumeChangeHandler}
            onVolumeSeekUp={volumeSeekUpHandler}
            mute={muted}
            onMute={muteHandler}
            playbackRate={playbackRate}
            duration={formatDuration}
            currentTime={formatCurrentTime}
            onMouseSeekDown={onSeekMouseDownHandler}
            handleFullScreen={handleFullScreen}
            videoTitle={videoTitle}
            onPlaybackRateChange={handlePlaybackRateChange}
          />
        </div>
      </Container>
    </div>
  );
};

export default Video;
