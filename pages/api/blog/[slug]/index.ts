// import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req, res) {
// 	console.log(req)
	
	const proto = req.headers["x-forwarded-proto"] || req.connection.encrypted ? "https" : "http"  // https://stackoverflow.com/a/65892809
	const slug = req.query.slug
	
	const domain = `${proto}://${req.headers.host}`
	const path = req.url
	const url = `${domain}${path}`
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
	
	res.status(200)
	res.setHeader("Content-Type", "application/activity+json; charset=utf-8")
	res.send(JSON.stringify(response, null, 2));
};
