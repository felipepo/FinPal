class Transaction {
    constructor(type, value, date, category, comment, isInvestment, id) {
        this.type = type;
        this.value = parseInt(value);
        this.date = date;
        this.category = category.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
        this.comment = comment.replace(/char(44)/g, ',');
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