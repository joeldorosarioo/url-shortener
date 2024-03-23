export const root_doc = {
	schema: {
		description: 'Redirect to the Original Url.',
		tags: ['Default'],
		summary: 'Redirect with code to the Original Url.',

		params: {
			type: 'object',
			properties: {
				code: {
					type: 'string',
					description: 'Generate code to create a Short Url.',
				},
			},
		},

		response: {
			301: {
				type: 'null',
				description: 'Successful response; Redirecting to the Original Url.',
			},

			404: {
				type: 'object',
				description: 'Url not found.',
				properties: {
					message: {
						type: 'string',
						value: 'Url not found.',
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
	},
}
