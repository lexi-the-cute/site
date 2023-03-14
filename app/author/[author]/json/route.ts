import { type NextRequest } from 'next/server';

export function GET(req: NextRequest, {params}) {
	const url = new URL(req.url)
	
	// TODO: Determine Protocol on Netlify Without Environment Var...
	// ...(req.connection.encrypted ? "https" : "http") worked when I was using API pages
	const proto = process.env.PROTOCOL || req.headers["x-forwarded-proto"] || url.protocol.split(":")[0]
	url.protocol = proto
	
	const host = req.headers["host"] || url.host
	const slug = params.author
	
	const domain = `${proto}://${host}`
	
	const author = `${domain}/author/${slug}`
	const publickey = typeof process.env.ActivityPubPublicKey !== "undefined" ? process.env.ActivityPubPublicKey.replace(/\\n/g, '\n') : ""
	
	const name = `${slug} <demo>`
	const message = `<p>This is a test post under the slug, "${slug}"</p>`
	const summary = `<p>I'm an author which can be found on <span class="h-card"><a href="https://chat.alexisart.me/@alexis" class="u-url mention">@<span>alexis</span></a></span>.</p>`
	
	const icon = `${domain}/images/logo.png`
	const header = `${domain}/images/header.png`
	const donate = `<a href="https://ko-fi.com/alexisartdesign" target="_blank" rel="nofollow noopener noreferrer me"><span class="invisible">https://</span><span class="">ko-fi.com/alexisartdesign</span><span class="invisible"></span></a>`
	const published = "2023-03-09T00:00:00Z"
	const isCat = true
	
	const response = {
		"@context": [
			"https://www.w3.org/ns/activitystreams",
			"https://w3id.org/security/v1",
			{
				"isCat": "misskey:isCat"
			}
		],
		"id": url,
		"type": "Service",
		"preferredUsername": slug,
		"url": author,
		"inbox": `${url}/inbox`,
		"outbox": `${url}/outbox`,
		"following": `${url}/following`,
		"followers": `${url}/followers`,
		"liked": `${url}/liked`,
		"publicKey": {
			"id": `${url}#main-key`,
			"owner": url,
			"publicKeyPem": publickey
		},
		"endpoints": {
			"sharedInbox": `${domain}/inbox`
		},
		
		"name": name,
		"summary": summary,
		"published": published,
		"isCat": isCat,
		"icon": {
			"type": "Image",
			"mediaType": "image/png",
			"url": icon
		},
		"image": {
			"type": "Image",
			"mediaType": "image/png",
			"url": header
		},
		"attachment": [
			{
				"type": "PropertyValue",
				"name": "Donate",
				"value": donate
			}
		],
		"tag": [
// 			{
// 				"id": `${domain}/emojis/blog`,
// 				"type": "Emoji",
// 				"name": ":blog:",
// 				"updated": "2023-02-25T19:36:09Z",
// 				"icon": {
// 					"type": "Image",
// 					"mediaType": "image/png",
// 					"url": `${domain}/images/emojis/blog.png`
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
