import { FC } from "react";

interface Props {
  color: string;
  points: number[];
  isStarted: boolean;
  timeRemainInPercentage: number;
}

export const Timeline: FC<Props> = ({
  color,
  points,
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
    {points.map((point) => (
      <div
        key={point}
        className="absolute top-0 w-1 h-[100%] bg-white"
        style={{ left: `${point}%` }}
      />
    ))}
  </div>
);
