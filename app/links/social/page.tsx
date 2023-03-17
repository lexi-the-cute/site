import Link from 'next/link'

import { IconBrandInstagram, IconBrandSnapchat, IconBrandMastodon, IconBrandTwitch } from '@tabler/icons-react';

export default function Page({params}) {
	// https://tabler-icons.io
	return (
		<div>
			<Link href="https://instagram.com/alexis.the.cute">Instagram</Link><br/>
			<Link href="https://www.snapchat.com/add/alexisthecute23">Snapchat</Link><br/>
			<Link href="https://chat.alexisart.me/@alexis">Mastodon</Link><br/>
			<Link href="https://www.twitch.tv/lexithecute">Twitch</Link>
		</div>
	)
}
