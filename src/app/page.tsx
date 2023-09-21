"use client";

import dynamic from "next/dynamic";
import { SectionsProvider } from "@/utils/contexts/SectionsContext/SectionsContext";

const Sections = dynamic(
  () =>
    import("../components/Sections/Sections").then((module) => module.Sections),
  { ssr: false }
);

export default function Home() {
  return (
    <SectionsProvider>
      <Sections />
    </SectionsProvider>
  );
}
