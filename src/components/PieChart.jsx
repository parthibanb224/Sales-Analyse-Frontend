import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Doughnut } from 'react-chartjs-2';

const PieChart = () => {
    const { selectedMonth, filteredData } = useData();
    const [categoryData, setCategoryData] = useState({});

    useEffect(() => {
        if (!selectedMonth || !filteredData) {
            return;
        }

        // Count the number of items for each category
        const categoryCounts = {};
        filteredData.forEach((record) => {
            const category = record.category;
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });

        // Prepare data for Chart.js
        const labels = Object.keys(categoryCounts);
        const data = Object.values(categoryCounts);

        const newCategoryData = {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4CAF50',
                        '#FF9800',
                        '#9C27B0',
                        '#3F51B5',
                        '#795548',
                        '#607D8B',
                        '#2196F3',
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4CAF50',
                        '#FF9800',
                        '#9C27B0',
                        '#3F51B5',
                        '#795548',
                        '#607D8B',
                        '#2196F3',
                    ],
                },
            ],
        };
        setCategoryData(newCategoryData);

    }, [selectedMonth, filteredData]);

    if (!categoryData || !categoryData.datasets) {
        return null;
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-8 text-center">Category Distribution</h2>
            <div style={{ height: '300px', width: '300px', margin: '0 auto' }}>
                <Doughnut data={categoryData} />
            </div>
        </div>
    );
};

export default PieChart;
