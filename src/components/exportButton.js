import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import { downloadTransactionsCSV } from '../utils/exportCSV';

const ExportButton = () => {
  const { transactions } = useTransactions();

  return (
    <button
      onClick={() => downloadTransactionsCSV(transactions)}
      className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
    >
      Export as CSV
    </button>
  );
};

export default ExportButton;
