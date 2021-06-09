import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersAppointmentsService from './ListProvidersAppointmentsService';

let listProvidersAppointments: ListProvidersAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvidersAppointments = new ListProvidersAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
    fakeUsersRepository = new FakeUsersRepository();
  });
  it('should be able to list the appointments on a specific day', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Renato Martinez Costa',
      email: 'renatomc@hotmail.com',
      password: '123456',
    });

    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: user.id,
      user_id: '654321',
      date: new Date(2021, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: user.id,
      user_id: '654321',
      date: new Date(2021, 4, 20, 15, 0, 0),
    });

    const appointments = await listProvidersAppointments.execute({
      provider_id: user.id,
      day: 20,
      month: 5,
      year: 2021,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
