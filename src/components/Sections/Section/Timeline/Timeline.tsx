import { FC } from "react";

interface Props {
  color: string;
  isStarted: boolean;
  breakpoints: number[];
  timeRemainInPercentage: number;
}

export const Timeline: FC<Props> = ({
  color,
  isStarted,
  breakpoints,
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
    {breakpoints.map((breakpoint) => (
      <div
        key={breakpoint}
        style={{ left: `${breakpoint}%` }}
        className="absolute w-1 top-0 h-[100%] bg-white"
      />
    ))}
  </div>
);
