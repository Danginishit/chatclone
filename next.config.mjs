/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        LOCAL_API_URL: process.env.LOCAL_API_URL,
    }
};

export default nextConfig;
