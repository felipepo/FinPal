import React from 'react';
import './SVGButton.css';

export const Approve = ({ setShowWindow, addTransaction }) => {
    const onApprove = () => {
        setShowWindow(false);
        addTransaction();
    }
    return (
        <button className='approve-button' onClick={() => onApprove()}>
            <svg height="30" width="30">
                <line x1="3" y1="20" x2="12" y2="28" />
                <line x1="12" y1="28" x2="27" y2="8" />
            </svg>
        </button>
    );
}

export const Cancel = ({ setShowWindow }) => {
    return (
        <button className='approve-button' onClick={() => setShowWindow(false)}>
            <svg height="30" width="30">
                <line x1="0" y1="30" x2="30" y2="0" />
                <line x1="0" y1="0" x2="30" y2="30" />
            </svg>
        </button>
    );
}

function NewButton({ setShowWindow }) {
    return (
        <button className='button-add-transaction' onClick={() => setShowWindow(true)}>
            <svg height="56" width="56">
                <line x1="14" y1="28" x2="42" y2="28" />
                <line x1="28" y1="14" x2="28" y2="42" />
            </svg>
        </button>
    );
}

export default NewButton;
