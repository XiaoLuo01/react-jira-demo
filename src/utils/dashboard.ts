import { DashBoardType } from 'types/Dashboard';
import { useQuery } from 'react-query';
import { useHttp } from './http';

export const useDashboard = (param?: Partial<DashBoardType>) => {
  const client = useHttp();

  return useQuery<DashBoardType[]>(['kanbans', param], () => client('kanbans', { data: param }));
};
