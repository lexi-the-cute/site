// import prisma from '../../lib/prisma';
import { PrismaClient } from '@prisma/client';
const prisma: PrismaClient = new PrismaClient();

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
			<div>
				<h1>Hello</h1>
				{String(results)}
			</div>
		)
	}).catch(function(err) {
		console.error("Prisma Query Execution Error: ", err)
		
		return (
			<>
				<h1>Error: {err}</h1>
			</>
		)
	})
	
	return (
			<div>
				<h1>Nada</h1>
			</div>
		)
}
