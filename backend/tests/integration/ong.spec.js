const request = require('supertest');

const app = require('../../src/app')

const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ong', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "Maria",
                email: "maria@maria.com.br",
                whatsapp: "41 00000-9999",
                city: "São Paulo",
                uf: "SP"
        });

        expect(response.body).toHaveProperty('id');
        
        expect(response.body.id).toHaveLength(8);
    });
});