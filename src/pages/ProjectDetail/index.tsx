import React from 'react';
import { Link } from 'react-router-dom';
import { Navigate, Routes, Route, useLocation } from 'react-router';
import DashBoard from 'pages/DashBoard';
import TaskGroup from 'pages/TaskGroup';
import styled from '@emotion/styled';
import { Menu } from 'antd';

interface ProjectDetailProps {}

const useRouteType = () => {
  const units = useLocation().pathname.split('/');
  return units[units.length - 1];
};

const ProjectDetail: React.FC<ProjectDetailProps> = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode="inline" selectedKeys={[routeType]}>
          <Menu.Item key="dashboard">
            <Link to="dashboard">看板</Link>
          </Menu.Item>
          <Menu.Item key="taskgroup">
            <Link to="taskgroup">任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/taskgroup" element={<TaskGroup />} />
          <Navigate to={window.location.pathname + '/dashboard'} replace={true} />
        </Routes>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`;

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.main`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
`;

export default ProjectDetail;
