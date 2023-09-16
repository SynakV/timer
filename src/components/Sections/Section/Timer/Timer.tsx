import { Countdown } from "./Countdown/Countdown";
import React, { useEffect, useState } from "react";
import { getTime } from "@/utils/hooks/useCountdown";
import { useTimer } from "@/utils/contexts/TimerContext/TimerContext";

export const Timer = () => {
  const { isStarted, timer, isStopped } = useTimer();
  const [time, setTime] = useState(getTime(timer!.time));

  const handleOnTimeout = () => {
    console.log("timeout");
  };

  const handleOnMinute = () => {
    console.log("minute");
  };

  const handleOnHalfMinute = () => {
    console.log("half minute");
  };

  useEffect(() => {
    setTime(getTime(timer!.time));
  }, [isStarted, isStopped, timer]);

  return (
    <Countdown
      time={time}
      isStarted={isStarted}
      onTimeout={handleOnTimeout}
      onMinute={handleOnMinute}
      onHalfMinute={handleOnHalfMinute}
    />
  );
};
