import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './style.less';

import setRootPixel from '@arco-design/mobile-react/tools/flexible';
import FloatSetting from "@/components/FloatSetting";

import Home from './pages/Home/Home';
import LoginCase from './pages/LoginCase/LoginCase';
import Settings from "@/pages/Settings/Settings";
import {CLIENT_KEY_LIST} from "@/common/clientKey";

setRootPixel(37.5);

function App() {
  const loadTikTokSDK =() => {
    window.tiktokInit = function(TT: any) {
      window.TT = TT;
      TT.init({
        clientKey: CLIENT_KEY_LIST[0],
      });
    };

    const script = document.createElement('script')
    script.src = 'https://developers.tiktok.com/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  useEffect(() => {
    loadTikTokSDK();
  }, []);

  return (
    <Router>
      <div className="App">
        <FloatSetting />

        <Routes>
          <Route path="/" element={<Navigate to="/cts" replace/>}/>
          <Route path="/cts" Component={Home}/>
          <Route path="/cts/login-case" Component={LoginCase}/>
          <Route path="/cts/settings" Component={Settings}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
