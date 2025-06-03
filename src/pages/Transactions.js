import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';

const Transactions = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const [filter, setFilter] = useState('all');

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>

      {/* Filter Tabs */}
      <div className="flex space-x-4 mb-6">
        {['all', 'income', 'expense'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize ${
              filter === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions yet.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTransactions.map(tx => (
            <li
              key={tx.id}
              className="p-4 rounded-lg shadow flex justify-between items-center bg-white"
            >
              <div>
                <h3 className="font-semibold text-lg">{tx.name}</h3>
                <p className="text-sm text-gray-500">{tx.category} · {format(new Date(tx.date), 'MMM dd, yyyy')}</p>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`font-bold text-lg ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                </span>
                <button onClick={() => deleteTransaction(tx.id)} title="Delete">
                  <FaTrash className="text-red-500 hover:text-red-700" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;
