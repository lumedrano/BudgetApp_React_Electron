import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import FiftyThirtyTwenty from './FiftyThirtyTwenty';
import ExportButton from '../components/exportButton';

const Dashboard = () => {
  const { transactions } = useTransactions();

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = income - expenses;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6 pt-10">Dashboard</h1>

      {/* METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500">Income</p>
          <p className="text-2xl font-bold text-green-600">${income}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500">Expenses</p>
          <p className="text-2xl font-bold text-red-600">${expenses}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500">Balance</p>
          <p className="text-2xl font-bold text-blue-600">${balance}</p>
        </div>
      </div>

      {/* FIFTY THIRTY TWENTY SECTION */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <FiftyThirtyTwenty />
      </div>
      <ExportButton />
    </div>
  );
};

export default Dashboard;
