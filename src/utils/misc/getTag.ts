import chalk from "chalk";

export function getTag(props: {
  controllerCount: number | null;
  mongoHost: string | null;
  redisHost: string | null;
  apiHost: string | null;
  appName: string;
}) {
  const { controllerCount, mongoHost, redisHost, apiHost } = props;
  const controllersLoading = controllerCount === null;
  const dbLoading = mongoHost === null;
  const redisLoading = redisHost === null;
  const serverLoading = apiHost === null;

  const controllerMsg = controllersLoading ? "Loading API Controllers..." : `Loaded ${controllerCount} API Controllers`;
  const dbMsg = dbLoading ? "Loading MongoDB connection..." : `Connected to MongoDB via: ${mongoHost}`;
  const redisMsg = redisLoading ? "Loading Redis connection..." : `Connected to Redis via: ${redisHost}`;
  const serverMessage = serverLoading ? "Loading OpenAPI Server..." : `${props.appName} running at: ${apiHost}`;

  const messageLines = [
    ``, `        ${props.appName}`, ``,
    `   ©2023 @tyzoo https://github.com/tyzoo`, ``,
    `${controllersLoading ? "⏳" : "✅"} ${controllerMsg}`,
    `${dbLoading ? "⏳" : "📀"} ${dbMsg}`,
    `${redisLoading ? "⏳" : "📀"} ${redisMsg}`,
    `${serverLoading ? "⏳" : "🚀"} ${serverMessage}`, ``,
  ];
  const longest = [...messageLines].sort((a, b) => b.length - a.length)[0]
    .length;
  const extraPad = Math.max(longest - 47, 0);
  const border = "*".repeat(52 + extraPad);
  const message = messageLines
    .map((line) => "* " + line)
    .join("\n");
  const borderAndMessage = [
    "\n\n*" + border + "🛩",
    message,
    "*" + border + "🛩\n",
  ].join("\n");
  return chalk.hex("#ffffff")(borderAndMessage);
}
