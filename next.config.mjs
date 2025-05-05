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
          domains: ['encrypted-tbn0.gstatic.com', 'isce-image-uploader.s3.us-east-1.amazonaws.com'], // add the hostname here
     },
};

export default nextConfig;
