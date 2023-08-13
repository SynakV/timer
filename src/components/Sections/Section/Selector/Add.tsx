import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TimerType } from "@/utils/contexts/TimerContext/types";
import { useTimer } from "@/utils/contexts/TimerContext/TimerContext";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";

type ValuesType = string | number;

const VALUES = {
  name: "Timer",
  minutes: 2,
  seconds: 0,
} as {
  name?: ValuesType;
  minutes?: ValuesType;
  seconds?: ValuesType;
};

export const Add = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(VALUES);

  const { timers, setTimer } = useTimer();

  const handleToggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChangeValues = (values: {
    [key in keyof typeof VALUES]: ValuesType;
  }) => {
    setValues((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const handleAddTimer = () => {
    const timer = getTimer(values);

    setTimer({ timer, timers: [...timers, timer] });
    handleToggleIsOpen();
  };

  const getTimer = (values: typeof VALUES): TimerType => ({
    id: Math.random().toString(),
    name: values.name as string,
    time: {
      minutes: values.minutes as number,
      seconds: values.seconds as number,
    },
  });

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild onClick={handleToggleIsOpen}>
        <Button>+</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">Name</Label>
            <Input
              id="name"
              value={values.name}
              className="col-span-2 h-8"
              onChange={(e) => handleChangeValues({ name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label>Timer</Label>
            <div className="grid col-span-2 grid-cols-11 items-center">
              <Input
                min={0}
                id="minutes"
                value={values.minutes}
                className="col-span-5 h-8"
                onChange={(e) =>
                  handleChangeValues({ minutes: +e.target.value })
                }
              />
              <span className="text-center col-span-1">:</span>
              <Input
                min={0}
                max={59}
                id="seconds"
                value={values.seconds}
                className="col-span-5 h-8"
                onChange={(e) =>
                  handleChangeValues({ seconds: +e.target.value })
                }
              />
            </div>
          </div>

          <Button onClick={handleAddTimer}>Add timer</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
