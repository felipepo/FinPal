import React, { useState } from 'react';
import './SideMenu.css';
import { NavLink } from 'react-router-dom';

function SideMenu() {
    const [showMenu, setShowMenu] = useState(false);
    const onClick = (event) => {
        event.preventDefault();
        setShowMenu(true);
    }
    function closePopup(event) {
        const targetClass = event.target.className;
        if (targetClass === 'sidemenu-background') setShowMenu(false);
    }
    return (
        <>
            <button className='show-sidemenu-button' onClick={(event) => onClick(event)}>
                <svg height="20" width="20">
                    <line x1="0" y1="18" x2="20" y2="18" />
                    <line x1="0" y1="12" x2="20" y2="12" />
                    <line x1="0" y1="6" x2="20" y2="6" />
                </svg>
            </button>
            <div style={{ 'visibility': showMenu ? 'visible' : 'hidden' }} className='sidemenu-background' onClick={closePopup}>
                <div className='sidemenu'>
                    <NavLink to='category' onClick={() => setShowMenu(false)}>Categorias</NavLink>
                    <NavLink to='export_import' onClick={() => setShowMenu(false)}>Exportar/Importar</NavLink>
                    <div>Configurações</div>
                    <div>Ajuda</div>
                    <div>Modo Escuro</div>
                </div>
            </div>
        </>
    );
}

export default SideMenu;
