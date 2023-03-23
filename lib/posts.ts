// React Imports
import React from 'react';
import {unified} from 'unified';

// Markdown to React
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeReact from 'rehype-react';
import rehypeStringify from 'rehype-stringify';

// Own Imports
import * as functions from './functions';
import { posts } from '@prisma/client';


export async function ReadPostReact(slug: string) {
	const data: never|posts|any = await functions.getPost(slug)
	return renderReact(data)
}

export async function renderReact(data: posts|any) {
	data.rendered = await unified()
	.use(remarkParse)
	.use(remarkFrontmatter)  // TODO: Put Frontmatter in VFile Data
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
	.process(data.content)

	return data
}

export async function ReadPostHTML(slug: string) {
	const data: never|posts|any = await functions.getPost(slug)
	return renderHTML(data)
}

export async function renderHTML(data: posts|any) {
	data.rendered = await unified()
	.use(remarkParse)
	.use(remarkFrontmatter)  // TODO: Put Frontmatter in VFile Data
	.use(remarkGfm)
	.use(remarkRehype)
	.use(rehypeSanitize)
	.use(rehypeStringify)  // TODO: Modify Haste Tree Before Stringify
	.process(data.content)

	return data
}