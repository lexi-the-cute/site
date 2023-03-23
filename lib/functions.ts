// Node Imports
import fs from 'node:fs';
import path from 'node:path';

import { authors, posts } from '@prisma/client';
import prisma from './prisma';
import { type NextRequest } from 'next/server';

export async function getAuthor(author: string): Promise<Response|authors> {
	const domain = null
    const data: authors|null = await prisma.authors.findFirst({where: {author: author, domain: domain}})
	if(!data)
		return notFoundJSON()

    return data
}

export async function getAuthorID(author: string): Promise<Response|bigint> {
	const data: Response|authors = await getAuthor(author)

	// If Response, Just Pass It On
	if (data instanceof Response)
		return data

	return data.id
}

export async function getAuthorByID(id: bigint): Promise<Response|authors> {
    const data: authors|null = await prisma.authors.findUnique({where: {id: id}})
	if(!data)
		return notFoundJSON()

    return data
}

export async function getPost(slug: string): Promise<never|posts> {
	const data: posts|null = await prisma.posts.findUnique({where: {slug: slug}})
	if(!data)
		return Promise.reject(notFoundJSON())

    return data
}

export async function getPostsByAuthor(author: string): Promise<Response|posts[]> {
	const id: Response|bigint = await getAuthorID(author)

	// If Response, Just Pass It On
	if (id instanceof Response)
		return id

	const data: posts[]|null = await prisma.posts.findMany({where: {author: id}})

	if(!data)
		return notFoundJSON()

    return data
}

export async function getFollowers(author: string): Promise<Response|authors> {
	const domain = null
    const data: authors|null = await prisma.authors.findFirst({where: {author: author, domain: domain}})
	if(!data)
		return notFoundJSON()

    return data
}

export function getPostFile(slug: string): Promise<never>|Buffer {
	const POSTS_PATH = path.join(process.cwd(), 'posts');
	const POST_PATH = path.join(POSTS_PATH, `${slug}.mdx`)
	
	if (!fs.existsSync(POST_PATH))
		return Promise.reject("Post does not exist")

	return fs.readFileSync(POST_PATH)
}

export function parseImageJSON(image, domain) {
	image.type = "Image"
	
	if(image.url.startsWith("/"))
		image.url = new URL(`${domain}${image.url}`)
	
	return image
}

export function parseProperties(json) {
	const properties: { type: string; name: any; value: any; }[] = []
	for(const property of json) {
		properties.push({
			type: "PropertyValue",
			name: property.key,
			value: property.value
		})
	}
	
	return properties
}

export function getURL(req: NextRequest): URL {
    // TODO: Determine Protocol on Netlify Without Environment Var...
	// ...(req.connection.encrypted ? "https" : "http") worked when I was using API pages
	const url = new URL(req.url)
	url.protocol = process.env.PROTOCOL || req.headers["x-forwarded-proto"] || url.protocol.split(":")[0]
	url.host = req.headers["Host"] || url.host  // id.host acts weird with more than one host on Netlify

    return url
}

export function notFoundJSON(): Response {
	const response = {error: "Not Found"}
	return new Response(JSON.stringify(response, null, 2), {
		status: 404,
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		}
	});
}

export function notImplementedJSON(): Response {
	const response = {error: "Not Implemented"}
	return new Response(JSON.stringify(response, null, 2), {
		status: 501,
		headers: {
			"Content-Type": "application/activity+json; charset=utf-8"
		}
	});
}