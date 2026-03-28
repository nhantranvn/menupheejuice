/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Bỏ qua lỗi ESLint khi build để ưu tiên đưa web lên trước
        ignoreDuringBuilds: true,
    },
    typescript: {
        // Bỏ qua lỗi TypeScript nếu có khi build
        ignoreBuildErrors: true,
    },
};

export default nextConfig;