import { Countdown } from "./Countdown/Countdown";
import React, { useEffect, useState } from "react";
import { getTime } from "@/utils/hooks/useCountdown";
import { useTimer } from "@/utils/contexts/TimerContext/TimerContext";

export const Timer = () => {
  const { isStarted, timer, isStopped } = useTimer();
  const [time, setTime] = useState(getTime(timer!.time));

  const handleOnTimeout = () => {
    console.warn("timeout");
  };

  const handleOnMinute = () => {
    console.warn("minute");
  };

  const handleOnHalfMinute = () => {
    console.warn("half minute");
  };

  useEffect(() => {
    setTime(getTime(timer!.time));
  }, [isStarted, isStopped, timer]);

  return (
    <Countdown
      time={time}
      onTimeout={handleOnTimeout}
      onMinute={handleOnMinute}
      onHalfMinute={handleOnHalfMinute}
    />
  );
};
