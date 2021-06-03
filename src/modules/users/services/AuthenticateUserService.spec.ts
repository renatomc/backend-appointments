import AppError from '@shared/erros/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Renato Martinez Costa',
      email: 'renatomc@hotmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'renatomc@hotmail.com',
      password: '123456',
    });

    expect(response.user).toEqual(user);

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'renatomc@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Renato Martinez Costa',
      email: 'renatomc@hotmail.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'renatomc@hotmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
