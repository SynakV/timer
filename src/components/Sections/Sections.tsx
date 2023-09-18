import React from "react";
import { Add } from "./Add";
import { Remove } from "./Remove";
import { Section } from "./Section/Section";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";

export const Sections = () => {
  const { section, sections, setSection } = useSection();

  // console.log(section?.id);

  return (
    <div className="flex flex-col items-center w-[100vw] h-[100vh] overflow-hidden">
      <Tabs value={section?.id} className="flex gap-2 mt-5 mb-5">
        {!!sections.length && (
          <>
            <TabsList>
              {sections.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  onClick={() => setSection({ section })}
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
            display: section.id === section?.id ? "block" : "none",
          }}
        >
          <Section />
        </div>
      ))}
    </div>
  );
};
