import React from "react";
import { Add } from "./Add";
import { Remove } from "./Remove";
import { Drawer } from "../Drawer/Drawer";
import { Section } from "./Section/Section";
import { useSections } from "@/utils/contexts/SectionsContext/SectionsContext";
import { SectionProvider } from "@/utils/contexts/SectionContext/SectionContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MAIN_ELEMENT_ID } from "@/utils/constants/constants";

export const Sections = () => {
  const { selectedSectionId, sections, setSections } = useSections();

  return (
    <div id={MAIN_ELEMENT_ID} className="flex items-center w-[100vw] h-[100vh]">
      <Drawer>
        <div className="flex flex-col items-center gap-5">
          <div className="flex gap-2">
            {!!sections.length && (
              <>
                <Select
                  value={selectedSectionId!}
                  onValueChange={(id) => {
                    setSections((prev) => ({
                      ...prev,
                      selectedSectionId: id,
                    }));
                  }}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select timer" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem value={section.id} key={section.id}>
                        {section.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Remove />
              </>
            )}
            <Add />
          </div>
          {sections.map((section) => (
            <div
              key={section.id}
              style={{
                display: section.id === selectedSectionId ? "flex" : "none",
              }}
              className="flex-col items-center gap-5"
            >
              <SectionProvider section={section}>
                <Section />
              </SectionProvider>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};
