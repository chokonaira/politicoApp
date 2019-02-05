"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _offices = _interopRequireDefault(require("../db/offices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var officeController = {
  createOffice: function createOffice(req, res) {
    var _req$body = req.body,
        type = _req$body.type,
        name = _req$body.name;

    if (!name || !type) {
      return res.send({
        status: 400,
        error: 'Kindly enter all fields'
      });
    }

    var id = _offices.default.length + 1;
    req.body.id = id;

    _offices.default.push(req.body);

    var response = {
      status: 201,
      data: [_offices.default[id - 1]]
    };
    return res.send(response);
  },
  getOffices: function getOffices(req, res) {
    return res.send({
      status: 200,
      data: _offices.default
    });
  },
  getOffice: function getOffice(req, res) {
    var officeId = req.params.officeId;

    for (var i = 0; i < _offices.default.length; i += 1) {
      if (_offices.default[i].id === parseInt(officeId, 10)) {
        return res.send({
          status: 200,
          data: [_offices.default[i]]
        });
      }
    }

    return res.send({
      status: 404,
      error: "Office with id ".concat(officeId, " not found")
    });
  }
};
var _default = officeController;
exports.default = _default;
//# sourceMappingURL=offices.js.map