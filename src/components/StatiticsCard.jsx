import React from 'react';
import { useData } from '../context/DataContext';

const StatisticsCard = () => {
    const { filteredData } = useData();

    // Calculate Total Sales, Total Sold Items, and Total Not Sold Items
    const totalSales = filteredData.reduce((total, record) => total + (record.sold ? record.price : 0), 0);
    const totalSoldItems = filteredData.filter((record) => record.sold).length;
    const totalNotSoldItems = filteredData.filter((record) => !record.sold).length;

    return (
        <div className="flex justify-around items-center bg-gray-300 dark:bg-gray-800 p-4 mt-4 shadow-lg rounded-md">
            <div className="text-center">
                <p className="text-3xl font-bold text-green-500">{totalSales}</p>
                <p className="text-gray-500 dark:text-gray-400">Total Sales</p>
            </div>
            <div className="text-center">
                <p className="text-3xl font-bold text-blue-500">{totalSoldItems}</p>
                <p className="text-gray-500 dark:text-gray-400">Total Sold Items</p>
            </div>
            <div className="text-center">
                <p className="text-3xl font-bold text-red-500">{totalNotSoldItems}</p>
                <p className="text-gray-500 dark:text-gray-400">Total Not Sold Items</p>
            </div>
        </div>
    );
};

export default StatisticsCard;
