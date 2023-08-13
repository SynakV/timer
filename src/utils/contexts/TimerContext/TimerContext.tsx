import { TimerType } from "./types";
import { FC, useState, ReactNode, useContext, createContext } from "react";

interface ITimerValues {
  isStart: boolean;
  timers: TimerType[];
  timer: TimerType | null;
}

interface ITimerContext extends ITimerValues {
  setTimer: (values: Partial<ITimerValues>) => void;
}

const DEFAULT_VALUES: ITimerContext = {
  timers: [],
  timer: null,
  isStart: false,
  setTimer: () => {},
};

export const TimerContext = createContext<ITimerContext>(DEFAULT_VALUES);

interface Props {
  children: ReactNode;
}

export const TimerProvider: FC<Props> = ({ children }) => {
  const [timer, setTimer] = useState<ITimerValues>(DEFAULT_VALUES);

  const handleSetTimer = (values: Partial<ITimerValues>) => {
    setTimer((prev) => ({
      ...prev,
      ...values,
    }));
  };

  return (
    <TimerContext.Provider value={{ ...timer, setTimer: handleSetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
