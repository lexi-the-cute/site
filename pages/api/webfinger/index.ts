export default async function handler(req, res) {	
	const proto = req.headers["x-forwarded-proto"] || req.connection.encrypted ? "https" : "http"  // https://stackoverflow.com/a/65892809
	
	const domain = `${proto}://${req.headers.host}`
	const query = req.query.resource ? req.query.resource : ""
	const split = query.split(":")
	
	if (query == "" || split.length != 2) {
		res.status(400).send("");
	} else {
		const user = split[1].split("@")[0]
		
		const response = {
			"subject": `${query}`,
			"links": [
				{
					"rel": "self",
					"type": "application/activity+json",
					"href": `${domain}/api/users/${user}`
				}
			]
		}
		
		res.status(200)
		res.setHeader("Content-Type", "application/jrd+json; charset=utf-8")
		res.send(JSON.stringify(response, null, 2));
	}
};
