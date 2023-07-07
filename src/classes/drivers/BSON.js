const fs = require('fs-extra');

const _set = require('lodash.set');
const _get = require('lodash.get');
const _unset = require('lodash.unset');
const _has = require('lodash.has');

const DatabaseError = require('../DatabaseError');

module.exports = class BSONDriver {
  /**
   * Create new BSON-Based database.
   * @param {string} path 
   * @constructor
   */
  constructor(path = 'database.bson') {
    if (typeof path !== 'string') (new DatabaseError(`'${path}' is not String.`, { name: 'TypeError' })).throw();
    if (typeof spaces !== 'number') (new DatabaseError(`'${spaces}' is not Number.`, { name: 'TypeError' })).throw();

    path = `${process.cwd()}/${path}`;
    if (!path.endsWith('.bson')) path += '.bson';

    /**
     * BSON.
     * @private
     */
    this.bson = require('bson-ext');

    /**
     * @type typeof path
     * @private
     */
    this.path = path;

    const __databasePath = path.substring(0, path.lastIndexOf('/'));
    if (!fs.existsSync(__databasePath)) fs.mkdirSync(__databasePath, { recursive: true });

    if (!fs.existsSync(this.path)) this.save();
    else this.read();
  };

  /**
   * Database cache.
   * @readonly
   */
  cache = {};

  /**
   * Push data to database.
   * @param {string} key 
   * @param {unknown} value 
   * @returns {void}
   */
  set(key, value) {
    _set(this.cache, key, value);
    this.save();

    return value;
  };

  /**
   * Update data entry in database.
   * @param {string} key 
   * @param {unknown} value 
   * @returns {unknown}
   */
  update(key, value) {
    if (!this.exists(key)) return this.set(key, value);

    this.delete(key);
    this.set(key, value);

    return value;
  };

  /**
   * Pull data from database. If available in cache, pulls from cache.
   * @param {string} key 
   * @returns {unknown}
   */
  get(key) {
    return _get(this.cache, key);
  };

  /**
   * Checks specified key is available in database.
   * @param {string} key 
   * @returns {boolean}
   */
  exists(key) {
    return _has(this.cache, key);
  };

  /**
   * Delete data from database.
   * @param {string} key 
   * @returns {boolean}
   */
  delete(key) {
    const state = _unset(this.cache, key);
    this.save();

    return state;
  };

  /**
   * Save cache to database file.
   * @returns {void}
   */
  save() {
    fs.writeFileSync(this.path, this.bson.serialize(this.cache), 'binary');

    return;
  };

  /**
   * Read database file and save to cache.
   * @returns {void}
   */
  read() {
    const data = fs.readFileSync(this.path, { encoding: 'binary' });
    _merge(this.cache, this.bson.deserialize(data));

    return void 0;
  };
};