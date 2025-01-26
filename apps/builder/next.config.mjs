/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@workspace/ui"],
    async redirects() {
      return [
        {
          source: "/",
          destination: "/workflows",
          permanent: true,
        },
      ];
    },
  }
  
  export default nextConfig
  