import React, { useEffect, useState } from 'react';
import './OverviewInfo.css';

function OverviewInfoItem() {
    return (
        <div className='info-item-container'>
            <h2>Info Title</h2>
            <div className='overview-info-item'>
                <div className='overview-info-pair'>
                    <div className='overview-info-key'>Key</div>
                    <div className='overview-info-value'>Value</div>
                </div>
                <div className='overview-info-pair'>
                    <div className='overview-info-key'>Key</div>
                    <div className='overview-info-value'>Value</div>
                </div>
            </div>
        </div>
    )
}

function OverviewInfo() {

    return (
        <div className='overview-info-page'>
            <h1>Informações</h1>
            <div className='overview-info-container'>
                <OverviewInfoItem />
                <OverviewInfoItem />
                <OverviewInfoItem />
                <OverviewInfoItem />
                <OverviewInfoItem />
                <OverviewInfoItem />
                <OverviewInfoItem />
            </div>
        </div>
    );
}

export default OverviewInfo;
