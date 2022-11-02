import React, { useState } from "react";

function CalculatorInterest() {
    const [monthly, setMonthly] = useState("");
    const [yearly, setYearly] = useState("");
    return (
        <div className="">
            <h2>Juros Compostos</h2>
            <div className="calculator-vertical-pair">
                <div>
                    <div>Mensal -{">"} Anual</div><input
                        className='calculator-value-editable'
                        type='editbox'
                        placeholder='0.0'
                        value={monthly}
                        onChange={(event) => setMonthly(event.target.value)}
                    /><span>%</span>
                    <div>{(100 * ((1 + monthly / 100) ** 12 - 1)).toFixed(2)} %</div>
                </div>
                <div style={{marginLeft: '50px'}}>
                    <div>Anual -{">"} Mensal</div><input
                        className='calculator-value-editable'
                        type='editbox'
                        placeholder='0.0'
                        value={yearly}
                        onChange={(event) => setYearly(event.target.value)}
                    /><span>%</span>
                    <div>{(100 * ((1 + yearly / 100) ** (1 / 12) - 1)).toFixed(2)} %</div>
                </div>
            </div>
        </div>
    )
}

export default CalculatorInterest;