export function debounce(fn, wait) {
	let debounceId = void 0;
	return (...args) => {
		if (debounceId) {
			clearTimeout(debounceId);
		}
		debounceId = setTimeout(() => {
			fn(...args)
		}, wait);
	}
}