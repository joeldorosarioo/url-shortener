import z from 'zod';
import { FastifyInstance } from 'fastify';

import { redis } from '../../databases/redis';
import { sql } from '../../databases/postgres';

import { root_doc } from '../../swagger/root.swagger';

// Route to show all the links into url_shortener table.

export async function root (fastify: FastifyInstance) {
	fastify.get('/:code', { schema: root_doc.schema }, async (request, reply) => {
		const { code } = z.object({
			code: z.string().min(3)
		}).parse(request.params);

		const result = await sql`
			SELECT id, original_url, code
			FROM url_shortener
			WHERE url_shortener.code = ${ code }
		`

		const {
			original_url, code: codeUrl
		} = result[0] ?? reply.status(404).send({ message: 'Url not found.' });

		!!result[0] && await redis.zIncrBy('metrics', 1, codeUrl);

		// Status Code: 301 - Permanent.
		// Status Code: 302 - Temporary.

		return reply.redirect(301, original_url)
	})
}
