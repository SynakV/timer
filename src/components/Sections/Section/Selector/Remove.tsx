import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";

export const Remove = () => {
  const { section: currSection, sections, setSection } = useSection();

  const handleRemoveTimer = () => {
    setSection({
      sections: sections.map((section) => {
        if (section.id === currSection?.id) {
          return {
            ...section,
            selectedTimerId:
              section.timers[0].id && section.timers.length > 1
                ? section.timers[0].id
                : null,
            timers: section.timers.filter(
              (timer) => timer.id !== section.timer!.id
            ),
          };
        }

        return section;
      }),
    });
  };

  return (
    <Button onClick={handleRemoveTimer}>
      <Image src="/icons/minus.svg" width={15} height={20} alt="minus" />
    </Button>
  );
};
