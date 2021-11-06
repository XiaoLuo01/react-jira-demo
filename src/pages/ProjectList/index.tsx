import React from 'react';
import { useDebounce, useDocumentTitle } from 'utils';
import List from './List';
import SearchPanel from './SearchPanel';
import styled from '@emotion/styled';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useProjectModal, useProjectsSearchParams } from './util';
import { ButtonNoPadding, ErrorBox, Row } from 'components/lib';

interface ProjectListProps {}

const ProjectList: React.FC<ProjectListProps> = () => {
  useDocumentTitle('项目列表', false);
  const { open } = useProjectModal();

  const [param, setParam] = useProjectsSearchParams();
  const { data: users } = useUsers();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));

  return (
    <Container>
      <Row between={true}>
        <h2>项目列表</h2>
        <ButtonNoPadding onClick={open} type={'link'}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectList;

// ProjectList.whyDidYouRender = true;
