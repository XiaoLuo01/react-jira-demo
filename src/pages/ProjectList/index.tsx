import React from 'react';
import { useDebounce, useDocumentTitle } from 'utils';
import List from './List';
import SearchPanel from './SearchPanel';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProject } from 'utils/project';
import { useUsers } from 'utils/user';
import { useUrlQueryParam } from 'utils/url';

const ProjectList = () => {
  useDocumentTitle('项目列表', false);
  const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  const debounceParam = useDebounce(param, 200);

  const { data: users } = useUsers();

  const { isLoading, error, data: list } = useProject(debounceParam);

  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectList;

ProjectList.whyDidYouRender = false;
