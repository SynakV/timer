import { FC, useState, ReactNode, useContext, createContext } from "react";
import { SectionType } from "./types";

interface ISectionValues {
  sections: SectionType[];
  section: SectionType | null;
}

interface ISectionContext extends ISectionValues {
  setSection: (values: Partial<ISectionValues>) => void;
}

const DEFAULT_VALUES: ISectionContext = {
  sections: [],
  section: null,
  setSection: () => {},
};

export const SectionContext = createContext<ISectionContext>(DEFAULT_VALUES);

interface Props {
  children: ReactNode;
}

export const SectionProvider: FC<Props> = ({ children }) => {
  const [section, setSection] = useState<ISectionValues>(DEFAULT_VALUES);

  const handleSetSection = (values: Partial<ISectionValues>) => {
    setSection((prev) => ({
      ...prev,
      ...values,
    }));
  };

  return (
    <SectionContext.Provider
      value={{ ...section, setSection: handleSetSection }}
    >
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => useContext(SectionContext);
