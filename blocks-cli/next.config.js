const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://blocks-server.capybara.wldspace.com/api/:path*'
            }
        ]
    }
});
