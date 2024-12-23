import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
const PricePieChart = ({ priceData }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    useEffect(() => {
        if (chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
            chartInstanceRef.current = new Chart(chartRef.current, {
                type: 'pie',
                data: {
                    labels: priceData.map((item) => item.symbol),
                    datasets: [
                        {
                            label: 'Prices',
                            data: priceData.map((item) => item.value),
                            backgroundColor: priceData.map((item) => item.isDefault ? 'rgba(54, 162, 235, 0.6)' : 'rgba(255, 99, 132, 0.6)'),
                            borderColor: '#fff',
                            borderWidth: 2,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => `${context.label}: ${context.raw}`,
                            },
                        },
                    },
                },
            });
        }
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [priceData]);
    return _jsx("canvas", { ref: chartRef });
};
export default PricePieChart;
