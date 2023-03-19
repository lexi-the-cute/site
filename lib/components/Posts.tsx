import prisma from '../prisma'
// 
// export default function Posts({children}) {
// 	return prisma.posts.findMany().then(function(posts) {
// 		return (
// 			<>
// 				{posts.map((post) => (
// 					<div key={String(post.id)} style={{display: 'inline'}}>{post.slug}</div>
// 				))}
// 			</>
// 		);
// 	}).catch(function(error) {
// 		console.log(`Error Retrieving Posts: ${error}`)
// 		return (
// 			<>
// 				<h1>Error Retrieving Posts</h1>
// 			</>
// 		);
// 	})
// }
