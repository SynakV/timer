import { useEffect, useState } from "react";

export const useCountdown = (targetDate: number, isStarted: boolean) => {
  const [countDownDate, setCountDownDate] = useState(
    new Date(targetDate).getTime()
  );

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    if (isStarted) {
      setCountDown(new Date(targetDate).getTime() - new Date().getTime());
    }
  }, [isStarted, targetDate]);

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    if (isStarted) {
      interval = setInterval(() => {
        setCountDown(countDownDate - new Date().getTime());
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [countDownDate, isStarted]);

  useEffect(() => {
    if (!isStarted) {
      setCountDownDate(new Date(targetDate).getTime());
    }
  }, [isStarted, targetDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

export const getTime = (time: { minutes: number; seconds: number }) =>
  new Date().getTime() + (time.minutes * 60 + time.seconds + 1) * 1000;
