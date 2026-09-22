
import redis from "../database/redisConnection.js";





export const blackListToken = async(token, exp) =>{

   const secondsLeft = exp - (Math.floor(Date.now()/1000))

    return await redis.set(
        token, "blacklisted",
        {ex: secondsLeft }
    );
};



export const isTokenblackListed = async (token)=>{

    const value = await redis.get(token)
    if (!value) return false

    return true;
}
