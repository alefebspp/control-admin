'use client';

import {
  Clock1,
  Clock2,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
  Clock10,
  Clock11,
  Clock12
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface MovingClockProps {
  children: React.ReactNode;
}

export const MovingClock = ({ children }: MovingClockProps) => {
  const [clockTime, setClockTime] = useState<number>(12);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setClockTime(prevTime => (prevTime >= 12 ? 1 : prevTime + 1));
    }, 5000);

    return () => clearTimeout(timeout);
  }, [clockTime]);

  const getClockIcon = (time: number) => {
    const className = 'w-full h-full';
    switch (time) {
      case 1:
        return <Clock1 className={className} />;
      case 2:
        return <Clock2 className={className} />;
      case 3:
        return <Clock3 className={className} />;
      case 4:
        return <Clock4 className={className} />;
      case 5:
        return <Clock5 className={className} />;
      case 6:
        return <Clock6 className={className} />;
      case 7:
        return <Clock7 className={className} />;
      case 8:
        return <Clock8 className={className} />;
      case 9:
        return <Clock9 className={className} />;
      case 10:
        return <Clock10 className={className} />;
      case 11:
        return <Clock11 className={className} />;
      case 12:
        return <Clock12 className={className} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-[30%] flex">
      <div className="w-[50%] h-full">{getClockIcon(clockTime)}</div>
      <div className="w-[50%] h-full flex flex-col justify-end p-4">
        {children}
      </div>
    </div>
  );
};
