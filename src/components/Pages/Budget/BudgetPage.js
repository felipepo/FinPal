import React, { useContext, useEffect, useState } from 'react';
import NewButton from '../../General/SVGButton';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../contexts/LoginContext';
import './BudgetPage.css';
import { getMonth_Transactions } from '../../../utils/filters';
import BudgetBar from './BudgetBar';
import BudgetList from './BudgetList';
import PopupWindow from '../../General/PopupWindow';
import AddBudgetWindow from './AddBudgetWindow';
import { getAllData } from '../../../utils/apiGateway';
import LoadingWindow from '../../General/LoadingWindow';
// import Budget from '../../../classes/Budget';

function BudgetPage() {
    const [showWindow, setShowWindow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [budget, setBudget] = useState([]);
    const { userAuth, userData, setUserData } = useContext(LoginContext);
    const navigate = useNavigate();

    async function refreshPage() {
        setIsLoading(true);

        const updatedUserData = await getAllData(userAuth.id, userAuth.token);

        setUserData(updatedUserData);
        setIsLoading(false);
    }

    useEffect(() => {
        if (userAuth.id === '') {
            return navigate("/");
        }
        populateBar();
    }
        // eslint-disable-next-line
        , []);

    useEffect(() => {
        populateBar();
        setTotal(userData.budgets.reduce((acc, curr) => acc + curr.value, 0));
    }
        // eslint-disable-next-line
        , [userData]);

    function populateBar() {
        const today = new Date();
        const currentTransactions = getMonth_Transactions((today.getMonth() + 1), today.getFullYear(), userData.transactions);

        setBudget(userData.budgets.map((element) => {
            element.cost = currentTransactions.reduce((acc, curr) => curr.category === element.category ? acc + curr.value : acc, 0);
            element.color = userData.categories.filter((cat) => cat.name === element.category)[0].color;
            return element;
        }));
    }

    return (
        <div className='budgetpage'>
        <LoadingWindow isLoading={isLoading} positionLeft='23%' positionTop='30%' loadingText='Loading...' />
            <PopupWindow showWindow={showWindow} setShowWindow={setShowWindow}>
                <AddBudgetWindow setShowWindow={setShowWindow} refreshPage={refreshPage} />
            </PopupWindow>
            <h1>Orçamento</h1>
            <div className='budget-see-edit'>
                <div style={{ backgroundColor: '#acacac' }}>Ver</div><div>Editar</div>
            </div>
            <BudgetBar budget={budget} total={total} />
            <BudgetList budget={budget} />
            <div className='budget-total'>Total: R$ {total}</div>
            <NewButton setShowWindow={setShowWindow} />
        </div>
    );
}

export default BudgetPage;
