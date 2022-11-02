class Category {
    constructor(color, name, userID) {
        this.color = JSON.stringify(color);
        this.name = name.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
        this.userID = userID;
    }

    updateColor(newColor) {
        this.color = newColor;
    }

    updateName(newName) {
        this.name = newName;
    }

}

export default Category;