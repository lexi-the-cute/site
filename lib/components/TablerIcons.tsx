// https://tabler-icons.io
import * as icons from "@tabler/icons-react"

export default function TablerIcons(props) {
	const { icon, color = "black", size = 36, stroke = 1, strokeLinejoin = "miter" } = props

	let Icon = icons[icon] 

	if (Icon) {
		return (
			<>
				<Icon width={size} color={color} stroke={stroke} strokeLinejoin={strokeLinejoin} />
			</>
		)
	}

	Icon = icons["IconError404"]
	return (
			<>
				<Icon width={size} color={color} stroke={stroke} strokeLinejoin={strokeLinejoin} className={"tabler-icon tabler-icon-error-404 tabler-icon-missing-icon"} />
			</>
	)
}
