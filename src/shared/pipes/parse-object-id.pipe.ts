import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any): Types.ObjectId {
    const isValidObjectId = Types.ObjectId.isValid(value);
    if (isValidObjectId) {
      return new Types.ObjectId(value);
    } else {
      throw new BadRequestException(
        'Asegurate de estar enviando bien la información',
      );
    }
  }
}
