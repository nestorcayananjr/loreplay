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

describe('POST /api/auth/login', () => {
  it('should log a verify a users credentials and return a token', async () => {

      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@test.com',
          username: 'testuser',
          password: 'password123'
        })


    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password123'
      })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('token')
  })

  it('should return an error with the wrong credentials', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@test.com',
        username: 'testuser',
        password: 'password123'
      })

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password12'
      })

    const resTwo = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuer',
        password: 'password123'
      })

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Invalid credentials')
    expect(resTwo.status).toBe(401)
    expect(res.body.message).toBe('Invalid credentials')

  })
})