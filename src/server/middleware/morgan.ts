import morgan from "morgan";
import chalk from "chalk"; // or you can use the require('chalk') syntax too

export const morganMiddleware = morgan(function (tokens, req, res) {
	const referrer = tokens.referrer(req, res) ? (
		chalk.hex("#fffa65").bold("from " + tokens.referrer(req, res))
	) : "";
	return [
		chalk.hex("#ff4757").bold("🪵"),
		chalk.hex("#34ace0").bold(tokens.method(req, res)),
		chalk.hex("#ffb142").bold(tokens.status(req, res)),
		chalk.hex("#eeeeee").bold(tokens.url(req, res)),
		chalk.hex("#2ed573").bold(tokens["response-time"](req, res) + " ms"),
		chalk.hex("#f78fb3").bold("@ " + tokens.date(req, res)),
		chalk.yellow(tokens["remote-addr"](req, res)),
		referrer,
		chalk.hex("#1e90ff")(tokens["user-agent"](req, res)),
	].join(" ");
});
