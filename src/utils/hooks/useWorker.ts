import { useEffect, useRef } from "react";

export const useWorker = () => {
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../../worker.js", import.meta.url)
    );

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  return workerRef.current;
};
