import { FC } from "react";

interface Props {
  color: string;
  isStarted: boolean;
  timeRemainInPercentage: number;
}

export const Timeline: FC<Props> = ({
  color,
  isStarted,
  timeRemainInPercentage,
}) => (
  <div className="fixed w-[99vw] h-2 bottom-[0.5vw] left-[0.5vw]">
    <div
      style={{
        background: color,
        opacity: isStarted ? 1 : 0,
        width: `${timeRemainInPercentage}%`,
      }}
      className="h-[100%] transition-all rounded-md"
    />
  </div>
);
