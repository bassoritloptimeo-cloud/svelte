import { computed, writable } from "@amadeus-it-group/tansu";

export const counter$ = writable(0);
export const double$ = computed(() => counter$() * 2);

export function increment() {
    counter$.set(counter$() + 1);
}
