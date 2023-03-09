import Head from 'next/head'
import { useState } from 'react'
import { headers } from 'next/headers'
import { useRouter } from 'next/router'

function Header({ title }) {
	return <h1>{title ? title : 'Default title'}</h1>;
}

export default function Page(request: Request) {
	const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

	const [likes, setLikes] = useState(0);
	
	const router = useRouter()

// 	const headersList = headers();
// 	const accept = headersList.get('Accept');
	
	function handleClick() {
		setLikes(likes + 1);
	}
	
	return (
		<div>
			<Head>
				<title>My page title</title>
			</Head>
			<Header title="Develop. Preview. Ship. 🚀" />
			
			<h2>pathname:- {router.pathname}</h2>
			<h2>query:- {router.query["q"]}</h2>
			<h2>asPath:- {router.asPath}</h2>
			
			<p>accept</p>
			<ul>
				{names.map((name) => (
					<li key={name}>{name}</li>
				))}
			</ul>

			<button onClick={handleClick}>Like ({likes})</button>
		</div>
	)
}
