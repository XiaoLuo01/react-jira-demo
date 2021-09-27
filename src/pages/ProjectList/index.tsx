import React, { useEffect, useState } from 'react';
import { cleanObject, useMount, useDebounce } from 'utils';
import * as qs from 'qs';
import List from './List';
import SearchPanel from './SearchPanel';

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

  useEffect(() => {
    fetch(`${apiURL}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParam]);

  useMount(() => {
    fetch(`${apiURL}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};

export default ProjectList;
