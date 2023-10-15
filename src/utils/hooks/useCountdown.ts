import { useWorker } from "./useWorker";
import { useEffect, useState } from "react";

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
  const minutes = getMinutes(countDown);
  const seconds = getSeconds(countDown);

  return {
    // days,
    // hours,
    minutes,
    seconds,
  };
};

export const getMinutes = (time: number) => Math.floor(time / 60);
export const getSeconds = (time: number) => Math.floor(time % 60);

export const getDisplayTime = (time: { minutes: number; seconds: number }) =>
  `${time.minutes > 9 ? time.minutes : "0" + time.minutes}:${
    time.seconds > 9 ? time.seconds : "0" + time.seconds
  }`;

export const getTime = (time: { minutes: number; seconds: number }) =>
  time.minutes * 60 + time.seconds;
