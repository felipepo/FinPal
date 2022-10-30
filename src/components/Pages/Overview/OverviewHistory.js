import React from 'react';
import './OverviewHistory.css';

function HistoryItem() {

    return (
        <div className='history-item'>
            <div className='hist-item-line'>
                <div>Value</div>
                <div>Date</div>
            </div>
            <div className='hist-item-line'>
                <div>Category</div>
                <div>Comment</div>
            </div>
        </div>
    );

}

function OverviewHistory() {

    return (
        <div className='history-page'>
            <h1>Histórico</h1>
            <div>Filtros</div>
            <div className='hist-item-container'>
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
            </div>
        </div>
    );
}

export default OverviewHistory;
