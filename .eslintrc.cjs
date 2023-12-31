module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"prettier",
		"eslint:recommended",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh"],
	rules: {
		semi: ["error", "always"],
		quotes: ["error", "double"],
		"jsx-quotes": ["error", "prefer-double"],
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
		"no-mixed-spaces-and-tabs": 0,
		"@typescript-eslint/ban-types": [
			"error",
			{
				extendDefaults: true,
				types: {
					"{}": false,
				},
			},
		],
	},
};
