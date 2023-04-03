import React from 'react'
// import Image from 'next/image'
import prisma from '../prisma'

import { Suspense, lazy } from 'react'
import Loading from './Loading'

export default function Pronouns({author}) : React.ReactElement<any, any> {	
	return (
		<Suspense fallback={<Loading />}>
			{ /* This is a known issue: https://github.com/vercel/next.js/issues/42292#issuecomment-1298459024 */ }
			{ /* @ts-expect-error Typescript Doesn't Like Promise<Element> */ }
			<BuildCard author={author}/>
		</Suspense>
	)
}

async function BuildCard({author}) {
	return getData(author).then(function(results) {
		if (typeof results.error !== "undefined") {
			return (
				<div>
					<h3>{results.error}</h3>
				</div>
			)
		}
		
		return (
			<div>
				{/* TODO: Determine Size of Image For Card Before Using next/image (probably fill into css determined div */}
				<img alt={results.alt} src={results.avatar} className="pronouns-pfp"></img>
			</div>
		)
	})
}

function getID(author) {
	return prisma.authors.findMany({where: {author: author}}).then(function(authors) {
		if (authors.length <= 0) {
			// No Links Found
			return null
		}
		
		if (!authors[0].pronouns_id) {
			// Missing https://pronouns.page id.
			return null
		}
		
		return authors[0].pronouns_id
	}).catch(function(error) {
		return error
	})
}

function getPage(id) {
	const url = `https://pronouns.page/api/profile/get-id/${id}?version=2`
	
	return fetch(url).then(function(res) {
		return res.json().then(function(data) {
			if (!data.id)
				return null
			
			return data
		})
	})
}

async function getData(author) {
	if (!author)
		return {"error": "Missing Author Name"}
	
	try {
		const id = await getID(author)
		const results = await getPage(id)
		
		if (!results) {
// 			console.log("No Data Found!")
			return {"error": "Profile Does Not Exist"}
		}
		
		const avatar = results.avatar
		const lang = "en"
		const alt = `Profile picture of ${author} from pronouns.page`
		
		const names = results.profiles[lang].names
		const pronouns = results.profiles[lang].pronouns
		const description = results.profiles[lang].description
		
		return {
			"avatar": avatar,
			"name": names, // TODO: Parse out best name to use
			"pronouns": pronouns, // TODO: Parse out pronouns as string (e.g. she/her)
			"description": description,
			"lang": lang,
			"alt": alt
		}
	} catch(error) {
		// Database Error (e.g. table does not exist)
		console.error(`Database Error: '${error}' on Page '/author/${author}'. Try checking if your authors table exists...`)
		
		return {"error": "Unable To Retrieve Profile Data"}
	}
}