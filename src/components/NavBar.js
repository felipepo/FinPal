import React, { useState } from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import calculatorIcon from '../assets/calculator.png'
import budgetIcon from '../assets/budget.png'
import investmentIcon from '../assets/investment.png'

function NavBar() {
    const [page, setPage] = useState('home');

    return (
        <div className="navbar">
            <NavLink to='/home' onClick={() => setPage('home')}>
                <div className={page === 'home' ? 'navbar-page-selected' : 'navbar-page'} >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="24" height="24"
                        viewBox="0 0 24 24"
                        style={{ fill: "#000000" }}>
                        <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z">
                        </path>
                    </svg>
                </div>
            </NavLink>
            <NavLink to='/overview' onClick={() => setPage('overview')}>
                <div className={page === 'overview' ? 'navbar-page-selected' : 'navbar-page'} >
                    <svg
                        height="24" width="24"
                        style={{ strokeWidth: "2px", stroke: "black" }}>
                        <line x1="6" y1="24" x2="6" y2="18" />
                        <line x1="12" y1="24" x2="12" y2="6" />
                        <line x1="18" y1="24" x2="18" y2="12" />
                    </svg>
                </div>
            </NavLink>
            <NavLink to='budget' onClick={() => setPage('budget')}>
                <div className={page === 'budget' ? 'navbar-page-selected' : 'navbar-page'} >
                    <img alt='' style={{ width: '35%' }} src={budgetIcon} />
                </div>
            </NavLink >
            <NavLink to='calculator' onClick={() => setPage('calculator')}>
                <div className={page === 'calculator' ? 'navbar-page-selected' : 'navbar-page'} >
                    <img alt='' style={{ width: '35%' }} src={calculatorIcon} />
                </div>
            </NavLink>
            <NavLink to='investment' onClick={() => setPage('investment')}>
                <div className={page === 'investment' ? 'navbar-page-selected' : 'navbar-page'} >
                    <img alt='' style={{ width: '35%' }} src={investmentIcon} />
                </div>
            </NavLink >
        </div >
    );
}

export default NavBar;
