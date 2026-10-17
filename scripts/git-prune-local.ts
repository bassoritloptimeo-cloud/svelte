import {execFileSync} from "node:child_process";

function git(args: string[]): string {
	return execFileSync("git", args, {encoding: "utf-8"});
}

const current = git(["symbolic-ref", "--short", "HEAD"]).trim();

const output = git(["for-each-ref", "--format=%(refname:short)\t%(upstream:track)", "refs/heads"]);

const gone = output
	.split("\n")
	.filter(Boolean)
	.map((line) => line.split("\t"))
	.filter(([, track]) => track?.includes("gone"))
	.map(([name]) => name)
	.filter((name) => name !== current);

if (gone.length === 0) {
	console.log("No local branches with a gone upstream.");
	process.exit(0);
}

for (const branch of gone) {
	git(["branch", "-D", branch]);
	console.log(`Deleted local branch ${branch} (upstream gone).`);
}
