import { type NextRequest } from 'next/server';

export function GET(req: NextRequest, {params}) {
	const response = {
		error: "Not Implemented"
	}
	
	return new Response(JSON.stringify(response, null, 2), {
		status: 501,  // Technically GET and HEAD are required and should not be used with this status code, but whatever :shrugs:
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		}
	});
};
