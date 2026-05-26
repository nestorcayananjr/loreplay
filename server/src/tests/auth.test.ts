import request from 'supertest'
import app from '../app'
import prisma from '../lib/prisma'

beforeEach(async () => {
  await prisma.user.deleteMany()
})

describe('POST /api/auth/register', () => {
  it('should register a new user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@test.com',
        username: 'testuser',
        password: 'password123'
      })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('token')
  })

  it('should return 409 if email already exists', async () => {
    await prisma.user.create({
      data: {
        email: 'test@test.com',
        username: 'testuser',
        passwordHash: 'hashedpassword'
      }
    })

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@test.com',
        username: 'testuser2',
        password: 'password123'
      })

    expect(res.status).toBe(409)
  })
})