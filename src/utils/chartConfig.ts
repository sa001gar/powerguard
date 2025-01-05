import { ChartOptions } from 'chart.js';

export const getChartOptions = (): ChartOptions => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 750,
  },
  plugins: {
    legend: {
      display: false, // Hide legend for cleaner look
    },
    title: {
      display: true,
      text: 'LED Current Monitoring',
      font: {
        size: 16,
        weight: 'normal'
      }
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false,
      },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 8,
        font: {
          size: 11
        }
      }
    },
    y: {
      position: 'right',
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false,
      },
      ticks: {
        callback: (value) => `${value}A`,
        stepSize: 0.1,
        font: {
          size: 11
        }
      },
      min: 0.3, // Set minimum to show variations better
      max: 0.8, // Set maximum to accommodate theft current
      suggestedMin: 0.3,
      suggestedMax: 0.8,
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
  elements: {
    line: {
      tension: 0.4, // Smooth line
      borderWidth: 2,
    },
    point: {
      radius: 0, // Hide points for cleaner look
    }
  },
});