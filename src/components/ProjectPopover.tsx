import styled from '@emotion/styled';
import { Divider, List, Popover, Typography } from 'antd';
import React from 'react';
import { useProject } from 'utils/project';

interface ProjectPopoverProps {
  projectButton: JSX.Element;
}

const ProjectPopover: React.FC<ProjectPopoverProps> = ({ projectButton }) => {
  const { data: projects } = useProject();
  const pinProject = projects?.filter(project => project.pin);

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
      {projectButton}
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
