import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pagination.css';

function Pagination({ pages }) {
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();

    const changePage = (event) => {
        event.preventDefault();

        let selectedElement = event.target.parentNode.getElementsByClassName('selected-page')[0];
        selectedElement.className = 'not-selected-page';
        event.target.className = 'selected-page';
        setSelected(parseInt(event.target.dataset.page))
    }

    useEffect(() => {
        navigate(pages[selected]);
    }, [selected]);

    return (
        <div className='pagination'>
            {pages.map((value, index) => <div key={value} onClick={(event) => changePage(event)} data-page={index} className={index === selected ? 'selected-page' : 'not-selected-page'}></div>)}
        </div>
    );
}

export default Pagination;
