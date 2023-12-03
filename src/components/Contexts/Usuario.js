import React, { createContext, useState, useEffect } from 'react';

const UsuarioContext = createContext({});

export const UsuarioProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userNome, setUserNome] = useState("");

  useEffect(() => {
     const storedUser = localStorage.getItem("usuario_logado");
     if (storedUser) {
        const usuario = JSON.parse(storedUser);
        console.log("User Data from localStorage:", usuario);
        setUserId(usuario.id);
        setUserNome(usuario.nome);
     }
  }, []); 

  console.log("usuarioId:", userId);
  console.log("usuarioNome:", userNome);

  function mudaId(id) {
     setUserId(id);
  }

  function mudaNome(nome) {
     setUserNome(nome);
  }

  return (
     <UsuarioContext.Provider value={{ userId, userNome, mudaId, mudaNome }}>
        {children}
     </UsuarioContext.Provider>
  );
};

export default UsuarioContext;