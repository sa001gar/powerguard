import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface AlertBannerProps {
  value: number;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ value }) => (
  <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center animate-pulse">
    <AlertTriangle className="w-6 h-6 mr-2 flex-shrink-0" />
    <div>
      <p className="font-bold">Alert: Unusual current draw detected!</p>
      <p className="text-sm">Current consumption: {value.toFixed(3)} A</p>
      <p className="text-sm">Expected: 0.400 A | Deviation: +{((value - 0.4) * 100).toFixed(1)}%</p>
    </div>
  </div>
);

export default AlertBanner;