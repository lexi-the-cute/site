import { type NextRequest } from 'next/server';
import { authors, posts } from '@prisma/client';
import * as functions from '../../../../../lib/functions';
import * as activitypub from '../../../../../lib/activitypub';
import { renderHTML } from '../../../../../lib/posts';

// TODO: Implement OrderedCollectionPage Instead
function getPosts(req: NextRequest, items: {}[]) {
	const id = functions.getURL(req)
	return {
		"@context": activitypub.getContext(),
		"id": id,
		"type": "OrderedCollection",
		"totalItems": items.length,
		"orderedItems": items
	  }
}

function getNote(req: NextRequest, author: authors, post: posts|any) {
	const id = functions.getURL(req)
	const domain = `${id.protocol}//${id.host}`
	const url = `${domain}/blog/${post.slug}`

	const note: activitypub.Note = {
		context: activitypub.getContext(),
		id: id,
		published: post.published,
		url: url,
		author: author.author,
		sensitive: post.sensitive,
		content: String(post.rendered),
		tag: []
	}

	const create: activitypub.Create = {
		id: new URL(`${url}/activity`),
		author: author.author,
		note: activitypub.createNote(note)
	}
	
	return activitypub.createActivity(create)
}

export async function GET(req: NextRequest, {params}) {
	const author: Response|authors = await functions.getAuthor(params.author)
	const posts: Response|posts[] = await functions.getPostsByAuthor(params.author)

	// If Response, Just Pass It On
	if (author instanceof Response)
		return author

	// If Response, Just Pass It On
	if (posts instanceof Response)
		return posts

	const items: {}[] = []
	for (const post in posts) {
		items.push(await getNote(req, author, await renderHTML(posts[post])))
	}

    const response = getPosts(req, items)
	return new Response(JSON.stringify(response, null, 2), {
		status: 200,
		headers: {
			"Content-Type": "application/activity+json; charset=utf-8"
		}
	});
}