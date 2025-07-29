
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repositoy';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateGymUseCase } from './create-gym';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(gymsRepository);
    });

    it('should be able to create gym', async () => {
        const { gym } = await sut.execute({
            title: 'Gym A',
            description: 'A great gym',
            phone: '123456789',
            latitude: -23.5505,
            longitude: -46.6333,
        });

        expect(gym.id).toEqual(expect.any(String));
    });

});