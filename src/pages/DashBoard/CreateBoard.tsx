import { Input } from 'antd';
import React, { useState } from 'react';
import { useAddDashboard } from 'utils/dashboard';
import { Container } from './BoardColumn';
import { useDashboardQuerykey, useProjectIdInUrl } from './util';

interface CreateBoardProps {}

const CreateBoard: React.FC<CreateBoardProps> = () => {
  const [name, setName] = useState('');
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addDashboard } = useAddDashboard(useDashboardQuerykey());

  const submit = async () => {
    await addDashboard({ name, projectId });
    setName('');
  };

  return (
    <Container>
      <Input
        size={'large'}
        placeholder={'新建看板名称'}
        onPressEnter={submit}
        value={name}
        onChange={evt => setName(evt.target.value)}
      />
    </Container>
  );
};

export default CreateBoard;
