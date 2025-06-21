import redis from "redis";

const client = redis.createClient();

export const getCache = async (key: string): Promise<string | null> => {
  try {
    const value = await client.get(key);
    return value;
  } catch (err) {
    throw err;
  }
};
