import React, { useState } from 'react';
import {ICaseItem} from "@/pages/LoginCase/interface";
import CaseCard from "@/components/CaseCard";
import {fetchAuthVerify} from "@/api/auth";
import {ILoginRes} from "@/components/LoginComponent/interface";
import {Assertion} from "@/assert/Assert";
import {Button} from "@arco-design/mobile-react";

interface ILoginComponentProps {
  data: ICaseItem;
}

const LoginComponent: React.FC<ILoginComponentProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>();
  const [assertResult, setAssertResult] = useState<any>();
  const [pass, setPass] = useState<boolean>();

  const loginCallback = async (response: ILoginRes) => {
    setLoading(true);
    setResponse(response);
      try {
        const assertion = new Assertion(response, props.data.expect?.params);
        const status = assertion.validate();
        setPass(status);
        setAssertResult(assertion.getDhparam());
      } catch (e) {
        console.error(e);
      }
    setLoading(false)

    // setLoading(true);
    // const res =  await fetchAuthVerify({
    //   clientKey: "",
    //   scopes: "",
    //   authCode: response!.authResponse.code,
    // });
    // setLoading(false)
    //
    // if (res.success) {
    //   setResponse(res.data.data);
    //   try {
    //     const assertion = new Assertion(res.data.data, props.data.expect?.params);
    //     const status = assertion.validate();
    //     setPass(status);
    //     setAssertResult(assertion.getDhparam());
    //   } catch (e) {
    //     console.error(e);
    //   }
    // }
  }

  const handleLogin = () => {
    // FIXME 无法调通，直接触发 loginCallback
    // TT.login(loginCallback, props.data.params);
    loginCallback({
      authResponse: {
        code: '...', // 本次的 code
        grantedScopes: '...' // 用户授权的 scope 列表，逗号分隔，仅当 returnScopes 为 true 时存在
      }
    })
  }

  return (
    <CaseCard data={{...props.data, response}} assert={{pass, result: assertResult}}>
      <Button loading={loading} type='primary' onClick={handleLogin}>登录</Button>
    </CaseCard>
  );
};

export default LoginComponent;
