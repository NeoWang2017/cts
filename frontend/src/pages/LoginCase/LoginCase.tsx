import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './login-case.module.less'
import LoginComponent from "@/components/LoginComponent";
import {LoginCaseList} from "@/case/LoginCase";
import {NavBar} from "@arco-design/mobile-react";
import {NavBarRef} from "@arco-design/mobile-react/esm/nav-bar";

const LoginCase: React.FC = () => {
  const navigate = useNavigate();

  const navBarRef = React.useRef<NavBarRef>(null);

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <React.Fragment>
      <NavBar
        ref={navBarRef}
        fixed={false}
        title="CTS"
        hasBottomLine={false}
        onClickLeft={handleBack}
      />
      <div className={styles['login-case-container']}>
        {
          LoginCaseList.map((item, index) => {
            return (
              <LoginComponent key={index} data={item}/>
            )
          })
        }
      </div>
    </React.Fragment>
  );
}

export default LoginCase;
