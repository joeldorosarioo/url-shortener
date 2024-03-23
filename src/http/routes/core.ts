import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { PostgresError } from 'postgres';

import { sql } from '../../databases/postgres';

import {
	create_urls_doc, get_urls_doc
} from '../../swagger/core.swagger';

// GET, POST, PUT, DELETE, PATCH, HEAD and OPTIONS

export async function core (fastify: FastifyInstance) {
	// Route to show all the links into url_shortener table.

	fastify.get('/api/url', { schema: get_urls_doc }, async (request, reply) => {
		try {
			const result = await sql`
				SELECT * FROM url_shortener
				ORDER BY created_at DESC
			`

			return reply.status(200).send({ result });
		} catch (error) {
			console.error(error);
			return { message: 'Internal error.' };
		}
	});

	// Route to insert a link into url_shortener table.

	fastify.post('/api/url', { schema: create_urls_doc }, async (request, reply) => {
		const { code, original_url } = z.object({
			code: z.string().min(3),
			original_url: z.string().url(),
		}).parse(request.body)

		try {
			const result = await sql`
				INSERT INTO url_shortener (code, original_url)
				VALUES (${ code }, ${ original_url })
				RETURNING id
			`

			const { code: codeUrl } = result[0]

			// Status Code: 200 - Generic success.
			// Status Code: 201 - Registration created successfully.

			return reply.status(201).send({
				shortUrlId: codeUrl,
			});
		} catch (err) {
			if (err instanceof PostgresError) {
				if (err.code === '23505') {
					return reply.status(400).send({ message: 'Duplicated code.' })
				}
			}

			console.error(err)

			return reply.status(500).send({ message: 'Internal error.' })
		}
	});
}
