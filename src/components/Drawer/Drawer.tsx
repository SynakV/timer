import { Theme } from "./Theme/Theme";
import { Upload } from "./Upload/Upload";
import { Volume } from "./Volume/Volume";
import React, { FC, ReactNode } from "react";
import { useSections } from "@/utils/contexts/SectionsContext/SectionsContext";

interface Props {
  children: ReactNode;
}

export const Drawer: FC<Props> = ({ children }) => {
  const { isDrawerOpen, setSections } = useSections();

  const handleToggleDrawer = () => {
    setSections((prev) => ({
      ...prev,
      isDrawerOpen: !prev.isDrawerOpen,
    }));
  };

  return (
    <div className="fixed w-[100vw] h-[100vh] z-50">
      <div
        onClick={handleToggleDrawer}
        className={`absolute transition-all w-[100%] h-[100%] z-40 ${
          isDrawerOpen ? "backdrop-blur" : ""
        } `}
      />
      <div
        className={`absolute h-[100%] transition-all p-5 z-50 bg-[--background] ${
          isDrawerOpen
            ? "lg:w-[500px] md:w-[400px] sm:w-[350px] max-sm:w-[100%] right-0"
            : "lg:right-[-500px] md:right-[-400px] sm:right-[-350px] max-sm:right-[-100%]"
        }`}
      >
        <div className="relative z-10">{children}</div>
        <div
          onClick={handleToggleDrawer}
          className="absolute w-[100%] h-[100%] z-0 top-0 left-0"
        />
        <Theme />
        <Upload />
        <Volume />
      </div>
    </div>
  );
};
