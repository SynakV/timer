import React from "react";
import { Add } from "./Add";
import { Remove } from "./Remove";
import { Section } from "./Section/Section";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";

export const Sections = () => {
  const { selectedSectionId, sections, setSection } = useSection();

  return (
    <div className="flex flex-col items-center w-[100vw] h-[100vh] overflow-hidden">
      <Tabs value={selectedSectionId!} className="flex gap-2 mt-5 mb-5">
        {!!sections.length && (
          <>
            <TabsList>
              {sections.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  onClick={() =>
                    setSection((prev) => ({
                      ...prev,
                      selectedSectionId: section.id,
                    }))
                  }
                >
                  {section.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <Remove />
          </>
        )}
        <Add />
      </Tabs>
      {sections.map((section) => (
        <div
          key={section.id}
          style={{
            display: section.id === selectedSectionId ? "block" : "none",
          }}
        >
          <Section />
        </div>
      ))}
    </div>
  );
};
