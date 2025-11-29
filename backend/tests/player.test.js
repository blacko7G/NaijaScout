import dotenv from 'dotenv';
dotenv.config();

import request from 'supertest';
import express from 'express';
import playerRoutes from '../routes/players.js';
import connectDB from '../config/database.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use('/api/players', playerRoutes);

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Player API', () => {
  it('should return 200 and a list of players', async () => {
    const res = await request(app).get('/api/players');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should return 400 for invalid player ID', async () => {
    const res = await request(app).get('/api/players/invalidid');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Validation error');
  });
});
