module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:4000',
        changeOrigin: true, // 支持跨域
        pathRewrite: { // 重寫路径: 去掉路徑中開頭的'/api'
          '^/api': ''
        }
      }
    }
  }
}
