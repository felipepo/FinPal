import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { getAllData, loginUser, postCategory, registerUser } from '../../../utils/apiGateway';
import './LoginPage.css';
import LoadingWindow from '../../General/LoadingWindow';
import { LoginContext } from '../../../contexts/LoginContext';
import { randomNumberInRange } from '../../../utils/addTransaction';
import { getMonth_Transactions } from '../../../utils/filters';

function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [requestResult, setRequestResult] = useState('');
    const [inlogin, setInlogin] = useState(true);
    const { setUserAuth, setUserData } = useContext(LoginContext);

    const navigate = useNavigate();

    const loginCallback = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const { apiData, jsonResponse } = await loginUser(email, password);
        setRequestResult(jsonResponse.msg);

        if (apiData.status === 200) {
            const updatedUserData = await getAllData(jsonResponse.id, jsonResponse.token);
            const today = new Date();
            updatedUserData.filteredTransactions = getMonth_Transactions((today.getMonth() + 1), today.getFullYear(), updatedUserData.transactions);
            setUserData(updatedUserData);
            setUserAuth({ id: jsonResponse.id, token: jsonResponse.token })
            setIsLoading(false);
            return navigate("/home");
        }
        setIsLoading(false);
    }

    const registerCallback = async (event) => {
        event.preventDefault();

        const { apiData, jsonResponse } = await registerUser(username, email, password, confirmpassword);

        if (apiData.status === 201) {
            postCategory(jsonResponse.token, { name: "Aluguel", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Luz", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Telefone", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Agua", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Gas", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Internet", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Feira", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Transporte", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Saude", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Academia", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Acao", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Bares", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Cashback", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Comida", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Compras", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Educacao", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "FII", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Hospedagem", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Ifood", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Lanche", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Lazer", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Presente", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Remedio", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Servico", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Suplemento", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Viagem", color: JSON.stringify({ r: randomNumberInRange(0, 255), g: randomNumberInRange(0, 255), b: randomNumberInRange(0, 255), a: (randomNumberInRange(30, 100) / 100) }), userID: jsonResponse.userID });
        }
        setRequestResult(jsonResponse.msg);
    }

    return (
        inlogin
            ? <div className='loginpage'>
                <LoadingWindow isLoading={isLoading} positionLeft='23%' positionTop='30%' loadingText='Logging in...' />
                <form onSubmit={(event) => loginCallback(event)} >
                    <input className='login-editbox' value={email} onChange={(event) => setEmail(event.target.value)} placeholder='email' type='text' />
                    <input className='login-editbox' value={password} onChange={(event) => setPassword(event.target.value)} placeholder='password' type='text' />
                    <button>Login</button>
                </form>
                <h5>{requestResult}</h5>
                <h4 onClick={() => setInlogin(false)}>Register</h4>
            </div>
            : <div className='loginpage'>
                <form onSubmit={(event) => registerCallback(event)} >
                    <input className='login-editbox' value={username} onChange={(event) => setUsername(event.target.value)} placeholder='username' type='text' />
                    <input className='login-editbox' value={email} onChange={(event) => setEmail(event.target.value)} placeholder='email' type='text' />
                    <input className='login-editbox' value={password} onChange={(event) => setPassword(event.target.value)} placeholder='password' type='text' />
                    <input className='login-editbox' value={confirmpassword} onChange={(event) => setConfirmpassword(event.target.value)} placeholder='confirm password' type='text' />
                    <button>Register</button>
                </form>
                <h5>{requestResult}</h5>
                <h4 onClick={() => setInlogin(true)}>Go back to login</h4>
            </div>
    );
}

export default LoginPage;
