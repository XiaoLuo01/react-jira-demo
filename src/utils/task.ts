import { Task } from './../types/Task';
import { useQuery } from 'react-query';
import { useHttp } from './http';

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }));
};
