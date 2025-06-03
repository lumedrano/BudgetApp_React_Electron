import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { useNavigate } from 'react-router-dom';

const AddTransaction = () => {
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();

  const [type, setType] = useState('income'); // income or expense
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Need');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD format
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter a name.');
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }

    if (!category) {
      setError('Please select a category.');
      return;
    }

    // Create new transaction object
    const newTransaction = {
      id: Date.now(),
      type,
      name,
      amount: parseFloat(amount),
      category,
      date: new Date(date),
      comment: comment.trim() || '',
    };


    addTransaction(newTransaction);
    navigate('/transactions'); // redirect to transactions tab
  };

  return (
    <div className="p-6 max-w-md mx-auto pt-20">
      <h1 className="text-3xl font-bold mb-6">Add Transaction</h1>

      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 py-2 rounded-lg font-semibold ${
              type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 py-2 rounded-lg font-semibold ${
              type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Expense
          </button>
        </div>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />

        <textarea
          placeholder="Add a comment (optional)"
          className="w-full p-2 border rounded"
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows={3}
        />


        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="Need">Need</option>
          <option value="Want">Want</option>
          <option value="Savings">Savings</option>
        </select>

        <input
          type="date"
          className="w-full p-2 border rounded"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />

        <button
          type="submit"
          className={`w-full py-2 rounded-lg font-semibold ${
            type === 'income' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          Add {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
