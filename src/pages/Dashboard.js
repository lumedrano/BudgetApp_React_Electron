// import React from 'react';
// import { useTransactions } from '../context/TransactionContext';
// import FiftyThirtyTwenty from './FiftyThirtyTwenty';
// import ExportButton from '../components/exportButton';
// import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react';

// const Dashboard = () => {
//   const { transactions } = useTransactions();

//   const income = transactions
//     .filter(t => t.type === 'income')
//     .reduce((sum, t) => sum + parseFloat(t.amount), 0);

//   const expenses = transactions
//     .filter(t => t.type === 'expense')
//     .reduce((sum, t) => sum + parseFloat(t.amount), 0);

//   const balance = income - expenses;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* HEADER */}
//       <h1 className="text-3xl font-bold mb-6 pt-10">Dashboard</h1>

      

// {/* METRICS CARDS */}
// <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
//   <div className="bg-green-50 p-6 rounded-2xl shadow flex items-center gap-4">
//     <ArrowDownCircle className="text-green-500" size={32} />
//     <div>
//       <p className="text-sm text-gray-500">Income</p>
//       <p className="text-2xl font-bold text-green-600">${income.toFixed(2)}</p>
//     </div>
//   </div>

//   <div className="bg-red-50 p-6 rounded-2xl shadow flex items-center gap-4">
//     <ArrowUpCircle className="text-red-500" size={32} />
//     <div>
//       <p className="text-sm text-gray-500">Expenses</p>
//       <p className="text-2xl font-bold text-red-600">${expenses.toFixed(2)}</p>
//     </div>
//   </div>

//   <div className="bg-blue-50 p-6 rounded-2xl shadow flex items-center gap-4">
//     <DollarSign className="text-blue-500" size={32} />
//     <div>
//       <p className="text-sm text-gray-500">Balance</p>
//       <p className="text-2xl font-bold text-blue-600">${balance.toFixed(2)}</p>
//     </div>
//   </div>
// </div>


//       {/* FIFTY THIRTY TWENTY SECTION */}
//       <div className="bg-white rounded-2xl shadow-md p-6">
//         <FiftyThirtyTwenty />
//       </div>
//       <ExportButton />
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransactions } from '../context/TransactionContext';
import FiftyThirtyTwenty from './FiftyThirtyTwenty';
import ExportButton from '../components/exportButton';
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react';
import { AppleHelloEnglishEffect } from '../components/apple-hello-effect';

const zoomIntroVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 1 } },
  exit: {
    opacity: 0,
    scale: 4,
    transition: { duration: 1 },
  },
};

const Dashboard = () => {
  const { transactions } = useTransactions();

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = income - expenses;

  // State to control showing the intro animation
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Check if intro has already been played
    const introPlayed = localStorage.getItem('dashboardIntroPlayed');

    if (!introPlayed) {
      setShowIntro(true);

      // After 2.5 seconds, hide intro and mark it as played
      const timer = setTimeout(() => {
        setShowIntro(false);
        localStorage.setItem('dashboardIntroPlayed', 'true');
      }, 2500);

      return () => clearTimeout(timer);
    } else {
      // Skip intro animation immediately
      setShowIntro(false);
    }
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4 text-center">
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="dashboard-intro"
            className="absolute inset-0 flex items-center justify-center bg-white z-50"
            variants={zoomIntroVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <AppleHelloEnglishEffect speed={0.8} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dashboard Content */}
      {!showIntro && (
        <div className="p-6 max-w-7xl mx-auto w-full overflow-auto">
          {/* HEADER */}
          <h1 className="text-3xl font-bold mb-6 pt-10">Dashboard</h1>

          {/* METRICS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-green-50 p-6 rounded-2xl shadow flex items-center gap-4">
              <ArrowDownCircle className="text-green-500" size={32} />
              <div>
                <p className="text-sm text-gray-500">Income</p>
                <p className="text-2xl font-bold text-green-600">${income.toFixed(2)}</p>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-2xl shadow flex items-center gap-4">
              <ArrowUpCircle className="text-red-500" size={32} />
              <div>
                <p className="text-sm text-gray-500">Expenses</p>
                <p className="text-2xl font-bold text-red-600">${expenses.toFixed(2)}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl shadow flex items-center gap-4">
              <DollarSign className="text-blue-500" size={32} />
              <div>
                <p className="text-sm text-gray-500">Balance</p>
                <p className="text-2xl font-bold text-blue-600">${balance.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* FIFTY THIRTY TWENTY SECTION */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <FiftyThirtyTwenty />
          </div>
          <ExportButton />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
