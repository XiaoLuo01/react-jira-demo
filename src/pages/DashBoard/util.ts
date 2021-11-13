import { useProject } from 'utils/project';
import { useLocation } from 'react-router';
import { useUrlQueryParam } from 'utils/url';
import { useMemo } from 'react';

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useDashboardSearchParam = () => ({ projectId: useProjectIdInUrl() });

export const useDashboardQuerykey = () => ['dashboard', useDashboardSearchParam()];

export const useTasksSearchParam = () => {
  const [param] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId']);
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  );
};

export const useTasksQuerykey = () => ['tasks', useTasksSearchParam()];
