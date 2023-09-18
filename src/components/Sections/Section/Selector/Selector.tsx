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

export const Selector = () => {
  const { section: currSection, sections, setSection } = useSection();

  const handleSelectTimer = (id: string) => {
    setSection({
      sections: sections.map((section) => {
        if (section.id === currSection?.id) {
          return {
            ...section,
            isStopped: true,
            isStarted: false,
            selectedTimerId: id,
          };
        }

        return section;
      }),
    });
  };

  return (
    <div className="flex gap-2">
      {!!currSection?.timers.length && (
        <>
          <Select
            value={currSection?.timer?.id}
            onValueChange={handleSelectTimer}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select timer" />
            </SelectTrigger>
            <SelectContent>
              {currSection?.timers.map((timer) => (
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
