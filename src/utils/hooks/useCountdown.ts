import { useWorker } from "./useWorker";
import { useEffect, useState } from "react";
import { getHours, getMinutes, getSeconds } from "../helpers/timer.helper";

export const useCountdown = (time: number, isStarted: boolean) => {
  const [countDown, setCountDown] = useState(time);

  const worker = useWorker();

  useEffect(() => {
    setCountDown(time);
  }, [isStarted, time]);

  useEffect(() => {
    if (isStarted) {
      worker?.postMessage(true);
      worker!.onmessage = () => {
        setCountDown((prev) => prev - 1);
      };
    } else {
      worker?.postMessage(false);
    }

    return () => {
      worker?.postMessage(null);
    };
  }, [isStarted, worker]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  // const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  // const hours = Math.floor(
  //   (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  // );
  const hours = getHours(countDown);
  const minutes = getMinutes(countDown);
  const seconds = getSeconds(countDown);

  return {
    // days,
    hours,
    minutes,
    seconds,
  };
};
