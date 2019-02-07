"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _expressValidator = _interopRequireDefault(require("express-validator"));

var _debug = _interopRequireDefault(require("debug"));

var _morgan = _interopRequireDefault(require("morgan"));

var _parties = _interopRequireDefault(require("./routes/parties"));

var _offices = _interopRequireDefault(require("./routes/offices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var logger = (0, _debug.default)('app');
app.use((0, _expressValidator.default)());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
app.use((0, _morgan.default)('tiny'));
var PORT = process.env.PORT || 3000;
app.use('/api/v1', _parties.default);
app.use('/api/v1', _offices.default); // app.use('/api/v1', userRoutes);

app.listen(PORT, function () {
  logger("Server is running on port ".concat(PORT));
});
var _default = app;
exports.default = _default;
//# sourceMappingURL=server.js.map