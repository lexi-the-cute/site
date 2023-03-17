// @ts-nocheck
// TODO: Determine Why <Posts/> Causes Type Check Problems
import { Suspense, lazy } from 'react';

const Posts = lazy(() => import('../../lib/components/Posts'));

export default function Page({params}) {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<h1>Hello <Posts/></h1>
			</Suspense>
		</>
	)
}

function Loading() {
	return <h2>Loading...</h2>
}
