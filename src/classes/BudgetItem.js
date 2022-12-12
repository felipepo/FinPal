class BudgetItem {
    constructor(value, category, id) {
        this.value = value;
        this.category = category;
        this.userID = id;
    }

    update(value, category, id) {
        this.value = value;
        this.category = category;
        this.userID = id;
    }

}

export default BudgetItem;