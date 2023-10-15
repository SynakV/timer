import { FC, useEffect } from "react";
import { Timeline } from "../../Timeline/Timeline";
import { playAudio } from "@/utils/helpers/audio.helper";
import {
  getDisplayTime,
  getTime,
  useCountdown,
} from "@/utils/hooks/useCountdown";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";
import { useSections } from "@/utils/contexts/SectionsContext/SectionsContext";

interface Props {
  time: number;
  onTimeout: () => void;
  onMinute: () => void;
  onHalfMinute: () => void;
}

export const Countdown: FC<Props> = ({
  time,
  onTimeout,
  onMinute,
  onHalfMinute,
}) => {
  const { section } = useSection();
  const { setSections } = useSections();
  const { minutes, seconds } = useCountdown(time, section!.isStarted);

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
    if (minutes > 0 && seconds === 0) {
      return onMinute();
    }
    if (minutes > 0 && seconds === 30) {
      return onHalfMinute();
    }
  }, [minutes, seconds]);

  const timeRemainInPercentage = (getTime({ minutes, seconds }) / time) * 100;

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
    section?.timer?.breakpoints.points.map((point) => (point / time) * 100) ||
    [];

  return (
    <>
      <span style={{ color: getTimeColor() }} className="transition-all">
        {getDisplayTime({ minutes, seconds })}
      </span>
      <Timeline
        color={getTimeColor()}
        points={timelinePoints}
        isStarted={section!.isStarted}
        timeRemainInPercentage={timeRemainInPercentage}
      />
    </>
  );
};
