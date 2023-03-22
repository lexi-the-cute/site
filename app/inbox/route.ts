import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest, {params}) {
	const response = {error: "Not Implemented"}
	return new Response(JSON.stringify(response, null, 2), {
		status: 501,
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		}
	});
}