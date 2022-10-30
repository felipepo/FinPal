import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './OverviewPage.css';
import Pagination from './Pagination';

function OverviewPage() {
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();
    const switchPage = () => {
        switch (selected) {
            case 0:
                navigate("/overview/info");
                break;
            case 1:
                navigate("/overview/charts");
                break;
            case 2:
                navigate("/overview/history");
                break;

            default:
                break;
        }
    }

    useEffect(()=> switchPage(), [selected]);

    return (
        <div className='overview'>
            <Outlet />
            <Pagination nPages={3} selected={selected} setSelected={setSelected} />
        </div>
    );
}

export default OverviewPage;
