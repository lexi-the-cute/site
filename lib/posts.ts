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

// Own Imports
import * as functions from './functions';


export async function ReadPostReact(slug: string) {
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
	.process(await functions.getPost(slug))
}

export async function ReadPostHTML(slug: string) {
	return unified()
	.use(remarkParse)
	.use(remarkFrontmatter)  // TODO: Put Frontmatter in VFile Data
	.use(remarkGfm)
	.use(remarkRehype)
	.use(rehypeSanitize)
	.use(rehypeStringify)  // TODO: Modify Haste Tree Before Stringify
	.process(await functions.getPost(slug))
}