import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MoodChart = ({ moods }) => {
  const moodValues = moods?.map((mood) => Number(mood.mood));
  const data = {
    labels: moods?.map((mood, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: "Mood",
        data: moodValues,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Mood Chart",
      },
    },
    scales: {
      x: {
        type: "category",
      },
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mood-chart">
      <Line options={options} data={data} />
    </div>
  );
};

export default MoodChart;
