// Time intervals (in milliseconds)
export const UPDATE_INTERVAL = 1000; // 1 second update interval
export const INITIAL_DATA_POINTS = 100;

// Current thresholds (in amperes)
export const NORMAL_CURRENT = 0.4; // Normal current for two LEDs in parallel
export const THEFT_CURRENT = {
  MIN: 0.6,
  MAX: 0.7
} as const;

// Chart configuration
export const CHART_AXIS = {
  Y: {
    MIN: 0.3,
    MAX: 0.8
  }
} as const;