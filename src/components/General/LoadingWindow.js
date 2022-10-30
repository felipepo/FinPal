import React from 'react'
import './LoadingWindow.css'

export const LoadingWindow = ({ isLoading, loadingText, positionLeft, positionTop }) => {
    return (
        <div style={{ 'visibility': isLoading ? 'visible' : 'hidden', 'left': positionLeft, 'top': positionTop }} className='loading-window'>
            <div className='load-animation'></div>
            <p className='loading-text'>{loadingText}</p>
        </div>
    )
}

export default LoadingWindow;