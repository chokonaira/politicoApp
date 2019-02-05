"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default); // eslint-disable-next-line no-unused-vars


var should = _chai.default.should();

describe('Offices endpoints', function () {
  describe('POST /api/v1/offices', function () {
    var invalidData = {
      type: 'National'
    };
    var validData = {
      type: 'National',
      name: 'President'
    };
    it('should return a validation error for missing fields', function (done) {
      _chai.default.request(_server.default).post('/api/v1/offices').send(invalidData).end(function (req, res) {
        res.body.should.be.a('object');
        res.body.status.should.equal(400);
        res.body.should.include.keys('error');
        res.body.error.should.equal('Kindly enter all fields');
        done();
      });
    });
    it('should create new political office and return success response', function (done) {
      _chai.default.request(_server.default).post('/api/v1/offices').send(validData).end(function (req, res) {
        res.body.should.be.a('object');
        res.body.status.should.equal(201);
        res.body.should.include.keys('data');
        res.body.data.should.be.a('array');
        res.body.data.length.should.equal(1);
        done();
      });
    });
  });
  describe('GET /api/v1/offices', function () {
    it('should get all offices', function (done) {
      _chai.default.request(_server.default).get('/api/v1/offices').end(function (req, res) {
        res.body.should.be.a('object');
        res.body.status.should.equal(200);
        res.body.should.include.keys('data');
        res.body.data.should.be.a('array');
        done();
      });
    });
  });
  describe('GET /api/v1/offices/:id', function () {
    var invalidId = 'xx';
    var validId = 1;
    it('should return an office not found response', function (done) {
      _chai.default.request(_server.default).get("/api/v1/offices/".concat(invalidId)).end(function (req, res) {
        res.body.should.be.a('object');
        res.body.status.should.equal(404);
        res.body.should.include.keys('error');
        res.body.error.should.equal("Office with id ".concat(invalidId, " not found"));
        done();
      });
    });
    it('should return a single office record', function (done) {
      _chai.default.request(_server.default).get("/api/v1/offices/".concat(validId)).end(function (req, res) {
        res.body.should.be.a('object');
        res.body.status.should.equal(200);
        res.body.should.include.keys('data');
        res.body.data.should.be.a('array');
        res.body.data.length.should.equal(1);
        done();
      });
    });
  });
});
//# sourceMappingURL=office.test.js.map