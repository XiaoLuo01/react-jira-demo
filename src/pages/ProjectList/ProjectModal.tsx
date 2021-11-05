import { Button, Drawer } from 'antd';
import React from 'react';
import { useProjectModal } from './util';

interface ProjectModalProps {}

const ProjectModal: React.FC<ProjectModalProps> = () => {
  const { projectModalOpen, close: onClose } = useProjectModal();

  return (
    <Drawer onClose={onClose} visible={projectModalOpen} width={'100%'}>
      <h1>projectmodal</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  );
};

export default ProjectModal;
