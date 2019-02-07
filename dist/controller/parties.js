"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parties = _interopRequireDefault(require("../db/parties"));

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var partyController = {
  createParty: function () {
    var _createParty = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var _req$body, name, hqAddress, logoUrl, dbClient, text, values, party, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, name = _req$body.name, hqAddress = _req$body.hqAddress, logoUrl = _req$body.logoUrl;
              _context.next = 3;
              return _db.default.connect();

            case 3:
              dbClient = _context.sent;
              _context.prev = 4;
              text = 'INSERT INTO parties (name, hqAddress, logoUrl) VALUES ($1, $2, $3) RETURNING * ';
              values = [name, hqAddress, logoUrl];
              _context.next = 9;
              return dbClient.query({
                text: text,
                values: values
              });

            case 9:
              party = _context.sent;

              if (!party.rowCount) {
                _context.next = 13;
                break;
              }

              rows = party.rows;
              return _context.abrupt("return", res.status(201).json({
                status: 201,
                data: [rows[0]]
              }));

            case 13:
              return _context.abrupt("return", res.status(500).json({
                status: 500,
                message: 'Internal server error'
              }));

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](4);
              return _context.abrupt("return", res.status(500).json({
                status: 500,
                message: 'Internal server error'
              }));

            case 19:
              _context.prev = 19;
              dbClient.release();
              return _context.finish(19);

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[4, 16, 19, 22]]);
    }));

    function createParty(_x, _x2) {
      return _createParty.apply(this, arguments);
    }

    return createParty;
  }(),
  getParties: function () {
    var _getParties = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var dbClient, text, party, rows;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _db.default.connect();

            case 2:
              dbClient = _context2.sent;
              _context2.prev = 3;
              text = 'SELECT * FROM parties';
              _context2.next = 7;
              return dbClient.query({
                text: text
              });

            case 7:
              party = _context2.sent;

              if (!party.rowCount) {
                _context2.next = 11;
                break;
              }

              rows = party.rows;
              return _context2.abrupt("return", res.status(200).json({
                status: 200,
                data: [rows]
              }));

            case 11:
              return _context2.abrupt("return", res.status(400).json({
                status: 400,
                data: []
              }));

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](3);
              return _context2.abrupt("return", res.status(500).json({
                status: 500,
                message: 'Internal server error'
              }));

            case 17:
              _context2.prev = 17;
              dbClient.release();
              return _context2.finish(17);

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[3, 14, 17, 20]]);
    }));

    function getParties(_x3, _x4) {
      return _getParties.apply(this, arguments);
    }

    return getParties;
  }(),
  getParty: function () {
    var _getParty = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var partyId, dbClient, text, values, party, rows;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              partyId = req.params.partyId;
              _context3.next = 3;
              return _db.default.connect();

            case 3:
              dbClient = _context3.sent;
              _context3.prev = 4;
              text = 'SELECT * FROM parties WHERE id = $1 LIMIT 1';
              values = [partyId];
              _context3.next = 9;
              return dbClient.query({
                text: text,
                values: values
              });

            case 9:
              party = _context3.sent;

              if (!party.rowCount) {
                _context3.next = 13;
                break;
              }

              rows = party.rows;
              return _context3.abrupt("return", res.status(200).json({
                status: 200,
                data: [rows[0]]
              }));

            case 13:
              return _context3.abrupt("return", res.status(400).json({
                status: 400,
                message: "No party with id: ".concat(partyId, " was found")
              }));

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](4);
              return _context3.abrupt("return", res.status(500).json({
                status: 500,
                message: 'Internal server error'
              }));

            case 19:
              _context3.prev = 19;
              dbClient.release();
              return _context3.finish(19);

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[4, 16, 19, 22]]);
    }));

    function getParty(_x5, _x6) {
      return _getParty.apply(this, arguments);
    }

    return getParty;
  }(),
  updateParty: function () {
    var _updateParty = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var partyId, _req$body2, name, logoUrl, hqAddress, dbClient, text, values, party, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              partyId = req.params.partyId;
              _req$body2 = req.body, name = _req$body2.name, logoUrl = _req$body2.logoUrl, hqAddress = _req$body2.hqAddress;
              _context4.next = 4;
              return _db.default.connect();

            case 4:
              dbClient = _context4.sent;
              _context4.prev = 5;
              text = 'UPDATE parties SET name = $1, hqAddress = $2, logoUrl = $3 WHERE id = $4 RETURNING *';
              values = [name, hqAddress, logoUrl, partyId];
              _context4.next = 10;
              return dbClient.query({
                text: text,
                values: values
              });

            case 10:
              party = _context4.sent;

              if (!party.rowCount) {
                _context4.next = 14;
                break;
              }

              rows = party.rows;
              return _context4.abrupt("return", res.status(200).json({
                status: 200,
                data: [rows[0]]
              }));

            case 14:
              return _context4.abrupt("return", res.status(500).json({
                status: 500,
                message: "Unable to update party"
              }));

            case 17:
              _context4.prev = 17;
              _context4.t0 = _context4["catch"](5);
              return _context4.abrupt("return", res.status(500).json({
                status: 500,
                message: 'Internal server error'
              }));

            case 20:
              _context4.prev = 20;
              dbClient.release();
              return _context4.finish(20);

            case 23:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[5, 17, 20, 23]]);
    }));

    function updateParty(_x7, _x8) {
      return _updateParty.apply(this, arguments);
    }

    return updateParty;
  }(),
  deleteParty: function () {
    var _deleteParty = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var partyId, dbClient, text, values, party, rows;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              partyId = req.params.partyId;
              _context5.next = 3;
              return _db.default.connect();

            case 3:
              dbClient = _context5.sent;
              _context5.prev = 4;
              text = 'DELETE FROM parties WHERE id = $1 RETURNING id';
              values = [partyId];
              _context5.next = 9;
              return dbClient.query({
                text: text,
                values: values
              });

            case 9:
              party = _context5.sent;

              if (!party.rowCount) {
                _context5.next = 13;
                break;
              }

              rows = party.rows;
              return _context5.abrupt("return", res.status(203).json({
                status: 200,
                data: [{
                  message: 'Party deleted succesfully'
                }]
              }));

            case 13:
              return _context5.abrupt("return", res.status(400).json({
                status: 400,
                message: "No party with id: ".concat(partyId, " was found")
              }));

            case 16:
              _context5.prev = 16;
              _context5.t0 = _context5["catch"](4);
              return _context5.abrupt("return", res.status(500).json({
                status: 500,
                message: 'Internal server error'
              }));

            case 19:
              _context5.prev = 19;
              dbClient.release();
              return _context5.finish(19);

            case 22:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[4, 16, 19, 22]]);
    }));

    function deleteParty(_x9, _x10) {
      return _deleteParty.apply(this, arguments);
    }

    return deleteParty;
  }()
};
var _default = partyController;
exports.default = _default;
//# sourceMappingURL=parties.js.map