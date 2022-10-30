import React from 'react'
import './PopupWindow.css'

const PopupWindow = ({ children, showWindow, setShowWindow }) => {
    function closePopup(event) {
        const targetClass = event.target.className;
        if (targetClass === 'popup-background') setShowWindow(false);
    }

    return (
        <div style={{ 'visibility': showWindow ? 'visible' : 'hidden' }} className='popup-background' onClick={closePopup}>
            {children}
        </div >
    )

}

export default PopupWindow;