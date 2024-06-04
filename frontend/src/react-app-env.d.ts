/// <reference types="react-scripts" />
declare global {
  let TT: any;

  interface Window {
    TT: any; // 将 TT 声明为 any 类型
    tiktokInit: any;
  }
}

export {};
