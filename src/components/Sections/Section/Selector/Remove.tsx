import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";

export const Remove = () => {
  const { setSection } = useSection();

  const handleRemoveTimer = () => {
    setSection((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => {
        if (section.id === prev.selectedSectionId) {
          return {
            ...section,
            selectedTimerId:
              section.timers.find(
                (timer) => timer.id !== section.selectedTimerId
              )?.id || null,
            timers: section.timers.filter(
              (timer) => timer.id !== section.selectedTimerId
            ),
          };
        }

        return section;
      }),
    }));
  };

  return (
    <Button onClick={handleRemoveTimer}>
      <Image src="/icons/minus.svg" width={15} height={20} alt="minus" />
    </Button>
  );
};
