import * as readline from "node:readline";
process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", async function () {
	// This is when only x value is given as input
	for (let i = 0; i < 10; i++) {
		console.log("here x = " + i + " and y = 0");
		await new Promise((res) => setTimeout(res, i * 25));
		readline.cursorTo(process.stdout, i);
	}
	// This is when  x  and y values are given as input
	for (let i = 0; i < 10; i++) {
		await new Promise((res) => setTimeout(res, i * 25));
		console.log("here x = " + i + " and y = " + i);
		readline.cursorTo(process.stdout, i, i);
	}
});

console.log("This is interactive console for cursorTo explanation");

process.on("SIGINT", function () {
	process.stdout.write("\n end ok \n");
	process.exit();
});
