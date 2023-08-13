import { Countdown } from "./Countdown/Countdown";
import React, { useEffect, useState } from "react";
import { getTime } from "@/utils/hooks/useCountdown";
import { useTimer } from "@/utils/contexts/TimerContext/TimerContext";

export const Timer = () => {
  const { isStart, timer } = useTimer();
  const [time, setTime] = useState(getTime(timer!.time));

  const THREE_DAYS_IN_MS = 2 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

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
    if (isStart && timer) {
      setTime(getTime(timer!.time));
    }
  }, [isStart, timer]);

  console.log(time);

  return (
    <Countdown
      time={dateTimeAfterThreeDays}
      isStart={isStart}
      onTimeout={handleOnTimeout}
      onMinute={handleOnMinute}
      onHalfMinute={handleOnHalfMinute}
    />
  );
};
