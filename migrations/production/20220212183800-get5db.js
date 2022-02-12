"use strict";

var dbm;
var type;
var seed;
var async = require("async");

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  async.series([
    db.runSql(`ALTER
      TABLE
      \`match\`
      ADD
      COLUMN
      map_sides
      varchar(64)
      ;`)
  ], callback()
  );
};

exports.down = function(db, callback) {
  async.series([ db.removeColumn('match', 'map_sides') ], callback());
};

exports._meta = {
  version : 16,
};
