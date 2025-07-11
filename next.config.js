/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['langchain', '@langchain/community']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        'langchain': 'commonjs langchain',
        '@langchain/community': 'commonjs @langchain/community'
      })
    }
    return config
  }
}

module.exports = nextConfig