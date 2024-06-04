import React, {useEffect, useState} from 'react';
import styles from './settings.module.less';
import {ActionSheet, Cell, NavBar} from "@arco-design/mobile-react";
import {useNavigate} from "react-router-dom";
import {NavBarRef} from "@arco-design/mobile-react/esm/nav-bar";
import {IconErrorCircle, IconSetting} from "@arco-design/mobile-react/esm/icon";
import {CLIENT_KEY_LIST} from "@/common/clientKey";
import {cls} from "@arco-design/mobile-utils";

const Settings: React.FC = () => {
  const [sheetVisible, setSheetVisible] = useState<boolean>(false)
  const [oldClientKey, setOldClientKey] = useState<string>(CLIENT_KEY_LIST[0])
  const [clientKey, setClientKey] = useState<string>(CLIENT_KEY_LIST[0])

  const navigate = useNavigate();

  const navBarRef = React.useRef<NavBarRef>(null);

  const handleBack = () => {
    navigate(-1);
  }

  const handleToggleClientKey = () => {
    setSheetVisible(true);
  }

  const handleActionSheetClick = (key: string) => {
    setOldClientKey(clientKey);
    setClientKey(key)
  }

  const handleActionSheetCancel = () => {
    setClientKey(oldClientKey);
    setSheetVisible(false);
  }

  const handleActionSheetClose = () => {
    setSheetVisible(false);

    if (TT) {
      TT.init({
        clientKey,
      });
    }
  }

  return (
    <React.Fragment>
      <NavBar
        ref={navBarRef}
        fixed={false}
        title="Settings"
        hasBottomLine={false}
        onClickLeft={handleBack}
      />

      <div className={styles['settings-container']}>
        <Cell.Group bordered={false}>
          <Cell icon={<IconSetting/>} label="Switch ClientKey" showArrow onClick={handleToggleClientKey}></Cell>
        </Cell.Group>
      </div>

      <ActionSheet
        title={
          <div className={cls(styles['sheet-header'], 'flex-center')}>
            <div className={styles['sheet-title']}>
              Switch ClientKey
            </div>
            <div className={cls(styles['sheet-close'])} onClick={handleActionSheetCancel}>
              <IconErrorCircle />
            </div>
          </div>
        }
        visible={sheetVisible}
        contentClass={styles['sheet-content']}
        close={handleActionSheetClose}
        items={[
          ...CLIENT_KEY_LIST.map(key => {
            return {
              content: (
                <div
                  className={cls(styles['sheet-item'], 'flex-center', key === clientKey ? styles['item-active'] : '')}
                  onClick={() => handleActionSheetClick(key)}
                >
                  {key}
                </div>
              ),
              onClick: () => true
            }
          })
        ]}
        cancelText="Confirm"
      />
    </React.Fragment>
  );
};

export default Settings;
