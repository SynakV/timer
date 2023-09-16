import { FC } from "react";
import { getTime } from "@/utils/hooks/useCountdown";
import { TimerType } from "@/utils/contexts/TimerContext/types";

interface Props {
  time: number;
  spent: TimerType["time"];
}

export const Timeline: FC<Props> = ({ time, spent: { minutes, seconds } }) => {
  const getTimelinePercentage = () =>
    (getTime({ minutes, seconds }) / time) * 100;

  return (
    <div className="fixed w-[99vw] h-2 bottom-[0.5vw] left-[0.5vw]">
      <div
        style={{ width: `${getTimelinePercentage()}%` }}
        className="h-[100%] transition-all bg-primary"
      />
    </div>
  );
};
