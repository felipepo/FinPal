import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../contexts/LoginContext';
import './OverviewPage.css';
import Pagination from '../../General/Pagination';

function OverviewPage() {
    const { userAuth, userData } = useContext(LoginContext);
    const navigate = useNavigate();
    const pages = [
        "/overview/info",
        "/overview/charts",
        "/overview/history",
    ]

    useEffect(() => {
        if (userAuth.id === '') {
            return navigate("/");
        }
    }, []);

    return (
        <div className='overview'>
            <Outlet />
            <Pagination pages={pages} />
        </div>
    );
}

export default OverviewPage;
