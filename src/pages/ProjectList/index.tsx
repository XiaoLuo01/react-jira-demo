import React, { useEffect, useState } from 'react';
import { cleanObject, useMount, useDebounce } from 'utils';
import List from './List';
import SearchPanel from './SearchPanel';
import { useHttp } from 'utils/http';

interface ProjectListProps {}

const apiURL = process.env.REACT_APP_API_URL;

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
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};

export default ProjectList;
