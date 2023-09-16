import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { SectionType } from "@/utils/contexts/SectionContext/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";

type ValuesType = string;

const VALUES = {
  name: "Section",
} as {
  name?: ValuesType;
};

export const Add = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(VALUES);

  const { sections, setSection } = useSection();

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

    setSection({ section: section, sections: [...sections, section] });
    handleToggleIsOpen();
  };

  const getSection = (values: typeof VALUES): SectionType => ({
    id: Math.random().toString(),
    name: values.name as string,
  });

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild onClick={handleToggleIsOpen}>
        <Button>
          <Image src="/icons/plus.svg" width={15} height={20} alt="plus" />
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
