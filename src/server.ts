import fastify from 'fastify';

import swagger from '@fastify/swagger'
import swagger_ui from '@fastify/swagger-ui'

import { root } from './http/routes/root';
import { core } from './http/routes/core';
import { metrics } from './http/routes/metrics';

const app = fastify();

(async () => {
	app.register(swagger)

	app.register(swagger_ui, {
		routePrefix: '/docs',
		staticCSP: true,

		uiConfig: {
			docExpansion: 'full',
			deepLinking: false,
		},

		uiHooks: {
			onRequest: function (request, reply, next) {
				next()
			},

			preHandler: function (request, reply, next) {
				next()
			},
		},

		transformSpecificationClone: true,
		transformStaticCSP: (header) => header,
		transformSpecification: (swaggerObject, request, reply) => swaggerObject,
	})

	await app.register(root);
	await app.register(core);
	await app.register(metrics);

	await app.listen({
		port: 3333,
	}).then(() => {
		console.log('HTTP server running!');
	});
})();
