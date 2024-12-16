import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { getAlerts, clearAlerts, TheftAlert } from '../utils/alertStorage';

const AlertHistory = () => {
  const [alerts, setAlerts] = React.useState<TheftAlert[]>(getAlerts());

  const handleClearAlerts = () => {
    clearAlerts();
    setAlerts([]);
  };

  const groupedAlerts = alerts.reduce((acc, alert) => {
    if (!acc[alert.date]) {
      acc[alert.date] = [];
    }
    acc[alert.date].push(alert);
    return acc;
  }, {} as Record<string, TheftAlert[]>);

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Alert History</h2>
        {alerts.length > 0 && (
          <button
            onClick={handleClearAlerts}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>
      
      {alerts.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No alerts recorded yet
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedAlerts).map(([date, dateAlerts]) => (
            <div key={date} className="border-b pb-4 last:border-b-0">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">{date}</h3>
              <div className="space-y-3">
                {dateAlerts.map((alert, index) => (
                  <div
                    key={`${date}-${index}`}
                    className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-red-700">
                        Unusual electricity consumption detected
                      </p>
                      <p className="text-sm text-red-600">
                        Time: {alert.timestamp}
                      </p>
                      <p className="text-sm text-red-600">
                        Consumption: {alert.value.toFixed(2)} kW
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertHistory;