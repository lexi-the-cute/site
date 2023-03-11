export const metadata = {
	title: "Alexis' Site",
	description: "A blog with ActivityPub support"
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<head>
				<link rel="shortcut icon" href="/images/favicon.png" />
			</head>
			<body>{children}</body>
		</html>
	)
}
