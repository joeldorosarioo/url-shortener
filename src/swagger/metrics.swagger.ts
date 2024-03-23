export const metrics_doc = {
	schema: {
		description: 'Retrieve metrics for the most accessed Urls.',
		tags: ['Metrics'],
		summary: 'Retrieve Urls metrics.',

		response: {
			200: {
				type: 'object',
				properties: {
					metrics: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								code: {
									type: 'string',
									description: 'Url Code',
								},

								views: {
									type: 'number',
									description: 'Count of how many times the Url was searched.',
								},
							},
						},
					},
				},
			},
		},
	},
};
