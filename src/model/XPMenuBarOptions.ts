interface XPMenuBarOptions {
	name: string,
	options: (string | XPMenuBarOptions)[],
	onSelect: (name: string) => void
}
