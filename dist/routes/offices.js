"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _offices = _interopRequireDefault(require("../controller/offices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/offices', _offices.default.createOffice);
router.get('/offices', _offices.default.getOffices);
router.get('/offices/:officeId', _offices.default.getOffice);
var _default = router;
exports.default = _default;
//# sourceMappingURL=offices.js.map