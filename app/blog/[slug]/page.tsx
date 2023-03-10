// https://beta.nextjs.org/docs/rendering/server-and-client-components
// 

import Favorites from '../../Favorites'

function Header({ title }) {
	return <h1>{title ? title : 'Default title'}</h1>;
}

export default async function Page({params}) {
	const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
	
	return (
		<div>
			<Header title={params.slug} />
			<ul>
				{names.map((name) => (
					<li key={name}>{name}</li>
				))}
			</ul>
			<Favorites>Favorites</Favorites>
		</div>
	)
}
