const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app"); // one level up from tests folder
const Url = require("../models/Url");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Url.deleteMany({});
});

describe("POST /shorten", () => {
  it("should create a short URL for a valid long URL", async () => {
    const res = await request(app)
      .post("/shorten")
      .send({ longUrl: "https://www.google.com" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("shortUrl");
    expect(res.body).toHaveProperty("code");
  });

  it("should return 400 if no longUrl is provided", async () => {
    const res = await request(app).post("/shorten").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Long URL is required");
  });
});
