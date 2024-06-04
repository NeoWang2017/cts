import React from 'react';
import ReactJson from 'react18-json-view';
import 'react18-json-view/src/style.css'
import styles from './index.module.less';

interface ITestResultsProps {
  title: string;
  data: any;
}

const TestResults: React.FC<ITestResultsProps> = ({data, title}) => {
  return (
    <React.Fragment>
      <div className={styles['result-title']}>{title}</div>
      <div className={styles['test-result']}>
        <ReactJson theme="a11y" collapsed={false} src={data}/>
      </div>
    </React.Fragment>
  );
};

export default TestResults;
