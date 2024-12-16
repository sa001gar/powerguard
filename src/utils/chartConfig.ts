import { ChartOptions } from 'chart.js';

export const getChartOptions = (): ChartOptions => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 750
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Real-time Electricity Consumption Monitoring',
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
        drawBorder: true,
      },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 10
      }
    },
    y: {
      position: 'right',
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        callback: (value) => `${value} kW`
      }
    },
  },
});