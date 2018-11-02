const request = require('supertest');
const {expect} = require('chai');

// const { app } = require('./server.js');


// describe('/guest endpoints')
// describe('/host endpoints')
// describe('/listing endpoints')
// describe('/booking endpoints')
// describe('/availableNights endpoints', () => {
//   it('should return', () => {
//     request(app)
//     .get('/nights')
//     .expect(200)
//     .end();
//   })
// })

describe ('a sample test', () => {
  it('1+1 should return 2', () => {
    expect(1+1).to.equal(2);
  })
})