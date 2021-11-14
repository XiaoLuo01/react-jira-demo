import { DashBoardType } from 'types/Dashboard';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { useHttp } from './http';
import { useAddConfig } from './use-optimistic-options';

export const useDashboard = (param?: Partial<DashBoardType>) => {
  const client = useHttp();

  return useQuery<DashBoardType[]>(['kanbans', param], () => client('kanbans', { data: param }));
};

export const useAddDashboard = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<DashBoardType>) =>
      client(`kanbans`, {
        method: 'POST',
        data: params,
      }),
    useAddConfig(queryKey)
  );
};
