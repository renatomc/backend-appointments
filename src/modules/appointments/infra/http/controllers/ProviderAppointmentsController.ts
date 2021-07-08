import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersAppointmentsService from '@modules/appointments/services/ListProvidersAppointmentsService';

class ProviderAppointmentsContoller {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const createAppointment = container.resolve(
      ListProvidersAppointmentsService,
    );

    const appointments = await createAppointment.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(appointments);
  }
}

export default ProviderAppointmentsContoller;
