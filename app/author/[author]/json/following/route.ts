import * as functions from '../../../../../lib/functions';
import * as activitypub from '../../../../../lib/activitypub';
import { authors } from '@prisma/client';
import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest, {params}) {
	const followings: activitypub.Followings = {
		"id": functions.getURL(req),
		"total": 0
	}

	const response = await activitypub.getFollowings(followings)
	return new Response(JSON.stringify(response, null, 2), {
		status: 200,
		headers: {
			"Content-Type": "application/activity+json; charset=utf-8"
		}
	});
}