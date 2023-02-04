/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [],
    },
    rewrites() {
        return {
            beforeFiles: [
                // if the host is `app.acme.com`,
                // this rewrite will be applied
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
    },
};

module.exports = nextConfig;
