import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
// eslint-disable-next-line no-unused-vars
const should = chai.should();

describe('Offices endpoints', () => {
  describe('POST /api/v1/offices', () => {
    const invalidData = {
      type: 'National',
    };

    const validData = {
      type: 'National',
      name: 'President',
    };
    it('should return a validation error for missing fields', (done) => {
      chai.request(server)
        .post('/api/v1/offices')
        .send(invalidData)
        .end((req, res) => {
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          res.body.should.include.keys('error');
          res.body.error.should.equal('Kindly enter all fields');
          done();
        });
    });

    it('should create new political office and return success response', (done) => {
      chai.request(server)
        .post('/api/v1/offices')
        .send(validData)
        .end((req, res) => {
          res.body.should.be.a('object');
          res.body.status.should.equal(201);
          res.body.should.include.keys('data');
          res.body.data.should.be.a('array');
          res.body.data.length.should.equal(1);
          done();
        });
    });
  });
  describe('GET /api/v1/offices', () => {
    it('should get all offices', (done) => {
      chai.request(server)
        .get('/api/v1/offices')
        .end((req, res) => {
          res.body.should.be.a('object');
          res.body.status.should.equal(200);
          res.body.should.include.keys('data');
          res.body.data.should.be.a('array');
          done();
        });
    });
  });
  

});