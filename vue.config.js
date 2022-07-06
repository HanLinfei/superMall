const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    resolve: {
      //配置别名
      alias: {
        // 'assets': '@/assets',
        // 'common': '@/common',
        // 'components': '@/components',
        // 'network': '@/network',
        // 'views': '@/views'
      }
    }
  },

  publicPath: './'
})
