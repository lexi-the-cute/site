import * as functions from '../../../../../lib/functions';
import { authors } from '@prisma/client';
import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest, {params}) {
	const data: Response|authors = await functions.getAuthor(params.author)
	
	// If Response, Just Pass It On
	if (data instanceof Response)
		return data
    
	return functions.notImplementedJSON()
}