import styled from '@emotion/styled';
import { Spin } from 'antd';
import { PageContainer } from 'components/lib';
import React from 'react';
import { useDocumentTitle } from 'utils';
import { useDashboard } from 'utils/dashboard';
import { useTasks } from 'utils/task';
import BoardColumn from './BoardColumn';
import CreateBoard from './CreateBoard';
import BoardSearchPanel from './SearchPanel';
import TaskModal from './TaskModal';
import { useDashboardSearchParam, useProjectInUrl, useTasksSearchParam } from './util';

interface DashBoardProps {}

const DashBoard: React.FC<DashBoardProps> = () => {
  useDocumentTitle('看板列表 ');

  const { data: dashBoards, isLoading: dashBoardIsloading } = useDashboard(useDashboardSearchParam());
  const { data: currentProject } = useProjectInUrl();
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParam());
  const isLoading = taskIsLoading || dashBoardIsloading;

  return (
    <PageContainer>
      <h1>{currentProject?.name}看板</h1>
      <BoardSearchPanel />
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <ColumnContainer>
          {dashBoards?.map(board => (
            <BoardColumn dashBoard={board} key={board.id} />
          ))}
          <CreateBoard />
        </ColumnContainer>
      )}
      <TaskModal />
    </PageContainer>
  );
};

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;

export default DashBoard;
