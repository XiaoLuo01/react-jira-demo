import { Card, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAddTask } from 'utils/task';
import { useProjectIdInUrl, useTasksQuerykey } from './util';

const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState('');
  const [inputMode, setInputMode] = useState(false);
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addTask } = useAddTask(useTasksQuerykey());

  const submit = async () => {
    await addTask({ name, projectId, kanbanId });
    setName('');
    setInputMode(false);
  };

  const toggle = () => setInputMode(mode => !mode);

  useEffect(() => {
    if (!inputMode) {
      setName('');
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>;
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={'需求做些什么'}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={evt => setName(evt.target.value)}
      />
    </Card>
  );
};

export default CreateTask;
