/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "codeswear.com"
            },
            {
                protocol: "https",
                hostname: "amazon.com"
            },
            {
                protocol: "https",
                hostname: "m.media-amazon.com"
            },
            {
                protocol: "https",
                hostname: "images.bewakoof.com"
            },
            {
                protocol: "https",
                hostname: "iconsdb.com"
            },
            {
                protocol: "http",
                hostname: "localhost"
            }
        ]
    },
};

export default nextConfig;
