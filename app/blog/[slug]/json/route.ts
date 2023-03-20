// Next Imports
import { type NextRequest } from 'next/server';

// Own Imports
import { ReadPostHTML, POSTS_PATH } from '../../../../lib/posts'

export function GET(req: NextRequest, {params}) {
	const url = new URL(req.url)
	
	// TODO: Determine Protocol on Netlify Without Environment Var...
	// ...(req.connection.encrypted ? "https" : "http") worked when I was using API pages
	const proto = process.env.PROTOCOL || req.headers["x-forwarded-proto"] || url.protocol.split(":")[0]
	url.protocol = proto
	
	const host = req.headers["host"] || url.host
	const slug = params.slug
	
	const domain = `${proto}://${host}`
	const page = `${domain}/blog/${slug}`
	
	
	return ReadPostHTML(slug).then(function(post) {
		const author = `${domain}/author/alexis/json`
		const followers = `${author}/followers`
		
		const message = String(post)
		
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
// 				{
// 					"id": `${domain}/emojis/blog`,
// 					"type": "Emoji",
// 					"name": ":blog:",
// 					"updated": "2023-02-25T19:36:09Z",
// 					"icon": {
// 						"type": "Image",
// 						"mediaType": "image/png",
// 						"url": `${domain}/images/emojis/blog`
// 					}
// 				}
			]
		}
		
		return new Response(JSON.stringify(response, null, 2), {
			status: 200,
			headers: {
				"Content-Type": "application/activity+json; charset=utf-8"
			}
		});
	}).catch(function(error) {
		// Post does not exist.

		const response = {error: "Not Found"}
		return new Response(JSON.stringify(response, null, 2), {
			status: 404,
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			}
		});
	})
};
