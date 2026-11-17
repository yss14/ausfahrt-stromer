import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { LEGACY_HOST, SITE_URL } from './src/config/site';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: LEGACY_HOST }],
        destination: `${SITE_URL.origin}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
