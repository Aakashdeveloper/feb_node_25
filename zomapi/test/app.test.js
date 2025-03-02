import {expect} from 'chai';
import request from 'supertest';
import dotenv from 'dotenv';
import app from '../app';

dotenv.config();
//chai.use(chaiHttp);

const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD
const authHeader = `Basic ${Buffer.from(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASSWORD}`).toString('base64')}`;

describe(`Api Test`,() => {
    it('Should return 200 for heartbeat',() => {
        request(app)
        .get('/location')
        .end((err,res) => {
            expect(res).to.have.status(200);
            expect(res.text).to.equal('ok')
            done()
        })
    })
})



