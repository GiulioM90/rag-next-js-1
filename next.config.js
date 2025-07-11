/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@huggingface/transformers', 'langchain', '@langchain/community']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        '@huggingface/transformers': 'commonjs @huggingface/transformers',
        'langchain': 'commonjs langchain',
        '@langchain/community': 'commonjs @langchain/community'
      })
    }
    return config
  }
}

module.exports = nextConfig