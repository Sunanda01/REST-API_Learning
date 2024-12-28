const RedisLink=require("../config/secret").RedisLink;
const Redis = require("ioredis");
const client = new Redis(RedisLink);
module.exports=client;
