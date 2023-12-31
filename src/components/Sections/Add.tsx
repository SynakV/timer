import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import PlusSvg from "@/Icons/PlusSvg";
import React, { useState } from "react";
import { SectionType } from "@/utils/contexts/SectionsContext/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSections } from "@/utils/contexts/SectionsContext/SectionsContext";

type ValuesType = string;

const VALUES = {
  name: "Section",
} as {
  name?: ValuesType;
};

export const Add = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(VALUES);

  const { setSections } = useSections();

  const handleToggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChangeValues = (values: {
    [key in keyof typeof VALUES]: ValuesType;
  }) => {
    setValues((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const handleAddSection = () => {
    const section = getSection(values);

    setSections((prev) => ({
      ...prev,
      selectedSectionId: section.id,
      sections: [...prev.sections, section],
    }));

    handleToggleIsOpen();
  };

  const getSection = (values: typeof VALUES): SectionType => ({
    id: Math.random().toString(),
    name: values.name as string,
    isStarted: false,
    isStopped: false,
    timer: null,
    timers: [],
    isRemainedTime: true,
    selectedTimerId: null,
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild onClick={handleToggleIsOpen}>
        <Button>
          <PlusSvg />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">Name</Label>
            <Input
              id="name"
              value={values.name}
              className="col-span-2 h-8"
              onChange={(e) => handleChangeValues({ name: e.target.value })}
            />
          </div>
          <Button onClick={handleAddSection}>Add section</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
