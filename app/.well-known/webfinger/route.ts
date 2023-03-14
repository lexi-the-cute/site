import { type NextRequest } from 'next/server';

export function GET(req: NextRequest, {params}) {
	const url = new URL(req.url)
	
	const proto = req.headers["x-forwarded-proto"] || url.protocol.split(":")[0]
	const host = req.headers["host"] || url.host
	const searchParams = url.searchParams
	
	const domain = `${proto}://${host}`
	const resource = searchParams.has("resource") ? searchParams.get("resource") : ""
	const split = resource.split(":")
	
	if (resource == "" || split.length != 2) {
		return new Response("", {
			status: 400
		});
	} else {
		const author = split[1].split("@")[0]
		
		const response = {
			"subject": `${resource}`,
			"links": [
				{
					"rel": "self",
					"type": "application/activity+json",
					"href": `${domain}/api/author/${author}`
				}
			]
		}
		
		return new Response(JSON.stringify(response, null, 2), {
			status: 200,
			headers: {
				"Content-Type": "application/jrd+json; charset=utf-8"
			}
		});
	}
};
