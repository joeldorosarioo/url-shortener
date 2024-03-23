import { sql } from './databases/postgres';

// SQL code to create url_shortener table into Postgres database.

(async () => {
	await sql`
		CREATE TABLE IF NOT EXISTS url_shortener (
			id SERIAL PRIMARY KEY,
			code TEXT UNIQUE,
			original_url TEXT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);
	`

	await sql.end() // Wait until the end of the execution.
	console.log('Setup successfully completed!');
})();
