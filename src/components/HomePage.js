import React, { useEffect, useState } from 'react';
import './Home.css';
import NewButton from './SVGButton';
import Chart from 'react-google-charts';
import AddTransactionWindow from './AddTransactionWindow';
import PopupWindow from './PopupWindow';

function HomePage() {
    const [showWindow, setShowWindow] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [byType, setByType] = useState({ 'income': 0, 'expense': 0 });

    async function getAPIData() {
        const apiData = await fetch('https://finpal-backend.herokuapp.com/transactions');
        const jsonResponse = await apiData.json();

        let data = [["Categoria", "Total"]];
        let byCategory = {};
        let tempByType = { 'income': 0, 'expense': 0 };
        for (let iTransaction of Object.keys(jsonResponse)) {
            const category = jsonResponse[iTransaction]['category'];
            const value = jsonResponse[iTransaction]['value'];
            const type = jsonResponse[iTransaction]['type'];

            if (category in byCategory) {
                byCategory[category] = byCategory[category] + value;
            } else {
                byCategory[category] = value;
            }

            tempByType[type] = tempByType[type] + value;
        }

        for (let iCategory of Object.keys(byCategory)) {
            data.push([iCategory, byCategory[iCategory]])
        }

        setChartData(data);
        setByType(tempByType);
    }

    useEffect(() => {
        getAPIData();
    }, []);

    return (
        <div className="homepage">
            <h1>FinPal</h1>
            <PopupWindow showWindow={showWindow} setShowWindow={setShowWindow}>
                <AddTransactionWindow setShowWindow={setShowWindow} showWindow={showWindow} getAPIData={getAPIData} />
            </PopupWindow>
            <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={chartData}
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
