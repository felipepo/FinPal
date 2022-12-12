import React from 'react';
import './BudgetPage.css';

function BudgetBarItem({ width, color }) {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
    const JsonColor = JSON.parse(color);
    const hexColor = `#${componentToHex(JsonColor.r)}${componentToHex(JsonColor.g)}${componentToHex(JsonColor.b)}${componentToHex(Math.ceil((JsonColor.a)*255))}`;

    return (
        <div style={{ backgroundColor: hexColor, height: "35px", width: width }} ></div>
    )
}

function BudgetBar({ budget, total }) {
    const BAR_WIDTH = 337.5;

    return (
        <div className='budget-bar-container'>
            <div>Orçamento</div>
            <div className='budget-bar'>
                {budget.map((element, index) => <BudgetBarItem key={index} width={(element.value / total) * BAR_WIDTH} color={element.color} />)}
            </div>
        </div>
    )
}

export default BudgetBar;