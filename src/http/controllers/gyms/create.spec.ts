import request from "supertest";
import { app } from "@/app";
import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "The best gym for JavaScript developers",
        phone: "11999999999",
        latitude: -23.5505199,
        longitude: -46.6333094,
      });
    expect(response.statusCode).toEqual(201);
  });
});
