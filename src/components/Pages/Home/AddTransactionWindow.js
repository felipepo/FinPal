import React, { useState, useContext } from 'react';
import { LoginContext } from '../../../contexts/LoginContext';
import { postTransaction } from '../../../utils/apiGateway';
import './AddTransactionWindow.css';
import { Approve, Cancel } from '../../General/SVGButton';
import Transaction from '../../../classes/Transaction';

const LabeledEditBox = ({ label, placeholder = '', value, setValue }) => {

    return (
        <div className='transaction-field'>
            <label >{label}</label>
            <input className="search-editbox" type='text' placeholder={placeholder} value={value} onChange={(event) => setValue(event.target.value)}></input>
        </div>
    )
}

function AddTransactionWindow({ setShowWindow, refreshPage }) {
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('income');
    const [category, setCategory] = useState('Outros');
    const [comment, setComment] = useState('');
    const [isInvestment, setIsInvestment] = useState(false);
    const { userAuth } = useContext(LoginContext);

    const approveCallback = () => {
        const transaction = new Transaction(
            type,
            value,
            date,
            category,
            comment,
            isInvestment,
            userAuth.id
        );
        postTransaction(userAuth.token, transaction);
        refreshPage();
    }

    return (
        <form className='add-transaction-window'>
            <LabeledEditBox label='Valor' value={value} setValue={setValue} placeholder='R$ 99' />
            <div className='transaction-field'>
                <label >Tipo</label>
                <select value={type} onChange={(event) => setType(event.target.value)}>
                    <option value="income">Receita</option>
                    <option value="expense">Despesa</option>
                </select>
            </div>
            <LabeledEditBox label='Data' value={date} setValue={setDate} placeholder='10/10/2010' />
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
                <Approve setShowWindow={setShowWindow} approvalCallback={approveCallback} />
                <Cancel setShowWindow={setShowWindow} />
            </div>
        </form>
    );
}

export default AddTransactionWindow;
