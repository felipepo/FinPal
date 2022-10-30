import React, { useState } from 'react'
import './CollapseContent.css'

const DropdownArrow = ({ clickCallback, pointingRight, arrowColor = '#102D59' }) => {
    const direction = pointingRight ? "2,2 8,7 2,12" : "7,8 2,2 12,2";
    return (
        <>
            <svg onClick={clickCallback} height="14px" width="16px" style={{ 'cursor': 'pointer', }}>
                <polygon points={direction} style={{ "fill": arrowColor, "strokeWidth": '2px' }}>
                </polygon >
            </svg>
        </>
    )
}

const CollapseContent = ({ title, children, initialState=true }) => {
    const [collapsed, setCollapsed] = useState(initialState);

    return (
        <label className={`collapse-group collapse-group-light`}>
            <DropdownArrow pointingRight={collapsed} />
            <h3>{title}</h3>
            <input type="checkbox" checked={collapsed} onChange={() => setCollapsed(!collapsed)}></input>
            <div className='list-to-collapse'>
                {children}
            </div>
        </label>
    )

}

export default CollapseContent;