import { FastifyPluginCallback } from "fastify";
import { FFState } from "./common";
import { Config } from "./config";

declare module "fastify" {
  interface FastifyInstance {
    tot(cred: string): Promise<bigint>;
    mod(cred: string, amt: bigint): Promise<bigint>;
  }
}

type Db = FastifyPluginCallback<db.FastifyTxDbOptions>;

declare namespace db {
  export interface FastifyTxDbOptions {
    config: Config;
  }
  export const db: Db;
  export { db as default };
}

declare function db(...params: Parameters<Db>): ReturnType<Db>;
export = db;
