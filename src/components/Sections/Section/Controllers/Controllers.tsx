import React from "react";
import { Button } from "@/components/ui/button";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";
import { useSections } from "@/utils/contexts/SectionsContext/SectionsContext";

export const Controllers = () => {
  const { section } = useSection();
  const { setSections } = useSections();

  const handleSwitchIsStarted = () => {
    setSections((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => {
        if (section.id === prev.selectedSectionId) {
          return {
            ...section,
            isStarted: !section.isStarted,
          };
        }
        return section;
      }),
    }));
  };

  return (
    <Button
      variant={section?.isStarted ? "destructive" : "success"}
      onClick={handleSwitchIsStarted}
    >
      {section?.isStarted ? "Stop" : "Start"}
    </Button>
  );
};
