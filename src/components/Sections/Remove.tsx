import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";

export const Remove = () => {
  const { section: currSection, sections, setSection } = useSection();

  const handleRemoveSection = () => {
    setSection({
      section: sections[0] ? sections[0] : null,
      sections: sections.filter((section) => section.id !== currSection?.id),
    });
  };

  return (
    <Button onClick={handleRemoveSection}>
      <Image src="/icons/minus.svg" width={15} height={20} alt="minus" />
    </Button>
  );
};
