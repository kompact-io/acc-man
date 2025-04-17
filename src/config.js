/**
 * @typedef Config
 * @type {object}
 * @property {string} dbPath
 */

/**
 * @typedef Options
 * @type {object}
 * @property {string} dbPath
 * */

/**
 * @param {Options} opts
 * @returns {Config}
 */

export function parseOptions(opts) {
  const dbPath = opts.dbPath;
  return {
    dbPath,
  };
}
