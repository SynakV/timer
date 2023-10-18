import { Countdown } from "./Countdown/Countdown";
import React, { useEffect, useState } from "react";
import { getTime } from "@/utils/helpers/timer.helper";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";

export const Timer = () => {
  const { section } = useSection();
  const [time, setTime] = useState(getTime(section!.timer!.time));

  const handleOnTimeout = () => {
    console.warn("timeout");
  };

  const handleOnBreakpoint = (breakpoint: number) => {
    console.warn("breakpoint", breakpoint);
  };

  useEffect(() => {
    setTime(getTime(section!.timer!.time));
  }, [section!.isStarted, section!.isStopped, section!.timer]);

  return (
    <Countdown
      time={time}
      onTimeout={handleOnTimeout}
      onBreakpoint={handleOnBreakpoint}
    />
  );
};
