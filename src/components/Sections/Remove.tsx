import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
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
      <Image src="/icons/minus.svg" width={15} height={20} alt="minus" />
    </Button>
  );
};
