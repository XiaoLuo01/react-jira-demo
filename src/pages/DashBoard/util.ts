import { useProject } from 'utils/project';
import { useLocation } from 'react-router';
import { useUrlQueryParam } from 'utils/url';
import { useMemo, useCallback } from 'react';
import { useTask } from 'utils/task';

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useDashboardSearchParam = () => ({ projectId: useProjectIdInUrl() });

export const useDashboardQuerykey = () => ['kanbans', useDashboardSearchParam()];

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

export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(['editingTaskId']);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );

  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: '' });
  }, [setEditingTaskId]);

  return {
    editingTaskId,
    editingTask,
    isLoading,
    startEdit,
    close,
  };
};
