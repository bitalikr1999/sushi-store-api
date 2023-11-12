module.exports = {
	apps: [
		{
			name: 'api',
			script: './dist/main.js',
			node_args: '-r dotenv/config',
			watch: true,
			ignore_watch: [
				'dasushiucket',
				'node_modules',
				'.git',
				'.husky',
				'nginx',
				'documentation',
				'mongo',
			],
		},
	],
}
