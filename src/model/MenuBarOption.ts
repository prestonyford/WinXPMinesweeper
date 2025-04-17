export default interface MenuBarOption {
	name: string,
	options?: (string | MenuBarOption)[],
	onSelect?: () => void
}
