module.exports = {
    // 多页面配置
    pages: {
        index: {
            entry: 'src/index/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: '微鱼'
        },
        login: {
            entry: 'src/login/login.js',
            template: 'public/login.html',
            filename: 'login.html',
            title: '登录 - 微鱼'
        }
    },
    // 开发环境配置
    devServer: {
        port: 3000
    }
}