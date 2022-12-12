import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";

export function FilterMonth({ filters, setFilters }) {
    const [filterValue, setFilterValue] = useState(1);

    useEffect(() => {
        const today = new Date();
        setFilterValue(today.getMonth() + 1);
    }, []);

    useEffect(() => {
        setFilters({ ...filters, month: filterValue });
    },
        // eslint-disable-next-line
        [filterValue]);

    return (
        <div>
            <span>Mês: </span><select value={filterValue} onChange={(event) => setFilterValue(parseInt(event.target.value))}>
                <option value={1}>Jan</option>
                <option value={2}>Fev</option>
                <option value={3}>Mar</option>
                <option value={4}>Abr</option>
                <option value={5}>Mai</option>
                <option value={6}>Jun</option>
                <option value={7}>Jul</option>
                <option value={8}>Ago</option>
                <option value={9}>Set</option>
                <option value={10}>Out</option>
                <option value={11}>Nov</option>
                <option value={12}>Dez</option>
            </select>
        </div>
    )
}

export function FilterYear({ filters, setFilters }) {
    const [filterValue, setFilterValue] = useState("");
    const { userData } = useContext(LoginContext);

    useEffect(() => {
        const today = new Date();
        setFilterValue(today.getFullYear());
    }, []);

    useEffect(() => {
        setFilters({ ...filters, year: filterValue });
    },
        // eslint-disable-next-line
        [filterValue]);

    return (
        <div>
            <span>Ano: </span><select value={filterValue} onChange={(event) => setFilterValue(parseInt(event.target.value))}>
                {userData.transactions
                    .map((element) => new Date(element.date).getFullYear())
                    .filter((value, index, arr) => arr.indexOf(value) === index)
                    .map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
        </div>
    )
}