import Link from 'next/link'
import { Suspense, lazy } from 'react'
import prisma from '../../../lib/prisma'
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
	const links = await getLinks(page)
	
	return (
		<div className="social-links">
			<Suspense fallback={<Loading />}>
				{links.map((link) => (
					<div key={String(link.id)} className={`social-link page-${link.page}`}>
						<Link href={link.url}><TablerIcons icon={link.icon}/>{link.text}</Link>
					</div>
				))}
			</Suspense>
		</div>
	)
}
