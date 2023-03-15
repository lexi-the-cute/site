// TODO: Find Out If Prisma Can Even Work In The App Directory
// npx prisma studio segfaults on the same queries
import prisma from '../../lib/prisma';

export default async function Page({params}) {
	const posts = await prisma.posts.findMany()
	
	return (
		<div>
			<h1>Hello</h1>
			{posts.map((post) => (
				<div key={String(post.id)}>{post.slug}</div>
			))}
		</div>
	)
}
