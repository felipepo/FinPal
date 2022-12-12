import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../contexts/LoginContext';
import { FilterMonth, FilterYear, FilterCategory } from '../../General/Filters';
import formatDate from '../../../utils/formatDate';
import PopupWindow from '../../General/PopupWindow';
import './OverviewHistory.css';
import { getMonth_Transactions } from '../../../utils/filters';

function TransactionInfoWindow({ transaction }) {
    return (
        <div className='transaction-info-window'>
            <div className='transaction-info-wndw-pair'>
                <div className='transaction-info-wndw-key'>Valor</div>
                <div className='transaction-info-wndw-value'>R$ {transaction.value}</div>
            </div>
            <div className='transaction-info-wndw-pair'>
                <div className='transaction-info-wndw-key'>Data</div>
                <div className='transaction-info-wndw-value'>{formatDate(new Date(transaction.date))}</div>
            </div>
            <div className='transaction-info-wndw-pair'>
                <div className='transaction-info-wndw-key'>Categoria</div>
                <div className='transaction-info-wndw-value'>{transaction.category}</div>
            </div>
            <div className='transaction-info-wndw-pair'>
                <div className='transaction-info-wndw-key'>Comentário</div>
                <div className='transaction-info-wndw-value'>{transaction.comment}</div>
            </div>
            <div className='transaction-info-wndw-btns'>
                <div className='transaction-info-wndw-rem-btn'>Rem</div>
                <div className='transaction-info-wndw-edit-btn'>Edit</div>
            </div>
        </div>
    )
}

function HistoryItem({ transaction }) {
    const [showWindow, setShowWindow] = useState(false);

    function showTransInfo(event) {
        event.preventDefault();
        if (!showWindow) setShowWindow(true);
    }

    return (
        <div onClick={(event) => showTransInfo(event)} className='history-item'>
            <PopupWindow showWindow={showWindow} setShowWindow={setShowWindow}>
                <TransactionInfoWindow transaction={transaction} />
            </PopupWindow>
            <div className='hist-item-line'>
                <div>R$ {transaction.value}</div>
                <div>{formatDate(new Date(transaction.date))}</div>
            </div>
            <div className='hist-item-line'>
                <div>{transaction.category}</div>
                <div className='hist-item-line-comment'>{transaction.comment}</div>
            </div>
        </div>
    );

}

function OverviewHistory() {
    const [histItems, setHistItems] = useState([]);
    const [filters, setFilters] = useState({ year: 0, month: 0, category: "Todas" });
    const { userAuth, userData, setUserData } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        const updUserData = { budgets: userData.budgets, categories: userData.categories, transactions: userData.transactions, filteredTransactions: getMonth_Transactions(filters.month, filters.year, userData.transactions) };
        setUserData(updUserData);
        setHistItems(updUserData.filteredTransactions.filter((element) => filters.category === "Todas" || element.category === filters.category));
    },
        // eslint-disable-next-line
        [filters]);

    useEffect(() => {
        if (userAuth.id === '') {
            return navigate("/");
        }
        userData.filteredTransactions.sort(function (a, b) {
            var keyA = new Date(a.date),
                keyB = new Date(b.date);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        setHistItems(userData.filteredTransactions);
        const today = new Date();
        const filters = { month: today.getMonth() + 1, year: today.getFullYear(), category: "Todas" };
        setFilters(filters);
    }
        // eslint-disable-next-line
        , []);

    return (
        <div className='history-page'>
            <h1>Histórico</h1>
            <div className='overview-hist-filter'>
                <FilterCategory filters={filters} setFilters={setFilters} />
                <FilterMonth filters={filters} setFilters={setFilters} />
                <FilterYear filters={filters} setFilters={setFilters} />
            </div>
            <div className='hist-item-container'>
                {histItems.map((transac, index) => <HistoryItem key={index} transaction={transac} />)}
            </div>
        </div>
    );
}

export default OverviewHistory;
