import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { getAllData, loginUser, postCategory, registerUser } from '../../../utils/apiGateway';
import './LoginPage.css';
import LoadingWindow from '../../General/LoadingWindow';
import { LoginContext } from '../../../contexts/LoginContext';

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
            setUserData(updatedUserData);
            setUserAuth({ id: jsonResponse.id, token: jsonResponse.token })
            setIsLoading(false);
            return navigate("/home");
        }
    }

    const registerCallback = async (event) => {
        event.preventDefault();

        const { apiData, jsonResponse } = await registerUser(username, email, password, confirmpassword);

        if (apiData.status === 201) {
            postCategory(jsonResponse.token, { name: "Aluguel", color: "asd", userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Luz", color: "asd", userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Telefone", color: "asd", userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Água", color: "asd", userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Gás", color: "asd", userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Internet", color: "asd", userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Feira", color: "asd", userID: jsonResponse.userID });
            postCategory(jsonResponse.token, { name: "Transporte", color: "asd", userID: jsonResponse.userID });
        }
        setRequestResult(jsonResponse.msg);
    }

    return (
        inlogin
            ? <div className='loginpage'>
                <LoadingWindow isLoading={isLoading} positionLeft='23%' positionTop='30%' loadingText='Loading...' />
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
