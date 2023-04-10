/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images : {
    domains : ['127.0.0.1','api.novusuniforms.com'],// <== Domain name
  }
}

module.exports = nextConfig
