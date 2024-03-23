import { createClient } from 'redis';
import { config } from 'dotenv';

config();

const redisPassword = process.env.REDIS_PASSWORD;
const port = 6379;

export const redis = createClient({
	url: 'redis://:' + redisPassword + '@localhost:' + port +'/',
});

redis.connect();
