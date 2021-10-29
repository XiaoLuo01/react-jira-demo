import { Button, Drawer } from 'antd';
import React from 'react';

interface ProjectModalProps {
  projectModalOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ projectModalOpen, onClose }) => {
  return (
    <Drawer onClose={onClose} visible={projectModalOpen} width={'100%'}>
      <h1>projectmodal</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  );
};

export default ProjectModal;
