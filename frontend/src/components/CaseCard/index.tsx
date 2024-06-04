import React from 'react';
import styles from './index.module.less';
import {IconCircleChecked, IconClear} from "@arco-design/mobile-react/esm/icon";
import JsonView from "@/components/JsonView";
import AssertResults from "@/components/AssertResults";

interface ICaseCardProps {
  data: {
    name: string,
    params?: any,
    response?: any
  };
  assert?: {
    pass?: boolean,
    result?: any
  };
  children?: React.ReactNode;
}

const CaseCard: React.FC<ICaseCardProps> = ({data, assert, ...props}) => {
  const getResultIcon = () => {
    if (assert?.pass === true) {
      return <IconCircleChecked style={{color: 'green'}}/>
    } else if (assert?.pass === false) {
      return <IconClear style={{color: 'red'}}/>
    }
  }

  return (
    <div className={styles['case-card']}>
      <div className="flex-justify-between">
        <div className={styles['case-name']}>{data.name}</div>
        <div>
          {getResultIcon()}
        </div>
      </div>
      {data.params !== undefined && <JsonView title="请求载荷" data={data.params}/>}
      {props.children}
      {assert?.pass !== undefined && <AssertResults pass={assert?.pass} dhparam={assert?.result}/>}
      {data.response !== undefined && <JsonView title="响应" data={data.response}/>}
    </div>
  )
}

export default CaseCard;
