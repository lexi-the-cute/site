import Link from 'next/link'

import { IconBrandInstagram, IconBrandSnapchat, IconBrandMastodon, IconBrandTwitch } from '@tabler/icons-react';
import TablerIcons from '../../../lib/components/TablerIcons'

export default function Page({params}) {
	// https://tabler-icons.io
	return (
		<div>
			<TablerIcons icon={"IconBrandInstagram"}/><Link href="https://instagram.com/alexis.the.cute">Instagram</Link><br/>
			<TablerIcons icon={"IconBrandSnapchat"}/><Link href="https://www.snapchat.com/add/alexisthecute23">Snapchat</Link><br/>
			<TablerIcons icon={"IconBrandMastodon"}/><Link href="https://chat.alexisart.me/@alexis">Mastodon</Link><br/>
			<TablerIcons icon={"IconBrandTwitch"}/><Link href="https://www.twitch.tv/lexithecute">Twitch</Link>
		</div>
	)
}
