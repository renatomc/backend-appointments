import AppError from '@shared/erros/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Renato Martinez Costa',
      email: 'renatomc@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('renatomc@hotmail.com');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Renato Martinez Costa',
      email: 'renatomc@hotmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Renato Martinez Costa',
        email: 'renatomc@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
