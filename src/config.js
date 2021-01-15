const config = {
    // 开发环境配置
    development: {
        server: {
            url: "http://localhost:8080"
        }
    },
    // 生产环境配置
    production: {
        server: {
            url: "http://www.coufran.cn/ve"
        }
    }
}

export default config[process.env.NODE_ENV];
