import React from "react";
import { Timer } from "./Timer/Timer";
import { Selector } from "./Selector/Selector";
import { Controllers } from "./Controllers/Controllers";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";

export const Section = () => {
  const { section } = useSection();

  return (
    <>
      <div className="flex flex-col gap-5 items-center">
        <Selector />
        {section?.selectedTimerId && <Controllers />}
      </div>
      <div
        className={`w-[100vw] text-center font-mono text-[33vw] leading-[140%]`}
      >
        {section?.selectedTimerId ? (
          <Timer />
        ) : (
          <div className="text-[13vw]">Create timer</div>
        )}
      </div>
    </>
  );
};
