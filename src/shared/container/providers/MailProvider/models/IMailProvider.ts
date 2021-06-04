import ISendMailDTOS from '@shared/container/providers/MailProvider/dtos/ISendMailDTOS';

interface IMailProvider {
  sendMail(data: ISendMailDTOS): Promise<void>;
}

export default IMailProvider;
