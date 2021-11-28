import { Button, List, Modal } from 'antd';
import { PageContainer, Row } from 'components/lib';
import dayjs from 'dayjs';
import { useProjectInUrl } from 'pages/DashBoard/util';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteEpic, useEpic } from 'utils/epic';
import { useTasks } from 'utils/task';
import { useEpicQuerykey, useEpicSearchParam } from './util';
import { Epic } from 'types/Epic';
import CreateEpic from './CreateEpic';

interface EpicPageProps {}

const EpicPage: React.FC<EpicPageProps> = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpic(useEpicSearchParam());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicQuerykey());
  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      okText: `确定`,
      content: '点击确定删除',
      title: `确定删除项目组:${epic.name}`,
      onOk() {
        deleteEpic(epic.id);
      },
    });
  };

  const [createEpicOpen, setCreateEpicOpen] = useState(false);

  return (
    <PageContainer>
      <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button type={'link'} onClick={() => setCreateEpicOpen(true)}>
          创建任务组
        </Button>
      </Row>
      <List
        style={{ overflow: 'scroll' }}
        dataSource={epics}
        itemLayout={'vertical'}
        renderItem={epic => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button onClick={() => confirmDeleteEpic(epic)} type={'link'}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                  <div>结束时间：{dayjs(epic.end).format('YYYY-MM-DD')}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter(task => task.epicId === epic.id)
                .map(task => (
                  <Link to={`/projects/${currentProject?.id}/dashboard?editingTaskId=${task.id}`} key={task.id}>
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic visible={createEpicOpen} onClose={() => setCreateEpicOpen(false)} />
    </PageContainer>
  );
};

export default EpicPage;
