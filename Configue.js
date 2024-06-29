const config = {
    development: {
        localUrl: 'http://localhost:3000/Web_guard/reset-passsword/',
        serverUrl: 'http://hybrid.srishticampus.in/web_guard_api/reset-password/',
    },
};

const environment = process.env.NODE_ENV || 'development';

module.exports = config[environment];
