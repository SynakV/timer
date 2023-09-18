import React from "react";
import { Button } from "@/components/ui/button";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";

export const Controllers = () => {
  const { section: currSection, sections, setSection } = useSection();

  const handleSwitchIsStarted = () => {
    setSection({
      sections: sections.map((section) => {
        if (section.id === currSection?.id) {
          return {
            ...section,
            isStarted: !section.isStarted,
          };
        }
        return section;
      }),
    });
  };

  return (
    <Button
      variant={currSection?.isStarted ? "destructive" : "success"}
      onClick={handleSwitchIsStarted}
    >
      {currSection?.isStarted ? "Stop" : "Start"}
    </Button>
  );
};
