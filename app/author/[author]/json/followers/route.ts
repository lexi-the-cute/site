import * as functions from '../../../../../lib/functions';
import { authors } from '@prisma/client';
import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest, {params}) {
	const data: Response|authors = await functions.getAuthor(params.author)
	
	// If Response, Just Pass It On
	if (data instanceof Response)
		return data
    
    const response = {error: "Not Implemented"}
	return new Response(JSON.stringify(response, null, 2), {
		status: 501,
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		}
	});
}