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

  const handleSelectTimer = (id: string) => {
    setTimer({
      isStopped: true,
      isStarted: false,
      timer: timers.find((timer) => timer.id === id),
    });
  };

  return (
    <div className="flex gap-2">
      {!!timers.length && (
        <>
          <Select onValueChange={handleSelectTimer} value={timer?.id}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select timer" />
            </SelectTrigger>
            <SelectContent>
              {timers.map((timer) => (
                <SelectItem value={timer.id} key={timer.id}>
                  {timer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Remove />
        </>
      )}
      <Add />
    </div>
  );
};
