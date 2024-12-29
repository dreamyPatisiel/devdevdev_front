/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');
const fs = require('fs');
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['page.tsx'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/main',
        permanent: true,
      },
    ];
  },
  devIndicators: {
    autoPrerender: false,
  },
  server: {
    https: {
      key: fs.readFileSync(path.join(__dirname, 'certs', 'local.dev.devdevdev.co.kr-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'certs', 'local.dev.devdevdev.co.kr.pem')),
    },
  },
};

const sentryWebpackPluginOptions = {
  silent: true, // Sentry Webpack 플러그인의 로그 출력을 조정합니다.
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
