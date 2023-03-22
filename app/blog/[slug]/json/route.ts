// Next Imports
import { type NextRequest } from 'next/server';

// Own Imports
import { ReadPostHTML } from '../../../../lib/posts';
import * as functions from '../../../../lib/functions';

export async function GET(req: NextRequest, {params}) {
	const id = functions.getURL(req)
	const slug = params.slug
	
	const domain = `${id.protocol}://${id.host}`
	const url = `${domain}/blog/${slug}`
	
	return ReadPostHTML(slug).then(function(post) {
		const author = `${domain}/author/alexis/json`
		const followers = `${author}/followers`
		
		const message = String(post)
		
		const response = {
			"@context": functions.getContext(),
			"id": id,
			"type": "Note",
			"summary": null,
			"inReplyTo": null,
			"published": "2023-03-06T00:00:00Z",
			"url": url,
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
