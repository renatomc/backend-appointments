import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationsDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

interface INotificationsRepository {
  create(data: ICreateNotificationsDTO): Promise<Notification>;
}

export default INotificationsRepository;
