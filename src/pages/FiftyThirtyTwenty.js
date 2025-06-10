// import React, { useEffect, useState } from 'react';
// import { useTransactions } from '../context/TransactionContext';

// const RadialProgress = ({
//   percentage,
//   size = 120,
//   strokeWidth = 10,
//   color = 'green',
//   overColor = 'red',
// }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;

//   // Clamp max percentage for visualization (e.g. 200%)
//   const clampedPercent = Math.min(percentage, 200);

//   // Base progress (up to 100%)
//   const basePercent = Math.min(clampedPercent, 100);

//   // Over progress (anything above 100%)
//   const overPercent = clampedPercent > 100 ? clampedPercent - 100 : 0;

//   // Calculate strokeDashoffset for base progress:
//   const baseOffset = circumference * (1 - basePercent / 100);

//   // Calculate strokeDashoffset for over progress:
//   let overOffset = baseOffset - (overPercent / 100) * circumference;
//   if (overOffset < -circumference) overOffset = -circumference;

//   const [animatedBaseOffset, setAnimatedBaseOffset] = useState(circumference);
//   const [animatedOverOffset, setAnimatedOverOffset] = useState(circumference);

//   useEffect(() => {
//     setAnimatedBaseOffset(baseOffset);
//     setAnimatedOverOffset(overOffset);
//   }, [baseOffset, overOffset]);

//   return (
//     <svg width={size} height={size}>
//       {/* Background track */}
//       <circle
//         stroke="#e5e7eb"
//         fill="transparent"
//         strokeWidth={strokeWidth}
//         r={radius}
//         cx={size / 2}
//         cy={size / 2}
//       />

//       {/* Base progress */}
//       <circle
//         stroke={color}
//         fill="transparent"
//         strokeWidth={strokeWidth}
//         strokeLinecap="round"
//         strokeDasharray={circumference}
//         strokeDashoffset={animatedBaseOffset}
//         r={radius}
//         cx={size / 2}
//         cy={size / 2}
//         style={{ transition: 'stroke-dashoffset 1s ease-out' }}
//         transform={`rotate(-90 ${size / 2} ${size / 2})`}
//       />

//       {/* Over budget progress (overlap) */}
//       {overPercent > 0 && (
//         <circle
//           stroke={overColor}
//           fill="transparent"
//           strokeWidth={strokeWidth}
//           strokeLinecap="round"
//           strokeDasharray={circumference}
//           strokeDashoffset={animatedOverOffset}
//           r={radius}
//           cx={size / 2}
//           cy={size / 2}
//           style={{ transition: 'stroke-dashoffset 1s ease-out' }}
//           transform={`rotate(-90 ${size / 2} ${size / 2})`}
//         />
//       )}

//       {/* Percentage text */}
//       <text
//         x="50%"
//         y="50%"
//         dominantBaseline="middle"
//         textAnchor="middle"
//         fontSize="1.25rem"
//         fill={percentage <= 100 ? color : overColor}
//         fontWeight="bold"
//       >
//         {Math.min(percentage, 999)}%
//       </text>
//     </svg>
//   );
// };

// const FiftyThirtyTwenty = () => {
//   const { transactions } = useTransactions();

//   const totalIncome = transactions
//     .filter(t => t.type === 'income')
//     .reduce((sum, t) => sum + t.amount, 0);

//   const totals = {
//     needs: 0,
//     wants: 0,
//     savings: 0,
//   };

//   transactions
//     .filter(t => t.type === 'expense')
//     .forEach(t => {
//       const rawCategory = t.category.toLowerCase();
//       let categoryKey = '';

//       if (rawCategory === 'need') categoryKey = 'needs';
//       else if (rawCategory === 'want') categoryKey = 'wants';
//       else if (rawCategory === 'savings') categoryKey = 'savings';

//       if (categoryKey && totals[categoryKey] !== undefined) {
//         totals[categoryKey] += t.amount;
//       }
//     });

//   const ideal = {
//     needs: totalIncome * 0.5,
//     wants: totalIncome * 0.3,
//     savings: totalIncome * 0.2,
//   };

//   const formatCurrency = amount => `$${amount.toFixed(2)}`;

//   // Returns an object with normal and darker colors for over-budget overlay
//   const getProgressColor = (actual, ideal) => {
//   const ratio = actual / ideal;
//   if (ratio < 0.8)
//     return { color: '#1abc71' }; // green
//   if (ratio >= 0.8 && ratio <= 1)
//     return { color: '#f97316' }; // orange
//   if (ratio > 1 && ratio <= 1.1)
//     return { color: '#fef3c7' }; // light yellow
//   return { color: '#ef4444', overColor: '#ec0404' }; // red and darker red
// };



//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 pt-20" style={{ textAlign: 'center' }}>Spending Overview</h1>

//       <div className="grid gap-12 grid-cols-1 sm:grid-cols-3">
//         {['needs', 'wants', 'savings'].map(key => {
//           const actual = totals[key];
//           const expected = ideal[key];
//           const rawPercent = (actual / expected) * 100;
//           const percent = rawPercent.toFixed(1);

//           const { color, overColor } = getProgressColor(actual, expected);

//           return (
//             <div key={key} className="flex flex-col items-center">
//               <h2 className="text-xl capitalize font-semibold mb-4">{key}</h2>
//               <RadialProgress
//                 percentage={percent}
//                 color={color}
//                 overColor={overColor}
//               />
//               <div className="mt-3 text-center text-sm text-gray-700">
//   {formatCurrency(actual)} spent / {formatCurrency(expected)} ideal
//   <br />
//   <span className="font-medium">
//     Leftover:{' '}
//     <span className={actual <= expected ? 'text-green-600' : 'text-red-600'}>
//       {actual <= expected
//         ? formatCurrency(expected - actual)
//         : `-${formatCurrency(actual - expected)}`}
//     </span>
//   </span>
//   <br />
//   ({percent}%)
// </div>

//               {actual > expected && (
//                 <p className="text-sm text-red-600 mt-1">
//                   ⚠️ You are over budget by {formatCurrency(actual - expected)}
//                 </p>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
//         <p className="font-medium">Total Income:</p>
//         <p>{formatCurrency(totalIncome)}</p>
//       </div>
//     </div>
//   );
// };

// export default FiftyThirtyTwenty;



import React, { useEffect, useState } from 'react';
import { useTransactions } from '../context/TransactionContext';

const RadialProgress = ({
  percentage,
  size = 120,
  strokeWidth = 10,
  color = 'green',
  overColor = 'red',
  onMouseEnter,
  onMouseLeave,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const clampedPercent = Math.min(percentage, 200);
  const basePercent = Math.min(clampedPercent, 100);
  const overPercent = clampedPercent > 100 ? clampedPercent - 100 : 0;

  const baseOffset = circumference * (1 - basePercent / 100);
  let overOffset = baseOffset - (overPercent / 100) * circumference;
  if (overOffset < -circumference) overOffset = -circumference;

  const [animatedBaseOffset, setAnimatedBaseOffset] = useState(circumference);
  const [animatedOverOffset, setAnimatedOverOffset] = useState(circumference);

  useEffect(() => {
    setAnimatedBaseOffset(baseOffset);
    setAnimatedOverOffset(overOffset);
  }, [baseOffset, overOffset]);

  return (
    <svg
      width={size}
      height={size}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={animatedBaseOffset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {overPercent > 0 && (
        <circle
          stroke={overColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animatedOverOffset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      )}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="1.25rem"
        fill={percentage <= 100 ? color : overColor}
        fontWeight="bold"
      >
        {Math.min(percentage, 999)}%
      </text>
    </svg>
  );
};

const FiftyThirtyTwenty = () => {
  const { transactions } = useTransactions();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totals = { needs: 0, wants: 0, savings: 0 };

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
    const ratio = actual / ideal;
    if (ratio < 0.8) return { color: '#1abc71' };
    if (ratio >= 0.8 && ratio <= 1) return { color: '#f97316' };
    if (ratio > 1 && ratio <= 1.1) return { color: '#fef3c7' };
    return { color: '#ef4444', overColor: '#ec0404' };
  };

  const hoveredTransactions = hoveredCategory
    ? transactions.filter(
        t =>
          t.type === 'expense' &&
          t.category.toLowerCase() === hoveredCategory.slice(0, -1)
      )
    : [];

  return (
    <div className="relative p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 pt-20 text-center">Spending Overview</h1>

      <div className="grid gap-12 grid-cols-1 sm:grid-cols-3">
        {['needs', 'wants', 'savings'].map(key => {
          const actual = totals[key];
          const expected = ideal[key];
          const rawPercent = (actual / expected) * 100;
          const percent = rawPercent.toFixed(1);
          const { color, overColor } = getProgressColor(actual, expected);

          return (
            <div key={key} className="relative flex flex-col items-center">
              <h2 className="text-xl capitalize font-semibold mb-4">{key}</h2>
              <RadialProgress
                percentage={percent}
                color={color}
                overColor={overColor}
                onMouseEnter={() => setHoveredCategory(key)}
                onMouseLeave={() => setHoveredCategory(null)}
              />
              <div className="mt-3 text-center text-sm text-gray-700">
                {formatCurrency(actual)} spent / {formatCurrency(expected)} ideal
                <br />
                <span className="font-medium">
                  Leftover:{' '}
                  <span
                    className={actual <= expected ? 'text-green-600' : 'text-red-600'}
                  >
                    {actual <= expected
                      ? formatCurrency(expected - actual)
                      : `-${formatCurrency(actual - expected)}`}
                  </span>
                </span>
                <br />({percent}%)
              </div>

              {actual > expected && (
                <p className="text-sm text-red-600 mt-1">
                  ⚠️ You are over budget by {formatCurrency(actual - expected)}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {hoveredCategory && hoveredTransactions.length > 0 && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-4 w-72 bg-white border border-gray-300 shadow-lg rounded p-2 text-sm z-50">
          <h3 className="font-semibold capitalize mb-2">{hoveredCategory} Transactions:</h3>
          <ul className="max-h-40 overflow-y-auto text-gray-700">
            {hoveredTransactions.map((t, index) => (
              <li key={index} className="mb-1">
                <span className="font-medium">{formatCurrency(t.amount)}</span> – {t.description || t.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
        <p className="font-medium">Total Income:</p>
        <p>{formatCurrency(totalIncome)}</p>
      </div>
    </div>
  );
};

export default FiftyThirtyTwenty;
