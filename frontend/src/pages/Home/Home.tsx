import React from 'react';
import {Cell} from '@arco-design/mobile-react';
import styles from './home.module.less'
import {useNavigate} from 'react-router-dom';
import {IconUser} from "@arco-design/mobile-react/esm/icon";
import Logo from "@/assets/images/logo.svg";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleToLogin = () => {
    navigate('/cts/login-case')
  }

  return (
    <div className={styles['home-container']}>
      <div className={styles['logo-box']}>
        <img className={styles.logo} src={Logo} alt=""/>
      </div>
      <div className={styles.title}>
        TikTok CTS
      </div>

      <div className={styles['case-group']}>
      <div className={styles['group-title']}>Auth</div>
        <Cell.Group bordered={false}>
          <Cell icon={<IconUser/>} label="login" showArrow onClick={handleToLogin}></Cell>
          {/*<Cell icon={<IconUser/>} label="getLoginStatus" showArrow></Cell>*/}
        </Cell.Group>
      </div>
    </div>
  );
}

export default Home;
