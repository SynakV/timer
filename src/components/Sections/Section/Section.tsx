import React from "react";
import { Timer } from "./Timer/Timer";
import { createPortal } from "react-dom";
import { Selector } from "./Selector/Selector";
import { Controllers } from "./Controllers/Controllers";
import { MAIN_ELEMENT_ID } from "@/utils/constants/constants";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";
import { useSections } from "@/utils/contexts/SectionsContext/SectionsContext";

export const Section = () => {
  const { section } = useSection();
  const { selectedSectionId } = useSections();

  return (
    <>
      <Selector />
      {section?.selectedTimerId && <Controllers />}
      {createPortal(
        <div
          style={{
            display: section?.id === selectedSectionId ? "block" : "none",
          }}
          className={`w-[100vw] text-center font-mono text-[33vw] bg-[--background]`}
        >
          {section?.selectedTimerId && <Timer />}
        </div>,
        document.getElementById(MAIN_ELEMENT_ID) || document.body
      )}
    </>
  );
};
