import { NORMAL_CURRENT, THEFT_CURRENT } from './constants';

// Add small random variations to make the graph more natural
const addNoise = (value: number, variance: number = 0.02): number => {
  return value + (Math.random() * variance * 2 - variance);
};

export const generateNormalValue = (): number => {
  return addNoise(NORMAL_CURRENT);
};

export const generateAnomalyValue = (): number => {
  const baseTheftCurrent = THEFT_CURRENT.MIN + 
    (Math.random() * (THEFT_CURRENT.MAX - THEFT_CURRENT.MIN));
  return addNoise(baseTheftCurrent, 0.03);
};

export const generateTimeLabels = (count: number): string[] => {
  return Array.from({ length: count }, (_, i) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() - (count - i));
    return time.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  });
};