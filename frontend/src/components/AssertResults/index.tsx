import React from 'react';
import styles from './index.module.less';
import { cls } from '@arco-design/mobile-utils';
import {IconCircleChecked} from "@arco-design/mobile-react/esm/icon";

interface IAssertError {
  path: string;
  expect?: any;
  actual?: any;
}

interface IAssertResultsProps {
  pass?: boolean;
  dhparam: {
    overage: string[];
    shortage: string[];
    type: IAssertError[];
    range: IAssertError[];
    enum: IAssertError[];
    value: IAssertError[];
  };
}

const AssertResults: React.FC<IAssertResultsProps> = ({dhparam, pass}) => {
  const renderErrorItems = (items: IAssertError[] | string[], sectionTitle: string) => (
    items.length > 0 && <div className={styles.section}>
      <div className={styles['section-title']}>{sectionTitle}</div>
      {items.length > 0 && (
        items.map((item, index) =>
          typeof item === 'string' ? (
            <div key={index} className={styles['error-item']}>{item}</div>
          ) : (
            <div key={index} className={styles['error-item']}>
              <div><strong>key:</strong> {item.path}</div>
              <div><strong>expect:</strong> {item.expect}</div>
              <div><strong>actual:</strong> {item.actual}</div>
            </div>
          )
        )
      )}
    </div>
  );

  const getResult = () => {
    if (pass === true) {
      return (
        <div className={cls(styles['pass-result'], 'flex-align-center')}>
          <IconCircleChecked style={{marginRight: 8}} /> 校验通过
        </div>
      )
    } else if (pass === false) {
      return (
        <React.Fragment>
          {renderErrorItems(dhparam.overage, '多余的参数')}
          {renderErrorItems(dhparam.shortage, '缺少的参数')}
          {renderErrorItems(dhparam.type, '参数类型错误')}
          {renderErrorItems(dhparam.range, '不在预期范围内')}
          {renderErrorItems(dhparam.enum, '不在枚举范围内')}
          {renderErrorItems(dhparam.value, '值不等于预期')}
        </React.Fragment>
      );
    }
  }

  return (
    <React.Fragment>
      <div className={styles['result-title']}>断言结果</div>
      <div className={styles.container}>
        {getResult()}
      </div>
    </React.Fragment>
  );
};

export default AssertResults;
