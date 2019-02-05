"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _parties = _interopRequireDefault(require("./routes/parties"));

var _offices = _interopRequireDefault(require("./routes/offices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
var PORT = process.env.PORT || 3000;
app.use('/api/v1', _parties.default);
app.use('/api/v1', _offices.default);
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});
var _default = app;
exports.default = _default;
//# sourceMappingURL=server.js.map