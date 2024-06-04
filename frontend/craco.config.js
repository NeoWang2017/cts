const CracoLessPlugin = require('craco-less');
const {loaderByName} = require('@craco/craco');
const path = require('path')

const resolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = function (config) {
  const lessModuleRegex = /\.module\.less$/;

  return {
    webpack: {
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets')
      },
    },
    babel: {
      plugins: [
        ['babel-plugin-import',
          {
            libraryName: '@arco-design/mobile-react',
            libraryDirectory: 'esm',
            style: (path) => `${path}/style`, // 样式按需加载
          },
        ]
      ]
    },
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              javascriptEnabled: true,
              modifyVars: {
                hack: "true; @import '@arco-design/mobile-react/tokens/app/arcodesign/default/index.less'",
                '@arco-dark-mode-selector': '.tt-darkmode-general',
                '@base-font-size': 37.5,
                '@primary-color': "rgba(254, 44, 85, 1);",
                '@dark-primary-color': "rgba(254, 44, 85, 1);",
                '@button-primary-clicked-background': "rgba(234, 40, 78, 1);",
                '@dark-button-primary-clicked-background': "rgba(234, 40, 78, 1);",
              },
            },
          },
          modifyLessRule(lessRule) {
            lessRule.exclude = lessModuleRegex;
            return lessRule;
          },
          modifyLessModuleRule(lessModuleRule) {
            lessModuleRule.test = lessModuleRegex;

            const cssLoader = lessModuleRule.use.find(loaderByName('css-loader'));
            cssLoader.options.modules = {
              localIdentName: '[local]_[hash:base64:5]',
            };

            return lessModuleRule;
          },
        },
      },
    ],
  }
};
