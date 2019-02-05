"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default); // eslint-disable-next-line no-unused-vars


var should = _chai.default.should();

describe('Party endpoints', function () {
  describe('POST /api/v1/parties', function () {
    var invalidData = {
      name: 'ANPP',
      hqAddress: 'Abuja'
    };
    var ValidData = {
      name: 'ANPP',
      hqAddress: 'Abuja',
      logoUrl: 'http://cloudinary.com/img.jpg'
    };
    it('should return a validation error for missing fields', function (done) {
      _chai.default.request(_server.default).post('/api/v1/parties').send(invalidData).end(function (req, res) {
        res.body.should.be.a('object');
        res.body.status.should.equal(400);
        res.body.should.include.keys('error');
        res.body.error.should.equal('Kindly enter all fields');
        done();
      });
    });
    it('should create new party and return success response', function (done) {
      _chai.default.request(_server.default).post('/api/v1/parties').send(ValidData).end(function (req, res) {
        res.body.should.be.a('object');
        res.body.status.should.equal(201);
        res.body.should.include.keys('data');
        res.body.data.should.be.a('array');
        res.body.data.length.should.equal(1);
        done();
      });
    });
  });
  describe('GET /api/v1/parties', function () {
    it('should get all parties', function (done) {
      _chai.default.request(_server.default).get('/api/v1/parties').end(function (req, res) {
        res.body.should.be.a('object');
        res.body.status.should.equal(200);
        res.body.should.include.keys('data');
        res.body.data.should.be.a('array');
        done();
      });
    });
  });
  describe('GET /api/v1/parties/:id', function () {
    var invalidId = 'xx';
    var validId = 1;
    it('should return a party not found response', function (done) {
      _chai.default.request(_server.default).get("/api/v1/parties/".concat(invalidId)).end(function (req, res) {
        res.body.should.be.a('object');
        res.body.status.should.equal(404);
        res.body.should.include.keys('error');
        res.body.error.should.equal("Party with id ".concat(invalidId, " not found"));
        done();
      });
    });
    it('should return a single party record', function (done) {
      _chai.default.request(_server.default).get("/api/v1/parties/".concat(validId)).end(function (req, res) {
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
describe('PATCH /api/v1/parties/:id', function () {
  var invalidData = {
    name: 'ANPP',
    hqAddress: 'Abuja'
  };
  var validData = {
    name: 'ANPP',
    hqAddress: 'Abuja',
    logoUrl: 'http://cloudinary.com/img.jpg'
  };
  var validId = 2;
  var invalidId = 'xx';
  it('should return a validation error for missing fields', function (done) {
    _chai.default.request(_server.default).patch("/api/v1/parties/".concat(validId)).send(invalidData).end(function (req, res) {
      res.body.should.be.a('object');
      res.body.status.should.equal(400);
      res.body.should.include.keys('error');
      res.body.error.should.equal('All fields are required');
      done();
    });
  });
  it('should update a party and return success response', function (done) {
    _chai.default.request(_server.default).patch("/api/v1/parties/".concat(validId)).send(validData).end(function (req, res) {
      res.body.should.be.a('object');
      res.body.status.should.equal(200);
      res.body.should.include.keys('data');
      res.body.data.should.be.a('array');
      res.body.data.length.should.equal(1);
      done();
    });
  });
  it('should return a party not found response', function (done) {
    _chai.default.request(_server.default).patch("/api/v1/parties/".concat(invalidId)).send(validData).end(function (req, res) {
      res.body.should.be.a('object');
      res.body.status.should.equal(404);
      res.body.should.include.keys('error');
      res.body.error.should.equal("Party with id of ".concat(invalidId, " not found"));
      done();
    });
  });
});
describe('DELETE /api/v1/parties/:id', function () {
  var invalidId = 'xx';
  var validId = 1;
  it('should return a party not found response', function (done) {
    _chai.default.request(_server.default).delete("/api/v1/parties/".concat(invalidId)).end(function (req, res) {
      res.body.should.be.a('object');
      res.body.status.should.equal(404);
      res.body.should.include.keys('error');
      res.body.error.should.equal("Party with id of ".concat(invalidId, " not found"));
      done();
    });
  });
  it('should delete a party record and return a success response', function (done) {
    _chai.default.request(_server.default).delete("/api/v1/parties/".concat(validId)).end(function (req, res) {
      res.body.should.be.a('object');
      res.body.status.should.equal(204);
      res.body.should.include.keys('data');
      res.body.data.should.be.a('array');
      res.body.data[0].should.include.keys('message');
      res.body.data[0].message.should.equal('Party deleted succesfully');
      done();
    });
  });
});
//# sourceMappingURL=party.test.js.map