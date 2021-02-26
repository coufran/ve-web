const publicConfig = {
    version: "1.1.0-SNAPSHOT"
}

const config = {
    // 开发环境配置
    development: {
        server: {
            url: "http://localhost:8080"
        },
        version: publicConfig.version
    },
    // 生产环境配置
    production: {
        server: {
            url: "."
        },
        version: publicConfig.version
    }
}

export default config[process.env.NODE_ENV];
