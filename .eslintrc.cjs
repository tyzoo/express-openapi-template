module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: "module", // Allows for the use of imports
		ecmaFeatures: {
			jsx: true, // Allows for the parsing of JSX
		},
	},
	plugins: ["@typescript-eslint", "import", "prettier"],
	// settings: {
	// 	react: {
	// 		version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
	// 	},
	// },
	extends: [
		"eslint:recommended",
		// "plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],
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
		"no-unused-vars": 1,
		"no-case-declarations": 0,
		"@typescript-eslint/no-unused-vars": 1,
		"@typescript-eslint/no-non-null-assertion": 0,
		"@typescript-eslint/no-explicit-any": 0,
		"@typescript-eslint/ban-ts-comment": 0,
		"@typescript-eslint/ban-types": 0,
		"@typescript-eslint/no-empty-interface": 0,
		// "react/prop-types": "off",
		// "react/display-name": "off",
		"import/order": ["error"],
		// "prettier/prettier": [
		// 	"error",
		// 	{
		// 		endOfLine: "auto",
		// 	},
		// ],
	},
	ignorePatterns: ["**/*.d.ts"],
	overrides: [
		{
			files: ["src/**/*.ts", "src/**/*.tsx"],
			rules: {
				indent: "off",
			},
		},
	],
};
