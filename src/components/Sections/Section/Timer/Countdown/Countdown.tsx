import { FC, useEffect } from "react";
import { Timeline } from "../../Timeline/Timeline";
import { playAudio } from "@/utils/helpers/audio.helper";
import { getTime, useCountdown } from "@/utils/hooks/useCountdown";
import { useTimer } from "@/utils/contexts/TimerContext/TimerContext";

interface Props {
  time: number;
  onTimeout: () => void;
  onMinute: () => void;
  onHalfMinute: () => void;
}

export const Countdown: FC<Props> = ({
  time,
  onTimeout,
  onMinute,
  onHalfMinute,
}) => {
  const { isStarted, setTimer } = useTimer();
  const { minutes, seconds } = useCountdown(time, isStarted);

  useEffect(() => {
    if (minutes <= 0 && seconds <= 0) {
      playAudio("timeout");
      setTimer({ isStopped: true, isStarted: false });
      return onTimeout();
    }
    if (minutes > 0 && seconds === 0) {
      return onMinute();
    }
    if (minutes > 0 && seconds === 30) {
      return onHalfMinute();
    }
  }, [minutes, seconds]);

  const timeRemainInPercentage = (getTime({ minutes, seconds }) / time) * 100;

  const getTimeColor = () => {
    if (timeRemainInPercentage > 30) {
      return "black";
    }

    if (timeRemainInPercentage > 10) {
      return "orange";
    }

    return "red";
  };

  return (
    <>
      <span className="transition-all" style={{ color: getTimeColor() }}>
        {`${minutes > 9 ? minutes : "0" + minutes}:${
          seconds > 9 ? seconds : "0" + seconds
        }`}
      </span>
      <Timeline
        isStarted={isStarted}
        color={getTimeColor()}
        timeRemainInPercentage={timeRemainInPercentage}
      />
    </>
  );
};
