class Transaction {
    constructor(type, value, date, category, comment, isInvestment, id) {
        this.type = type;
        this.value = parseInt(value);
        this.date = date;
        this.category = category;
        this.comment = comment;
        this.isInvestment = isInvestment;
        this.userID = id;
    }

    updateTransaction(type, value, date, category, comment, isInvestment, id) {
        this.type = type;
        this.value = value;
        this.date = date;
        this.category = category;
        this.comment = comment;
        this.isInvestment = isInvestment;
        this.userID = id;
    }

}

export default Transaction;