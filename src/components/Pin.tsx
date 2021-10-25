import { Rate } from 'antd';
import React from 'react';

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Pin: React.FC<PinProps> = ({ checked, onCheckedChange, ...restProps }) => {
  return <Rate count={1} value={checked ? 1 : 0} onChange={num => onCheckedChange?.(!!num)} {...restProps} />;
};

export default Pin;
