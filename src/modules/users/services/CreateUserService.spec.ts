import AppError from '@shared/erros/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Renato Martinez Costa',
      email: 'renatomc@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('renatomc@hotmail.com');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Renato Martinez Costa',
      email: 'renatomc@hotmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Renato Martinez Costa',
        email: 'renatomc@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
