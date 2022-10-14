import React, { useEffect, useState } from 'react';
import './Home.css';
import NewButton from './SVGButton';
import Chart from 'react-google-charts';
import AddTransactionWindow from './AddTransactionWindow';
import PopupWindow from './PopupWindow';

function HomePage() {
    const [showWindow, setShowWindow] = useState(false);
    const [transactions, setTransactions] = useState([]);

    async function getAPIData() {
        const apiData = await fetch('http://localhost:3001/');
        const jsonResponse = await apiData.json();
        setTransactions(jsonResponse)
    }

    useEffect(() => {
        getAPIData();
    }, []);

    let data = [["Categoria", "Total"]];
    let byCategory = {};
    let byType = { 'income': 0, 'expense': 0 };
    for (let iTransaction of Object.keys(transactions)) {
        const category = transactions[iTransaction]['category'];
        const value = transactions[iTransaction]['value'];
        const type = transactions[iTransaction]['type'];

        if (category in byCategory) {
            byCategory[category] = byCategory[category] + value;
        } else {
            byCategory[category] = value;
        }

        byType[type] = byType[type] + value;
    }

    for (let iCategory of Object.keys(byCategory)) {
        data.push([iCategory, byCategory[iCategory]])
    }

    return (
        <div className="homepage">
            <h1>FinPal</h1>
            <PopupWindow showWindow={showWindow} setShowWindow={setShowWindow}>
                <AddTransactionWindow setShowWindow={setShowWindow} showWindow={showWindow} />
            </PopupWindow>
            <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={data}
                options={{
                    title: "Por categoria",
                    pieHole: 0.3,
                    is3D: false,
                    backgroundColor: 'rgb(231, 189, 175)',
                }}
            />
            <div className='homepage-summary'>
                <div>
                    <div>Receita</div> <div>R$ {byType['income']}</div>
                </div>
                <div>
                    <div>Despesas</div> <div>R$ {byType['expense']}</div>
                </div>
            </div>
            <NewButton setShowWindow={setShowWindow} />
        </div>
    );
}

export default HomePage;
