import React, { useEffect, useState, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { RefreshCw } from 'lucide-react';
import { getChartOptions } from '../utils/chartConfig';
import { generateNormalValue, generateAnomalyValue, generateTimeLabels } from '../utils/dataGenerator';
import { saveAlert } from '../utils/alertStorage';
import AlertBanner from './AlertBanner';
import { INITIAL_DATA_POINTS, UPDATE_INTERVAL } from '../utils/constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard = () => {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [isTheftDetected, setIsTheftDetected] = useState(false);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const chartRef = useRef<any>(null);

  const updateChart = () => {
    const newData = [...data];
    const newLabels = [...labels];
    const currentTime = new Date();
    
    if (newData.length >= INITIAL_DATA_POINTS) {
      newData.shift();
      newLabels.shift();
    }

    const newValue = isTheftDetected ? generateAnomalyValue() : generateNormalValue();
    newData.push(newValue);
    newLabels.push(currentTime.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }));
    
    setCurrentValue(newValue);
    setData(newData);
    setLabels(newLabels);
  };

  useEffect(() => {
    const initialData = Array.from({ length: INITIAL_DATA_POINTS }, generateNormalValue);
    const initialLabels = generateTimeLabels(INITIAL_DATA_POINTS);
    setData(initialData);
    setLabels(initialLabels);

    const interval = setInterval(updateChart, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [isTheftDetected]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const newIsTheftDetected = !isTheftDetected;
    setIsTheftDetected(newIsTheftDetected);

    if (newIsTheftDetected) {
      const alert = {
        timestamp: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        value: currentValue,
      };
      saveAlert(alert);
    }
  };

  const handleRefresh = () => {
    const initialData = Array.from({ length: INITIAL_DATA_POINTS }, generateNormalValue);
    const initialLabels = generateTimeLabels(INITIAL_DATA_POINTS);
    setData(initialData);
    setLabels(initialLabels);
    setIsTheftDetected(false);
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Current (A)',
        data: data,
        borderColor: isTheftDetected ? 'rgb(239, 68, 68)' : 'rgb(59, 130, 246)',
        backgroundColor: isTheftDetected ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg" onContextMenu={handleContextMenu}>
      {isTheftDetected && <AlertBanner value={currentValue} />}
      
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">LED Current Monitor</h2>
          <p className="text-sm text-gray-600">
            Current Draw: {currentValue.toFixed(3)} A
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Reset Monitor
        </button>
      </div>

      <div className="h-[60vh] w-full bg-white p-4 rounded-lg">
        <Line options={getChartOptions()} data={chartData} ref={chartRef} />
      </div>

      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>Real-time Current Monitoring System</p>
      </div>
    </div>
  );
};

export default Dashboard;