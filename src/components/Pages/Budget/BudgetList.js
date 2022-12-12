import React from 'react';
import './BudgetPage.css';

function BudgetItem({ item }) {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
    const JsonColor = JSON.parse(item.color);
    const hexColor = `#${componentToHex(JsonColor.r)}${componentToHex(JsonColor.g)}${componentToHex(JsonColor.b)}${componentToHex(Math.ceil((JsonColor.a) * 255))}`;
    return (
        <tr>
            <td style={{ display: "flex", flexDirection: "row", alignItems: "center" }}><div style={{ backgroundColor: hexColor, width: "10px", height: "10px", marginRight: "5px" }}></div>{item.category}</td>
            <td>R$ {item.cost}</td>
            <td>R$ {item.value}</td>
            <td>{(item.cost * 100 / item.value).toFixed(2)} %</td>
        </tr>
    )
}

function BudgetList({ budget }) {

    return (
        <div className='budget-list'>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Custo</th>
                        <th>Orça.</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody>
                    {budget.map((element, index) => <BudgetItem key={index} item={element} />)}
                </tbody>
            </table>
        </div>
    )
}

export default BudgetList;