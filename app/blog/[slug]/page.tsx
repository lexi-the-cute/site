// https://beta.nextjs.org/docs/rendering/server-and-client-components

// Node Imports
import fs from 'node:fs';
import path from 'node:path';

// Next Imports
import { notFound } from 'next/navigation';

// React Imports
import React from 'react';
import {unified} from 'unified';
import {createElement, Fragment} from 'react';

// Markdown to React
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeReact from 'rehype-react';

// React Tags
import Link from 'next/link';
import Image from 'next/image';
import Favorites from '../../Favorites';

const POSTS_PATH = path.join(process.cwd(), 'posts');

function Header({ title }) {
	return <h1>{title ? title : 'Default title'}</h1>;
}

function ReadPost(slug) {
	const POST_PATH = path.join(POSTS_PATH, `${slug}.mdx`)
	
	if (!fs.existsSync(POST_PATH)) {
		return Promise.reject("Post does not exist")
	}
	
	return unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkRehype)
	.use(rehypeSanitize)
	.use(rehypeReact, {
		createElement: React.createElement,
		Fragment: React.Fragment,
		components: {
			// `// @ts-nocheck` at top of file if you want to use the below 2 replacements
// 			a: Link,
// 			img: Image
		}
	})
	.process(fs.readFileSync(POST_PATH))
}

export default function Page({params}) {
	return ReadPost(params.slug).then(function(post) {
		const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

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
