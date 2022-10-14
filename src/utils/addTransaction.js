function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const addTransaction = (transaction) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    };
    fetch('http://localhost:3001/', requestOptions);
}

export const createMockData = () => {
    const types = ['expense', 'income'];
    const categories = ['Aluguel', 'Luz', 'Telefone', 'Transporte', 'Feira', 'Bar'];
    const isinvest = [true, false];
    for (let i = 0; i < 30; i++) {

        const transaction = {
            "type": types[randomNumberInRange(0, 1)],
            "value": randomNumberInRange(1, 50),
            "date": "10/10/2020",
            "category": categories[randomNumberInRange(0, 5)],
            "comment": "",
            "isInvestment": isinvest[randomNumberInRange(0, 1)]
        }
        addTransaction(transaction);
    }
}