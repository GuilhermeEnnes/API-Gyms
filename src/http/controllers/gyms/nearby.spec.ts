import request from "supertest";
import { app } from "@/app";
import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nearby (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to list nearby gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "The best gym for JavaScript developers",
        phone: "11999999999",
        latitude: -22.9193457,
        longitude: -43.3915335,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "The best gym for JavaScript developers",
        phone: "11999999999",

        latitude: -25.955499,
        longitude: -63.3450214,
      });
    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -22.9193457,
        longitude: -43.3915335,
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
