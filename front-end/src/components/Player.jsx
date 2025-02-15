import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faBackwardStep,
  faForwardStep,
  faCirclePause,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const formatTime = (timeInSeconds) => {
  let minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  let seconds = Math.floor(timeInSeconds - minutes * 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const Player = ({
  duration,
  randomIdFromArtist,
  randomId2FromArtist,
  audio,
}) => {
  const audioPlayer = useRef();
  const progressPlayerBar = useRef();
  let [isPlaying, setPlay] = useState(false);
  let [currTime, setcurrTime] = useState(0);

  const timeInSeconds = (timeString) => {
    let [minutes, seconds] = timeString.split(":");
    minutes *= 60;
    const totalSeconds = Number(seconds) + minutes;

    return totalSeconds;
  };

  const durationInSeconds = timeInSeconds(duration);

  const playPause = () => {
    isPlaying ? audioPlayer.current.pause() : audioPlayer.current.play();
    setPlay(!isPlaying);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      progressPlayerBar.current.style.setProperty(
        "--_progress",
        `${
          (Number(audioPlayer.current.currentTime) / durationInSeconds) * 100
        }%`
      );
      if (isPlaying) setcurrTime(audioPlayer.current.currentTime);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying]);

  return (
    <div className="player">
      <div className="player__controllers">
        <Link to={`/song/${randomIdFromArtist}`}>
          <FontAwesomeIcon className="player__icon" icon={faBackwardStep} />
        </Link>

        <FontAwesomeIcon
          className="player__icon player__icon--play"
          icon={isPlaying ? faCirclePause : faCirclePlay}
          onClick={() => {
            playPause();
          }}
        />

        <Link to={`/song/${randomId2FromArtist}`}>
          <FontAwesomeIcon className="player__icon" icon={faForwardStep} />
        </Link>
      </div>

      <div className="player__progress">
        <p>{formatTime(currTime)}</p>

        <div className="player__bar">
          <div ref={progressPlayerBar} className="player__bar-progress"></div>
        </div>

        <p>{duration.padStart(5, "0")}</p>
      </div>

      <audio ref={audioPlayer} src={audio}></audio>
    </div>
  );
};

export default Player;
