export type SectionType = {
  id: string;
  name: string;
  isStarted: boolean;
  isStopped: boolean;
  timers: TimerType[];
  timer: TimerType | null;
  selectedTimerId: string | null;
};

export type TimerType = {
  id: string;
  time: {
    minutes: number;
    seconds: number;
  };
  name: string;
  breakpoints: {
    step: number;
    points: number[];
  };
};
