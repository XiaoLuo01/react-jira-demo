import React from 'react';
import AuthenticatedApp from 'authenticatedApp';
import { useAuth } from 'context/auth-context';
import UnAuthenticatedApp from 'unAuthenticatedApp';
import './App.css';

function App() {
  const { user } = useAuth();
  return <div className="App">{user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}</div>;
}

export default App;
