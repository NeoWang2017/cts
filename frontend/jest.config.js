const fs = require('fs');
const path = require('path');

// 生成唯一文件名
const generateReportPath = () => {
  const timestamp = new Date().toJSON().replace(/[:.T]/g, '-').slice(0, 19);
  const reportDir = path.join(__dirname, 'reports');

  // 确保报告目录存在
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }

  return path.join(reportDir, `test-report-${timestamp}.html`);
};

module.exports = {
  verbose: true,
  preset: 'jest-puppeteer',
  testMatch: ["**/tests/**/*.test.js"],
  globalSetup: "jest-environment-puppeteer/setup",
  globalTeardown: "jest-environment-puppeteer/teardown",
  testEnvironment: "jest-environment-puppeteer",
  setupFilesAfterEnv: ['./tests/setupTests.js'], // 在每个测试文件运行之前加载的文件
  "reporters": [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "Test Report",
      "outputPath": generateReportPath(), //"./reports/test-report.html",
      "includeFailureMsg": true,
      "includeSuiteFailure": true
    }]
  ]
};
