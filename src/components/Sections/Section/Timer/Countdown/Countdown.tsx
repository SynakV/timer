import { FC, useEffect } from "react";
import { Timeline } from "../../Timeline/Timeline";
import { playAudio } from "@/utils/helpers/audio.helper";
import { useCountdown } from "@/utils/hooks/useCountdown";
import { useSection } from "@/utils/contexts/SectionContext/SectionContext";

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
  const { section: currSection, sections, setSection } = useSection();
  const { minutes, seconds } = useCountdown(time, currSection!.isStarted);

  useEffect(() => {
    if (minutes <= 0 && seconds <= 0) {
      playAudio("timeout");
      setSection({
        sections: sections.map((section) => {
          if (section.id === currSection?.id) {
            return {
              ...section,
              isStopped: true,
              isStarted: false,
            };
          }

          return section;
        }),
      });
      return onTimeout();
    }
    if (minutes > 0 && seconds === 0) {
      return onMinute();
    }
    if (minutes > 0 && seconds === 30) {
      return onHalfMinute();
    }
  }, [minutes, seconds]);

  return (
    <>
      {`${minutes > 9 ? minutes : "0" + minutes}:${
        seconds > 9 ? seconds : "0" + seconds
      }`}
      <Timeline time={time} spent={{ minutes, seconds }} />
    </>
  );
};
