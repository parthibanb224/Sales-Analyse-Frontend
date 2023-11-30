// App.js
import React from 'react';
import './App.css';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import StatisticsCard from './components/StatiticsCard';
import Table from './components/Tables';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold underline text-center mt-2">
        TRANSACTION DASHBOARD
      </h1>
      <Table />
      <StatisticsCard />
      <div className="flex flex-wrap justify-between items-center mb-20 mt-24">
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-8 md:mb-0">
          <BarChart />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
          <PieChart />
        </div>
      </div>
    </div>
  );
}

export default App;
