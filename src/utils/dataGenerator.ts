export const generateNormalValue = (): number => {
  const baseValue = 40;
  const variance = 5;
  return baseValue + (Math.random() * variance * 2 - variance);
};

export const generateAnomalyValue = (): number => {
  const baseValue = 100;
  const variance = 20;
  return baseValue + (Math.random() * variance * 2 - variance);
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