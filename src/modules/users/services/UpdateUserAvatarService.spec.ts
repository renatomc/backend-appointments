import AppError from '@shared/erros/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update avatar from user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    const user = await fakeUserRepository.create({
      name: 'Renato Martinez Costa',
      email: 'renatomc@hotmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'foto.jpg',
    });

    expect(user).toHaveProperty('id');
    expect(user.avatar).toBe('foto.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'foto.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    const user = await fakeUserRepository.create({
      name: 'Renato Martinez Costa',
      email: 'renatomc@hotmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'foto.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'foto2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('foto.jpg');
    expect(user.avatar).toBe('foto2.jpg');
  });
});
