import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repositoy';
import { beforeEach, describe, expect, it } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new FetchNearbyGymsUseCase(gymsRepository);
          
     
    });

    it('should be able to fetch nearby gyms', async () => {

        await gymsRepository.create({
            title: 'Near Gym',
            description: 'A great gym',
            phone: '123456789',
            latitude: -23.5505,
            longitude: -46.6333,
        });

        await gymsRepository.create({
            title: 'Far Gym',
            description: 'A great gym',
            phone: '123456789',
            latitude: -27.5505,
            longitude: -49.6333,
        });

        const { gyms } = await sut.execute({
            userLatitude: -23.5505,
            userLongitude: -46.6333
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({title: 'Near Gym'}),
        ])

    })


     

});
