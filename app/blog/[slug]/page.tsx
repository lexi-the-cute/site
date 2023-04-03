// https://beta.nextjs.org/docs/rendering/server-and-client-components

// Node Imports
import path from 'node:path';

// Next Imports
import { notFound } from 'next/navigation';

// React Tags
import Favorites from '../../../lib/components/Favorites'

// Own Imports
import { ReadPostReact } from '../../../lib/posts'
import * as functions from '../../../lib/functions';
import { authors } from '@prisma/client';

function Header({ title }) {
	return <h1>{title ? title : 'Default title'}</h1>;
}

export default async function Page({params}) {
	return ReadPostReact(params.slug).then(async function(post) {
		const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

		// https://github.com/remarkjs/remark-frontmatter
		// post.data.matter
		// console.log(post.data)
		// TODO: See posts.ts
		
		const slug = params.slug
		const published = post.published
		const author: Response|authors = await functions.getAuthorByID(post.author)
		const sensitive = post.sensitive
		const tag = post.tag

		// TODO: Figure out why this breaks on file save
		if (author instanceof Response) {
			console.error(`Author '${post.author}' not found!`)
			notFound()
		}

		return (
			<>
				<Header title={`${slug} by ${author.display_name}`} />
				<ul>
					{names.map((name) => (
						<li key={name}>{name}</li>
					))}
				</ul>
				<Favorites/>
				<div>
					{post.rendered.result}
				</div>
			</>
		)
	}).catch(function(error) {
		// Post does not exist.

		notFound();
	})
}