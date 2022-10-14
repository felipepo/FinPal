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

function AddTransactionWindow({ showWindow, setShowWindow, getAPIData }) {
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('income');
    const [category, setCategory] = useState('Outros');
    const [comment, setComment] = useState('');
    const [isInvestment, setIsInvestment] = useState(false);

    const approveCallback = () => {
        const transaction = {
            value: parseInt(value),
            type,
            date,
            category,
            comment,
            isInvestment
        };
        addTransaction(transaction);
        // let tempByType = { ...byType };
        // tempByType[type] = tempByType[type] + transaction['value'];
        // setByType(tempByType);
        getAPIData();
    }

    return (
        <form style={{ visibility: showWindow ? 'visible' : 'hidden' }} className='add-transaction-window'>
            <LabeledEditBox label='Valor' value={value} setValue={setValue} placeholder='R$ 99' />
            <div className='transaction-field'>
                <label >Tipo</label>
                <select value={type} onChange={(event) => setType(event.target.value)}>
                    <option value="income">Receita</option>
                    <option value="expense">Despesa</option>
                </select>
            </div>
            <LabeledEditBox label='Data' value={date} setValue={setDate} placeholder='10/10/10' />
            <div className='transaction-field'>
                <label >Categoria</label>
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                    <option value="Luz">Luz</option>
                    <option value="Outros">Outros</option>
                    <option value="Aluguel">Aluguel</option>
                    <option value="Telefone">Telefone</option>
                    <option value="Internet">Internet</option>
                </select>
            </div>
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
