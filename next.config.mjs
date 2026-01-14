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
          domains: ['encrypted-tbn0.gstatic.com', 'isce-image-uploader.s3.us-east-1.amazonaws.com', 'i.ytimg.com'], // add the hostname here
     },
     async headers() {
          return [
               {
                    // Apply security headers to all routes
                    source: '/:path*',
                    headers: [
                         {
                              key: 'X-DNS-Prefetch-Control',
                              value: 'on'
                         },
                         {
                              key: 'Strict-Transport-Security',
                              value: 'max-age=63072000; includeSubDomains; preload'
                         },
                         {
                              key: 'X-Frame-Options',
                              value: 'SAMEORIGIN'
                         },
                         {
                              key: 'X-Content-Type-Options',
                              value: 'nosniff'
                         },
                         {
                              key: 'X-XSS-Protection',
                              value: '1; mode=block'
                         },
                         {
                              key: 'Referrer-Policy',
                              value: 'origin-when-cross-origin'
                         },
                         {
                              key: 'Permissions-Policy',
                              value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
                         },
                         {
                              key: 'Content-Security-Policy',
                              value: [
                                   "default-src 'self'",
                                   "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.sanity.io https://www.googletagmanager.com https://www.google-analytics.com",
                                   "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                                   "img-src 'self' data: https: blob:",
                                   "font-src 'self' https://fonts.gstatic.com data:",
                                   "connect-src 'self' https://cdn.sanity.io https://api.sanity.io https://*.sanity.io https://*.paystack.co https://api.paystack.co wss://*.sanity.io",
                                   "frame-src 'self' https://www.youtube.com https://www.google.com",
                                   "object-src 'none'",
                                   "base-uri 'self'",
                                   "form-action 'self'",
                                   "frame-ancestors 'self'",
                                   "upgrade-insecure-requests",
                              ].join('; ')
                         },
                    ],
               },
          ];
     },
};

export default nextConfig;
