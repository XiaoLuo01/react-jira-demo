import { useAuth } from 'context/auth-context';
import React from 'react';
import { Form, Input } from 'antd';
import { LongButton } from 'unAuthenticatedApp';
import { useAsync } from 'utils/use-async';

interface LoginProps {
  onError: (error: Error) => void;
}

const Login: React.FC<LoginProps> = ({ onError }) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = (values: { username: string; password: string }) => {
    run(login(values).catch(onError));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
        <Input type="text" id={'username'} placeholder="用户名" />
      </Form.Item>
      <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input type="password" id={'password'} placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default Login;
