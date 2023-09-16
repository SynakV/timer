import React, { FC, useEffect } from "react";
import { useCountdown } from "@/utils/hooks/useCountdown";
import { useTimer } from "@/utils/contexts/TimerContext/TimerContext";

interface Props {
  time: number;
  isStarted: boolean;
  onTimeout: () => void;
  onMinute: () => void;
  onHalfMinute: () => void;
}

export const Countdown: FC<Props> = ({
  time,
  isStarted,
  onTimeout,
  onMinute,
  onHalfMinute,
}) => {
  const { timer, setTimer } = useTimer();
  const { minutes, seconds } = useCountdown(time, isStarted);

  useEffect(() => {
    if (minutes <= 0 && seconds <= 0) {
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

  const getTimeDisplay = (minutes: number, seconds: number) =>
    `${minutes}:${seconds > 9 ? seconds : "0" + seconds}`;

  return isStarted
    ? getTimeDisplay(minutes, seconds)
    : getTimeDisplay(timer!.time.minutes, timer!.time.seconds);
};
