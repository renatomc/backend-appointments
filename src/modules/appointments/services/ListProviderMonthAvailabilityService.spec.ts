import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProvidersMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
    fakeUsersRepository = new FakeUsersRepository();
  });
  it('should be able to list the month availability from provider', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Renato Martinez Costa',
      email: 'renatomc@hotmail.com',
      password: '123456',
    });

    await fakeAppointmentsRepository.create({
      provider_id: user.id,
      date: new Date(2021, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: user.id,
      date: new Date(2021, 4, 20, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: user.id,
      date: new Date(2021, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: user.id,
      date: new Date(2021, 4, 20, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: user.id,
      date: new Date(2021, 4, 20, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: user.id,
      date: new Date(2021, 4, 20, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: user.id,
      date: new Date(2021, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: user.id,
      date: new Date(2021, 4, 20, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: user.id,
      date: new Date(2021, 4, 20, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: user.id,
      date: new Date(2021, 4, 20, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: user.id,
      date: new Date(2021, 4, 21, 8, 0, 0),
    });

    const availability = await listProvidersMonthAvailability.execute({
      provider_id: user.id,
      year: 2021,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
