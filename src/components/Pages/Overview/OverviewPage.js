import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../contexts/LoginContext';
import './OverviewPage.css';
import Pagination from '../../General/Pagination';

function OverviewPage() {
    const { userAuth } = useContext(LoginContext);
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
    }
        // eslint-disable-next-line
        , []);

    return (
        <div className='overview'>
            <Outlet />
            <Pagination pages={pages} />
        </div>
    );
}

export default OverviewPage;
