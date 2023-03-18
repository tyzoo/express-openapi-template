module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	env: {
		node: true,
	},
	rules: {
		// 0 = off, 1 = warn, 2 = error
		semi: [1, "always"],
		indent: [1, "tab", { SwitchCase: 1 }],
		"eol-last": [1, "always"],
		"prefer-const": 1,
		"no-mixed-spaces-and-tabs": 1,
		"no-unused-vars": "warn",
		"no-case-declarations": 0,
		"@typescript-eslint/no-unused-vars": "warn",
		"@typescript-eslint/no-non-null-assertion": 0,
		"@typescript-eslint/no-explicit-any": 0,
		"@typescript-eslint/ban-ts-comment": 0,
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			rules: {
				indent: "off",
			},
		},
	],
};
