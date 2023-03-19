import prisma from '../prisma'

export default async function Pronouns({author}) {
	if (!author)
		return (
			<div>
				<h3>Missing Author Name</h3>
			</div>
		)
	
	try {
		const id = await getID(author)
		
		return getPage(id).then(function(results) {
			if (!results) {
// 				console.log("No Data Found!")
				return (
					<div>
						<h3>Profile Does Not Exist</h3>
					</div>
				)
			}
				
			const avatar = results.avatar
			const lang = "en"
			const names = results.profiles[lang].names
			const pronouns = results.profiles[lang].pronouns
			const description = results.profiles[lang].description
			const age = results.profiles[lang].age
			const links = results.profiles[lang].links
			const flags = results.profiles[lang].flags
			
			return (
				<div>
					<img src={avatar}></img>
				</div>
			);
		})
	} catch(error) {
		// Database Error (e.g. table does not exist)
		console.error(`Database Error: '${error}' on Page '/author/${author}'. Try checking if your authors table exists...`)
		
		return (
			<div>
				<h3>Unable To Retrieve Profile Data</h3>
			</div>
		)
	}
}

async function getPage(id) {
	const url = `https://pronouns.page/api/profile/get-id/${id}?version=2`
	
	const res = await fetch(url)
	const data = await res.json()
	
	if (!data.id)
		return null
	
	return data
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
