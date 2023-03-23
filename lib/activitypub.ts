export type Note = {
    context: {}[],
    id: URL,
    published: string,
    url: string,
    author: string,
    sensitive: boolean,
    content: string,
    tag: []
}

export type Create = {
    id: URL,
    author: string,
    note: {}  // See about making a standard type for this
}

export async function createNote(note: Note): Promise<{}> {
    // TODO: Determine if Will Ever Need To Change Visibility Of Posts
    // Note: Mentions Will Not Be Implemented
    const to = [
        "https://www.w3.org/ns/activitystreams#Public"
    ]

    const cc = [
        `${note.author}/followers`
    ]

    return {
        "@context": note.context,
        "id": note.id,
        "type": "Note",
        "summary": null,
        "inReplyTo": null,
        "published": note.published,
        "url": note.url,
        "attributedTo": note.author,
        "to": to,
        "cc": cc,
        "sensitive": note.sensitive,
        "content": note.content,
        "tag": note.tag
    }
}

export async function createActivity(create: Create): Promise<{}> {
    // TODO: Determine if Will Ever Need To Change Visibility Of Posts
    // Note: Mentions Will Not Be Implemented
    const to = [
        "https://www.w3.org/ns/activitystreams#Public"
    ]

    const cc = [
        `${create.author}/followers`
    ]

    return {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Create",
        "id": create.id,
        "to": to,
        "cc": cc,
        "actor": create.author,
        "object": create.note
    }
}

export function getContext(): {}[] {
	/* TODO: Check Everything In
	 * as: https://www.w3.org/TR/activitypub/
	 * https://w3id.org/security/v1
	 * 
	 * toot: https://docs.joinmastodon.org/spec/activitypub/ (http://joinmastodon.org/ns#)
	 * misskey: https://misskey-hub.net/ns#
	 * schema: http://schema.org#
	 * ostatus: http://ostatus.org#
	 * fedibird: http://fedibird.com/ns#
	 * vcard: http://www.w3.org/2006/vcard/ns#
	 */
	
	// `as:` refers to https://www.w3.org/ns/activitystreams

	return [
		"https://www.w3.org/ns/activitystreams",
		"https://w3id.org/security/v1",
		{
			// Actively Uses
			"toot": "http://joinmastodon.org/ns#",
			"misskey": "https://misskey-hub.net/ns#",
			"blog": "https://blog.alexisart.me/ns#", // TODO: Replace "blog" with a more specific string to deal with lazy parsers
			
			// Unknown If Will Use
			"ostatus": "http://ostatus.org#",  // This website is now filled with spam
			"fedibird": "http://fedibird.com/ns#",
			"schema": "http://schema.org#",
			"vcard": "http://www.w3.org/2006/vcard/ns#",
			
			// Used Context Items
			"Emoji": "toot:Emoji",
			"isCat": "misskey:isCat",
			"animal": "blog:animal"
		}
	]
}