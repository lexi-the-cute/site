// @ts-nocheck
// TODO: Determine Why <Posts/> Causes Type Check Problems

import prisma from '../../lib/prisma'
import dynamic from 'next/dynamic'

import NoSSR from '../../lib/components/NoSSR'
import Posts from '../../lib/components/Posts'

export default function Page({params}) {
	return (
		<>
			<NoSSR>
				<h1>Hello <Posts/></h1>
			</NoSSR>
		</>
	)
}
