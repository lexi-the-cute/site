import prisma from '../../../../lib/prisma';
import { type NextRequest } from 'next/server';

function getData(author) {
	return prisma.authors.findUnique({where: {author: author}}).then(function(results) {
		return results
	}).catch(function(error) {
		return error
	})
}

function parseImageJSON(json, domain) {
	const image = JSON.parse(json)
	image.type = "Image"
	
	if(image.url.startsWith("/"))
		image.url = new URL(`${domain}${image.url}`)
	
	return image
}

function parseProperties(json) {
	const properties: { type: string; name: any; value: any; }[] = []
	for(const property of JSON.parse(json)) {
		properties.push({
			type: "PropertyValue",
			name: property.key,
			value: property.value
		})
	}
	
	return properties
}

function getContext() {
	/* TODO: Check Everything In
	 * as: https://www.w3.org/TR/activitypub/
	 * https://w3id.org/security/v1
	 * 
	 * toot: https://docs.joinmastodon.org/spec/activitypub/ (http://joinmastodon.org/ns#)
	 * misskey: https://misskey-hub.net/ns#
	 * schema: http://schema.org#
	 * fedibird: http://fedibird.com/ns#
	 * vcard: http://www.w3.org/2006/vcard/ns#
	 */
	
	// `as:` refers to https://www.w3.org/ns/activitystreams
	
	return [
		"https://www.w3.org/ns/activitystreams",
		"https://w3id.org/security/v1",
		{
			// Actively Uses
			"toot": "http://joinmastodon.org/ns#",
			"misskey": "https://misskey-hub.net/ns#",
			"blog": "https://blog.alexisart.me/ns#", // TODO: Replace "blog" with a more specific string to deal with lazy parsers
			
			// Unknown If Will Use
			"fedibird": "http://fedibird.com/ns#",
			"schema": "http://schema.org#",
			"vcard": "http://www.w3.org/2006/vcard/ns#",
			
			// Used Context Items
			"Emoji": "toot:Emoji",
			"isCat": "misskey:isCat",
			"animal": "blog:animal"
		}
	]
}

export async function GET(req: NextRequest, {params}) {
	const data = await getData(params.author)
	
	// TODO: Check error
	
	// TODO: Determine Protocol on Netlify Without Environment Var...
	// ...(req.connection.encrypted ? "https" : "http") worked when I was using API pages
	const id = new URL(req.url)
	id.protocol = process.env.PROTOCOL || req.headers["x-forwarded-proto"] || id.protocol.split(":")[0]
	
	const domain = `${id.protocol}//${id.host}`
	
	const response = {
		"@context": getContext(),
		"id": id,
		"type": data.account_type,
		"preferredUsername": params.author,
		"url": `${domain}/author/${params.author}`,
		"inbox": `${id}/inbox`,
		"outbox": `${id}/outbox`,
		"following": `${id}/following`,
		"followers": `${id}/followers`,
		"liked": `${id}/liked`,
		"publicKey": {
			"id": `${id}#main-key`,
			"owner": id,
			"publicKeyPem": data.publickey
		},
		"endpoints": {
			"sharedInbox": `${domain}/inbox`
		},
		
		"name": data.display_name,
		"summary": data.summary,
		"published": data.published,
		"isCat": data.cat,  // TODO: Replace isCat with proper standard. https://codeberg.org/calckey/calckey/issues/9657#issuecomment-846318
		"icon": parseImageJSON(data.icon, domain),
		"image": parseImageJSON(data.header, domain),
		"attachment": parseProperties(data.properties),
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
