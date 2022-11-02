import React, { useContext, useEffect, useState } from 'react';
import './CalculatorPage.css';
import Pagination from '../../General/Pagination';
import { LoginContext } from '../../../contexts/LoginContext';
import { Outlet, useNavigate } from 'react-router-dom';

function CalculatorPage() {
    const { userAuth, userData } = useContext(LoginContext);
    const navigate = useNavigate();
    const pages = [
        "/calculator/general",
        "/calculator/interests",
    ]

    useEffect(() => {
        if (userAuth.id === '') {
            return navigate("/");
        }
    }, []);

    return (
        <div className='calculator-page'>
            <h1>Calculadoras</h1>
            <Outlet />
            <Pagination pages={pages} />
        </div>
    );
}

export default CalculatorPage;
