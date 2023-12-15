import React, { createContext, useState, useEffect } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

const UsuarioContext = createContext({});

export const UsuarioProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userNome, setUserNome] = useState("");

  useEffect(() => {
    const { usuario_logado } = parseCookies();
    if (usuario_logado) {
      const usuario = JSON.parse(usuario_logado);
      console.log("User Data from cookies:", usuario);
      setUserId(usuario.id);
      setUserNome(usuario.nome);
    }
  }, []);

  console.log("usuarioId:", userId);
  console.log("usuarioNome:", userNome);

  function atualizarCookie(id, nome) {
    setCookie(null, 'usuario_logado', JSON.stringify({ id, nome }), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }

  function mudaId(id) {
    setUserId(id);
    atualizarCookie(id, userNome);
  }

  function mudaNome(nome) {
    setUserNome(nome);
    atualizarCookie(userId, nome);
  }



  function logout() {
    destroyCookie(null, 'usuario_logado', { path: '/' });
    setUserId(null);
    setUserNome("");
  }

  return (
    <UsuarioContext.Provider value={{ userId, userNome, mudaId, mudaNome, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export default UsuarioContext;