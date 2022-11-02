import React, { useState } from 'react';
import Calculator from '../../../classes/Calculator';

function CalculatorGeneral() {
    const [gross, setGross] = useState("");
    const [deduction, setDeduction] = useState("");
    const [fgts, setFgts] = useState("");
    const [vacDays, setVacDays] = useState("");

    return (
        <div className='calculator-general'>
            <div className='calculator-pair'>
                <div className='calculator-key'>Salário Bruto: R$</div>
                <input
                    className='calculator-value-editable'
                    type='editbox'
                    placeholder='999.99'
                    value={gross}
                    onChange={(event) => setGross(event.target.value)}
                />
            </div>
            <div className='calculator-pair'>
                <div className='calculator-key'>INSS <span className='help-explanation'>?</span>: R$</div>
                <div className='calculator-value'>{Calculator.inss(gross)}</div>
            </div>
            <div className='calculator-pair'>
                <div className='calculator-key'>IRRF <span className='help-explanation'>?</span>: R$</div>
                <div className='calculator-value'>{Calculator.irrf(gross - Calculator.inss(gross))}</div>
            </div>
            <div className='calculator-pair'>
                <div className='calculator-key'>Outros Descontos: R$</div>
                <input
                    className='calculator-value-editable'
                    type='editbox'
                    placeholder='0.0'
                    value={deduction}
                    onChange={(event) => setDeduction(event.target.value)}
                />
            </div>
            <div className='calculator-pair'>
                <div className='calculator-key'>Salário Líquido: R$</div>
                <div className='calculator-value'>{Calculator.net(gross) - deduction}</div>
            </div>
            <h2>Férias</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th><input
                            className='calculator-value-editable'
                            type='editbox'
                            placeholder='0 days'
                            value={vacDays}
                            onChange={(event) => setVacDays(event.target.value)}
                        /></th>
                        <th>10 dias</th>
                        <th>30 dias</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Terço</td>
                        <td>{(gross * (vacDays / 30) * 1 / 3).toFixed(2)}</td>
                        <td>{(gross * 1 / 9).toFixed(2)}</td>
                        <td>{(gross / 3).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Adiantamento</td>
                        <td>{(gross * (vacDays / 30)).toFixed(2)}</td>
                        <td>{(gross / 3).toFixed(2)}</td>
                        <td>{gross ? gross : "0.00"}</td>
                    </tr>
                    <tr>
                        <td>INSS</td>
                        <td>{Calculator.inss(gross * (vacDays * 4 / 90))}</td>
                        <td>{Calculator.inss(gross * 4 / 9)}</td>
                        <td>{Calculator.inss(gross * 4 / 3)}</td>
                    </tr>
                    <tr>
                        <td>IRRF</td>
                        <td>{Calculator.irrf(gross * (vacDays * 4 / 90) - Calculator.inss(gross * (vacDays * 4 / 90)))}</td>
                        <td>{Calculator.irrf(gross * 4 / 9 - Calculator.inss(gross * 4 / 9))}</td>
                        <td>{Calculator.irrf(gross * 4 / 3 - Calculator.inss(gross * 4 / 3))}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>{Calculator.vacation(gross, vacDays)}</td>
                        <td>{Calculator.vacation(gross, 10)}</td>
                        <td>{Calculator.vacation(gross, 30)}</td>
                    </tr>
                </tbody>
            </table>
            <h2>FGTS</h2>
            <div className='calculator-vertical-pair'>
                <div>
                    <div>Mensal</div>
                    <div>R$ {(gross * 0.08).toFixed(2)}</div>
                </div>
                <div>
                    <div>Total na conta</div>
                    <span>R$ </span><input
                        className='calculator-value-editable'
                        type='editbox'
                        placeholder='999.99'
                        value={fgts}
                        onChange={(event) => setFgts(event.target.value)}
                    />
                </div>
                <div>
                    <div>Aniversário</div>
                    <div>R$ {Calculator.fgtsAnniversary(fgts)}</div>
                </div>
            </div>
            <h2>13° Salário</h2>
            <div className='calculator-vertical-pair'>
                <div>
                    <div>1° Parte</div>
                    <div>R$ {(gross / 2).toFixed(2)}</div>
                </div>
                <div>
                    <div>2° Parte</div>
                    <div>R$ {(Calculator.net(gross) - (gross / 2)).toFixed(2)}</div>
                </div>
            </div>
        </div>
    )
}

export default CalculatorGeneral;