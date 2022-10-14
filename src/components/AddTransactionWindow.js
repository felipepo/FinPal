import React, { useState } from 'react';
import './AddTransactionWindow.css';
import { Approve, Cancel } from './SVGButton';
import { addTransaction, createMockData } from '../utils/addTransaction';

const LabeledEditBox = ({ label, placeholder = '', value, setValue }) => {

    return (
        <div className='transaction-field'>
            <label >{label}</label>
            <input className="search-editbox" type='text' placeholder={placeholder} value={value} onChange={(event) => setValue(event.target.value)}></input>
        </div>
    )
}

function AddTransactionWindow({ showWindow, setShowWindow }) {
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [comment, setComment] = useState('');
    const [isInvestment, setIsInvestment] = useState(false);
    // createMockData();
    const approveCallback = () => {
        const transaction = {
            type: type === 'Receita' ? 'income' : 'expense',
            value: parseInt(value), date, category, comment, isInvestment
        };
        addTransaction(transaction);
    }

    return (
        <form style={{ visibility: showWindow ? 'visible' : 'hidden' }} className='add-transaction-window'>
            <LabeledEditBox label='Valor' value={value} setValue={setValue} placeholder='R$ 99' />
            <LabeledEditBox label='Tipo' value={type} setValue={setType} placeholder='Receita' />
            <LabeledEditBox label='Data' value={date} setValue={setDate} placeholder='10/10/10' />
            <LabeledEditBox label='Categoria' value={category} setValue={setCategory} placeholder='Casa' />
            <LabeledEditBox label='Comentário' value={comment} setValue={setComment} placeholder='Escreva comentário aqui' />
            <label>                   <input type='checkbox' checked={isInvestment} onChange={() => setIsInvestment(!isInvestment)} />
                <span>Investimento</span>
            </label>
            <div>
                <Approve setShowWindow={setShowWindow} addTransaction={approveCallback} />
                <Cancel setShowWindow={setShowWindow} />
            </div>
        </form>
    );
}

export default AddTransactionWindow;
