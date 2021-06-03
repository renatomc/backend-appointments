import FakerUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeMailProvider from '@shared/container/providers/MailPRovider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to revocer the password using the email', async () => {
    const fakeUserRepository = new FakerUserRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPassword = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
    );

    const user = await fakeUserRepository.create({
      name: 'Renato Martinez Costa',
      email: 'renatomc@hotmail.com',
      password: '123456',
    });

    await sendForgotPassword.execute({
      email: user.email,
    });

    expect(sendEmail).toHaveBeenCalled();
  });
});
