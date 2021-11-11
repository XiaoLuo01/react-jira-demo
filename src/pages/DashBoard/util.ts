import { useProject } from 'utils/project';
import { useLocation } from 'react-router';

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useDashboardSearchParam = () => ({ projectId: useProjectIdInUrl() });

export const useDashboardQuerykey = () => ['dashboard', useDashboardSearchParam()];

export const useTasksSearchParam = () => ({ projectId: useProjectIdInUrl() });

export const useTasksQuerykey = () => ['tasks', useTasksSearchParam()];
