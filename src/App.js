import React from 'react';
import AppRouter from './components/Login/routes.js';
import { UserProvider } from './components/Contexts/UserContext.js';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </div>
  );
}

export default App;
