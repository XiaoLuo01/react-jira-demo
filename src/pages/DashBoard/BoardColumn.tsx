import React from 'react';
import { DashBoardType } from 'types/Dashboard';
import { useTasks } from 'utils/task';
import { useTaskTypes } from 'utils/task-type';
import { useDashboardQuerykey, useTaskModal, useTasksSearchParam } from './util';
import TaskIcon from 'assets/task.svg';
import BugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Button, Card, Dropdown, Menu, Modal } from 'antd';
import CreateTask from './CreateTask';
import { Task } from 'types/Task';
import Mark from 'components/Mark';
import { useDeleteKanban } from 'utils/dashboard';
import { Row } from 'components/lib';

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

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal();
  const { name: keyword } = useTasksSearchParam();

  return (
    <Card onClick={() => startEdit(task.id)} style={{ marginBottom: '0.5rem', cursor: 'pointer' }}>
      <div>
        <Mark keyword={keyword} name={task.name} />
      </div>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

const BoardColumn: React.FC<BoardColumnProps> = ({ dashBoard }) => {
  const { data: allTasks } = useTasks(useTasksSearchParam());
  const tasks = allTasks?.filter(task => task.kanbanId === dashBoard.id);
  return (
    <Container>
      <Row between={true}>
        <h3>{dashBoard.name}</h3>
        <More kanban={dashBoard} />
      </Row>
      <TaskContainer>
        {tasks?.map(task => (
          <TaskCard task={task} key={task.id} />
        ))}
        <CreateTask kanbanId={dashBoard.id} />
      </TaskContainer>
    </Container>
  );
};

const More = ({ kanban }: { kanban: DashBoardType }) => {
  const { mutateAsync } = useDeleteKanban(useDashboardQuerykey());
  const startEdit = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗？',
      onOk() {
        return mutateAsync(kanban.id);
      },
    });
  };

  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={'link'} onClick={startEdit}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={overlay}>
      <Button type={'link'}>...</Button>
    </Dropdown>
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
