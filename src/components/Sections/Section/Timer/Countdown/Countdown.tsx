import { FC, useEffect } from "react";
import { Timeline } from "../../Timeline/Timeline";
import { playAudio } from "@/utils/helpers/audio.helper";
import {
  getTime,
  useCountdown,
  getDisplayTime,
} from "@/utils/hooks/useCountdown";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";
import { useSections } from "@/utils/contexts/SectionsContext/SectionsContext";

interface Props {
  time: number;
  onTimeout: () => void;
  onBreakpoint: (breakpoint: number) => void;
}

export const Countdown: FC<Props> = ({ time, onTimeout, onBreakpoint }) => {
  const { section } = useSection();
  const { setSections } = useSections();
  const { hours, minutes, seconds } = useCountdown(time, section!.isStarted);

  const breakpoints = section?.timer?.breakpoints.points;

  const currentTime = getTime({ minutes, seconds });

  useEffect(() => {
    if (minutes <= 0 && seconds <= 0) {
      playAudio("timeout");

      setSections((prev) => ({
        ...prev,
        sections: prev.sections.map((section) => {
          if (section.id === prev.selectedSectionId) {
            return {
              ...section,
              isStopped: true,
              isStarted: false,
            };
          }

          return section;
        }),
      }));

      return onTimeout();
    }

    if (breakpoints?.includes(currentTime)) {
      playAudio("breakpoint");
      return onBreakpoint(currentTime);
    }
  }, [breakpoints, currentTime, minutes, seconds]);

  const timeRemainInPercentage = (currentTime / time) * 100;

  const getTimeColor = () => {
    if (timeRemainInPercentage > 30) {
      return "hsl(var(--foreground))";
    }

    if (timeRemainInPercentage > 10) {
      return "orange";
    }

    return "red";
  };

  const timelinePoints =
    breakpoints?.map((point) => (point / time) * 100) || [];

  return (
    <>
      <div className="relative flex flex-col" style={{ color: getTimeColor() }}>
        <span className="transition-all">
          {getDisplayTime({ minutes, seconds })}
        </span>
        <span className="text-[3vw] translate-y-[-100%]">{hours}h</span>
      </div>
      <Timeline
        color={getTimeColor()}
        breakpoints={timelinePoints}
        isStarted={section!.isStarted}
        timeRemainInPercentage={timeRemainInPercentage}
      />
    </>
  );
};
