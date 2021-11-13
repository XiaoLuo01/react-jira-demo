import { Button, Input } from 'antd';
import { Row } from 'components/lib';
import TaskTypeSelect from 'components/TaskSelectType';
import UserSelect from 'components/UserSelect';
import React from 'react';
import { useSetUrlSearchParam } from 'utils/url';
import { useTasksSearchParam } from './util';

interface BoardSearchPanelProps {}

const BoardSearchPanel: React.FC<BoardSearchPanelProps> = () => {
  const searchParam = useTasksSearchParam();
  console.log('searchParam', searchParam); //sy-log
  const setSearchParam = useSetUrlSearchParam();
  const reset = () => {
    setSearchParam({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };
  return (
    <Row marginBottom={4} gap={true}>
      <Input
        style={{ width: '20rem' }}
        placeholder="任务名"
        value={searchParam.name}
        onChange={evt => setSearchParam({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName="经办人"
        value={searchParam.processorId}
        onChange={value => setSearchParam({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName="类型"
        value={searchParam.typeId}
        onChange={value => setSearchParam({ typeId: value })}
      />
      <Button onClick={reset}>Reset</Button>
    </Row>
  );
};

export default BoardSearchPanel;
