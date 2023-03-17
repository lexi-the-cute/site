import Link from 'next/link'

import { IconCut, IconChartBubble, IconBox, IconMug } from '@tabler/icons-react';

export default function Page({params}) {
	// https://tabler-icons.io
	return (
		<div>
			<Link href="https://www.spoonflower.com/profiles/alexis%27_custom_designs">Spoonflower</Link><br/>
			<Link href="https://AlexisArtDesign.redbubble.com/">Redbubble</Link><br/>
			<Link href="https://www.printerstudio.com/sell/alexis-art">Printer Studio</Link><br/>
			<Link href="https://ko-fi.com/alexisartdesign">Ko-Fi</Link>
		</div>
	)
}
