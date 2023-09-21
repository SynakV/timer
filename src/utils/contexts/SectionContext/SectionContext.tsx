import { FC, ReactNode, useContext, createContext } from "react";
import { SectionType } from "../SectionsContext/types";

interface ISectionContext {
  section: SectionType | null;
}

const DEFAULT_VALUES: ISectionContext = {
  section: null,
};

export const SectionContext = createContext<ISectionContext>(DEFAULT_VALUES);

interface Props {
  children: ReactNode;
  section: SectionType | null;
}

export const SectionProvider: FC<Props> = ({ section, children }) => {
  return (
    <SectionContext.Provider
      value={{
        section,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => useContext(SectionContext);
