import * as functions from '../../../../../lib/functions';
import { authors } from '@prisma/client';
import { type NextRequest } from 'next/server';

// TODO: Implement OrderedCollectionPage Instead
function getPosts(req: NextRequest) {
	const id = functions.getURL(req)
	return {
		"@context": functions.getContext(),
		"id": id,
		"type": "OrderedCollection",
		"totalItems": 1431
	  }
}

export async function GET(req: NextRequest, {params}) {
	const data: Response|authors = await functions.getAuthor(params.author)
	
	// If Response, Just Pass It On
	if (data instanceof Response)
		return data
    
    // const response = getPosts(req)
	const response = {error: "Not Implemented"}
	return new Response(JSON.stringify(response, null, 2), {
		status: 501,
		headers: {
			"Content-Type": "application/activity+json; charset=utf-8"
		}
	});
}