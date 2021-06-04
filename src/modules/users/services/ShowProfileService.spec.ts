import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/erros/AppError';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Renato Martinez Costa',
      email: 'renatomc@hotmail.com',
      password: '123456',
    });

    const userProfile = await showProfile.execute({ user_id: user.id });

    expect(userProfile.name).toBe('Renato Martinez Costa');
    expect(userProfile.email).toBe('renatomc@hotmail.com');
  });

  it('should not be able show the profile from non-existing profile', async () => {
    await expect(
      showProfile.execute({ user_id: 'non-existing' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
