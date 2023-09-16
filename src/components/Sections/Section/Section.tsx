import React from "react";
import { Timer } from "./Timer/Timer";
import { Selector } from "./Selector/Selector";
import { Controllers } from "./Controllers/Controllers";
import { useTimer } from "@/utils/contexts/TimerContext/TimerContext";

export const Section = () => {
  const { timer } = useTimer();

  return (
    <>
      <div className="flex flex-col gap-5 items-center">
        <Selector />
        {timer && <Controllers />}
      </div>
      <div
        className={`w-[100vw] text-center font-mono text-[40vw] leading-[125%]`}
      >
        {timer ? <Timer /> : <div className="text-[13vw]">Choose timer</div>}
      </div>
    </>
  );
};
