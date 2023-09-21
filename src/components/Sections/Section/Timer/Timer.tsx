import { Countdown } from "./Countdown/Countdown";
import React, { useEffect, useState } from "react";
import { getTime } from "@/utils/hooks/useCountdown";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";

export const Timer = () => {
  const { section } = useSection();
  const [time, setTime] = useState(getTime(section!.timer!.time));

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
    setTime(getTime(section!.timer!.time));
  }, [section!.isStarted, section!.isStopped, section!.timer]);

  return (
    <Countdown
      time={time}
      onTimeout={handleOnTimeout}
      onMinute={handleOnMinute}
      onHalfMinute={handleOnHalfMinute}
    />
  );
};
