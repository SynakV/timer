import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import PencilSvg from "@/Icons/PencilSvg";
import SettingsSvg from "@/Icons/SettingsSvg";
import { TimerType } from "@/utils/contexts/SectionsContext/types";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../ui/popover";
import { Points } from "./Points";
import { getTime } from "@/utils/helpers/timer.helper";
import { useSections } from "@/utils/contexts/SectionsContext/SectionsContext";

type ValuesType = string | number | number[];

const DEFAULT_VALUES = {
  name: "Timer",
  minutes: 2,
  seconds: 0,
  step: 15,
  points: [],
};

const VALUES = {
  name: DEFAULT_VALUES.name,
  minutes: DEFAULT_VALUES.minutes,
  seconds: DEFAULT_VALUES.seconds,
  step: DEFAULT_VALUES.step,
  points: DEFAULT_VALUES.points,
} as {
  name?: ValuesType;
  minutes?: ValuesType;
  seconds?: ValuesType;
  step?: ValuesType;
  points?: ValuesType;
};

export const Add = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(VALUES);

  const { section } = useSection();
  const { setSections } = useSections();

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

    setSections((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => {
        if (section.id === prev.selectedSectionId) {
          return {
            ...section,
            isStopped: true,
            isStarted: false,
            selectedTimerId: timer.id,
            timers: [...section.timers, timer],
          };
        }

        return section;
      }),
    }));

    handleToggleIsOpen();
  };

  const handleEditTimer = (type: keyof TimerType) => {
    const breakpoints = {
      step: values.step as number,
      points: values.points as number[],
    };

    setSections((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => {
        if (section.id === prev.selectedSectionId) {
          return {
            ...section,
            isStopped: true,
            isStarted: false,
            timers: section.timers.map((timer) => {
              if (timer.id === section.selectedTimerId) {
                return {
                  ...timer,
                  ...(type === "name" && { name: values.name as string }),
                  ...(type === "time" && {
                    time: {
                      minutes: values.minutes as number,
                      seconds: values.seconds as number,
                    },
                    breakpoints,
                  }),
                  ...(type === "breakpoints" && {
                    breakpoints,
                  }),
                };
              }

              return timer;
            }),
          };
        }

        return section;
      }),
    }));

    handleToggleIsOpen();
  };

  const getTimer = (values: typeof VALUES): TimerType => ({
    id: Math.random().toString(),
    name: values.name as string,
    time: {
      minutes: values.minutes as number,
      seconds: values.seconds as number,
    },
    breakpoints: {
      step: values.step as number,
      points: values.points as number[],
    },
  });

  const getBreakpointAfterCheck = (point: number) => {
    const points = values.points as number[];

    return points.includes(point)
      ? points.filter((number) => number !== point)
      : [...points, point];
  };

  const getGeneratedPoints = () => {
    const seconds = getTime({
      minutes: values.minutes as number,
      seconds: values.seconds as number,
    });

    const points = [];

    const step = values.step as number;

    const loopStep = step && step >= 0 ? step : 1;

    for (let i = loopStep; i < seconds; i += loopStep) {
      points.push(i);
    }

    return points;
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const isAnyTimers = !!section?.timers.length;

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild onClick={handleToggleIsOpen}>
        <Button variant="warn">
          <SettingsSvg />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-5 gap-2">
            <div
              className="grid items-center gap-4"
              style={{ gridColumn: `span ${isAnyTimers ? 4 : 5}` }}
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
                    defaultValue={
                      (section?.timer?.name || values.name) as string
                    }
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
                      defaultValue={
                        (section?.timer?.time.minutes ||
                          values.minutes) as number
                      }
                      onChange={(e) =>
                        handleChangeValues({
                          minutes: +e.target.value,
                          step: DEFAULT_VALUES.step,
                          points: DEFAULT_VALUES.points,
                        })
                      }
                    />
                    <span className="text-center col-span-1">:</span>
                    <Input
                      min={0}
                      max={59}
                      id="seconds"
                      type="number"
                      className="col-span-5 h-10"
                      defaultValue={
                        (section?.timer?.time.seconds ||
                          values.seconds) as number
                      }
                      onChange={(e) =>
                        handleChangeValues({
                          seconds: +e.target.value,
                          step: DEFAULT_VALUES.step,
                          points: DEFAULT_VALUES.points,
                        })
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
                        <PencilSvg />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
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
                        <PencilSvg />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Edit time</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>

          <hr />

          <div className="grid grid-cols-5 gap-2">
            <div
              className="grid items-center gap-4"
              style={{ gridColumn: `span ${isAnyTimers ? 4 : 5}` }}
            >
              <div className="grid grid-cols-7 items-center gap-4">
                <Label className="col-span-2" htmlFor="width">
                  Step
                </Label>
                <div className="grid col-span-5">
                  <Input
                    min={5}
                    step={5}
                    max={getTime({
                      minutes: values.minutes as number,
                      seconds: values.seconds as number,
                    })}
                    id="step"
                    type="number"
                    className="h-10"
                    defaultValue={
                      (section?.timer?.breakpoints.step ||
                        values.step) as number
                    }
                    onChange={(e) =>
                      handleChangeValues({
                        step: +e.target.value,
                        points: DEFAULT_VALUES.points,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-7 items-center gap-4">
                <Label className="col-span-2" htmlFor="width">
                  Points
                </Label>
                <div className="grid col-span-5">
                  <Points
                    checked={values.points as number[]}
                    points={getGeneratedPoints()}
                    onCheckChange={(point) =>
                      handleChangeValues({
                        points: getBreakpointAfterCheck(point),
                      })
                    }
                  />
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
                        <PencilSvg />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
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
                        <PencilSvg />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Edit time</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>

          <hr />

          <Button onClick={handleAddTimer}>Add timer</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
