// Meta Tags (<meta name="robots" content="noindex">) (https://developers.google.com/search/docs/crawling-indexing/block-indexing): NoIndex, NoFollow, NoArchive, NoSnippet
// Headers (https://developers.google.com/search/docs/crawling-indexing/block-indexing): X-Robots-Tag: noindex
// Files: robots.txt, sitemap.xml, atom.xml
// Hashtags; NoArchive, NoIndex, NoSearch, NoBot
export const metadata = {
	title: "Alexis' Site",
	description: "A blog with ActivityPub support"
}

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		// Can't stick <!Doctype html> in this
		<html lang="en">
			<head>
				<link rel="shortcut icon" href="/images/favicon.png" />
			</head>
			<body>{children}</body>
		</html>
	)
}