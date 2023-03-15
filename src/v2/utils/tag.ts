import chalk from "chalk";

export function tag () {
    console.log([
        chalk.hex('#ffffff').bold('\n⚙️ ZooTools Express OpenAPI Server ⚙️'),
        chalk.hex('#ffffff')('By [@tyzoo](https://github.com/tyzoo)\n'),
    ].join('\n'));
}