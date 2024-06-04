import React from 'react';
import styles from './index.module.less';
import {cls} from "@arco-design/mobile-utils";

interface IFloatButtonProps {
  children?: React.ReactNode;
}

const FloatButton:React.FC<IFloatButtonProps> = (props) => {
  return (
    <div className={cls(styles['float-button'], 'flex-center')}>
      {props.children}
    </div>
  );
};

export default FloatButton;
