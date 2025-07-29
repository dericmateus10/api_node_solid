import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repositoy';
import { Decimal } from '@prisma/client/runtime/library';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInUseCase } from './check-in';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckInsError } from './errors/max-rumber-of-check-ins-error';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository; // Assuming you have a similar in-memory repository for gyms
let sut: CheckInUseCase;

describe('Check-in Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(checkInsRepository, gymsRepository);
          
        await gymsRepository.create({
            id: 'gym-01',
            title: 'Gym 01',
            description: 'Description of Gym 01',
            phone: '123456789',
            latitude: 0,
            longitude: 0,
        });


        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should be able to check in', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0,
        });

        await expect(() => sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0,
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
    });

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
        
        const { checkIn } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0,
        });

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

        const { checkIn: checkInOnDifferentDay } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0,
        });

        expect(checkInOnDifferentDay.id).toEqual(expect.any(String));
    });

      it('should be able to check in on distant gym', async () => {

        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Gym 02',
            description: 'Description of Gym 01',
            phone: '123456789',
            latitude: new Decimal(-26.6908991),
            longitude: new Decimal(-49.1650369),
       

        });


        await expect(() => 
        sut.execute({
            userId: 'user-01',
            gymId: 'gym-02',
            userLatitude: -26.485378,
            userLongitude: -49.1016902,
        }),
      ).rejects.toBeInstanceOf(MaxDistanceError);
    });

});