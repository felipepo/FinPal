import React, { useEffect, useState } from 'react';
import './Pagination.css';

function Pagination({ nPages, selected, setSelected }) {
    const changePage = (event) => {
        event.preventDefault();

        let selectedElement = event.target.parentNode.getElementsByClassName('selected-page')[0];
        selectedElement.className = 'not-selected-page';
        event.target.className = 'selected-page';
        setSelected(parseInt(event.target.dataset.page))
    }
    return (
        <div className='pagination'>
            {[...Array(nPages).keys()].map((value, index) => <div key={value} onClick={(event) => changePage(event)} data-page={value} className={index === selected ? 'selected-page' : 'not-selected-page'}></div>)}
        </div>
    );
}

export default Pagination;
