import React from 'react';
import { useTaskTypes } from 'utils/task-type';
import IdSelect from './IdSelect';

const TaskTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskTypes();
  return <IdSelect options={taskTypes || []} {...props} />;
};

export default TaskTypeSelect;
