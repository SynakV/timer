import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSections } from "@/utils/contexts/SectionsContext/SectionsContext";

enum TIME {
  REMAINED = "Remained",
  PASSED = "Passed",
}

export const Time = () => {
  const { sections, selectedSectionId, setSections } = useSections();

  const section = sections.find((section) => section.id === selectedSectionId);

  const handleValueChange = (value: string) => {
    setSections((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => {
        if (section.id === prev.selectedSectionId) {
          return {
            ...section,
            isRemainedTime: value === TIME.REMAINED,
          };
        }

        return section;
      }),
    }));
  };

  return (
    <Tabs
      className="w-[200px]"
      onValueChange={handleValueChange}
      value={section?.isRemainedTime ? TIME.REMAINED : TIME.PASSED}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={TIME.REMAINED}>{TIME.REMAINED}</TabsTrigger>
        <TabsTrigger value={TIME.PASSED}>{TIME.PASSED}</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
