import React from 'react';
import AuthenticatedApp from 'authenticatedApp';
import { useAuth } from 'context/auth-context';
import UnAuthenticatedApp from 'unAuthenticatedApp';
import './App.css';
import ErrorBoundary from 'components/ErrorBoundary';
import { FullPageErrorFallback } from 'components/lib';

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
