// Node Imports
import fs from 'node:fs';
import path from 'node:path';

// React Imports
import React from 'react';
import {unified} from 'unified';
import {createElement, Fragment} from 'react';

// Markdown to React
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeReact from 'rehype-react';
import rehypeStringify from 'rehype-stringify';

// React Tags
import Link from 'next/link';
import Image from 'next/image';

export const POSTS_PATH = path.join(process.cwd(), 'posts');

export function ReadPostReact(slug) {
	const POST_PATH = path.join(POSTS_PATH, `${slug}.mdx`)
	
	if (!fs.existsSync(POST_PATH)) {
		return Promise.reject("Post does not exist")
	}
	
	return unified()
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
	.process(fs.readFileSync(POST_PATH))
}

export function ReadPostHTML(slug) {
	const POST_PATH = path.join(POSTS_PATH, `${slug}.mdx`)
	
	if (!fs.existsSync(POST_PATH)) {
		return Promise.reject("Post does not exist")
	}
	
	return unified()
	.use(remarkParse)
	.use(remarkFrontmatter)  // TODO: Put Frontmatter in VFile Data
	.use(remarkGfm)
	.use(remarkRehype)
	.use(rehypeSanitize)
	.use(rehypeStringify)  // TODO: Modify Haste Tree Before Stringify
	.process(fs.readFileSync(POST_PATH))
}
