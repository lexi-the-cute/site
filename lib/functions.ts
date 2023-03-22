import { authors } from '@prisma/client';
import prisma from './prisma';
import { type NextRequest } from 'next/server';


export function getContext(): {}[] {
	/* TODO: Check Everything In
	 * as: https://www.w3.org/TR/activitypub/
	 * https://w3id.org/security/v1
	 * 
	 * toot: https://docs.joinmastodon.org/spec/activitypub/ (http://joinmastodon.org/ns#)
	 * misskey: https://misskey-hub.net/ns#
	 * schema: http://schema.org#
	 * ostatus: http://ostatus.org#
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
			"ostatus": "http://ostatus.org#",  // This website is now filled with spam
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

export async function getAuthor(author: string): Promise<Response|authors> {
    const data = await prisma.authors.findUnique({where: {author: author}})
	if(!data) {
		const response = {error: "Not Found"}
		return new Response(JSON.stringify(response, null, 2), {
			status: 404,
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			}
		});
	}

    return data
}

export function getPost() {
	const response = {error: "Not Implemented"}
	return new Response(JSON.stringify(response, null, 2), {
		status: 401,
		headers: {
			"Content-Type": "application/activity+json; charset=utf-8"
		}
	});
}

export function parseImageJSON(json, domain) {
	const image = JSON.parse(json)
	image.type = "Image"
	
	if(image.url.startsWith("/"))
		image.url = new URL(`${domain}${image.url}`)
	
	return image
}

export function parseProperties(json) {
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

export function getURL(req: NextRequest): URL {
    // TODO: Determine Protocol on Netlify Without Environment Var...
	// ...(req.connection.encrypted ? "https" : "http") worked when I was using API pages
	const url = new URL(req.url)
	url.protocol = process.env.PROTOCOL || req.headers["x-forwarded-proto"] || url.protocol.split(":")[0]
	url.host = req.headers["Host"] || url.host  // id.host acts weird with more than one host on Netlify

    return url
}