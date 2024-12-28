const ReddisLink=require("../config/secret").ReddisLink;
const Redis = require("ioredis");
const client = new Redis(ReddisLink);
module.exports=client;
