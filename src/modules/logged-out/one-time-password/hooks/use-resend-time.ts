import { useEffect, useState } from 'react';

const useResendTimer = (defaultSeconds = 60) => {
  const [canResend, setCanResend] = useState(true);
  const [seconds, setSeconds] = useState(defaultSeconds);

  useEffect(() => {
    if (canResend) return;

    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 1) {
          clearInterval(intervalId);
          setCanResend(true);
          return defaultSeconds;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [canResend, defaultSeconds]);

  const resetTimer = () => {
    setCanResend(false);
    setSeconds(defaultSeconds);
  };

  return { canResend, seconds, resetTimer };
};

export { useResendTimer };
