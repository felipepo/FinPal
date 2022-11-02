import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../contexts/LoginContext';
import formatDate from '../../../utils/formatDate';
import PopupWindow from '../../General/PopupWindow';
import './OverviewHistory.css';

function TransactionInfoWindow() {
    return (
        <div className='transaction-info-window'>
            <h1>TransactionHERE</h1>
        </div>
    )
}

function HistoryItem({ type, value, comment, date, category, isInvestment, transID }) {
    const [showWindow, setShowWindow] = useState(false);

    function showTransInfo(event) {
        event.preventDefault();
        if(!showWindow) setShowWindow(true);
    }

    return (
        <div onClick={(event) => showTransInfo(event)} className='history-item'>
            <PopupWindow showWindow={showWindow} setShowWindow={setShowWindow}>
                <TransactionInfoWindow />
            </PopupWindow>
            <div className='hist-item-line'>
                <div>R$ {value}</div>
                <div>{formatDate(new Date(date))}</div>
            </div>
            <div className='hist-item-line'>
                <div>{category}</div>
                <div>{comment}</div>
            </div>
        </div>
    );

}

function OverviewHistory() {

    const { userAuth, userData } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userAuth.id === '') {
            return navigate("/");
        }
    }, []);

    return (
        <div className='history-page'>
            <h1>Histórico</h1>
            <div>Filtros</div>
            <div className='hist-item-container'>
                {userData.transactions.map((transac, index) => <HistoryItem key={index} {...transac} />)}
            </div>
        </div>
    );
}

export default OverviewHistory;
