# URL Shortener Server

A URL shortener built with Node.js, seamlessly integrated with PostgreSQL and Redis databases.

## Technologies

This project was developed with the following technologies:

- [Node.js](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Fastify](https://fastify.dev)
- [Zod](https://zod.dev)
- [Docker](https://www.docker.com)
- [PostgreSQL](https://www.postgresql.org)
- [Redis](https://redis.io)
- [Swagger](https://redis.io)

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Docker](https://www.docker.com) and [Node.js](https://nodejs.org) installed on your computer.

From your command line:

```bash
# Clone this repository

$ git clone https://github.com/joeldorosarioo/url-shortener.git

$ cd url-shortener

# Install dependencies

$ pnpm install

# Activate hooks

$ npx husky install

# Run Setup Database

$ pnpm run setup

# Run the Development Server

pnpm run dev
```

Open [http://localhost:3333/docs/](http://localhost:3333/docs/) with your browser to see the documentation.

### Features

1. **Create Link:**
	- Allows creating a new short link associated with a specified long URL.

2. **List All Links:**
	- Displays a list of all created short links along with their corresponding URLs.

3. **Search and Redirect with a Specific Link:**
	- Searches for a specific short link and redirects to the corresponding URL if it exists.

4. **Most Clicked Links Metrics:**
	- Provides metrics on the most clicked links, allowing evaluation of the popularity and usage of each short link.


## How to contribute

- Make a fork;
- Create a branck with your feature: `git checkout -b my-feature`;
- Commit changes: `git commit -m 'feat: My new feature'`;
- Make a push to your branch: `git push origin my-feature`.

After merging your receipt request to done, you can delete a branch from yours.

## License

This project is under the MIT license. See the [LICENSE](/LICENSE) for details.
