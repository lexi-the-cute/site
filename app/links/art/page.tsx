import Link from 'next/link'

import { IconCut, IconChartBubble, IconBox, IconMug } from '@tabler/icons-react';
import TablerIcons from '../../../lib/components/TablerIcons'

export default function Page({params}) {
	// https://tabler-icons.io
	// <TablerIcons icon={"IconBrandAmazon"} color={"..."} size={"..."} stroke={...} />
	return (
		<div>
			<TablerIcons icon={"IconCut"}/><Link href="https://www.spoonflower.com/profiles/alexis%27_custom_designs">Spoonflower</Link><br/>
			<TablerIcons icon={"IconChartBubble"}/><Link href="https://AlexisArtDesign.redbubble.com/">Redbubble</Link><br/>
			<TablerIcons icon={"IconBox"}/><Link href="https://www.printerstudio.com/sell/alexis-art">Printer Studio</Link><br/>
			<TablerIcons icon={"IconMug"}/><Link href="https://ko-fi.com/alexisartdesign">Ko-Fi</Link>
		</div>
	)
}
