import * as functions from '../../../../lib/functions';
import * as activitypub from '../../../../lib/activitypub';
import { authors } from '@prisma/client';
import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest, {params}) {
	const data: Response|authors = await functions.getAuthor(params.author)
	
	// If Response, Just Pass It On
	if (data instanceof Response)
		return data

	const id = functions.getURL(req)
	const domain = `${id.protocol}//${id.host}`
	
	const response = {
		"@context": activitypub.getContext(),
		"id": id,
		"type": data.account_type,
		"preferredUsername": params.author,
		"url": `${domain}/author/${params.author}`,
		"inbox": `${id}/inbox`,
		"outbox": `${id}/outbox`,
		"following": `${id}/following`,
		"followers": `${id}/followers`,
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
		"icon": functions.parseImageJSON(data.icon, domain),
		"image": functions.parseImageJSON(data.header, domain),
		"attachment": functions.parseProperties(data.properties),
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