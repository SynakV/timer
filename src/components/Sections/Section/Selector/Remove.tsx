import React from "react";
import MinusSvg from "@/Icons/MinusSvg";
import { Button } from "@/components/ui/button";
import { useSections } from "@/utils/contexts/SectionsContext/SectionsContext";

export const Remove = () => {
  const { setSections } = useSections();

  const handleRemoveTimer = () => {
    setSections((prev) => ({
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
      <MinusSvg />
    </Button>
  );
};
