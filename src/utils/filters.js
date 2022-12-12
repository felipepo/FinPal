export function filterTransactions(month, year, transactions) {
    const filteredInfo = {
        income: { month: 0, year: 0 },
        expense: { month: 0, year: 0 },
        application: { month: 0, year: 0 },
        inflation: { month: 0, year: 0 },
        cashFlow: { month: 0, year: 0 },
        investmentYield: { month: 0, year: 0 },
        financialIndependency: { month: 0, year: 0 },
    };

    // Target Year
    const filteredYear = transactions.filter((element) => {
        const targetDate = new Date(element.date);
        const sameYear = targetDate.getFullYear() === year;
        return sameYear;
    });

    // Target Month
    const filteredMonth = getMonth_Transactions(month, year, transactions);

    // Last month of previous year
    // const filteredPrevYearLastMonth = getMonth_Transactions(12, (year - 1), transactions);

    const prevMonth = month === 1 ? 12 : month - 1
    const filteredPrevMonth = getMonth_Transactions(prevMonth, year, transactions);

    const prevMonthExpense = filteredPrevMonth.reduce((acc, curr) => curr.type === 'expense' ? acc + curr.value : acc, 0);
    // Income
    filteredInfo.income.month = filteredMonth.reduce((acc, curr) => curr.type === 'income' ? acc + curr.value : acc, 0);
    filteredInfo.income.year = filteredYear.reduce((acc, curr) => curr.type === 'income' ? acc + curr.value : acc, 0);
    // Expense
    filteredInfo.expense.month = filteredMonth.reduce((acc, curr) => curr.type === 'expense' && curr.isInvestment === false ? acc + curr.value : acc, 0);
    filteredInfo.expense.year = filteredYear.reduce((acc, curr) => curr.type === 'expense' && curr.isInvestment === false ? acc + curr.value : acc, 0);
    // Application
    filteredInfo.application.month = filteredMonth.reduce((acc, curr) => curr.isInvestment === true ? curr.type === 'income' ? acc + curr.value : acc - curr.value : acc, 0);
    filteredInfo.application.year = filteredYear.reduce((acc, curr) => curr.isInvestment === true ? curr.type === 'income' ? acc + curr.value : acc - curr.value : acc, 0);
    // Inflation
    filteredInfo.inflation.month = prevMonthExpense === 0 ? 0 : (filteredInfo.expense.month / prevMonthExpense).toFixed(2);
    filteredInfo.inflation.year = filteredYear.reduce((acc, curr) => curr.type === 'expense' ? acc + curr.value : acc, 0);
    // Cash Flow
    filteredInfo.cashFlow.month = filteredMonth.reduce((acc, curr) => curr.isInvestment === true ? curr.type === 'income' ? acc + curr.value : acc - curr.value : acc, 0);
    filteredInfo.cashFlow.year = filteredYear.reduce((acc, curr) => curr.isInvestment === true ? curr.type === 'income' ? acc + curr.value : acc - curr.value : acc, 0);
    // Investment Yield
    filteredInfo.investmentYield.month = filteredMonth.reduce((acc, curr) => curr.isInvestment === true ? curr.type === 'income' ? acc + curr.value : acc - curr.value : acc, 0);
    filteredInfo.investmentYield.year = filteredYear.reduce((acc, curr) => curr.isInvestment === true ? curr.type === 'income' ? acc + curr.value : acc - curr.value : acc, 0);
    // Financial Independency
    filteredInfo.financialIndependency.month = filteredInfo.investmentYield.month > 0 ? (filteredInfo.expense.month / filteredInfo.investmentYield.month).toFixed(2) : 0;

    return filteredInfo;
}

export function getMonth_Transactions(month, year, transactions) {
    const filteredMonth = transactions.filter((element) => {
        const targetDate = new Date(element.date);
        const sameMonth = (targetDate.getMonth() + 1) === (month);
        const sameYear = targetDate.getFullYear() === year;
        return sameMonth && sameYear;
    });

    return filteredMonth;
}