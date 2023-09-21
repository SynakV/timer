import {
  FC,
  useState,
  Dispatch,
  ReactNode,
  useContext,
  createContext,
  SetStateAction,
} from "react";
import { SectionType } from "./types";

interface ISectionValues {
  sections: SectionType[];
  section: SectionType | null;
  selectedSectionId: string | null;
}

interface ISectionContext extends ISectionValues {
  setSection: Dispatch<SetStateAction<ISectionValues>>;
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

  const sections = values.sections.map((section) => ({
    ...section,
    timer:
      section.timers.find((timer) => timer.id === section.selectedTimerId) ||
      null,
  }));

  const section =
    sections.find((section) => section.id === values.selectedSectionId) || null;

  return (
    <SectionContext.Provider
      value={{
        ...values,
        section,
        sections,
        setSection: setValues,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => useContext(SectionContext);
