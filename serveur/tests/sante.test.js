import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/portfolio_test';
process.env.JWT_SECRET = 'x'.repeat(40);
process.env.CLIENT_URL = 'http://localhost:5173';

const { default: app } = await import('../src/app.js');

test('GET /api/sante répond 200', async () => {
    const reponse = await request(app).get('/api/sante');
    assert.equal(reponse.status, 200);
    assert.equal(reponse.body.statut, 'ok');
});

test('route inconnue : 404 au format JSON', async () => {
    const reponse = await request(app).get('/api/inconnue');
    assert.equal(reponse.status, 404);
    assert.equal(reponse.body.succes, false);
});

test('route admin sans session : 401', async () => {
    const reponse = await request(app).get('/api/projets/admin/liste');
    assert.equal(reponse.status, 401);
});

test('requête modifiante depuis une origine inconnue : 403', async () => {
    const reponse = await request(app)
        .post('/api/messages')
        .set('Origin', 'http://site-malveillant.example')
        .send({});
    assert.equal(reponse.status, 403);
});

test('connexion avec un corps invalide : 422', async () => {
    const reponse = await request(app).post('/api/authentification/connexion').send({ email: 'x' });
    assert.equal(reponse.status, 422);
});

test('message invalide : 422 avec le détail des champs', async () => {
    const reponse = await request(app).post('/api/messages').send({ nom: 'A' });
    assert.equal(reponse.status, 422);
    assert.ok(Array.isArray(reponse.body.details));
});
