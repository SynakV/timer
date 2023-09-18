import { FC, useState, ReactNode, useContext, createContext } from "react";
import { SectionType } from "./types";

interface ISectionValues {
  sections: SectionType[];
  section: SectionType | null;
  selectedSectionId: string | null;
}

interface ISectionContext extends ISectionValues {
  setSection: (values: Partial<ISectionValues>) => void;
}

const DEFAULT_VALUES: ISectionContext = {
  sections: [],
  section: null,
  setSection: () => {},
  selectedSectionId: null,
};

export const SectionContext = createContext<ISectionContext>(DEFAULT_VALUES);

interface Props {
  children: ReactNode;
}

export const SectionProvider: FC<Props> = ({ children }) => {
  const [values, setValues] = useState<ISectionValues>(DEFAULT_VALUES);

  const handleSetSection = (values: Partial<ISectionValues>) => {
    setValues((prev) => ({
      ...prev,
      ...values,
    }));
  };

  console.log(values.sections);

  return (
    <SectionContext.Provider
      value={{
        ...{
          ...values,
          section:
            values.sections.find(
              (section) => section.id === values.selectedSectionId
            ) || null,
          sections: values.sections.map((section) => ({
            ...section,
            timer:
              section.timers.find(
                (timer) => timer.id === section.selectedTimerId
              ) || null,
          })),
        },
        setSection: handleSetSection,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => useContext(SectionContext);
