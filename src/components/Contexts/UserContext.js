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

/* import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null)
    const [userNome, setUserNome] = useState("")
  
    useEffect(() => {
      if (localStorage.getItem("usuario_logado")) {
        const user = JSON.parse(localStorage.getItem("usuario_logado"))
        setUserId(user.id)
        setUserNome(user.nome)
      }  
    }, [])
  
    function mudaId(id) {
      setUserId(id)
    }
  
    function mudaNome(nome) {
      setUserNome(nome)
    }
    return (
        <UserContext.Provider value={{userId, userNome, mudaId, mudaNome}}>
            {children}
        </UserContext.Provider>
    );
    }

export default UserContext; */