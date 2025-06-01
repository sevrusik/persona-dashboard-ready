import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import Papa from 'papaparse';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  const [chartData, setChartData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const data = results.data;

        // Подсчитаем количество игроков по типу персона
        const personaCount = {};
        data.forEach((row) => {
          const persona = row.Persona || 'Неопределено';
          if (personaCount[persona]) {
            personaCount[persona] += 1;
          } else {
            personaCount[persona] = 1;
          }
        });

        const labels = Object.keys(personaCount);
        const values = Object.values(personaCount);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Игроки по персонам',
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
              ],
              borderWidth: 1,
            },
          ],
        });
      },
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Persona Dashboard</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <div style={{ width: '400px', margin: '50px auto' }}>
        {chartData && <Pie data={chartData} />}
      </div>
    </div>
  );
}