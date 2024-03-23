import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import postgres from 'postgres';

import { sql } from '../../databases/postgres';

// GET, POST, PUT, DELETE, PATCH, HEAD and OPTIONS

export async function core (fastify: FastifyInstance) {
	// Route to show all the links into url_shortener table.

	fastify.get('/api/url', async () => {
		const result = await sql`
			SELECT * FROM url_shortener
			ORDER BY created_at DESC
		`

		return result
	});

	// Route to insert a link into url_shortener table.

	fastify.post('/api/url', async (request, reply) => {
		const { code, url } = z.object({
			code: z.string().min(3),
			url: z.string().url(),
		}).parse(request.body)

		try {
			const result = await sql`
				INSERT INTO url_shortener (code, original_url)
				VALUES (${ code }, ${ url })
				RETURNING id
			`

			const { code: codeUrl } = result[0]

			// Status Code: 200 - Generic success.
			// Status Code: 201 - Registration created successfully.

			return reply.status(201).send({
				shortUrlId: codeUrl,
			});
		} catch (err) {
			if (err instanceof postgres.PostgresError) {
				if (err.code === '23505') {
					return reply.status(400).send({ message: 'Duplicated code.' })
				}
			}

			console.error(err)

			return reply.status(500).send({ message: 'Internal error.' })
		}
	});
}
