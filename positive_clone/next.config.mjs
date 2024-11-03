/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns:[
            {
                protocol:"https",
                hostname:"codeswear.com"
            }
        ]
    }
};

export default nextConfig;
