import ISendMailDTOS from '@shared/container/providers/MailProvider/dtos/ISendMailDTOS';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTOS[] = [];

  public async sendMail(message: ISendMailDTOS): Promise<void> {
    this.messages.push(message);
  }
}

export default FakeMailProvider;
