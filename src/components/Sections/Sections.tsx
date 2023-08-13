import React from "react";
import { Add } from "./Add";
import { Remove } from "./Remove";
import { Section } from "./Section/Section";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TimerProvider } from "@/utils/contexts/TimerContext/TimerContext";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";

export const Sections = () => {
  const { section: currSection, sections, setSection } = useSection();

  return (
    <>
      <Tabs value={currSection?.id} className="w-[400px]">
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
          style={{ display: section.id === currSection?.id ? "block" : "none" }}
        >
          <TimerProvider>
            <Section />
          </TimerProvider>
        </div>
      ))}
    </>
  );
};
