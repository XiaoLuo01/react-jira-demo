import React, { useState } from 'react';
import Login from 'unAuthenticatedApp/Login';
import Register from 'unAuthenticatedApp/Register';

interface UnAuthenticatedAppProps {}

const UnAuthenticatedApp: React.FC<UnAuthenticatedAppProps> = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {isRegister ? <Register /> : <Login />}
      <button onClick={() => setIsRegister(!isRegister)}>切换到 {isRegister ? '登录' : '注册'}</button>
    </div>
  );
};

export default UnAuthenticatedApp;
