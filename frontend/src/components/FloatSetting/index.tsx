import React from 'react';
import {useNavigate} from "react-router-dom";
import {IconSetting} from "@arco-design/mobile-react/esm/icon";
import FloatButton from "@/components/FloatButton";

const FloatSetting: React.FC = () => {
  const navigate = useNavigate();

  const handleToSetting = () => {
    navigate('/cts/settings')
  }

  return (
    <FloatButton>
      <IconSetting style={{fontSize: 20, color: '#FFFFFF'}} onClick={handleToSetting}/>
    </FloatButton>
  );
};

export default FloatSetting;
