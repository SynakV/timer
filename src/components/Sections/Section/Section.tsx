import React from "react";
import { Timer } from "./Timer/Timer";
import { Selector } from "./Selector/Selector";
import { useTimer } from "@/utils/contexts/TimerContext/TimerContext";

export const Section = () => {
  const { timer } = useTimer();

  return (
    <>
      <Selector />
      {timer ? <Timer /> : <>Choose timer</>}
    </>
  );
};
