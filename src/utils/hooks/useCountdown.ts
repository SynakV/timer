import { useEffect, useState } from "react";

export const useCountdown = (time: number, isStarted: boolean) => {
  const [countDown, setCountDown] = useState(time);

  useEffect(() => {
    setCountDown(time);
  }, [isStarted, time]);

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    if (isStarted) {
      interval = setInterval(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isStarted]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  // const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  // const hours = Math.floor(
  //   (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  // );
  const minutes = Math.floor(countDown / 60);
  const seconds = Math.floor(countDown % 60);

  return {
    // days,
    // hours,
    minutes,
    seconds,
  };
};

export const getTime = (time: { minutes: number; seconds: number }) =>
  time.minutes * 60 + time.seconds;
