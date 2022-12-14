import React, { useContext, useEffect, useState } from "react";
import Transaction from "../../../classes/Transaction";
import { LoginContext } from "../../../contexts/LoginContext";
import { postTransaction, getAllData } from "../../../utils/apiGateway";
import { useNavigate } from 'react-router-dom';
import LoadingWindow from "../../General/LoadingWindow";

function CSVControl() {
    const [file, setFile] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [requestResult, setRequestResult] = useState('');
    const { userAuth, userData, setUserData } = useContext(LoginContext);
    const navigate = useNavigate();

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const csvFileToArray = async string => {
        setIsLoading(true);
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
        const updatedUserData = await getAllData(userAuth.id, userAuth.token);
        updatedUserData.filteredTransactions = userData.filteredTransactions;
        setUserData(updatedUserData);

        setIsLoading(false);
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
            <LoadingWindow isLoading={isLoading} positionLeft='23%' positionTop='30%' loadingText='Importing...' />
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