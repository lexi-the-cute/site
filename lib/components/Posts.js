import prisma from '../../lib/prisma'

export default function Posts({children}) {
	return prisma.posts.findMany().then(function(posts) {
		return (
			<>
				{posts.map((post) => (
					<div key={String(post.id)}>{post.slug}</div>
				))}
			</>
		);
	}).catch(function(error) {
		console.log(`Error Retrieving Posts: ${error}`)
		return (
			<>
				<h1>Error Retrieving Posts</h1>
			</>
		);
	})
}
