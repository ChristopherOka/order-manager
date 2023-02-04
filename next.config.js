/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [],
    },
    rewrites: [
        {
            source: "/:path*",
            has: [
                {
                    type: "host",
                    value: "shop.martharave.com",
                },
            ],
            destination: "/shop/:path*",
        },
    ],
};

module.exports = nextConfig;
