import { Button, Drawer } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectListActions, SelectProjectModalOpen } from './ProjectList.slice';

interface ProjectModalProps {}

const ProjectModal: React.FC<ProjectModalProps> = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(SelectProjectModalOpen);

  return (
    <Drawer onClose={() => dispatch(ProjectListActions.closeProjectModal())} visible={projectModalOpen} width={'100%'}>
      <h1>projectmodal</h1>
      <Button onClick={() => dispatch(ProjectListActions.closeProjectModal())}>关闭</Button>
    </Drawer>
  );
};

export default ProjectModal;
