import React from 'react';
import { DashBoardType } from 'types/Dashboard';
import { useTasks } from 'utils/task';
import { useTaskTypes } from 'utils/task-type';
import { useTasksSearchParam } from './util';
import TaskIcon from 'assets/task.svg';
import BugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Card } from 'antd';

interface BoardColumnProps {
  dashBoard: DashBoardType;
}

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find(taskType => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return <img src={name === 'task' ? TaskIcon : BugIcon} />;
};

const BoardColumn: React.FC<BoardColumnProps> = ({ dashBoard }) => {
  const { data: allTasks } = useTasks(useTasksSearchParam());
  const tasks = allTasks?.filter(task => task.kanbanId === dashBoard.id);
  return (
    <Container>
      <h3>{dashBoard.name}</h3>
      <TaskContainer>
        {tasks?.map(task => (
          <Card style={{ marginBottom: '0.5rem' }} key={task.id}>
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
      </TaskContainer>
    </Container>
  );
};

const Container = styled.div`
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
