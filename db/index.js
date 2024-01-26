"use strict";

const { Pool } = require("pg");

const pool = new Pool();

exports.query = function (text, params) {
	return pool.query(text, params);
};
