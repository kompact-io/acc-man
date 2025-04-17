import fastifyPlugin from "fastify-plugin";
import fastifyLeveldb from "@fastify/leveldb";
import { decode, encode } from "cbor-x";

const b64Dec = (/** @type {string} */ s) => Buffer.from(s, "base64");
// const b64Enc = (/** @type {Buffer} */ b) => b.toString('base64')

/**
 * @import { FastifyInstance, FastifyRegisterOptions } from "fastify";
 * @import { Config } from "./config.js";
 * @param {FastifyInstance} fastify
 * @param {{ config : Config }} opts
 */

async function Db(fastify, opts) {
  fastify.register(fastifyLeveldb, {
    name: "db",
    path: opts.config.dbPath,
    options: {
      keyEncoding: "binary",
      valueEncoding: "binary",
    },
  });

  fastify.decorate("tot", function (/** @type {string} */ cred) {
    return fastify.level.db.get(b64Dec(cred)).then(decode);
  });

  fastify.decorate("mod", function (/** @type {string} */ cred, amt) {
    const key = b64Dec(cred);
    const key2 = Buffer.from([...key, ...encode(Date.now())]);
    const tx = (/** @type {bigint} */ val) =>
      fastify.level.db.batch([
        { type: "put", key, value: encode(val + amt) },
        { type: "put", key: key2, value: encode(val + amt) },
      ]);
    return fastify.level.db.get(key).then(
      (x) => tx(decode(x)),
      (_) => tx(0n),
    );
  });
}

export default fastifyPlugin(Db);
