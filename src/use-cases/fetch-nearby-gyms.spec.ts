import { InMemoryGymsRepository } from "@/repositories/in-memory-repository/in-memory-gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -22.9193457,
      longitude: -43.3915335,
    });
    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -22.9116295,
      longitude: -43.1791997,
    });

    const { gyms } = await sut.execute({
      userLatitude: -22.9193457,
      userLongitude: -43.3915335,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
