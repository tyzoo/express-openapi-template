module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	env: {
		node: true,
	},
	rules: {
		indent: ["error", "tab", { SwitchCase: 1 }],
		// "no-unused-vars": "error",
		// "@typescript-eslint/no-unused-vars": "error",
		// "@typescript-eslint/indent": ["error", "tab", { SwitchCase: 1 }],
		"eol-last": ["error", "always"],
		semi: ["error", "always"],
		"prefer-const": "error",
		"no-mixed-spaces-and-tabs": "error",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"no-case-declarations": "off",
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
