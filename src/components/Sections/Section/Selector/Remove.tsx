import React from "react";
import { Button } from "@/components/ui/button";
import { useTimer } from "@/utils/contexts/TimerContext/TimerContext";

export const Remove = () => {
  const { timer: currTimer, timers, setTimer } = useTimer();

  const handleRemoveTimer = () => {
    setTimer({
      timer: timers[0] && timers.length > 1 ? timers[0] : null,
      timers: timers.filter((timer) => timer.id !== currTimer!.id),
    });
  };

  return <Button onClick={handleRemoveTimer}>-</Button>;
};
