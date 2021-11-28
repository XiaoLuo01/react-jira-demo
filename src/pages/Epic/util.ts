import { useProjectIdInUrl } from 'pages/DashBoard/util';

export const useEpicSearchParam = () => ({ projectId: useProjectIdInUrl() });

export const useEpicQuerykey = () => ['epics', useEpicSearchParam()];
