'use strict';

var dbm;
var type;
var seed;
var async = require('async');

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
    db.addColumn('team_auth_names', 'captain',  { type: 'boolean', defaultValue: false, notNull: true })
  ], callback());
};

exports.down = function(db, callback) {
  async.series([
    db.removeColumn('team_auth_names', 'captain')
  ], callback());
};

exports._meta = {
  "version": 7
};