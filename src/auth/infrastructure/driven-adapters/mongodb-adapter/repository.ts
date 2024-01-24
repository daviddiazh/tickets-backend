import { IEnrollment } from '@auth/domain/interfaces/enrollment.interface';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthSpec } from './schema';

@Injectable()
export class AuthDBRepository {
  constructor(@InjectModel('Auth') private authModel: Model<AuthSpec>) {}

  async insert(payload: IEnrollment): Promise<IEnrollment> {
    try {
      await new this.authModel(payload).save();

      return payload;
    } catch (error) {
      throw new UnauthorizedException(
        'Error en el registro, por favor verifique los datos e ingréselos nuevamente',
      );
    }
  }

  async findOne(where: any): Promise<IEnrollment> {
    try {
      const user = await this.authModel.findOne(where);

      return user['_doc'];
    } catch (error) {
      throw new NotFoundException(
        'No se encontró ningún usuario por ese filtro',
      );
    }
  }

  async findById(_id: any): Promise<IEnrollment> {
    try {
      return await this.authModel.findById(_id);
    } catch (error) {
      throw new NotFoundException('No se encontró ningún usuario por el ID');
    }
  }
}
