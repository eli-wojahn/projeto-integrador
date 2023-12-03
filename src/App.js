import React from 'react';
import AppRouter from './components/Login/routes.js';
import { UsuarioProvider } from './components/Contexts/Usuario.js';

function App() {
  return (
    <div className="App">
      <UsuarioProvider>
        <AppRouter />
      </UsuarioProvider>
    </div>
  );
}

export default App;