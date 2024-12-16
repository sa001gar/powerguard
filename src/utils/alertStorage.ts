export interface TheftAlert {
  timestamp: string;
  value: number;
  date: string;
}

export const saveAlert = (alert: TheftAlert): void => {
  const alerts = getAlerts();
  alerts.unshift(alert);
  localStorage.setItem('theftAlerts', JSON.stringify(alerts));
};

export const getAlerts = (): TheftAlert[] => {
  try {
    return JSON.parse(localStorage.getItem('theftAlerts') || '[]');
  } catch {
    return [];
  }
};

export const clearAlerts = (): void => {
  localStorage.setItem('theftAlerts', '[]');
};