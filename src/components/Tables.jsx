import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { GrCheckmark, GrClose } from "react-icons/gr";

const Table = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const recordsPerPage = 10;
    const { selectedMonth, setSelectedMonth, filteredData } = useData();

    // Handle dropdown change
    const handleDropdownChange = (event) => {
        setSelectedMonth(event.target.value);
        setCurrentPage(1); // Reset page when month changes
    };

    // Handle search input change
    const handleSearchInputChange = (event) => {
        setSearchText(event.target.value);
        setCurrentPage(1); // Reset page when search text changes
    };

    // Calculate the index range for the current page
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    // Filter data based on selected month and search text
    const filteredDataWithSearch = filteredData.filter((record) => {
        const matchTitle = record.title.toLowerCase().includes(searchText.toLowerCase());
        const matchDescription = record.description.toLowerCase().includes(searchText.toLowerCase());
        const matchPrice = record.price.toString().includes(searchText);

        return matchTitle || matchDescription || matchPrice;
    });

    const currentRecords = filteredDataWithSearch.slice(indexOfFirstRecord, indexOfLastRecord);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredDataWithSearch.length / recordsPerPage);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-4 sm:px-20 py-5 bg-white dark:bg-gray-800">
            <div className='flex justify-between pb-5'>
                {/* Search Bar - Top Left */}
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={handleSearchInputChange}
                        className="border rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300"
                    />
                </div>

                {/* Select Month Dropdown - Top Right */}
                <div>
                    <select
                        value={selectedMonth}
                        onChange={handleDropdownChange}
                        className="border rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300"
                    >
                        <option value="">Select Month :</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="max-h-96 overflow-y-auto">
                <table className="w-full text-center text-sm rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700">
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-r">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-r">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-r">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-r">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-r">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-r">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-r">
                                Sold
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-r">
                                Date of Sale
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((record, index) => (
                            <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                <td className="px-6 py-4 border-r">{record.id}</td>
                                <td className="px-6 py-4 border-r">{record.title}</td>
                                <td className="px-6 py-4 border-r">{record.price}</td>
                                <td className="px-6 py-4 border-r">{record.description}</td>
                                <td className="px-6 py-4 border-r">{record.category}</td>
                                <td className="px-6 py-4 border-r">
                                    {record.image && <img src={record.image} alt={record.title} className="max-w-full h-auto" />}
                                </td>
                                <td className="px-6 py-4 border-r text-red-700">
                                    {record.sold ? <GrCheckmark /> : <GrClose />}
                                </td>
                                <td className="px-6 py-4 border-r">{record.dateOfSale}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-5">
                <div>
                    Page {currentPage} of {totalPages}
                </div>
                <div className="flex">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={indexOfLastRecord >= filteredData.length}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Next
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Table;
