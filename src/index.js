import sensible from "@fastify/sensible";

import db from "./db.js";
import routes from "./routes.js";

const options = {
  dbPath: "./db",
};

/**
 * @import { FastifyInstance, FastifyPluginOptions} from "fastify";
 * @param {FastifyInstance} fastify
 * @param {FastifyPluginOptions & import("./config.js").Options} opts
 */

function main(fastify, opts) {
  fastify.register(sensible);
  fastify.register(db, { config: { dbPath: opts.dbPath } });
  fastify.register(routes);
}

export { options };
export default main;
