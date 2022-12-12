import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../../contexts/LoginContext';
import { FilterMonth, FilterYear } from '../../General/Filters';
import { filterTransactions } from '../../../utils/filters';
import './OverviewInfo.css';
import { getMonth_Transactions } from '../../../utils/filters';

function OverviewInfoItem({ title, month = 0, year = 0, format = "currency" }) {
    return (
        <div className='info-item-container'>
            <h2>{title}</h2>
            <div className='overview-info-item'>
                <div className='overview-info-pair'>
                    <div className='overview-info-key'>Mensal: {format === "currency" ? " R$ " : " "}</div>
                    <div className='overview-info-value'>{month}{format === "percent" && "%"}</div>
                </div>
                {year !== "NA" &&
                    <div className='overview-info-pair'>
                        <div className='overview-info-key'>Anual: {format === "currency" && " R$ "}</div>
                        <div className='overview-info-value'>{year}{format === "percent" && "%"}</div>
                    </div>}
            </div>
        </div>
    )
}

function OverviewInfo() {
    const [filters, setFilters] = useState({ year: 0, month: 0 });
    const [information, setInformation] = useState({
        income: { month: 0, year: 0 },
        expense: { month: 0, year: 0 },
        application: { month: 0, year: 0 },
        inflation: { month: 0, year: 0 },
        cashFlow: { month: 0, year: 0 },
        investmentYield: { month: 0, year: 0 },
        financialIndependency: { month: 0, year: 0 },
    });
    const { userData, setUserData } = useContext(LoginContext);

    useEffect(() => {
        const filteredTransactions = filterTransactions(filters.month, filters.year, userData.transactions);
        setInformation(filteredTransactions);
        setUserData({ budgets: userData.budgets, categories: userData.categories, transactions: userData.transactions, filteredTransactions: getMonth_Transactions(filters.month, filters.year, userData.transactions) });
    },
        // eslint-disable-next-line
        [filters]);

    useEffect(() => {
        const today = new Date();
        const filters = { month: today.getMonth() + 1, year: today.getFullYear() };
        setFilters(filters);
    }, []);

    return (
        <div className='overview-info-page'>
            <h1>Informações</h1>
            <div className='overview-info-filter'>
                <FilterMonth filters={filters} setFilters={setFilters} />
                <FilterYear filters={filters} setFilters={setFilters} />
            </div>
            <div className='overview-info-container'>
                <OverviewInfoItem title='Renda' month={information.income.month} year={information.income.year} />
                <OverviewInfoItem title='Despesas' month={information.expense.month} year={information.expense.year} />
                <OverviewInfoItem title='Aplicações' month={information.application.month} year={information.application.year} />
                <OverviewInfoItem title='Inflação' month={information.inflation.month} year={information.inflation.year} format='percent' />
                <OverviewInfoItem title='Fluxo de Caixa' month={information.cashFlow.month} year={information.cashFlow.year} />
                <OverviewInfoItem title='Renda dos Investimentos' month={information.investmentYield.month} year={information.investmentYield.year} />
                <OverviewInfoItem title='Grau de Independência' month={information.financialIndependency.month} year="NA" format='percent' />
            </div>
        </div>
    );
}

export default OverviewInfo;
