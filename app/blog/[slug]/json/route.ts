// Next Imports
import { type NextRequest } from 'next/server';

// Own Imports
import { ReadPostHTML } from '../../../../lib/posts';
import * as functions from '../../../../lib/functions';
import * as activitypub from '../../../../lib/activitypub';
import { authors } from '@prisma/client';

export async function GET(req: NextRequest, {params}) {
	const id = functions.getURL(req)
	const slug = params.slug
	
	const domain = `${id.protocol}//${id.host}`
	const url = `${domain}/blog/${slug}`
	
	return ReadPostHTML(slug).then(async function(post) {
		const author_data: Response|authors = await functions.getAuthorByID(post.author)

		// If Response, Just Pass it On
		if (author_data instanceof Response)
			return author_data

		const author_name = author_data.author
		const author = `${domain}/author/${author_name}/json`
		const tag = post.tag ? post.tag : []

		const note: activitypub.Note = {
			context: activitypub.getContext(),
			id: id,
			published: post.published,
			url: url,
			author: author,
			sensitive: post.sensitive,
			content: String(post.rendered),
			tag: tag
		}
		const response = await activitypub.createNote(note)
		
		return new Response(JSON.stringify(response, null, 2), {
			status: 200,
			headers: {
				"Content-Type": "application/activity+json; charset=utf-8"
			}
		});
	}).catch(function(error) {
		// Post does not exist.
		return functions.notFoundJSON();
	})
};