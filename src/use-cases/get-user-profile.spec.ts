import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositoy';
import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new GetUserProfileUseCase(usersRepository);
    });

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6), 
        });   

        const {user} = await sut.execute({
            userId: createdUser.id,
        });

        expect(user.name).toEqual('John Doe');
    })

    it('should not be able to get user profile with wrong id', async () => {
        await expect(() => sut.execute({
            userId: 'non-existing-id',
        }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);  
    })

});