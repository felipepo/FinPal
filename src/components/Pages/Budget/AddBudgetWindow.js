import React, { useState, useContext } from 'react';
import { LoginContext } from '../../../contexts/LoginContext';
import { postBudget } from '../../../utils/apiGateway';
import './BudgetPage.css';
import { Approve, Cancel } from '../../General/SVGButton';
import BudgetItem from '../../../classes/BudgetItem';

const LabeledEditBox = ({ label, placeholder = '', value, setValue }) => {

    return (
        <div className='transaction-field'>
            <label >{label}</label>
            <input className="search-editbox" type='text' placeholder={placeholder} value={value} onChange={(event) => setValue(event.target.value)}></input>
        </div>
    )
}

function AddBudgetWindow({ setShowWindow, refreshPage }) {
    const [value, setValue] = useState('');
    const [category, setCategory] = useState('Luz');
    const { userAuth, userData } = useContext(LoginContext);

    const approveCallback = () => {
        const budgetItem = new BudgetItem(
            value,
            category,
            userAuth.id
        );
        postBudget(userAuth.token, budgetItem);
        refreshPage();
    }

    return (
        <form className='add-transaction-window'>
            <LabeledEditBox label='Valor' value={value} setValue={setValue} placeholder='R$ 99' />
            <div className='transaction-field'>
                <label >Categoria</label>
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                    {userData.categories.map((cat) => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                </select>
            </div>
            <div>
                <Approve setShowWindow={setShowWindow} approvalCallback={approveCallback} />
                <Cancel setShowWindow={setShowWindow} />
            </div>
        </form>
    );
}

export default AddBudgetWindow;
