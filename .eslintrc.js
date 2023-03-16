module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	env: {
		node: true,
	},
	rules: {
		semi: ["error", "always"],
		indent: ["error", "tab", { SwitchCase: 1 }],
		"eol-last": ["error", "always"],
		"prefer-const": "error",
		"no-unused-vars": "off",
		"no-case-declarations": "off",
		"no-mixed-spaces-and-tabs": "error",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/ban-ts-comment": "off",
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
