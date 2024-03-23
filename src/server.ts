import fastify from 'fastify';

import { root } from './http/routes/root';
import { core } from './http/routes/core';
import { metrics } from './http/routes/metrics';

const app = fastify();

(async () => {
  await app.register(root);
  await app.register(core);
  await app.register(metrics);

	await app.listen({
		port: 3333,
	}).then(() => {
		console.log('HTTP server running!');
	});
})();
