import request from "supertest";
import { app } from "@/app";
import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to create check-in", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -23.5505199,
        longitude: -46.6333094,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -23.5505199,
        longitude: -46.6333094,
      });
    expect(response.statusCode).toEqual(201);
  });
});
