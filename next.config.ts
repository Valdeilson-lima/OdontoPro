import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'avatars.githubusercontent.com',
      port: '',
      pathname: '/u/**',
    },
      {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      port: '',
        // allow any path on Cloudinary (images are served under /image/upload/...)
        pathname: '/**',
    },

     {
      protocol: 'https',
      hostname: 'lh3.googleusercontent.com',
      port: '',
        // allow any path on Cloudinary (images are served under /image/upload/...)
        pathname: '/**',
    },
  ],
}
};

export default nextConfig;
