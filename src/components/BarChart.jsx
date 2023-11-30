import React, { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChart = () => {
    const { filteredData, selectedMonth } = useData();
    const [chartData, setChartData] = useState(null);

    const priceRanges = [
        { min: 0, max: 100 },
        { min: 101, max: 200 },
        { min: 201, max: 300 },
        { min: 301, max: 400 },
        { min: 401, max: 500 },
        { min: 501, max: 600 },
        { min: 601, max: 700 },
        { min: 701, max: 800 },
        { min: 801, max: 900 },
        { min: 901, max: Number.MAX_SAFE_INTEGER }, // Set a very high value for "above 900"
    ];

    useEffect(() => {
        // Function to calculate the number of items in each price range
        const calculatePriceRangeData = () => {

            const itemCounts = Array(priceRanges.length).fill(0);

            filteredData.forEach((item) => {
                const itemPrice = item.price;
                for (let i = 0; i < priceRanges.length; i++) {
                    const { min, max } = priceRanges[i];
                    if (itemPrice >= min && itemPrice <= max) {
                        itemCounts[i]++;
                        break;
                    }
                }
            });

            return itemCounts;
        };

        // Generate the chart data
        const generateChartData = () => {
            const itemCounts = calculatePriceRangeData();
            const labels = priceRanges.map(({ min, max }) => {if(max>901){return `${min} - above`} else{return `${min} - ${max}`}});
            const backgroundColors = labels.map(() => getRandomColor());

            return {
                labels: labels,
                datasets: [
                    {
                        label: `Number of Items in Each Price Range for ${selectedMonth}`,
                        data: itemCounts,
                        backgroundColor: backgroundColors,
                    },
                ],
            };
        };

        // Set the chart data
        setChartData(generateChartData());
    }, [filteredData, selectedMonth]);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className=" ps-8">
            <h2 className="text-lg font-semibold mb-8 text-center">Items Count in Price Ranges</h2>
            {chartData && <Bar data={chartData} options={{ scales: { x: { type: 'category' } } }} />}
        </div>
    );
};

export default BarChart;
