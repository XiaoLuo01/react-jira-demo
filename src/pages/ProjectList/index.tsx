import React, { useEffect, useState } from 'react';
import { cleanObject, useMount, useDebounce } from 'utils';
import List from './List';
import SearchPanel from './SearchPanel';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';

interface ProjectListProps {}

const ProjectList: React.FC<ProjectListProps> = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debounceParam = useDebounce(param, 200);
  const client = useHttp();

  useEffect(() => {
    client('projects', { data: cleanObject(debounceParam) }).then(setList);
  }, [debounceParam]);

  useMount(() => {
    client('users').then(setUsers);
  });

  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectList;
