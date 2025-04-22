import { default as schemas } from "../schemas.json" with { type: "json" };
/** @import * as types from "./schemaTypes" */

/**
 * @import { FastifyInstance } from "fastify";
 * @param {FastifyInstance} fastify
 */

async function routes(fastify) {
  fastify.addSchema(schemas);

  fastify.patch(
    "/mod",
    {
      schema: {
        querystring: { ...schemas.$defs.modQuery, $defs: schemas.$defs },
      },
    },
    function (req, res) {
      const { cred, by } = /** @type {types.ModQuery} */ (req.query);
      fastify.mod(cred, BigInt(by)).then(
        (tot) => res.code(200).send(tot.toString()),
        (err) => res.code(500).send(err),
      );
    },
  );

  fastify.get(
    "/tot",
    {
      schema: {
        querystring: { ...schemas.$defs.totQuery, $defs: schemas.$defs },
        response: {
          200: { ...schemas.$defs.totRes, $defs: schemas.$defs },
        },
      },
    },
    function (req, res) {
      const { cred } = /** @type {types.TotQuery} */ (req.query);
      fastify.tot(cred).then(
        (r) => res.code(200).send(r.toString()),
        (err) => res.code(500).send(err),
      );
    },
  );
}

export default routes;
