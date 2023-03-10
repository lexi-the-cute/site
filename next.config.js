/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	async redirects() {
		return [
			{
				source: '/blog/:slug',
				destination: '/api/blog/:slug',
				permanent: false,
				has: [
					{
						// Accept: application/activity+json
						type: 'header',
						key: 'Accept',
						value: '(.*(?<found>application\/activity\\+json).*)'
					},
				],
			},
		]
	},
	async headers() {
		return [
// 			{
// 				source: '/blog/:slug/json',
// 				headers: [
// 					{
// 						key: 'Content-Type',
// 						value: 'application/activity+json; charset=utf-8'
// 					}
// 				]
// 			}
		]
	},
}

module.exports = nextConfig
