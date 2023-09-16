import React from "react";
import Image from "next/image";
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

  return (
    <Button onClick={handleRemoveTimer}>
      <Image src="/icons/minus.svg" width={15} height={20} alt="minus" />
    </Button>
  );
};
