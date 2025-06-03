export function downloadTransactionsCSV(transactions) {
  if (!transactions || transactions.length === 0) return;

  const incomeTotal = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseMap = {
    needs: [],
    wants: [],
    savings: [],
  };

  const totals = {
    needs: 0,
    wants: 0,
    savings: 0,
  };

  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const cat = t.category.toLowerCase();
      if (cat === 'need') {
        expenseMap.needs.push(t);
        totals.needs += t.amount;
      } else if (cat === 'want') {
        expenseMap.wants.push(t);
        totals.wants += t.amount;
      } else if (cat === 'savings') {
        expenseMap.savings.push(t);
        totals.savings += t.amount;
      }
    });

  const ideal = {
    needs: incomeTotal * 0.5,
    wants: incomeTotal * 0.3,
    savings: incomeTotal * 0.2,
  };

  const formatCurrency = num => `$${num.toFixed(2)}`;

  const rows = [];

  // Section 1: Summary
  rows.push(['Budget Summary']);
  rows.push(['Total Income', formatCurrency(incomeTotal)]);
  rows.push([]);
  rows.push(['Category', 'Spent', 'Ideal Budget', 'Difference']);
  ['needs', 'wants', 'savings'].forEach(key => {
    const spent = totals[key];
    const expected = ideal[key];
    const diff = expected - spent;
    rows.push([
      key.charAt(0).toUpperCase() + key.slice(1),
      formatCurrency(spent),
      formatCurrency(expected),
      formatCurrency(diff),
    ]);
  });

  // Section 2: Per-category detailed expenses
  ['needs', 'wants', 'savings'].forEach(key => {
    rows.push([]);
    rows.push([`${key.charAt(0).toUpperCase() + key.slice(1)} Expenses`]);
    rows.push(['Date', 'Description', 'Amount']);
    expenseMap[key].forEach(tx => {
      rows.push([tx.date || '', tx.description, formatCurrency(tx.amount)]);
    });
    rows.push(['Subtotal', '', formatCurrency(totals[key])]);
  });

  // Section 3: Full transaction log
  rows.push([]);
  rows.push(['All Transactions']);
  rows.push(['Date', 'Description', 'Amount', 'Type', 'Category']);
  transactions.forEach(tx => {
    rows.push([
      tx.date || '',
      tx.description,
      formatCurrency(tx.amount),
      tx.type,
      tx.category,
    ]);
  });

  // Generate and trigger download
  const csvContent = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'budget-detailed-report.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
