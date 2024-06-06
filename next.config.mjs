/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "build",
    async redirects() {
        return [
            {
                source: '/',
                destination: '/patient-lists',
                permanent: true
            }
        ]
    }

};

export default nextConfig;
