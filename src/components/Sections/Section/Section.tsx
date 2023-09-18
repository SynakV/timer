import React from "react";
import { Timer } from "./Timer/Timer";
import { Selector } from "./Selector/Selector";
import { Controllers } from "./Controllers/Controllers";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";

export const Section = () => {
  const { section } = useSection();

  // console.log(section);

  return (
    <>
      <div className="flex flex-col gap-5 items-center">
        <Selector />
        {section?.timer && <Controllers />}
      </div>
      <div
        className={`w-[100vw] text-center font-mono text-[33vw] leading-[140%]`}
      >
        {section?.timer ? (
          <Timer />
        ) : (
          <div className="text-[13vw]">Create timer</div>
        )}
      </div>
    </>
  );
};
