import { useAuth } from 'context/auth-context';
import ProjectList from 'pages/ProjectList';
import React from 'react';

interface AuthenticatedAppProps {}

const AuthenticatedApp: React.FC<AuthenticatedAppProps> = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectList />
    </div>
  );
};

export default AuthenticatedApp;
