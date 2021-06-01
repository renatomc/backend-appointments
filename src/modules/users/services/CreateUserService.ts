import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/erros/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExistes = await this.usersRepository.findByEmail(email);

    if (checkUserExistes) {
      throw new AppError('Emaili address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
