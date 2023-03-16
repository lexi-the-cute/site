// https://beta.nextjs.org/docs/rendering/server-and-client-components

// Node Imports
import path from 'node:path';

// Next Imports
import { notFound } from 'next/navigation';

// React Tags
import Favorites from '../../../lib/components/Favorites'

// Own Imports
import { ReadPostReact, POSTS_PATH } from '../../../lib/posts'

function Header({ title }) {
	return <h1>{title ? title : 'Default title'}</h1>;
}

export default function Page({params}) {
	return ReadPostReact(params.slug).then(function(post) {
		const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

		// https://github.com/remarkjs/remark-frontmatter
		// post.data.matter
		// console.log(post.data)
		// TODO: See posts.ts
		
		return (
			<>
				<Header title={params.slug} />
				<ul>
					{names.map((name) => (
						<li key={name}>{name}</li>
					))}
				</ul>
				<Favorites>{POSTS_PATH}</Favorites>
				<div>
					{post.result}
				</div>
			</>
		)
	}).catch(function(error) {
		// Post does not exist.

		notFound();
	})
}
