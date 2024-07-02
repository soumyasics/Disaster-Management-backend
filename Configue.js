const config = {
    development: {
        localUrl: 'http://localhost:3000/web_guard/reset-password/',
        serverUrl: 'http://hybrid.srishticampus.in/web_guard/reset-password/',
    },
};

const environment = process.env.NODE_ENV || 'development';

module.exports = config[environment];
