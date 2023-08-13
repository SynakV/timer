import React, { FC, useEffect } from "react";
import { useCountdown } from "@/utils/hooks/useCountdown";

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
  const { minutes, seconds } = useCountdown(time, isStarted);

  useEffect(() => {
    if (minutes <= 0 && seconds <= 0) {
      return onTimeout();
    }
    if (minutes > 0 && seconds === 0) {
      return onMinute();
    }
    if (minutes > 0 && seconds === 30) {
      return onHalfMinute();
    }
  }, [minutes, seconds]);

  console.log(seconds);

  return (
    <>
      {minutes}:{seconds > 9 ? seconds : `0${seconds}`}
    </>
  );
};
