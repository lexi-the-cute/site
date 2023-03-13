// @ts-nocheck

// https://beta.nextjs.org/docs/rendering/server-and-client-components

// Node Imports
import fs from 'node:fs/promises';
import path from 'node:path';

// Markdown to React
import {createElement, Fragment} from 'react'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeReact from 'rehype-react'

// React Tags
import Link from 'next/link'
import Image from 'next/image'
import Favorites from '../../Favorites'

const POSTS_PATH = path.join(process.cwd(), 'posts');

function Header({ title }) {
	return <h1>{title ? title : 'Default title'}</h1>;
}

async function ReadPost() {
	const POST_PATH = path.join(POSTS_PATH, "markdown.mdx")
	
	const file = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeSanitize)
		.use(rehypeReact, {  // TODO: Fix https://github.com/rehypejs/rehype-react/issues/39
			createElement,
			Fragment,
			components: {
				a: Link,
				img: Image
			}
		})
		.process(await fs.readFile(POST_PATH))
	
	return file
}

export default async function Page({params}) {
	const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
	
	const post = (await ReadPost()).result
	
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
				{post}
			</div>
		</>
	)
}
