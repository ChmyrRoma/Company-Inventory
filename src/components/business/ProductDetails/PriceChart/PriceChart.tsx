import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

import { IPrice } from '../../../../types';

interface IPriceChart {
    priceData: IPrice[];
}

const PricePieChart = ({ priceData }: IPriceChart) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

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
                            backgroundColor: priceData.map((item) =>
                                item.isDefault ? 'rgba(54, 162, 235, 0.6)' : 'rgba(255, 99, 132, 0.6)'
                            ),
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
                                label: (context: any) => `${context.label}: ${context.raw}`,
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

    return <canvas ref={chartRef}></canvas>;
};

export default PricePieChart;
