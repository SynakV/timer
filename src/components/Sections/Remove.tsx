import React from "react";
import { Button } from "../ui/button";
import MinusSvg from "@/Icons/MinusSvg";
import { useSections } from "@/utils/contexts/SectionsContext/SectionsContext";

export const Remove = () => {
  const { setSections } = useSections();

  const handleRemoveSection = () => {
    setSections((prev) => ({
      ...prev,
      selectedSectionId:
        prev.sections.find((section) => section.id !== prev.selectedSectionId)
          ?.id || null,
      sections: prev.sections.filter(
        (section) => section.id !== prev.selectedSectionId
      ),
    }));
  };

  return (
    <Button onClick={handleRemoveSection}>
      <MinusSvg />
    </Button>
  );
};
