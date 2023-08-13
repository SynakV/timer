import React from "react";
import { Button } from "@/components/ui/button";
import { useTimer } from "@/utils/contexts/TimerContext/TimerContext";

export const Controllers = () => {
  const { isStarted, setTimer } = useTimer();

  const handleSwitchIsStarted = () => {
    setTimer({ isStarted: !isStarted });
  };
  return (
    <Button onClick={handleSwitchIsStarted}>
      {isStarted ? "Stop" : "Start"}
    </Button>
  );
};
