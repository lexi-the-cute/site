import Link from 'next/link'
import { Suspense, lazy } from 'react'
import prisma from '../../../lib/prisma'
import { notFound } from 'next/navigation'
import Loading from '../../../lib/components/Loading'
import TablerIcons from '../../../lib/components/TablerIcons'

function getLinks(page) {
	return prisma.links.findMany({where: {page: page}}).then(function(links) {
		return links
	}).catch(function(error) {
		return error
	})
}

export default async function Page({params}) {
	const page = params.page
	try {
		const links = await getLinks(page)
		
		if (links.length <= 0) {
			// No Links Found
			notFound()
		}
		
		return (
			<div className="social-links">
				{/* @ts-expect-error { <Loading /> causes missing property error on build } */}
				<Suspense fallback={<Loading />}>
					{links.map((link) => (
						<div key={String(link.id)} className={`social-link page-${link.page}`}>
							<Link rel="me" href={link.url}><TablerIcons icon={link.icon}/>{link.text}</Link>
						</div>
					))}
				</Suspense>
			</div>
		)
	} catch(error) {
		// Database Error (e.g. table does not exist)
		console.error(`Database Error: '${error}' on Page '/links/${page}'. Try checking if your links table exists...`)
		notFound()
	}
}
