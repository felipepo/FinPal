import BudgetItem from "./BudgetItem";
import { deleteBudget, postBudget } from "../utils/apiGateway";
// import { getMonth_Transactions } from "../utils/filters";

class Budget {
    constructor(userAuth, userData) {
        this.allItems = {};
        this.userAuth = userAuth;
        this.userData = userData;
    }

    addItem(value, category) {
        if (!(category in this.allItems)) {
            const budgetItem = new BudgetItem(
                value,
                category,
                this.userAuth.id
            );
            this.allItems[category] = budgetItem;
            postBudget(this.userAuth.token, budgetItem);
            return true
        } else {
            return false
        }
    }

    remItem(category) {
        delete this.allItems[category];
        deleteBudget(category, this.userAuth.token);
    }

    // populateBar(userData) {
    //     const today = new Date();
    //     const currentTransactions = getMonth_Transactions((today.getMonth() + 1), today.getFullYear(), userData.transactions);

    //     setBudget(userData.budgets.map((element) => {
    //         element.cost = currentTransactions.reduce((acc, curr) => curr.category === element.category ? acc + curr.value : acc, 0);
    //         element.color = userData.categories.filter((cat) => cat.name === element.category)[0].color;
    //         return element;
    //     }));
    // }

}

export default Budget;