import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";

export const Remove = () => {
  const { setSection } = useSection();

  const handleRemoveSection = () => {
    setSection((prev) => ({
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
