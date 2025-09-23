/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removido appDir experimental - não é mais necessário no Next.js 14
  webpack: (config) => {
    // Otimizações para Three.js no Vercel
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    }
    
    // Configurações para GLB/GLTF
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/models/',
          outputPath: 'static/models/',
        },
      },
    })
    
    return config
  },
  
  // Otimizações de build
  images: {
    unoptimized: true,
  },
  
  // Configurações para deploy no Vercel
  output: 'standalone',
}

module.exports = nextConfig
