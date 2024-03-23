import { FastifyInstance } from 'fastify';

import { redis } from '../../databases/redis';

import { metrics_doc } from '../../swagger/metrics.swagger';

export async function metrics (fastify: FastifyInstance) {
	fastify.get('/api/metrics', { schema: metrics_doc.schema }, async (request, reply) => {
		const result = await redis.zRangeByScoreWithScores('metrics', 0, 50);

		const metrics = result.sort((a, b) => b.score - a.score).map(({ value, score }) => {
			return {
				code: value,
				views: Number(score),
			}
		});

		return reply.status(200).send({ metrics });
	});
}
