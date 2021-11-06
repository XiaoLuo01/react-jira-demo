import { Project } from 'pages/ProjectList/List';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHttp } from './http';

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }));
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'POST',
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
    }
  );
};
