// https://beta.nextjs.org/docs/rendering/server-and-client-components

import Pronouns from '../../../lib/components/Pronouns'

function Header({ title }) {
	return <h1>{title ? title : 'Default title'}</h1>;
}

export default async function Page({params}) {
	return (
		<div>
			<Header title={params.author} />
			<Pronouns author={params.author}/>
		</div>
	)
}