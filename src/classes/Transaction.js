class Transaction {
    constructor(type, value, date, category, comment, isInvestment, id) {
        this.type = type;
        this.value = parseInt(value);
        this.date = date;
        this.category = category;
        this.comment = comment;
        this.isInvestment = isInvestment;
        this.id = id;
    }

    get type() {
        return this.type;
    }

    get value() {
        return this.value;
    }

    get date() {
        return this.date;
    }

    get category() {
        return this.category;
    }

    get comment() {
        return this.comment;
    }

    get isInvestment() {
        return this.isInvestment;
    }

    get id() {
        return this.id;
    }

    updateTransaction(type, value, date, category, comment, isInvestment, id) {
        this.type = type;
        this.value = value;
        this.date = date;
        this.category = category;
        this.comment = comment;
        this.isInvestment = isInvestment;
        this.id = id;
    }

}

export default Transaction;