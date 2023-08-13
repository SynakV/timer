import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import React from "react";
import { Add } from "./Add";
import { Remove } from "./Remove";
import { useTimer } from "@/utils/contexts/TimerContext/TimerContext";

export const Selector = () => {
  const { timer, timers, setTimer } = useTimer();

  const handleSetTimer = (id: string) => {
    setTimer({ timer: timers.find((timer) => timer.id === id) });
  };

  return (
    <>
      {!!timers.length && (
        <>
          <Select value={timer?.id}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select timer" />
            </SelectTrigger>
            <SelectContent>
              {timers.map((timer) => (
                <SelectItem
                  onClick={() => handleSetTimer(timer.id)}
                  value={timer.id}
                  key={timer.id}
                >
                  {timer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Remove />
        </>
      )}
      <Add />
    </>
  );
};
