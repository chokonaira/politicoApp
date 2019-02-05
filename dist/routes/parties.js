"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _parties = _interopRequireDefault(require("../controller/parties"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/parties', _parties.default.createParty);
router.get('/parties', _parties.default.getParties);
router.get('/parties/:partyId', _parties.default.getParty);
router.patch('/parties/:partyId', _parties.default.updateParty);
router.delete('/parties/:partyId', _parties.default.deleteParty);
var _default = router;
exports.default = _default;
//# sourceMappingURL=parties.js.map