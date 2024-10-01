import { useEffect, useRef, useState } from "preact/hooks";

export const useCountdown = (onExpire: () => void, date?: string) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (!date) return 0;

    const expirationDate = new Date(date);
    const now = new Date();
    const differenceInMs = expirationDate.getTime() - now.getTime();
    return Math.floor(differenceInMs / 1000);
  });

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!);
            onExpire?.();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [timeLeft]);

  return timeLeft;
};
