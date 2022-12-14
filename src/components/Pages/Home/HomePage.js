import React, { useContext, useEffect, useState } from 'react';
import './HomePage.css';
import Chart from 'react-google-charts';
import AddTransactionWindow from './AddTransactionWindow';
import PopupWindow from '../../General/PopupWindow';
import LoadingWindow from '../../General/LoadingWindow';
import NewButton from '../../General/SVGButton';
import CollapseContent from '../../General/CollapseContent';
import { LoginContext } from '../../../contexts/LoginContext';
import { getAllData } from '../../../utils/apiGateway';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [showWindow, setShowWindow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [byType, setByType] = useState({ 'income': { 'Total': 0 }, 'expense': { 'Total': 0 } });
    const { userAuth, userData, setUserData } = useContext(LoginContext);
    const navigate = useNavigate();

    function parseTransactions(transactions) {
        let data = [["Categoria", "Total"]];
        let byCategory = {};
        let tempByType = { 'income': { 'Total': 0 }, 'expense': { 'Total': 0 } };
        for (let iTransaction of transactions) {
            const category = iTransaction['category'];
            const value = iTransaction['value'];
            const type = iTransaction['type'];

            if (category in byCategory) {
                byCategory[category] = byCategory[category] + value;
                if (category in tempByType[type]) {
                    tempByType[type][category] = tempByType[type][category] + value;
                } else {
                    tempByType[type][category] = value;
                }
            } else {
                byCategory[category] = value;
                tempByType[type][category] = value;
            }

            tempByType[type]['Total'] = tempByType[type]['Total'] + value;
        }

        for (let iCategory of Object.keys(byCategory)) {
            data.push([iCategory, byCategory[iCategory]])
        }

        setChartData(data);
        setByType(tempByType);
    }

    async function refreshPage() {
        setIsLoading(true);

        const updatedUserData = await getAllData(userAuth.id, userAuth.token);
        updatedUserData.filteredTransactions = userData.filteredTransactions;
        const jsonResponse = updatedUserData.transactions;
        parseTransactions(jsonResponse);

        setUserData(updatedUserData);
        setIsLoading(false);
    }

    useEffect(() => {
        if (userAuth.id === '') {
            return navigate("/");
        }
        setIsLoading(true);
        
        parseTransactions(userData.filteredTransactions);

        setIsLoading(false);
    }, 
    // eslint-disable-next-line
    [userData]);

    return (
        <div className="homepage">
            <LoadingWindow isLoading={isLoading} positionLeft='23%' positionTop='30%' loadingText='Loading...' />
            <h1>FinPal</h1>
            <PopupWindow showWindow={showWindow} setShowWindow={setShowWindow}>
                <AddTransactionWindow setShowWindow={setShowWindow} refreshPage={refreshPage} />
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
                <CollapseContent title='Receita' >
                    {Object.keys(byType['income']).map((categ) => <div key={categ} className='key-value-pair'><div>{categ}</div> <div>R$ {byType['income'][categ]}</div></div>)}
                </CollapseContent>
                <CollapseContent title='Despesas' >
                    {Object.keys(byType['expense']).map((categ) => <div key={categ} className='key-value-pair'><div>{categ}</div> <div>R$ {byType['expense'][categ]}</div></div>)}
                </CollapseContent>
            </div>
            <NewButton setShowWindow={setShowWindow} />
        </div>
    );
}

export default HomePage;
