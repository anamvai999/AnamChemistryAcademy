import { Button, Tooltip, Popover, Grid } from "@mui/material";
import {
  FastForward,
  FastRewind,
  Pause,
  PlayArrow,
  SkipNext,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import "./Control.css";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { BiExpand } from "react-icons/bi";

const useStyles = styled("div")({
  volumeSlider: {
    width: "100px",
    color: "#9556CC",
  },

  bottomIcons: {
    color: "#999",
    padding: "12px 8px",
    "&:hover": {
      color: "#fff",
    },
  },
});

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
  videoTitle
}) => {
  const classes = useStyles;

  return (
    <div className="control_Container" ref={controlRef}>
      <div className="top_container">
        <h2 className="text-white mt-2">{videoTitle}</h2>
      </div>
      <div className="mid__container">
        {/* <div className="icon__btn" onDoubleClick={onRewind}>
                    <FastRewind fontSize="medium" />
                </div> */}

        <div className="icon__btn" onClick={onPlayPause}>
          {playing ? (
            <Pause fontSize="large" />
          ) : (
            <PlayArrow fontSize="large" />
          )}{" "}
        </div>

        {/* <div className="icon__btn">
                    <FastForward fontSize="medium" onDoubleClick={onForward} />
                </div> */}
      </div>
      <div className="bottom__container">
        <div className="slider__container">
          <PrettoSlider
            min={0}
            max={100}
            value={played * 100}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
            onMouseDown={onMouseSeekDown}
          />
        </div>

        {/* botom controls */}
        <div className="flex w-full items-center justify-between">
          <div className="control__box w-6/12 flex justify-center">
            <div className="inner__controls w-full">
              {/* <div className="icon__btn" onClick={onPlayPause}>
                            {playing ? (
                                <Pause fontSize="medium" />
                            ) : (
                                <PlayArrow fontSize="medium" />
                            )}{" "}
                        </div> */}

              {/* <div className="icon__btn">
                            <SkipNext fontSize="medium" />
                        </div> */}

              <div className="icon__btn" onClick={onMute}>
                {mute ? (
                  <VolumeOff fontSize="medium" />
                ) : (
                  <VolumeUp fontSize="medium" />
                )}
              </div>

              <Slider
                className={`${classes.volumeSlider} w-full`}
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
            <button
              className="white text-2xl"
              onClick={handleFullScreen}
            >
              <BiExpand />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Control;
