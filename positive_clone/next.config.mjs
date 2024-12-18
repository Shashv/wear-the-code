/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "codeswear.com"
            }, {
                protocol: "https",
                hostname: "amazon.com"
            }
        ]
    }
};

export default nextConfig;
