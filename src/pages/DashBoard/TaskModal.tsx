import { Button, Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TaskTypeSelect from 'components/TaskSelectType';
import UserSelect from 'components/UserSelect';
import React, { useEffect } from 'react';
import { useDeleteTask, useEditTask } from 'utils/task';
import { useTaskModal, useTasksQuerykey } from './util';

interface TaskModalProps {}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const TaskModal: React.FC<TaskModalProps> = () => {
  const [form] = useForm();
  const { editingTask, editingTaskId, close } = useTaskModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQuerykey());
  const { mutate: deleteTask } = useDeleteTask(useTasksQuerykey());

  const onCancel = () => {
    close();
    form.resetFields();
  };
  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };
  const startDelete = () => {
    close();
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除任务吗？',
      onOk() {
        return deleteTask(Number(editingTaskId));
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      onCancel={onCancel}
      onOk={onOk}
      okText={'确认'}
      cancelText={'取消'}
      confirmLoading={editLoading}
      title={'编辑任务'}
      visible={!!editingTaskId}
      forceRender
      // getContainer={false}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item label={'任务名'} name={'name'} rules={[{ required: true, message: '请输入任务名' }]}>
          <Input />
        </Form.Item>
        <Form.Item label={'经办人'} name={'processorId'}>
          <UserSelect defaultOptionName={'经办人'} />
        </Form.Item>
        <Form.Item label={'类型'} name={'typeId'}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={startDelete} style={{ fontSize: '14px' }} size={'small'}>
          删除
        </Button>
      </div>
    </Modal>
  );
};

export default TaskModal;
