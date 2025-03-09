const request = require('supertest');
const {expect} = require('chai');
const app = require('../app');

describe('Api Route', () => { 
    describe('GET /',() => {
        it('Health Check', async function(){
            const res = await request(app).get('/health');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an(array)
        })
    })

    describe('GET /',() => {
        it('Health Check', async function(){
            const res = await request(app).get('/location');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an(array)
        })
    })
 })