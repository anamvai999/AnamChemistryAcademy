
import React from "react";
import { Pause, PlayArrow, VolumeOff, VolumeUp } from "@mui/icons-material";
import Slider from "@mui/material/Slider";
import { BiExpand } from "react-icons/bi";
import "./Control.css";
import { styled } from "@mui/material/styles";

const PrettoSlider = styled(Slider)({
  root: {
    height: "20px",
    color: "#9556CC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#9556CC",
    border: "2px solid currentColor",
    marginTop: -3,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 5,
    borderRadius: 4,
    width: "100%",
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
});

const Control = ({
  onPlayPause,
  playing,
  onRewind,
  onForward,
  played,
  onSeek,
  onSeekMouseUp,
  onVolumeChangeHandler,
  onVolumeSeekUp,
  volume,
  mute,
  onMute,
  duration,
  currentTime,
  onMouseSeekDown,
  controlRef,
  handleFullScreen,
  videoTitle,
  onPlaybackRateChange,
  playbackRate,
  quality,
  onQualityChange,
}) => {
  return (
    <div className="control_Container" ref={controlRef}>
      <div className="top_container">
        <h2 className="text-white mt-2">{videoTitle}</h2>
      </div>
      <div className="mid__container">
        <div className="icon__btn" onClick={onRewind}>
          <span className="cursor-pointer">⏪</span>
        </div>
        <div className="icon__btn" onClick={onPlayPause}>
          {playing ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
        </div>
        <div className="icon__btn" onClick={onForward}>
          <span className="cursor-pointer">⏩</span>
        </div>
      </div>
      <div className="bottom__container">
        <div className="slider__container">
          <PrettoSlider
            className="text-white"
            min={0}
            max={100}
            value={played * 100}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
            onMouseDown={onMouseSeekDown}
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="control__box w-6/12 flex justify-center">
            <div className="inner__controls w-full">
              <div className="icon__btn text-white" onClick={onMute}>
                {mute ? <VolumeOff fontSize="medium" /> : <VolumeUp fontSize="medium" />}
              </div>
              <Slider
                className="w-full text-white"
                onChange={onVolumeChangeHandler}
                value={volume * 100}
                onChangeCommitted={onVolumeSeekUp}
              />
            </div>
          </div>
          <div className="w-4/12 flex justify-center items-center">
            <span className="w-full">
              {currentTime} : {duration}
            </span>
          </div>
          <div className="w-2/12 flex justify-center items-center">
            <button className="white text-2xl" onClick={handleFullScreen}>
              <BiExpand />
            </button>
          </div>
          <div className="w-3/12 flex justify-center items-center">
            <select
              value={playbackRate}
              onChange={(e) => onPlaybackRateChange(e.target.value)}  // Pass value directly
              className="playback-rate-dropdown"
            >
              <option value="0.5">0.5x</option>
              <option value="1">1x</option>
              <option value="1.2">1.2x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </div>
          {/* Quality Control Dropdown */}
          <div className="w-3/12 flex justify-center items-center">
            <label htmlFor="quality" className="text-white mr-2">Quality:</label>
            <select
              id="quality"
              value={quality}
              onChange={(e) => onQualityChange(e.target.value)} // Call the change function
              className="quality-dropdown"
            >
              <option value="small">144p</option>
              <option value="medium">360p</option>
              <option value="large">480p</option>
              <option value="hd720">720p</option>
              <option value="hd1080">1080p</option>
              <option value="highres">1440p</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Control;