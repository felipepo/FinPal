import React, { useContext, useEffect, useState } from "react";
import Transaction from "../../../classes/Transaction";
import { LoginContext } from "../../../contexts/LoginContext";
import { postTransaction } from "../../../utils/apiGateway";
import { useNavigate } from 'react-router-dom';

function CSVControl() {
    const [file, setFile] = useState();
    const [requestResult, setRequestResult] = useState('');
    const { userAuth } = useContext(LoginContext);
    const navigate = useNavigate();

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\r\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\r\n");

        csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            obj.id = userAuth.id;
            const transaction = new Transaction(obj.type, obj.value, obj.date, obj.category, obj.comment, obj.isInvestment, obj.id);
            postTransaction(userAuth.token, transaction)
            return obj;
        });
        setRequestResult('CSV Imported');
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };

            fileReader.readAsText(file);
        }
    };

    useEffect(() => {
        if (userAuth.id === '') {
            return navigate("/");
        }
    }
        // eslint-disable-next-line
        , []);

    return (
        <div style={{ textAlign: "center" }}>
            <h1>REACTJS CSV IMPORT EXAMPLE </h1>
            <form>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />
                <button onClick={(e) => { handleOnSubmit(e); }}>IMPORT CSV</button>
            </form>
            <h5>{requestResult}</h5>
        </div>
    );
}

export default CSVControl;