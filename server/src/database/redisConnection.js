

import { Redis } from "@upstash/redis";
import {config} from "dotenv";


config();

const {UPSTASH_REDIS_REST_URL,UPSTASH_REDIS_REST_TOKEN} = process.env

if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
   console.error("REDIS: UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN missing, protected routes will return 503")
}


const redis = new Redis({url: UPSTASH_REDIS_REST_URL,
   token: UPSTASH_REDIS_REST_TOKEN
});



export default redis

