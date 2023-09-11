const mongoose = require("mongoose");
require('dotenv').config();

describe("Database Connection Test", () => {
  beforeAll(async () => {
    const DB = process.env.DATABASE;
    await mongoose.connect(DB,{
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should connect to the database successfully", () => {
    expect(mongoose.connection.readyState).toEqual(1);
  });
});
