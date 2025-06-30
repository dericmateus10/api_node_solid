import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositoy';
import { compare } from 'bcryptjs';
import { describe, expect, it } from 'vitest';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { RegisterUseCase } from './register';



describe('Register Use Case', () => {
    it('should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        const {user} = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johdow@example.com',
            password: '123456',
        });

        const isPasswordCorrectlyHashed = await compare(
        '123456',
        user.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true);
    })

    it('should not be able to register with same twice', async () => {
        const usersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        const email = 'johdow@example.com'

        await registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456',
        });

        await expect(() => 
         registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456',
        }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    })

    it('should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        const {user} = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johdow@example.com',
            password: '123456',
        });

        const isPasswordCorrectlyHashed = await compare(
        '123456',
        user.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true);
    })

    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        const {user} = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johdow@example.com',
            password: '123456',
        });

        expect(user.id).toEqual(expect.any(String));
    })
});