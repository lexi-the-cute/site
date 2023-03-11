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
					}
				],
			},
			{
				source: '/blog/:slug',
				destination: '/api/blog/:slug',
				permanent: false,
				has: [
					{
						// Accept: application/ld+json; profile="https://www.w3.org/ns/activitystreams"
						type: 'header',
						key: 'Accept',
						value: '(.*(?<found>application\/ld\\+json; profile="https:\/\/www\.w3\.org\/ns\/activitystreams").*)'
					}
				],
			},
			{
				source: '/author/:slug',
				destination: '/api/author/:slug',
				permanent: false,
				has: [
					{
						// Accept: application/activity+json
						type: 'header',
						key: 'Accept',
						value: '(.*(?<found>application\/activity\\+json).*)'
					}
				],
			},
			{
				source: '/author/:slug',
				destination: '/api/author/:slug',
				permanent: false,
				has: [
					{
						// Accept: application/ld+json; profile="https://www.w3.org/ns/activitystreams"
						type: 'header',
						key: 'Accept',
						value: '(.*(?<found>application\/ld\\+json; profile="https:\/\/www\.w3\.org\/ns\/activitystreams").*)'
					}
				],
			},
			{
				source: '/.well-known/webfinger',
				destination: '/api/webfinger',
				permanent: false
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
