import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory-repository/in-memory-check-in-repository';
import { GetUserMetricsUseCase } from './get-user-metrics';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it('should be able to get check-in count from metrics', async () => {
    await checkInsRepository.create({
      gym_Id: 'gym-01',
      user_id: 'user-01',
    });
    await checkInsRepository.create({
      gym_Id: 'gym-02',
      user_id: 'user-01',
    });

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    });

    expect(checkInsCount).toEqual(2);
  });
});
