/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
          remotePatterns: [
               {
                    protocol: "https",
                    hostname: "cdn.sanity.io",
                    port: ""
               },
          ],
          domains: ['encrypted-tbn0.gstatic.com'], // add the hostname here
     },
};

export default nextConfig;
