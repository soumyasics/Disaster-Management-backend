const config = {
    development: {
        localUrl: 'http://localhost:3000/WebQuard/reset-passsword/',
        serverUrl: 'http://hybrid.srishticampus.in/web_guard_api/reset-password/',
    },
    // production: {
    //     localUrl: 'https://your-production-local-url.com',
    //     serverUrl: 'https://your-production-server-url.com',
    // }
};

const environment = process.env.NODE_ENV || 'development';

module.exports = config[environment];
