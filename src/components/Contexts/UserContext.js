import React, { createContext } from 'react';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const usuario = JSON.parse(localStorage.getItem("Usuário_logado"));
    console.log(usuario);

    return (
        <UserContext.Provider value={usuario}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;