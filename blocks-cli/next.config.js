const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/:path*`
            }
        ]
    }
});
