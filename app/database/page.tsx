import prisma from '../../lib/prisma';

function getData(id) {
	return prisma.test.findUnique({
		select: {
			hello: true
		},
		where: {
			id: id
		},
		take: 1
	})
}

export default function Page({params}) {
	return getData(2).then(function(result) {
// 		console.log(await prisma.widget.create({ data: { } }));
		console.log("Start")
		console.log(result)
		console.log("End")
		
		return (
			<>
				<h1>Hello</h1>
			</>
		)
	}).catch(function(err) {
		console.log("Start Error")
		console.log(err)
		console.log("End Error")
	
		return (
			<>
				<h1>Error: {err}</h1>
			</>
		)
	})
}
