import React from 'react';
import { useDebounce, useDocumentTitle } from 'utils';
import List from './List';
import SearchPanel from './SearchPanel';
import styled from '@emotion/styled';
import { Button, Typography } from 'antd';
import { useProject } from 'utils/project';
import { useUsers } from 'utils/user';
import { useProjectsSearchParams } from './util';
import { Row } from 'components/lib';

interface ProjectListProps {
  setProjectModalOpen: (isOpen: boolean) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ setProjectModalOpen }) => {
  useDocumentTitle('项目列表', false);

  const [param, setParam] = useProjectsSearchParams();
  const { data: users } = useUsers();
  const { isLoading, error, data: list, retry } = useProject(useDebounce(param, 200));

  return (
    <Container>
      <Row between={true}>
        <h2>项目列表</h2>
        <Button onClick={() => setProjectModalOpen(true)}>创建项目</Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List
        setProjectModalOpen={setProjectModalOpen}
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectList;

// ProjectList.whyDidYouRender = true;
