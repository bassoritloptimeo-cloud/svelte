export function randomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function distance(pos1: [number, number], pos2: [number, number]) {
	return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
}

export function wait(ms: number) {
	const promise = new Promise<void>(function (resolve) {
		setTimeout(function () {
			resolve();
		}, ms);
	});
	return promise;
}

export const clamp = (min: number, n: number, max: number) => Math.min(Math.max(0, n), max);

