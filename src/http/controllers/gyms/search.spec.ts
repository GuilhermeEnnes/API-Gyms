import request from "supertest";
import { app } from "@/app";
import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to search gyms by title", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "The best gym for JavaScript developers",
        phone: "1199999999",
        latitude: -23.5505199,
        longitude: -46.6333094,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "The best gym for JavaScript developers",
        phone: "1199999999",
        latitude: -26.955499,
        longitude: -49.3450214,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        q: "JavaScript",
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms[0]).toEqual(
      expect.objectContaining({
        title: "JavaScript Gym",
      }),
    );
  });
});
