
const baseURL = 'https://finpal-backend.herokuapp.com';
// const baseURL = 'http://localhost:3000';

async function fetchAPI(headerOptions, body, method, uri) {
    const myHeaders = new Headers(headerOptions);

    const myInit = {
        method: method,
        headers: myHeaders,
        mode: 'cors',
    };
    
    if (Object.keys(body).length !== 0) { myInit['body'] = JSON.stringify(body) }

    const apiData = await fetch(uri, myInit);
    const jsonResponse = await apiData.json();
    return { apiData, jsonResponse };
}

// User related
export async function registerUser(username, email, password, confirmpassword) {
    const headerOptions = {
        "Content-Type": "application/json"
    };

    const body = {
        "username": username,
        "email": email,
        "password": password,
        "confirmpassword": confirmpassword
    }

    const { apiData, jsonResponse } = await fetchAPI(headerOptions, body, 'POST', `${baseURL}/auth/register`);
    return { apiData, jsonResponse };
}

export async function loginUser(email, password) {
    const headerOptions = {
        "Content-Type": "application/json"
    };

    const body = {
        "email": email,
        "password": password,
    }

    const { apiData, jsonResponse } = await fetchAPI(headerOptions, body, 'POST', `${baseURL}/auth/login`);
    return { apiData, jsonResponse };
}

export async function getUser(id, token) {
    const headerOptions = {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
    };

    const { apiData, jsonResponse } = await fetchAPI(headerOptions, {}, 'GET', `${baseURL}/user/${id}`);
    return { apiData, jsonResponse };
}

// Transaction CRUD ===============================================================================================================================================

export async function getAllTransactions(userID, token) {
    const headerOptions = {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
    };

    const { apiData, jsonResponse } = await fetchAPI(headerOptions, {}, 'GET', `${baseURL}/transactions/all/${userID}`);
    return { apiData, jsonResponse };
}

export async function postTransaction(token, transaction) {
    const headerOptions = {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
    };

    const body = {
        "type": transaction.type,
        "value": transaction.value,
        "date": transaction.date,
        "comment": transaction.comment,
        "isInvestment": transaction.isInvestment,
        "category": transaction.category,
        "userID": transaction.userID,
    };
    
    const { apiData, jsonResponse } = await fetchAPI(headerOptions, body, 'POST', `${baseURL}/transactions`);
    return { apiData, jsonResponse };
}

// Category CRUD ===============================================================================================================================================
export async function getAllCategories(userID, token) {
    const headerOptions = {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
    };

    const { apiData, jsonResponse } = await fetchAPI(headerOptions, {}, 'GET', `${baseURL}/categories/all/${userID}`);
    return { apiData, jsonResponse };
}

export async function getCategory(catID, token) {
    const headerOptions = {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
    };

    const { apiData, jsonResponse } = await fetchAPI(headerOptions, {}, 'GET', `${baseURL}/categories/${catID}`);
    return { apiData, jsonResponse };
}

export async function postCategory(token, category) {
    const headerOptions = {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
    };

    const body = {
        "name": category.name,
        "color": category.color,
        "userID": category.userID,
    };
    
    const { apiData, jsonResponse } = await fetchAPI(headerOptions, body, 'POST', `${baseURL}/categories`);
    return { apiData, jsonResponse };
}

export async function deleteCategory(catID, token) {
    const headerOptions = {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
    };

    const { apiData, jsonResponse } = await fetchAPI(headerOptions, {}, 'DETELE', `${baseURL}/categories/${catID}`);
    return { apiData, jsonResponse };
}

export async function patchCategory(initName, token, body) {
    const headerOptions = {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
    };

    const { apiData, jsonResponse } = await fetchAPI(headerOptions, body, 'PATCH', `${baseURL}/categories/${initName}`);
    return { apiData, jsonResponse };
}

export async function getAllData(userID, token) {
    const allTransactions = await getAllTransactions(userID, token);
    const allCategories = await getAllCategories(userID, token);

    return {
        transactions: allTransactions.jsonResponse,
        categories: allCategories.jsonResponse
    }
}