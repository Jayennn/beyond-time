/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fhvffwpjrxnowfytjldd.supabase.co'
            }
        ]
    }
};

export default nextConfig;
