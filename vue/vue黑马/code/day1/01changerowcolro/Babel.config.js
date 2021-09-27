module.exports = {
    // 声明 babel 可用的插件
    // 将来，webpack 在调用 babel-loader 的时候，会先加载 plugins 插件来使用
    //babel-loader也用到了插件需要声明，这个是插件的插件
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
  }