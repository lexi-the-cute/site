import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import remarkFrontmatter from 'remark-frontmatter';

// TODO: Take note of XSS In https://github.com/remarkjs/remark-rehype#security

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [remarkGfm], // https://github.com/remarkjs/remark-gfm#when-should-i-use-this
    rehypePlugins: [remarkRehype], // https://github.com/remarkjs/remark-rehype#when-should-i-use-this
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	reactStrictMode: true,
	experimental: {
		appDir: true,
	},
	async redirects() {
		return [
			{
				source: '/blog/:slug',
				destination: '/blog/:slug/json',
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
				destination: '/blog/:slug/json',
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
				source: '/author/:author',
				destination: '/author/:author/json',
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
				source: '/author/:author',
				destination: '/author/:author/json',
				permanent: false,
				has: [
					{
						// Accept: application/ld+json; profile="https://www.w3.org/ns/activitystreams"
						type: 'header',
						key: 'Accept',
						value: '(.*(?<found>application\/ld\\+json; profile="https:\/\/www\.w3\.org\/ns\/activitystreams").*)'
					}
				],
			}
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

export default withMDX(nextConfig);
