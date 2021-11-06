import styled from '@emotion/styled';
import { Divider, List, Popover, Typography } from 'antd';
import { useProjectModal } from 'pages/ProjectList/util';
import React from 'react';
import { useProjects } from 'utils/project';
import { ButtonNoPadding } from './lib';

interface ProjectPopoverProps {}

const ProjectPopover: React.FC<ProjectPopoverProps> = () => {
  const { data: projects } = useProjects();
  const pinProject = projects?.filter(project => project.pin);

  const { open } = useProjectModal();

  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List>
        {pinProject?.map(project => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open} type={'link'}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );

  return (
    <Popover placement={'bottom'} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;

export default ProjectPopover;
