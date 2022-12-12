import React, { createContext, useState } from "react";

export const LoginContext = createContext();

function LoginProvider({ children }) {
    const [userAuth, setUserAuth] = useState({ id: "", token: "" });
    const [userData, setUserData] = useState({ categories: [], transactions: [], filteredTransactions: [] });

    return (
        <LoginContext.Provider value={{ userAuth, setUserAuth, userData, setUserData }}>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginProvider;