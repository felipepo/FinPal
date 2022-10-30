import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../../contexts/LoginContext';
import './CategoryPage.css';
import PopupWindow from '../../General/PopupWindow';
import NewButton from '../../General/SVGButton';
import { getAllData, patchCategory, postCategory } from '../../../utils/apiGateway';
import { Approve, Cancel } from '../../General/SVGButton';
import Category from '../../../classes/Category';
import { SketchPicker } from 'react-color';
import { useNavigate } from 'react-router-dom';

const LabeledEditBox = ({ label, placeholder = '', value, setValue }) => {

    return (
        <div className='transaction-field'>
            <label >{label}</label>
            <input className="search-editbox" type='text' placeholder={placeholder} value={value} onChange={(event) => setValue(event.target.value)}></input>
        </div>
    )
}

function UpdateCategoryWindow({ initName = '', initColor = { r: 0, g: 0, b: 0, a: 100 }, setShowWindow, refreshPage }) {
    const [name, setName] = useState(initName);
    const [color, setColor] = useState(initColor);
    const { userAuth } = useContext(LoginContext);

    function handleChangeComplete(color) {
        setColor(color.rgb)
    }

    const approveCallback = () => {
        const category = new Category(color, name, userAuth.id);
        patchCategory(initName, userAuth.token, category);
        refreshPage();
    }

    return (
        <form className='add-transaction-window'>
            <LabeledEditBox label='Nome' value={name} setValue={setName} placeholder='Categoria' />
            <SketchPicker onChangeComplete={handleChangeComplete} color={color} presetColors={[]} />
            <div>
                <Approve setShowWindow={setShowWindow} approvalCallback={approveCallback} />
                <Cancel setShowWindow={setShowWindow} />
            </div>
        </form>
    );
}

function AddCategoryWindow({ setShowWindow, refreshPage }) {
    const [name, setName] = useState('');
    const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 100 });
    const { userAuth } = useContext(LoginContext);

    function handleChangeComplete(color) {
        setColor(color.rgb)
    }

    const approveCallback = () => {
        const category = new Category(color, name, userAuth.id);
        postCategory(userAuth.token, category);
        refreshPage();
    }

    return (
        <form className='add-transaction-window'>
            <LabeledEditBox label='Nome' value={name} setValue={setName} placeholder='Categoria' />
            <SketchPicker onChangeComplete={handleChangeComplete} color={color} presetColors={[]} />
            <div>
                <Approve setShowWindow={setShowWindow} approvalCallback={approveCallback} />
                <Cancel setShowWindow={setShowWindow} />
            </div>
        </form>
    );
}

function CategoryItem({ name, color, refreshPage }) {
    const [showUpdWindow, setShowUpdWindow] = useState(false);
    const parsedColor = JSON.parse(color);
    const catColor = `rgba(${parsedColor.r},${parsedColor.g},${parsedColor.b},${parsedColor.a})`;

    const onButtonClick = (event) => {
        event.preventDefault();
        setShowUpdWindow(true);
    }

    return (
        <div onClick={onButtonClick} className='cat-item'>
            <div className='cat-name'>{name}</div>
            <div style={{ backgroundColor: catColor }} className='cat-color'></div>
            <PopupWindow showWindow={showUpdWindow} setShowWindow={setShowUpdWindow}>
                <UpdateCategoryWindow initName={name} initColor={parsedColor} setShowWindow={setShowUpdWindow} refreshPage={refreshPage} />
            </PopupWindow>
        </div>
    )
}

function CategoryPage() {
    const [showWindow, setShowWindow] = useState(false);
    const { userAuth, userData, setUserData } = useContext(LoginContext);
    const navigate = useNavigate();

    async function refreshPage() {
        const updatedUserData = await getAllData(userAuth.id, userAuth.token);
        setUserData(updatedUserData);
    }

    useEffect(() => {
        if (userAuth.id === '') {
            return navigate("/");
        }
    }, []);

    //TODO: Show message when trying to create a category that already exists
    //TODO: Loading window when opening Homepage
    //TODO: Fix Update Category Window!

    return (
        <div className='categories-page'>
            <h1>Categorias</h1>
            <PopupWindow showWindow={showWindow} setShowWindow={setShowWindow}>
                <AddCategoryWindow setShowWindow={setShowWindow} refreshPage={refreshPage} />
            </PopupWindow>
            <div className='cat-item-container'>
                {userData.categories.map((category) => <CategoryItem key={category.name} name={category.name} color={category.color} refreshPage={refreshPage} />)}
            </div>
            <NewButton setShowWindow={setShowWindow} />
        </div>
    );
}

export default CategoryPage;
