import React from 'react';
import { DashBoardType } from 'types/Dashboard';
import { useTasks } from 'utils/task';
import { useTaskTypes } from 'utils/task-type';
import { useTaskModal, useTasksSearchParam } from './util';
import TaskIcon from 'assets/task.svg';
import BugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Card } from 'antd';
import CreateTask from './CreateTask';

interface BoardColumnProps {
  dashBoard: DashBoardType;
}

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find(taskType => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return <img alt={'task-icon'} src={name === 'task' ? TaskIcon : BugIcon} />;
};

const BoardColumn: React.FC<BoardColumnProps> = ({ dashBoard }) => {
  const { data: allTasks } = useTasks(useTasksSearchParam());
  const tasks = allTasks?.filter(task => task.kanbanId === dashBoard.id);
  const { startEdit } = useTaskModal();
  return (
    <Container>
      <h3>{dashBoard.name}</h3>
      <TaskContainer>
        {tasks?.map(task => (
          <Card onClick={() => startEdit(task.id)} style={{ marginBottom: '0.5rem', cursor: 'pointer' }} key={task.id}>
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
        <CreateTask kanbanId={dashBoard.id} />
      </TaskContainer>
    </Container>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default BoardColumn;
