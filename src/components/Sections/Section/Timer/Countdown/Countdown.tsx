import React, { FC, useEffect } from "react";
import { useCountdown } from "@/utils/hooks/useCountdown";

interface Props {
  time: number;
  isStart: boolean;
  onTimeout: () => void;
  onMinute: () => void;
  onHalfMinute: () => void;
}

export const Countdown: FC<Props> = ({
  time,
  isStart,
  onTimeout,
  onMinute,
  onHalfMinute,
}) => {
  const { minutes, seconds } = useCountdown(time, isStart);

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
    <div className="w-[100vw] text-[40vw] font-mono">
      {minutes}:{seconds > 9 ? seconds : `0${seconds}`}
    </div>
  );
};
