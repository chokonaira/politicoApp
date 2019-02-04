import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
// eslint-disable-next-line no-unused-vars
const should = chai.should();

describe('Party endpoints', () => {
  describe('POST /api/v1/parties', () => {
    const invalidData = {
      name: 'ANPP',
      hqAddress: 'Abuja',
    };

    const ValidData = {
      name: 'ANPP',
      hqAddress: 'Abuja',
      logoUrl: 'http://cloudinary.com/img.jpg',
    };
    it('should return a validation error for missing fields', (done) => {
      chai.request(server)
        .post('/api/v1/parties')
        .send(invalidData)
        .end((req, res) => {
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          res.body.should.include.keys('error');
          res.body.error.should.equal('Kindly enter all fields');
          done();
        });
    });

    it('should create new party and return success response', (done) => {
      chai.request(server)
        .post('/api/v1/parties')
        .send(ValidData)
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

  describe('GET /api/v1/parties', () => {
    it('should get all parties', (done) => {
      chai.request(server)
        .get('/api/v1/parties')
        .end((req, res) => {
          res.body.should.be.a('object');
          res.body.status.should.equal(200);
          res.body.should.include.keys('data');
          res.body.data.should.be.a('array');
          done();
        });
    });
  });

  describe('GET /api/v1/parties/:id', () => {
    const invalidId = 'xx';
    const validId = 1;
    it('should return a party not found response', (done) => {
      chai.request(server)
        .get(`/api/v1/parties/${invalidId}`)
        .end((req, res) => {
          res.body.should.be.a('object');
          res.body.status.should.equal(404);
          res.body.should.include.keys('error');
          res.body.error.should.equal(`Party with id ${invalidId} not found`);
          done();
        });
    });

    it('should return a single party record', (done) => {
      chai.request(server)
        .get(`/api/v1/parties/${validId}`)
        .end((req, res) => {
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
