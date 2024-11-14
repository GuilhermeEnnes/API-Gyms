import request from "supertest";
import { app } from "@/app";
import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("validate Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to validate a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app, true);
    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -23.5505199,
        longitude: -46.6333094,
      },
    });

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_Id: gym.id,
        user_id: user.id,
      },
    });
    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -23.5505199,
        longitude: -46.6333094,
      });
    expect(response.statusCode).toEqual(204);

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: { id: checkIn.id },
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
