import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import React from "react";
import { Add } from "./Add";
import { Remove } from "./Remove";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";
import { useSections } from "@/utils/contexts/SectionsContext/SectionsContext";

export const Selector = () => {
  const { section } = useSection();
  const { setSections } = useSections();

  const handleSelectTimer = (id: string) => {
    setSections((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => {
        if (section.id === prev.selectedSectionId) {
          return {
            ...section,
            isStopped: true,
            isStarted: false,
            selectedTimerId: id,
          };
        }

        return section;
      }),
    }));
  };

  return (
    <div className="flex gap-2">
      {!!section?.timers.length && (
        <>
          <Select value={section?.timer?.id} onValueChange={handleSelectTimer}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select timer" />
            </SelectTrigger>
            <SelectContent>
              {section?.timers.map((timer) => (
                <SelectItem value={timer.id} key={timer.id}>
                  {timer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Remove />
        </>
      )}
      <Add />
    </div>
  );
};
