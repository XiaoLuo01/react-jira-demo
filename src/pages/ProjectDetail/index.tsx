import React from 'react';
import { Link } from 'react-router-dom';
import { Navigate, Routes, Route } from 'react-router';
import DashBoard from 'pages/DashBoard';
import TaskGroup from 'pages/TaskGroup';

interface ProjectDetailProps {}

const ProjectDetail: React.FC<ProjectDetailProps> = () => {
  return (
    <div>
      <Link to="dashboard">看板</Link>
      <Link to="taskgroup">任务组</Link>
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/taskgroup" element={<TaskGroup />} />
        <Navigate to={window.location.pathname + '/dashboard'} replace={true} />
      </Routes>
    </div>
  );
};

export default ProjectDetail;
