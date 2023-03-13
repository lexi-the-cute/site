// https://beta.nextjs.org/docs/rendering/server-and-client-components

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Favorites from '../../Favorites'

const POSTS_PATH = path.join(process.cwd(), 'posts');

function Header({ title }) {
	return <h1>{title ? title : 'Default title'}</h1>;
}

export default async function Page({params}) {
	const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
	
	return (
		<div>
			<Header title={params.slug} />
			<ul>
				{names.map((name) => (
					<li key={name}>{name}</li>
				))}
			</ul>
			<Favorites>{POSTS_PATH}</Favorites>
		</div>
	)
}
