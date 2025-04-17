export default interface MenuBarOption {
	name: string,
	options?: string[],
	onSelect?: (name: string) => void
}
