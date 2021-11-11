import styled from '@emotion/styled';
import React from 'react';
import { useDocumentTitle } from 'utils';
import { useDashboard } from 'utils/dashboard';
import BoardColumn from './BoardColumn';
import { useDashboardSearchParam, useProjectInUrl } from './util';

interface DashBoardProps {}

const DashBoard: React.FC<DashBoardProps> = () => {
  useDocumentTitle('看板列表 ');

  const { data: dashBoards } = useDashboard(useDashboardSearchParam());
  const { data: currentProject } = useProjectInUrl();

  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <Container>
        {dashBoards?.map(board => (
          <BoardColumn dashBoard={board} key={board.id} />
        ))}
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;

export default DashBoard;
