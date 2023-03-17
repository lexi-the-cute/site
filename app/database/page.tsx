// TODO: Determine Why <Posts/> Causes Type Check Problems
import { Suspense, lazy } from 'react';

// This is the secret to forcing server side rendering during runtime
// https://beta.nextjs.org/docs/api-reference/segment-config#dynamic
export const dynamic = 'auto'

{/* @ts-expect-error Type Error */}
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
