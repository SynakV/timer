import Image from "next/image";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TimerType } from "@/utils/contexts/TimerContext/types";
import { useTimer } from "@/utils/contexts/TimerContext/TimerContext";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const { timer: currTimer, timers, setTimer } = useTimer();

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

    setTimer({
      timer,
      isStopped: true,
      isStarted: false,
      timers: [...timers, timer],
    });

    handleToggleIsOpen();
  };

  const handleEditTimer = (type: keyof TimerType) => {
    const timerValues = {
      ...(type === "name"
        ? { name: values.name as string }
        : {
            time: {
              minutes: values.minutes as number,
              seconds: values.seconds as number,
            },
          }),
    };

    setTimer({
      timer: {
        ...currTimer!,
        ...timerValues,
      },
      timers: timers.map((timer) => {
        if (timer.id === currTimer?.id) {
          return {
            ...timer,
            ...timerValues,
          };
        }

        return timer;
      }),
    });
  };

  const isAnyTimers = !!timers.length;

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
        <Button>
          <Image
            width={15}
            height={20}
            alt="settings"
            src="/icons/settings.svg"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-5 gap-2">
            <div
              className={`grid col-span-${
                isAnyTimers ? 4 : 5
              } items-center gap-4`}
            >
              <div className="grid grid-cols-7 items-center gap-4">
                <Label className="col-span-2" htmlFor="width">
                  Name
                </Label>
                <div className="grid col-span-5">
                  <Input
                    id="name"
                    type="text"
                    className="h-10"
                    defaultValue={currTimer?.name || values.name}
                    onChange={(e) =>
                      handleChangeValues({ name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-7 items-center gap-4">
                <Label className="col-span-2">Timer</Label>
                <div className="grid gap-2 col-span-5">
                  <div className="grid grid-cols-11 items-center">
                    <Input
                      min={0}
                      max={99}
                      id="minutes"
                      type="number"
                      className="col-span-5 h-10"
                      defaultValue={currTimer?.time.minutes || values.minutes}
                      onChange={(e) =>
                        handleChangeValues({ minutes: +e.target.value })
                      }
                    />
                    <span className="text-center col-span-1">:</span>
                    <Input
                      min={0}
                      max={59}
                      id="seconds"
                      type="number"
                      className="col-span-5 h-10"
                      defaultValue={currTimer?.time.seconds || values.seconds}
                      onChange={(e) =>
                        handleChangeValues({ seconds: +e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {isAnyTimers && (
              <div className="grid col-span-1 items-center gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="col-span-3"
                        onClick={() => handleEditTimer("name")}
                      >
                        <Image
                          width={15}
                          height={15}
                          alt="pencil"
                          className="h-10"
                          src="/icons/pencil.svg"
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Edit name</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="col-span-3"
                        onClick={() => handleEditTimer("time")}
                      >
                        <Image
                          width={15}
                          height={15}
                          alt="pencil"
                          className="h-10"
                          src="/icons/pencil.svg"
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Edit time</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>

          <Button onClick={handleAddTimer}>Add timer</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
