/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "mauweb.monamedia.net",
      "product.hstatic.net",
      "y5kbp0ifnvobj.vcdn.cloud",
      "taimienphi.vn",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
