import {asWritable, writable} from "@amadeus-it-group/tansu";

export function createHashStore<T extends Record<string, string>>(defaultValue: T) {
	const store$ = writable(defaultValue);
	const newStore$ = asWritable(store$, {
		set(value: Partial<T>): void {
			const newValues = {...store$(), ...value};
			store$.set(newValues);
			const params: string[] = [];
			for (const [key, value] of Object.entries(newValues)) {
				if (value !== defaultValue[key]) {
					params.push(`${key}=${value}`);
				}
			}
			history.replaceState(null, "", `#${params.join("&")}`);
		},
		reset() {
			newStore$.set({...defaultValue});
		},
	});

	return newStore$;
}
