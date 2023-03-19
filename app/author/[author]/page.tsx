// https://beta.nextjs.org/docs/rendering/server-and-client-components
// 

import Favorites from '../../../lib/components/Favorites'
import Pronouns from '../../../lib/components/Pronouns'

function Header({ title }) {
	return <h1>{title ? title : 'Default title'}</h1>;
}

export default async function Page({params}) {
	const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
	
	return (
		<div>
			<Header title={params.author} />
			<ul>
				{names.map((name) => (
					<li key={name}>{name}</li>
				))}
			</ul>
			<Favorites/>
			<Pronouns author={params.author}/>
		</div>
	)
}
