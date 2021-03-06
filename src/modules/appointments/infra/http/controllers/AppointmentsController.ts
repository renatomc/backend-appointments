import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentsService';

class AppointmentsContoller {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const createAppointment = container.resolve(CreateAppointmentsService);

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date,
    });

    return response.json(appointment);
  }
}

export default AppointmentsContoller;
