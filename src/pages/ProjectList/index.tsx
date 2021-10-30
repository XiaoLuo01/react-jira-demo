import React from 'react';
import { useDebounce, useDocumentTitle } from 'utils';
import List from './List';
import SearchPanel from './SearchPanel';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProject } from 'utils/project';
import { useUsers } from 'utils/user';
import { useProjectsSearchParams } from './util';
import { Row } from 'components/lib';

interface ProjectListProps {
  projectButton: JSX.Element;
}

const ProjectList: React.FC<ProjectListProps> = ({ projectButton }) => {
  useDocumentTitle('项目列表', false);

  const [param, setParam] = useProjectsSearchParams();
  const { data: users } = useUsers();
  const { isLoading, error, data: list, retry } = useProject(useDebounce(param, 200));

  return (
    <Container>
      <Row between={true}>
        <h2>项目列表</h2>
        {projectButton}
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List
        projectButton={projectButton}
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
