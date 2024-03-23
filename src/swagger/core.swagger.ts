export const create_urls_doc = {
	description: 'Generate a Short Url.',
	tags: ['Short Urls'],
	summary: 'Create new Short Url.',

	body: {
		type: 'object',
		required: ['code', 'original_url'],

		properties: {
			code: {
				type: 'string',
				description: 'Code to increment the Short Url.'
			},

			original_url: {
				type: 'string',
				description: 'Url for redirection.',
			},
		},
	},

	response: {
		201: {
			type: 'object',
			description: 'Successful response',

			properties: {
				shortUrlId: {
					type: 'number',
					description: 'Short Url ID.',
				},

				message: {
					type: 'string',
					value: 'Short Url created successfully!'
				},
			},
		},

		400: {
			type: 'object',
			description: 'Invalid request body.',
			properties: {
				message: {
					type: 'string',
					value: 'Code already exists.'
				},
			},
		},

		500: {
			type: 'object',
			description: 'Server error',
			properties: {
				message: {
					type: 'string',
					value: 'Internal error.'
				},
			},
		},
	},
}

export const get_urls_doc = {
	description: 'Retrieve all Urls from the database',
	tags: ['Short Urls'],
	summary: 'Retrieve all Urls',

	response: {
		200: {
			type: 'object',
			description: 'Successful response with Urls data',
			properties: {
				result: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							id: {
								type: 'integer',
								description: 'An integer representing the unique identifier for the Url entry in the database.',
							},

							original_url: {
								type: 'string',
								description: 'A string containing the original Url that was shortened.'
							},

							code: {
								type: 'string',
								description: 'A string representing the unique code assigned to the shortened Url'
							},

							created_at: {
								type: 'string',
								format: 'date-time',
								description: 'A string representing the date (ISO 8601) when the Url entry was created in the database'
							},
						},
					},
				},
			},
		},

		500: {
			type: 'object',
			description: 'Internal error',
			properties: {
				message: {
					type: 'string',
					value: 'Internal error',
				},
			},
		},
	},
};
