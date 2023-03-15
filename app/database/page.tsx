import prisma from '../../lib/prisma';

function getData(id) {
	return prisma.test.findUnique({
		where: {
			id: id
		}
	})
}

export default function Page({params}) {
	return getData(2).then(function(results) {
		// console.log(await prisma.widget.create({ data: { } }));
		console.log("Results: ", results)
		
		return (
			<>
				<h1>Hello {results}</h1>
			</>
		)
	}).catch(function(err) {
		console.error("Prisma Query Execution Error: ", err)
		
		return (
			<>
				<h1>Error: {err}</h1>
			</>
		)
	})
}
