const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const User = require("../models/User_model");
require('dotenv').config();
// app.listen(8000);

describe("Authentication API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });


  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          username: "testa3209",
          email: "testa3209@",
          password: "testpassword",
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.username).toEqual("testa3209");
    });

    it("should return an error if username is missing", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          email: "testa1@example.com",
          password: "testpassword",
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual("Username is required");
    });
});

  describe("POST /api/auth/login", () => {
    it("should login", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          
          "email": "a11@",
          "password": "123456"
        });

      expect(res.statusCode).toEqual(500);
    });

    it("should return an error if username is missing", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          email: "testa1@example.com",
          password: "testpassword",
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual("Username is required");
    });
  });

})