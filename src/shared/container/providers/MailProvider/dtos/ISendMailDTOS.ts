import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IEmailContact {
  name: string;
  email: string;
}

interface ISendMailDTOS {
  to: IEmailContact;
  from?: IEmailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}

export default ISendMailDTOS;
