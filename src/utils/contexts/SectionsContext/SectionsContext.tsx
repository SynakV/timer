import {
  FC,
  useState,
  Dispatch,
  ReactNode,
  useContext,
  createContext,
  SetStateAction,
  useEffect,
} from "react";
import { SectionType } from "./types";

interface ISectionsValues {
  sections: SectionType[];
  section: SectionType | null;
  selectedSectionId: string | null;
}

interface ISectionsContext extends ISectionsValues {
  setSections: Dispatch<SetStateAction<ISectionsValues>>;
}

const DEFAULT_VALUES: ISectionsContext = {
  sections: [],
  section: null,
  setSections: () => {},
  selectedSectionId: null,
};

export const SectionsContext = createContext<ISectionsContext>(DEFAULT_VALUES);

interface Props {
  children: ReactNode;
}

export const SectionsProvider: FC<Props> = ({ children }) => {
  const [values, setValues] = useState<ISectionsValues>(DEFAULT_VALUES);

  const sections = values.sections.map((section) => ({
    ...section,
    timer:
      section.timers.find((timer) => timer.id === section.selectedTimerId) ||
      null,
  }));

  const section =
    sections.find((section) => section.id === values.selectedSectionId) || null;

  return (
    <SectionsContext.Provider
      value={{
        ...values,
        section,
        sections,
        setSections: setValues,
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export const useSections = () => useContext(SectionsContext);
