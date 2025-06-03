import React from 'react';
import { useTransactions } from '../context/TransactionContext';

const FiftyThirtyTwenty = () => {
  const { transactions } = useTransactions();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totals = {
    needs: 0,
    wants: 0,
    savings: 0,
  };

  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
    const rawCategory = t.category.toLowerCase();
    let categoryKey = '';

    if (rawCategory === 'need') categoryKey = 'needs';
    else if (rawCategory === 'want') categoryKey = 'wants';
    else if (rawCategory === 'savings') categoryKey = 'savings';

    if (categoryKey && totals[categoryKey] !== undefined) {
        totals[categoryKey] += t.amount;
    }
    });


  const ideal = {
    needs: totalIncome * 0.5,
    wants: totalIncome * 0.3,
    savings: totalIncome * 0.2,
  };

  const formatCurrency = amount => `$${amount.toFixed(2)}`;

  const getProgressColor = (actual, ideal) => {
    if (actual <= ideal) return 'bg-green-500';
    if (actual <= ideal * 1.1) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 pt-20">50 / 30 / 20 Rule</h1>

      <div className="grid gap-6">
        {['needs', 'wants', 'savings'].map(key => {
          const actual = totals[key];
          const expected = ideal[key];
          const percent = ((actual / expected) * 100).toFixed(1);
          const barWidth = Math.min((actual / expected) * 100, 100);

          return (
            <div key={key}>
              <h2 className="text-xl capitalize font-semibold">{key}</h2>
              <div className="text-sm text-gray-500 mb-1">
                {formatCurrency(actual)} spent / {formatCurrency(expected)} ideal ({percent}%)
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(actual, expected)}`}
                  style={{ width: `${barWidth}%` }}
                ></div>
              </div>
              {actual > expected && (
                <p className="text-sm text-red-600 mt-1">⚠️ You are over budget by {formatCurrency(actual - expected)}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
        <p className="font-medium">Total Income:</p>
        <p>{formatCurrency(totalIncome)}</p>
      </div>
    </div>
  );
};

export default FiftyThirtyTwenty;
