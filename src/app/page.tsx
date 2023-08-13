"use client";

import dynamic from "next/dynamic";
import { SectionProvider } from "@/utils/contexts/SectionContext/SectionContext";

const Sections = dynamic(
  () =>
    import("../components/Sections/Sections").then((module) => module.Sections),
  { ssr: false }
);

export default function Home() {
  return (
    <SectionProvider>
      <Sections />
    </SectionProvider>
  );
}
