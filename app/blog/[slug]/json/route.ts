import { type NextRequest } from 'next/server';

export function GET(req: NextRequest, {params}) {
	const url = new URL(req.url)
	
	const proto = req.headers["x-forwarded-proto"] || url.protocol.split(":")[0]
	const host = req.headers["host"] || url.host
	const slug = params.slug
	
	const domain = `${proto}://${host}`
	const page = `${domain}/blog/${slug}`
	const author = `${domain}/api/author/alexis`
	const followers = `${author}/followers`
	
	const message = `<p>This is a test post under the slug, "${slug}"</p>`
	
	const response = {
		"@context": [
			"https://www.w3.org/ns/activitystreams",
			{
				"ostatus": "http://ostatus.org#",
				"atomUri": "ostatus:atomUri",
				"inReplyToAtomUri": "ostatus:inReplyToAtomUri",
				"conversation": "ostatus:conversation",
				"sensitive": "as:sensitive",
				"toot": "http://joinmastodon.org/ns#",
				"Emoji": "toot:emoji"
			}
		],
		"id": url,
		"type": "Note",
		"summary": null,
		"inReplyTo": null,
		"published": "2023-03-06T00:00:00Z",
		"url": page,
		"attributedTo": author,
		"to": [
			"https://www.w3.org/ns/activitystreams#Public"
		],
		"cc": [
			followers
		],
		"sensitive": false,
		"content": message,
		"tag": [
// 			{
// 				"id": `${domain}/emojis/blog`,
// 				"type": "Emoji",
// 				"name": ":blog:",
// 				"updated": "2023-02-25T19:36:09Z",
// 				"icon": {
// 					"type": "Image",
// 					"mediaType": "image/png",
// 					"url": `${domain}/images/emojis/blog`
// 				}
// 			}
		]
	}
	
	return new Response(JSON.stringify(response, null, 2), {
		status: 200,
		headers: {
			"Content-Type": "application/activity+json; charset=utf-8"
		}
	});
};
