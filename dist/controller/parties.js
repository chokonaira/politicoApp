"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parties = _interopRequireDefault(require("../db/parties"));

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var partyController = {
  createParty: function createParty(req, res) {
    // use object destructuring to get values contained in body
    var _req$body = req.body,
        name = _req$body.name,
        hqAddress = _req$body.hqAddress,
        logoUrl = _req$body.logoUrl; // Validation: check if any of the required fields is empty of not provided

    if (!name || !hqAddress || !logoUrl) {
      return res.send({
        status: 400,
        error: 'Kindly enter all fields'
      });
    }

    var text = 'INSERT INTO party (name, hqAddress, logourl) VALUES ($1, $2, $3) RETURNING * ';
    var values = [name, hqAddress, logoUrl];

    _db.default.query(text, values).then(function (party) {
      return res.status(201).send({
        data: [party.rows[0]]
      });
    }).catch(function (err) {
      return res.send(err);
    });
  },
  getParties: function getParties(req, res) {
    var text = 'SELECT * FROM party';

    _db.default.query(text).then(function (party) {
      return res.send({
        status: 200,
        data: party.rows[0]
      });
    });
  },
  getParty: function getParty(req, res) {
    // get the partyId from the url sent via GET
    var partyId = req.params.partyId; // loop through all the parties inside the partyDb

    for (var i = 0; i < _parties.default.length; i += 1) {
      // get the party with id that equals the partyId sent via url
      // use parseInt to convert string of number to a real number in base 10
      if (_parties.default[i].id === parseInt(partyId, 10)) {
        // return that party
        return res.send({
          status: 200,
          data: [_parties.default[i]]
        });
      }
    } // if partyId sent doesnt match party id, send a party not found error


    return res.send({
      status: 404,
      error: "Party with id ".concat(partyId, " not found")
    });
  },
  updateParty: function updateParty(req, res) {
    // get partyId from url sent via GET e.g politico.com/api/v1/parties/10
    var partyId = req.params.partyId; // get values of all the input field sent via POST

    var _req$body2 = req.body,
        name = _req$body2.name,
        hqAddress = _req$body2.hqAddress,
        logoUrl = _req$body2.logoUrl; // return validation error if any of the expected fields are missing

    if (!name || !hqAddress || !logoUrl) {
      return res.send({
        status: 400,
        error: 'All fields are required'
      });
    } // loop through the party db and get the record
    // that has the same id as the one supplied in the url


    for (var i = 0; i < _parties.default.length; i += 1) {
      if (_parties.default[i].id === parseInt(partyId, 10)) {
        // if found, update its properties with the new ones entered on the form
        _parties.default[i].name = name;
        _parties.default[i].hqAddress = hqAddress;
        _parties.default[i].logoUrl = logoUrl; // return Success response

        return res.send({
          status: 200,
          data: [_parties.default[i]]
        });
      }
    } // if not found, return not found error


    return res.send({
      status: 404,
      error: "Party with id of ".concat(partyId, " not found")
    });
  },
  deleteParty: function deleteParty(req, res) {
    // get partyId from url sent via GET e.g politico.com/api/v1/parties/10
    var partyId = req.params.partyId; // loop through the party db and get the record
    // that has the same id as the one supplied in the url

    for (var i = 0; i < _parties.default.length; i += 1) {
      if (_parties.default[i].id === parseInt(partyId, 10)) {
        // if found, remove the record from the db and return Success response
        _parties.default.splice(_parties.default[i].id - 1, 1);

        return res.send({
          status: 204,
          data: [{
            message: 'Party deleted succesfully'
          }]
        });
      }
    } // if not found, return a not found error


    return res.send({
      status: 404,
      error: "Party with id of ".concat(partyId, " not found")
    });
  }
};
var _default = partyController;
exports.default = _default;
//# sourceMappingURL=parties.js.map